/**
 * LearnPath Academy - Progressive Learner Dashboard
 * Direct implementation of Objectives 4, 5, and 6:
 * - Progressive learning progress tracking (formula breakdown)
 * - Clear presentation of completed vs. outstanding activities
 * - Resuming learning from previously recorded position
 */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { useToast } from '../context/ToastContext.tsx';
import { api } from '../api/client.ts';
import {
  Flame,
  BookOpen,
  Award,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  PlayCircle,
  Hourglass,
  Layers
} from 'lucide-react';

interface LearnerDashboardProps {
  onStartLesson: (courseId: string, lessonId: string) => void;
  onNavigate: (view: string, param?: string) => void;
}

export const LearnerDashboard: React.FC<LearnerDashboardProps> = ({
  onStartLesson,
  onNavigate,
}) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState<string | null>(null);
  const [expandedCourseBreakdown, setExpandedCourseBreakdown] = useState<Record<string, boolean>>({});

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await api.getDashboardStats();
      setData(res);
    } catch (err) {
      console.error('Failed to load dashboard', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [user?.id]);

  const handleClaimCertificate = async (courseId: string) => {
    try {
      setClaiming(courseId);
      const res = await api.claimCertificate(courseId);
      showToast(`Certificate issued! Verification code: ${res.certificate.verificationCode}`, 'success');
      await fetchDashboard();
    } catch (err: any) {
      showToast(err.message || 'Certificate issuance criteria not met', 'error');
    } finally {
      setClaiming(null);
    }
  };

  const handleResetCourse = async (courseId: string) => {
    try {
      await api.resetCourse(courseId);
      showToast('Course progression reset successfully.', 'info');
      await fetchDashboard();
    } catch (err: any) {
      showToast(err.message || 'Failed to reset course progression', 'error');
    }
  };

  const handleCompleteRevision = async (itemId: string) => {
    try {
      await api.completeRevisionItem(itemId);
      await fetchDashboard();
    } catch (err) {
      console.error('Failed to complete revision', err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500">Loading progressive tracking records and student profile...</p>
      </div>
    );
  }

  const { enrolledCourses = [], revisionQueue = [], certificates = [], bookmarks = [] } = data || {};

  // Find the most recent active course with an outstanding lesson to provide immediate 1-click resumption
  const activeCourseWithNextLesson = enrolledCourses.find(
    (item: any) => item.progression?.nextOutstandingLessonId && !item.progression?.isCourseCompleted
  ) || enrolledCourses[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* 1. Header & Active Streak Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            Learner Progress Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Welcome back, {user?.fullName || 'Student'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Progressive tracking automatically records lesson completion and updates your advancement.
          </p>
        </div>

        {/* Streak Stat */}
        <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl shrink-0">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 tabular-nums">
              {user?.learningStreak || 6} Days
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Consecutive Learning Streak</div>
          </div>
        </div>
      </div>

      {/* 2. OBJECTIVE 6 EMBODIMENT: RESUME LEARNING FROM RECORDED POSITION */}
      {activeCourseWithNextLesson && (
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-md border border-slate-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <PlayCircle className="w-4 h-4" />
                <span>Resume Learning From Previous Position</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold">
                {activeCourseWithNextLesson.course?.title}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
                {activeCourseWithNextLesson.progression?.lastCompletedLessonTitle ? (
                  <span className="flex items-center gap-1 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Last Completed: <strong>{activeCourseWithNextLesson.progression.lastCompletedLessonTitle}</strong></span>
                  </span>
                ) : (
                  <span className="text-slate-400">Course Starting Point</span>
                )}
                <span>·</span>
                <span className="text-amber-300 font-medium">
                  Next Activity: <strong>{activeCourseWithNextLesson.progression?.nextOutstandingLessonTitle || 'First Lesson'}</strong>
                </span>
                <span>·</span>
                <span className="tabular-nums font-bold text-white">
                  {activeCourseWithNextLesson.progression?.progressPercent || 0}% Completed
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                const targetLessonId =
                  activeCourseWithNextLesson.progression?.nextOutstandingLessonId ||
                  activeCourseWithNextLesson.course?.id;
                if (targetLessonId && activeCourseWithNextLesson.course?.id) {
                  onStartLesson(activeCourseWithNextLesson.course.id, targetLessonId);
                }
              }}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all inline-flex items-center gap-2 shrink-0 shadow-sm"
            >
              <span>Resume Current Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* 3. ADAPTIVE REVISION QUEUE */}
      {revisionQueue.length > 0 && (
        <section className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-amber-700" />
              <h2 className="text-sm font-bold text-amber-950 uppercase tracking-wider">
                Adaptive Revision Queue ({revisionQueue.length} Concept{revisionQueue.length > 1 ? 's' : ''} Due)
              </h2>
            </div>
            <span className="text-xs text-amber-800 font-medium hidden sm:inline">
              Targeted lessons recommended from assessment weak points
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {revisionQueue.map((item: any) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl border border-amber-200 space-y-3 shadow-2xs"
              >
                <div>
                  <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                    {item.topicName}
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mt-0.5">
                    {item.recommendedLessonTitle}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.reason}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    onClick={() => onStartLesson(item.courseId, item.recommendedLessonId)}
                    className="text-xs font-semibold text-amber-900 hover:text-amber-700 inline-flex items-center gap-1"
                  >
                    <span>Review Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleCompleteRevision(item.id)}
                    className="text-xs text-slate-400 hover:text-slate-600 font-medium"
                  >
                    Mark Reviewed
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. ENROLLED COURSES WITH FORMULA BREAKDOWN (OBJECTIVES 4 & 5) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Enrolled Courses & Progress Metrics</h2>
            <p className="text-xs text-slate-500">
              Recorded lesson completion automatically calculates each learner's progress percentage.
            </p>
          </div>
          <button
            onClick={() => onNavigate('catalogue')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950"
          >
            Explore More Courses
          </button>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((item: any) => {
              const { course, progression } = item;
              if (!course) return null;
              const isDone = progression?.isCourseCompleted;
              const canGetCert = progression?.certificateEligible && !progression?.certificateCode;
              const isBreakdownOpen = expandedCourseBreakdown[course.id] ?? false;

              const completed = progression?.completedLessons || 0;
              const total = progression?.totalLessons || 0;
              const outstanding = progression?.outstandingLessonsCount || Math.max(0, total - completed);
              const pct = progression?.progressPercent || 0;

              return (
                <div
                  key={course.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5 hover:border-slate-300 transition-colors shadow-2xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500">
                        {course.difficulty} · {course.estimatedHours}h
                      </span>
                      {isDone && (
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Complete</span>
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-base font-bold text-slate-900">{course.title}</h3>

                    {/* Progress Metrics & Mathematical Scope Formula */}
                    <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                      <div className="flex justify-between items-center text-slate-700">
                        <span className="font-semibold">Recorded Advancement:</span>
                        <span className="font-bold text-slate-900 tabular-nums">
                          {completed} of {total} Lessons ({pct}%)
                        </span>
                      </div>

                      {/* Formula verification indicator as requested in 1.6 Scope */}
                      <div className="text-[11px] text-slate-500 flex justify-between items-center pt-1 border-t border-slate-200">
                        <span>Calculation Scope:</span>
                        <span className="font-mono text-slate-700">
                          ({completed} / {total}) × 100% = {pct}%
                        </span>
                      </div>

                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isDone ? 'bg-emerald-500' : 'bg-emerald-700'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
                        <span className="text-emerald-700 font-medium">{completed} Completed Lessons</span>
                        <span className="text-amber-700 font-medium">{outstanding} Outstanding Activities</span>
                      </div>
                    </div>

                    {/* Position Information */}
                    <div className="text-xs text-slate-600 space-y-1">
                      {progression?.lastCompletedLessonTitle && (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                          <span>Last Activity:</span>
                          <span className="font-medium text-slate-800">{progression.lastCompletedLessonTitle}</span>
                        </div>
                      )}
                      {progression?.nextOutstandingLessonTitle && !isDone && (
                        <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-medium">
                          <span>Next Lesson:</span>
                          <span>{progression.nextOutstandingLessonTitle}</span>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Actions & Resumption Buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onNavigate('course', course.id)}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                    >
                      View Syllabus
                    </button>

                    <div className="flex items-center gap-2">
                      {canGetCert && (
                        <button
                          onClick={() => handleClaimCertificate(course.id)}
                          disabled={claiming === course.id}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                        >
                          {claiming === course.id ? 'Claiming...' : 'Claim Certificate'}
                        </button>
                      )}

                      <button
                        onClick={() => {
                          const target = progression?.nextOutstandingLessonId || 'les-101-1';
                          onStartLesson(course.id, target);
                        }}
                        className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>{isDone ? 'Review Curriculum' : 'Resume Learning'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-3">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500">You are not currently enrolled in any courses.</p>
            <button
              onClick={() => onNavigate('catalogue')}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
            >
              Explore Available Courses
            </button>
          </div>
        )}
      </section>

      {/* 5. EARNED CERTIFICATES GALLERY */}
      {certificates.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Earned Course Certificates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificates.map((cert: any) => (
              <div
                key={cert.id}
                className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 relative overflow-hidden shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block tabular-nums">
                    {cert.verificationCode}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{cert.courseTitle}</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Issued to {cert.recipientName} with {cert.finalScorePercent}% Final Score
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-slate-400">
                    {new Date(cert.issuedAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => onNavigate('verify', cert.verificationCode)}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                  >
                    <span>Verify Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. BOOKMARKS SECTION */}
      {bookmarks.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Bookmarked Lessons & Notes</h2>
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-2xs">
            {bookmarks.map((bm: any) => (
              <div
                key={bm.id}
                className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="text-[11px] text-slate-400 font-medium">{bm.courseTitle}</div>
                  <h4 className="text-xs font-semibold text-slate-900">{bm.lessonTitle}</h4>
                  {bm.note && <p className="text-xs text-slate-500 italic mt-0.5">"{bm.note}"</p>}
                </div>
                <button
                  onClick={() => onStartLesson(bm.courseId, bm.lessonId)}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-md text-xs font-semibold hover:bg-slate-800 shrink-0"
                >
                  Go to Lesson
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
