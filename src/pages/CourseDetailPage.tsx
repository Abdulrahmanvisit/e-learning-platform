/**
 * LearnPath Course Detail Page
 * Detailed syllabus, prerequisite inspection, and enrollment actions
 */
import React, { useState, useEffect } from 'react';
import { Course, ProgressionStatus } from '../types/index.ts';
import { api } from '../api/client.ts';
import { useToast } from '../context/ToastContext.tsx';
import {
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  Award,
  ArrowRight,
  GitBranch,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertCircle
} from 'lucide-react';

interface CourseDetailPageProps {
  courseId: string;
  onStartLesson: (courseId: string, lessonId: string) => void;
  onNavigate: (view: string, param?: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  courseId,
  onStartLesson,
  onNavigate,
}) => {
  const { showToast } = useToast();
  const [data, setData] = useState<{
    course: Course;
    prerequisites: Course[];
    modules: any[];
    progression: ProgressionStatus | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await api.getCourse(courseId);
      setData(res);
      // Expand all modules by default
      const exp: Record<string, boolean> = {};
      res.modules.forEach((m) => {
        exp[m.id] = true;
      });
      setExpandedModules(exp);
    } catch (err: any) {
      setError(err.message || 'Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      const res = await api.enroll(courseId);
      setData((prev) => (prev ? { ...prev, progression: res.progression } : null));
      showToast('Enrolled successfully! Loading first lesson.', 'success');
      // Route to first accessible lesson
      const firstModule = data?.modules[0];
      const firstLesson = firstModule?.lessons[0];
      if (firstLesson) {
        onStartLesson(courseId, firstLesson.id);
      }
    } catch (err: any) {
      showToast(err.message || 'Enrollment failed', 'error');
    }
  };

  const handleResetCourse = async () => {
    try {
      const res = await api.resetCourse(courseId);
      setData((prev) => (prev ? { ...prev, progression: res.progression } : null));
      showToast('Course progression reset to 0%.', 'info');
    } catch (err: any) {
      showToast(err.message || 'Failed to reset progress', 'error');
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500">Loading course curriculum and prerequisite graph...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900">Course Not Found</h2>
        <p className="text-xs text-slate-600">{error}</p>
        <button
          onClick={() => onNavigate('catalogue')}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
        >
          Return to Course Catalogue
        </button>
      </div>
    );
  }

  const { course, prerequisites, modules, progression } = data;
  const isEnrolled = Boolean(data.isEnrolled) || Boolean(data.enrolment) || (progression !== null && progression.progressPercent > 0);
  const isCourseLocked = progression?.isCourseUnlocked === false;
  const isCompleted = progression?.isCourseCompleted;

  // Find first unlocked incomplete lesson to continue
  let nextLessonId: string | null = null;
  for (const m of modules) {
    for (const l of m.lessons) {
      const state = progression?.lessonStates[l.id];
      if (state?.isUnlocked && !state?.isCompleted) {
        nextLessonId = l.id;
        break;
      }
    }
    if (nextLessonId) break;
  }
  if (!nextLessonId && modules[0]?.lessons[0]) {
    nextLessonId = modules[0].lessons[0].id;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* 1. Header & Course Hero */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        
        {/* Zero-Pill Unboxed Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
          <span>{course.categoryName || 'Software Architecture'}</span>
          <span aria-hidden="true">·</span>
          <span>{course.difficulty}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{course.estimatedHours} Total Hours</span>
          <span aria-hidden="true">·</span>
          <span>Passing Threshold: {course.passingThresholdPercent}%</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {course.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            {course.description}
          </p>
        </div>

        {/* Prerequisite Alert if locked */}
        {isCourseLocked && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-1">
              <span className="font-bold">Course-Level Prerequisite Gate Active</span>
              <p>
                To unlock this course, you must first complete the required prerequisite course(s):
              </p>
              <ul className="list-disc list-inside mt-1 font-medium">
                {prerequisites.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => onNavigate('course', p.id)}
                      className="underline hover:text-amber-700"
                    >
                      {p.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Action button row */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          {isEnrolled ? (
            <button
              onClick={() => nextLessonId && onStartLesson(course.id, nextLessonId)}
              disabled={isCourseLocked}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold inline-flex items-center gap-2 transition-colors ${
                isCourseLocked
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <span>{isCompleted ? 'Review Curriculum' : 'Resume Learning'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleEnroll}
              disabled={isCourseLocked}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold inline-flex items-center gap-2 transition-colors ${
                isCourseLocked
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <span>{isCourseLocked ? 'Prerequisites Required' : 'Enroll & Start Learning'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {isCompleted && (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <Award className="w-4 h-4" />
              <span>Course Completed & Verified</span>
            </div>
          )}
        </div>

      </div>

      {/* 2. Prerequisite Dependency Graph Overview */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-indigo-600" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Progressive Dependency Structure
          </h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Lessons unlock strictly in sequence. Each module culminates in a server-evaluated assessment requiring at least {course.passingThresholdPercent}% to unlock subsequent modules.
        </p>

        {/* Visual Pipeline Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {modules.map((m, idx) => {
            const modState = progression?.moduleStates[m.id];
            const isModComplete = modState?.isCompleted;
            return (
              <div
                key={m.id}
                className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 flex items-start gap-3"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isModComplete
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {isModComplete ? '✓' : idx + 1}
                </div>
                <div className="text-xs space-y-0.5">
                  <div className="font-semibold text-slate-900 line-clamp-1">{m.title}</div>
                  <div className="text-slate-500">
                    {m.lessons.length} Lessons · {m.assessment ? '1 Assessment' : 'No Assessment'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Detailed Syllabus Breakdown */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Course Syllabus & Lessons</h2>

        <div className="space-y-4">
          {modules.map((module) => {
            const isExpanded = expandedModules[module.id] ?? true;
            const modState = progression?.moduleStates[module.id];

            return (
              <div
                key={module.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                {/* Module Header */}
                <div
                  onClick={() =>
                    setExpandedModules((prev) => ({
                      ...prev,
                      [module.id]: !prev[module.id],
                    }))
                  }
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Module {module.sequenceOrder}
                      </span>
                      {modState?.isCompleted && (
                        <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">{module.title}</h3>
                  </div>

                  <button className="text-slate-400 hover:text-slate-600 p-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Lessons List */}
                {isExpanded && (
                  <div className="border-t border-slate-100 divide-y divide-slate-100">
                    {module.lessons.map((lesson: any) => {
                      const lessonProg = progression?.lessonStates[lesson.id];
                      const isUnlocked = isEnrolled ? lessonProg?.isUnlocked : true;
                      const isLessonDone = lessonProg?.isCompleted;

                      return (
                        <div
                          key={lesson.id}
                          className="p-4 sm:px-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="mt-0.5">
                              {isLessonDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              ) : isUnlocked ? (
                                <Unlock className="w-4 h-4 text-slate-400" />
                              ) : (
                                <Lock className="w-4 h-4 text-amber-500" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-slate-900 line-clamp-1">
                                  {lesson.title}
                                </span>
                                {lesson.hasAssessment && (
                                  <span className="text-[11px] text-indigo-600 font-medium">
                                    [Quiz Included]
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                                <span className="tabular-nums">{lesson.estimatedMinutes} mins</span>
                                {lesson.summary && (
                                  <>
                                    <span>·</span>
                                    <span className="line-clamp-1">{lesson.summary}</span>
                                  </>
                                )}
                              </div>
                              {/* Unmet prerequisites notice */}
                              {!isUnlocked && lessonProg?.unmetPrerequisiteTitles && (
                                <p className="text-[11px] text-amber-600 mt-1">
                                  Locked: Requires completion of{' '}
                                  {lessonProg.unmetPrerequisiteTitles.join(', ')}
                                </p>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => onStartLesson(course.id, lesson.id)}
                            disabled={!isUnlocked}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors shrink-0 ${
                              !isUnlocked
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : isLessonDone
                                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                : 'bg-slate-900 text-white hover:bg-slate-800'
                            }`}
                          >
                            {isLessonDone ? 'Review' : isUnlocked ? 'Study' : 'Locked'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
