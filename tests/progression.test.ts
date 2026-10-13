/**
 * Unit & Integration Tests for LearnPath Progressive Learning Engine
 */
import { describe, it, expect } from 'vitest';
import {
  detectPrerequisiteCycle,
  computeUserCourseProgression,
  validateLessonAccess,
} from '../server/progression.ts';
import { Course, Module, LessonDetail, Assessment } from '../src/types/index.ts';

describe('Progressive Learning Engine - Cycle Detection', () => {
  it('identifies valid DAG without cycles', () => {
    const validGraph = {
      lessonA: [],
      lessonB: ['lessonA'],
      lessonC: ['lessonB'],
    };
    const result = detectPrerequisiteCycle(validGraph);
    expect(result.hasCycle).toBe(false);
  });

  it('detects direct 2-node circular prerequisite cycle (A -> B -> A)', () => {
    const cyclicGraph = {
      lessonA: ['lessonB'],
      lessonB: ['lessonA'],
    };
    const result = detectPrerequisiteCycle(cyclicGraph);
    expect(result.hasCycle).toBe(true);
    expect(result.cyclePath).toBeDefined();
  });

  it('detects transitive multi-node cycle (A -> B -> C -> A)', () => {
    const cyclicGraph = {
      nodeA: ['nodeB'],
      nodeB: ['nodeC'],
      nodeC: ['nodeA'],
    };
    const result = detectPrerequisiteCycle(cyclicGraph);
    expect(result.hasCycle).toBe(true);
  });
});

