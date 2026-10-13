/**
 * LearnPath Progressive Learning Engine
 * Handles prerequisite dependency resolution, cycle detection, module gates,
 * mastery updates, and adaptive revision queue calculation.
 */
import {
  Course,
  Module,
  LessonDetail,
  Assessment,
  ProgressionStatus,
  AssessmentAttempt
} from '../src/types/index.ts';

export interface PrerequisiteValidationResult {
  isAllowed: boolean;
  reason?: string;
  unmetPrerequisites: string[];
}

/**
 * Cycle detection for prerequisite graphs using DFS (Graph Coloring: White=0, Gray=1, Black=2)
 */
export function detectPrerequisiteCycle(
  graph: Record<string, string[]>
): { hasCycle: boolean; cyclePath?: string[] } {
  const visited: Record<string, number> = {}; // 0 = unvisited, 1 = visiting, 2 = visited
  const parentMap: Record<string, string | null> = {};

  const dfs = (node: string, path: string[]): string[] | null => {
    visited[node] = 1; // Mark Gray
    path.push(node);

    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      if (visited[neighbor] === 1) {
        // Cycle detected!
        const cycleStartIndex = path.indexOf(neighbor);
        return path.slice(cycleStartIndex).concat(neighbor);
      }
      if (!visited[neighbor]) {
        parentMap[neighbor] = node;
        const cycle = dfs(neighbor, path);
        if (cycle) return cycle;
      }
    }

    visited[node] = 2; // Mark Black
    path.pop();
    return null;
  };

  for (const node of Object.keys(graph)) {
    if (!visited[node]) {
      const cycle = dfs(node, []);
      if (cycle) {
        return { hasCycle: true, cyclePath: cycle };
      }
    }
  }

  return { hasCycle: false };
}

/**
 * Calculates complete progression status for a given user and course
 */