describe('Progressive Learning Engine - Gate & Prerequisite Resolution', () => {
  const dummyCourse: Course = {
    id: 'test-course',
    title: 'Distributed Systems Invariants',
    slug: 'distributed-systems',
    description: 'Testing course progression logic',
    categoryId: 'cat-test',
    difficulty: 'Intermediate',
    estimatedHours: 10,
    thumbnailUrl: '',
    status: 'published',
    passingThresholdPercent: 75,
    createdBy: 'instructor-1',
    createdAt: new Date().toISOString(),
  };

  const dummyModules: Module[] = [
    { id: 'mod-1', courseId: 'test-course', title: 'Module 1', sequenceOrder: 1 },
    { id: 'mod-2', courseId: 'test-course', title: 'Module 2', sequenceOrder: 2 },
  ];

  const dummyLessons: LessonDetail[] = [
    {
      id: 'les-1',
      moduleId: 'mod-1',
      courseId: 'test-course',
      title: 'Lesson 1: Foundations',
      contentMarkdown: 'Foundations',
      estimatedMinutes: 15,
      sequenceOrder: 1,
      isPublished: true,
      hasAssessment: false,
      resources: [],
      prerequisiteLessonIds: [], // Starting lesson: accessible to all
    },
    {
      id: 'les-2',
      moduleId: 'mod-1',
      courseId: 'test-course',
      title: 'Lesson 2: Advanced State',
      contentMarkdown: 'Advanced State',
      estimatedMinutes: 20,
      sequenceOrder: 2,
      isPublished: true,
      hasAssessment: true,
      assessmentId: 'asm-1',
      resources: [],
      prerequisiteLessonIds: ['les-1'], // Locked until Lesson 1 complete
    },
    {
      id: 'les-3',
      moduleId: 'mod-2',
      courseId: 'test-course',
      title: 'Lesson 3: Module 2 Core',
      contentMarkdown: 'Module 2 Core',
      estimatedMinutes: 25,
      sequenceOrder: 1,
      isPublished: true,
      hasAssessment: false,
      resources: [],
      prerequisiteLessonIds: [], // Inside module 2: requires Module 1 and asm-1 passed!
    },
  ];

  const dummyAssessments: Assessment[] = [
    {
      id: 'asm-1',
      courseId: 'test-course',
      moduleId: 'mod-1',
      title: 'Module 1 Assessment',
      passingScorePercent: 75,
      maxAttempts: 3,
      retryDelayMinutes: 0,
      timeLimitMinutes: 15,
      isRequiredForModule: true,
    },
  ];

  it('unlocks initial lesson and keeps subsequent lessons locked for a new student', () => {
    const progression = computeUserCourseProgression({
      userId: 'student-new',
      course: dummyCourse,
      coursePrerequisites: [],
      userCompletedCourseIds: new Set(),
      modules: dummyModules,
      lessons: dummyLessons,
      assessments: dummyAssessments,
      userCompletedLessonIds: new Set(), // Nothing completed yet
      userPassedAssessmentIds: new Set(),
    });

    // Lesson 1 must be unlocked
    expect(progression.lessonStates['les-1'].isUnlocked).toBe(true);
    expect(progression.lessonStates['les-1'].isCompleted).toBe(false);

    // Lesson 2 must be locked because les-1 is not completed
    expect(progression.lessonStates['les-2'].isUnlocked).toBe(false);

    // Module 2 Lesson 3 must be locked because Module 1 is incomplete
    expect(progression.lessonStates['les-3'].isUnlocked).toBe(false);

    // Access check validation
    const checkLes1 = validateLessonAccess('student-new', 'les-1', progression);
    expect(checkLes1.allowed).toBe(true);

    const checkLes2 = validateLessonAccess('student-new', 'les-2', progression);
    expect(checkLes2.allowed).toBe(false);
  });

  it('unlocks lesson 2 when lesson 1 is completed, but keeps module 2 locked until quiz is passed', () => {
    const progression = computeUserCourseProgression({
      userId: 'student-progressing',
      course: dummyCourse,
      coursePrerequisites: [],
      userCompletedCourseIds: new Set(),
      modules: dummyModules,
      lessons: dummyLessons,
      assessments: dummyAssessments,
      userCompletedLessonIds: new Set(['les-1', 'les-2']), // Both lessons in mod 1 completed!
      userPassedAssessmentIds: new Set(), // Quiz NOT yet passed
    });

    expect(progression.lessonStates['les-1'].isCompleted).toBe(true);
    expect(progression.lessonStates['les-2'].isUnlocked).toBe(true);
    expect(progression.lessonStates['les-2'].isCompleted).toBe(true);

    // Module 2 is still locked because required module assessment asm-1 was not passed!
    expect(progression.moduleStates['mod-1'].isCompleted).toBe(false);
    expect(progression.lessonStates['les-3'].isUnlocked).toBe(false);
  });

  it('unlocks module 2 when both lessons in module 1 are completed AND module assessment is passed', () => {
    const progression = computeUserCourseProgression({
      userId: 'student-mastered-mod1',
      course: dummyCourse,
      coursePrerequisites: [],
      userCompletedCourseIds: new Set(),
      modules: dummyModules,
      lessons: dummyLessons,
      assessments: dummyAssessments,
      userCompletedLessonIds: new Set(['les-1', 'les-2']),
      userPassedAssessmentIds: new Set(['asm-1']), // Assessment passed!
    });

    expect(progression.moduleStates['mod-1'].isCompleted).toBe(true);
    expect(progression.lessonStates['les-3'].isUnlocked).toBe(true);
  });

  it('marks course complete and eligible for certificate only when all required lessons and assessments are passed', () => {
    const progression = computeUserCourseProgression({
      userId: 'student-graduate',
      course: dummyCourse,
      coursePrerequisites: [],
      userCompletedCourseIds: new Set(),
      modules: dummyModules,
      lessons: dummyLessons,
      assessments: dummyAssessments,
      userCompletedLessonIds: new Set(['les-1', 'les-2', 'les-3']),
      userPassedAssessmentIds: new Set(['asm-1']),
    });

    expect(progression.isCourseCompleted).toBe(true);
    expect(progression.certificateEligible).toBe(true);
    expect(progression.progressPercent).toBe(100);
  });

  it('rejects bypass attempts when student tries to complete a locked lesson prematurely', () => {
    const progression = computeUserCourseProgression({
      userId: 'student-attacker',
      course: dummyCourse,
      coursePrerequisites: [],
      userCompletedCourseIds: new Set(),
      modules: dummyModules,
      lessons: dummyLessons,
      assessments: dummyAssessments,
      userCompletedLessonIds: new Set(), // Has not finished lesson 1
      userPassedAssessmentIds: new Set(),
    });

    // Attempt to access or complete lesson 2 directly
    const accessCheck = validateLessonAccess('student-attacker', 'les-2', progression);
    expect(accessCheck.allowed).toBe(false);
    expect(accessCheck.reason).toContain('Lesson is locked');

    // Attempt to access or complete lesson 3 directly
    const accessCheckMod2 = validateLessonAccess('student-attacker', 'les-3', progression);
    expect(accessCheckMod2.allowed).toBe(false);
  });

  it('accurately recalculates progression back to 0% when progress is reset', () => {
    // Before reset: 100% completed
    const completedProgression = computeUserCourseProgression({
      userId: 'student-reset',
      course: dummyCourse,
      coursePrerequisites: [],
      userCompletedCourseIds: new Set(),
      modules: dummyModules,
      lessons: dummyLessons,
      assessments: dummyAssessments,
      userCompletedLessonIds: new Set(['les-1', 'les-2', 'les-3']),
      userPassedAssessmentIds: new Set(['asm-1']),
    });
    expect(completedProgression.progressPercent).toBe(100);

    // After reset: all user lesson and assessment sets cleared
    const resetProgression = computeUserCourseProgression({
      userId: 'student-reset',
      course: dummyCourse,
      coursePrerequisites: [],
      userCompletedCourseIds: new Set(),
      modules: dummyModules,
      lessons: dummyLessons,
      assessments: dummyAssessments,
      userCompletedLessonIds: new Set(),
      userPassedAssessmentIds: new Set(),
    });

    expect(resetProgression.progressPercent).toBe(0);
    expect(resetProgression.isCourseCompleted).toBe(false);
    expect(resetProgression.certificateEligible).toBe(false);
    expect(resetProgression.lessonStates['les-1'].isUnlocked).toBe(true);
    expect(resetProgression.lessonStates['les-2'].isUnlocked).toBe(false);
  });
});