export function computeUserCourseProgression(params: {
  userId: string;
  course: Course;
  coursePrerequisites: string[];
  userCompletedCourseIds: Set<string>;
  modules: Module[];
  lessons: LessonDetail[];
  assessments: Assessment[];
  userCompletedLessonIds: Set<string>;
  userPassedAssessmentIds: Set<string>;
  certificateCode?: string;
}): ProgressionStatus {
  const {
    course,
    coursePrerequisites,
    userCompletedCourseIds,
    modules,
    lessons,
    assessments,
    userCompletedLessonIds,
    userPassedAssessmentIds,
    certificateCode,
  } = params;

  // 1. Check Course-Level Prerequisites
  const missingCoursePrerequisites: string[] = [];
  for (const prereqCourseId of coursePrerequisites) {
    if (!userCompletedCourseIds.has(prereqCourseId)) {
      missingCoursePrerequisites.push(prereqCourseId);
    }
  }

  const isCourseUnlocked = missingCoursePrerequisites.length === 0;

  // Map lessons by module
  const lessonsByModule: Record<string, LessonDetail[]> = {};
  const lessonById: Record<string, LessonDetail> = {};
  for (const les of lessons) {
    lessonById[les.id] = les;
    if (!lessonsByModule[les.moduleId]) {
      lessonsByModule[les.moduleId] = [];
    }
    lessonsByModule[les.moduleId].push(les);
  }

  // Sort modules by sequence order
  const sortedModules = [...modules].sort((a, b) => a.sequenceOrder - b.sequenceOrder);

  const lessonStates: ProgressionStatus['lessonStates'] = {};
  const moduleStates: ProgressionStatus['moduleStates'] = {};

  let allRequiredLessonsCompleted = true;
  let allRequiredAssessmentsPassed = true;
  let previousModuleSatisfied = true; // First module is initially accessible if course is unlocked

  for (const mod of sortedModules) {
    const modLessons = (lessonsByModule[mod.id] || []).sort((a, b) => a.sequenceOrder - b.sequenceOrder);
    let modCompletedLessons = 0;
    let allModLessonsCompleted = true;

    // Check if module assessment exists and was passed
    const modAssessment = assessments.find((a) => a.moduleId === mod.id);
    const modAssessmentPassed = modAssessment
      ? userPassedAssessmentIds.has(modAssessment.id)
      : true;

    for (const les of modLessons) {
      const isCompleted = userCompletedLessonIds.has(les.id);
      if (isCompleted) {
        modCompletedLessons++;
      } else {
        allModLessonsCompleted = false;
        allRequiredLessonsCompleted = false;
      }

      // Check lesson prerequisites
      const unmetPrereqTitles: string[] = [];
      const prereqs = les.prerequisiteLessonIds || [];

      // A lesson is unlocked if:
      // 1) Course is unlocked
      // 2) Previous module (if any) was completed and satisfied
      // 3) All direct lesson prerequisites are marked completed
      let meetsDirectPrereqs = true;
      for (const prereqId of prereqs) {
        if (!userCompletedLessonIds.has(prereqId)) {
          meetsDirectPrereqs = false;
          const prereqLes = lessonById[prereqId];
          unmetPrereqTitles.push(prereqLes ? prereqLes.title : `Prerequisite ${prereqId}`);
        }
      }

      const isUnlocked = isCourseUnlocked && previousModuleSatisfied && meetsDirectPrereqs;

      lessonStates[les.id] = {
        isUnlocked,
        isCompleted,
        title: les.title,
        unmetPrerequisiteTitles: unmetPrereqTitles,
        hasPassedAssessment: les.assessmentId ? userPassedAssessmentIds.has(les.assessmentId) : false,
      };
    }

    const isModuleComplete =
      modLessons.length > 0 && allModLessonsCompleted && modAssessmentPassed;

    moduleStates[mod.id] = {
      isCompleted: isModuleComplete,
      completedLessons: modCompletedLessons,
      totalLessons: modLessons.length,
    };

    // Subsequent modules unlock only when the previous module's lessons AND required assessments are cleared
    previousModuleSatisfied = isModuleComplete;
  }

  // Check all assessments for this course
  const courseAssessments = assessments.filter((a) => a.courseId === course.id);
  for (const asm of courseAssessments) {
    if (asm.isRequiredForModule && !userPassedAssessmentIds.has(asm.id)) {
      allRequiredAssessmentsPassed = false;
    }
  }

  const totalLessons = lessons.length;
  const completedLessons = Object.values(lessonStates).filter((s) => s.isCompleted).length;
  const outstandingLessonsCount = Math.max(0, totalLessons - completedLessons);
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Determine last completed lesson and next outstanding lesson in sequence
  let lastCompletedLessonId: string | undefined;
  let lastCompletedLessonTitle: string | undefined;
  let nextOutstandingLessonId: string | undefined;
  let nextOutstandingLessonTitle: string | undefined;

  for (const mod of sortedModules) {
    const modLessons = (lessonsByModule[mod.id] || []).sort((a, b) => a.sequenceOrder - b.sequenceOrder);
    for (const les of modLessons) {
      if (lessonStates[les.id]?.isCompleted) {
        lastCompletedLessonId = les.id;
        lastCompletedLessonTitle = les.title;
      } else if (!nextOutstandingLessonId && lessonStates[les.id]?.isUnlocked) {
        nextOutstandingLessonId = les.id;
        nextOutstandingLessonTitle = les.title;
      }
    }
  }

  // If no next lesson is unlocked (e.g. at the beginning), default to the very first lesson
  if (!nextOutstandingLessonId && lessons.length > 0 && isCourseUnlocked) {
    const firstLesson = sortedModules[0]?.lessons ? sortedModules[0].lessons[0] : lessons[0];
    if (firstLesson) {
      nextOutstandingLessonId = firstLesson.id;
      nextOutstandingLessonTitle = firstLesson.title;
    }
  }

  const isCourseCompleted =
    allRequiredLessonsCompleted && allRequiredAssessmentsPassed && totalLessons > 0;

  return {
    courseId: course.id,
    courseTitle: course.title,
    totalLessons,
    completedLessons,
    outstandingLessonsCount,
    progressPercent,
    lastCompletedLessonId,
    lastCompletedLessonTitle,
    nextOutstandingLessonId,
    nextOutstandingLessonTitle,
    isCourseUnlocked,
    coursePrerequisitesMet: isCourseUnlocked,
    missingCoursePrerequisites,
    isCourseCompleted,
    certificateEligible: isCourseCompleted,
    certificateCode,
    lessonStates,
    moduleStates,
  };
}

/**
 * Validates whether a specific user can access a lesson
 */
export function validateLessonAccess(
  userId: string,
  lessonId: string,
  progression: ProgressionStatus
): { allowed: boolean; reason?: string } {
  if (!progression.isCourseUnlocked) {
    return {
      allowed: false,
      reason: `Course is locked. Prerequisite courses must be completed first: ${progression.missingCoursePrerequisites.join(', ')}`,
    };
  }

  const state = progression.lessonStates[lessonId];
  if (!state) {
    return { allowed: false, reason: 'Lesson does not exist in this course curriculum.' };
  }

  if (!state.isUnlocked) {
    const missing = state.unmetPrerequisiteTitles.join(', ');
    return {
      allowed: false,
      reason: `Lesson is locked. You must complete preceding prerequisites first: ${missing || 'Previous module requirements'}`,
    };
  }

  return { allowed: true };
}
