/**
 * LearnPath Interactive Learning Experience
 * Primary study environment with curriculum sidebar, rich lesson content,
 * bookmarking, and server-evaluated assessment runner.
 */
import React, { useState, useEffect } from 'react';
import { LessonDetail, Assessment, ProgressionStatus, Course } from '../types/index.ts';
import { api } from '../api/client.ts';
import { useToast } from '../context/ToastContext.tsx';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Bookmark,
  Clock,
  ArrowLeft,
  ArrowRight,
  Download,
  AlertCircle,
  HelpCircle,
  Award,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  FileCode,
  Code2
} from 'lucide-react';
import { CodePlayground } from '../components/CodePlayground.tsx';

interface LearningExperiencePageProps {
  courseId: string;
  initialLessonId?: string;
  onBackToCourse: () => void;
  onNavigate: (view: string, param?: string) => void;
}

export const LearningExperiencePage: React.FC<LearningExperiencePageProps> = ({
  courseId,
  initialLessonId,
  onBackToCourse,
  onNavigate,
}) => {
  const { showToast } = useToast();
  const [courseData, setCourseData] = useState<{
    course: Course;
    modules: any[];
    progression: ProgressionStatus | null;
  } | null>(null);

  const [activeLessonId, setActiveLessonId] = useState<string>(initialLessonId || '');
  const [lessonDetail, setLessonDetail] = useState<LessonDetail | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<'lesson' | 'code' | 'quiz'>('lesson');

  // Assessment state
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [evaluating, setEvaluating] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<{
    scorePercent: number;
    isPassed: boolean;
    passingThreshold: number;
    feedback: any[];
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [lockedReason, setLockedReason] = useState<string | null>(null);

  // Load course progression and modules
  const loadCourse = async () => {
    try {
      const res = await api.getCourse(courseId);
      setCourseData(res);

      if (!activeLessonId) {
        // Find first unlocked lesson
        const firstMod = res.modules[0];
        if (firstMod?.lessons[0]) {
          setActiveLessonId(firstMod.lessons[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to load course details', err);
    }
  };

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  // Load active lesson details
  const loadLesson = async (id: string) => {
    if (!id) return;
    try {
      setLoading(true);
      setLockedReason(null);
      setAssessmentResult(null);
      setAnswers({});
      setActiveTab('lesson');

      const res = await api.getLesson(id);
      setLessonDetail(res.lesson);
      setIsBookmarked(res.isBookmarked);

      // If lesson has assessment, fetch it
      if (res.lesson.hasAssessment && res.lesson.assessmentId) {
        try {
          const asmRes = await api.getAssessment(res.lesson.assessmentId);
          setAssessment(asmRes.assessment);
        } catch (e) {
          console.warn('No assessment attached', e);
        }
      } else {
        setAssessment(null);
      }
    } catch (err: any) {
      if (err.message.includes('locked')) {
        setLockedReason(err.message);
      } else {
        console.error('Error loading lesson', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeLessonId) {
      loadLesson(activeLessonId);
    }
  }, [activeLessonId]);

  // Handle Mark Lesson Complete
  const handleCompleteLesson = async () => {
    if (!lessonDetail) return;
    try {
      setCompleting(true);
      const res = await api.completeLesson(lessonDetail.id, 120);
      setCourseData((prev) => (prev ? { ...prev, progression: res.progression } : null));

      // If this lesson has an assessment, prompt to take the quiz
      if (lessonDetail.hasAssessment) {
        setActiveTab('quiz');
        showToast('Lesson completed! Test your knowledge on the required module quiz.', 'success');
      } else {
        showToast('Lesson completed! Advancing to next curriculum step.', 'success');
        // Navigate to next lesson
        findAndNavigateNextLesson();
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to complete lesson', 'error');
    } finally {
      setCompleting(false);
    }
  };

  // Reset course progress
  const handleResetCourse = async () => {
    try {
      const res = await api.resetCourse(courseId);
      setCourseData((prev) => (prev ? { ...prev, progression: res.progression } : null));
      showToast('Course progression reset successfully. You can now retake all steps.', 'info');
      if (courseData?.modules[0]?.lessons[0]) {
        setActiveLessonId(courseData.modules[0].lessons[0].id);
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to reset progress', 'error');
    }
  };

  // Find next lesson in curriculum
  const findAndNavigateNextLesson = () => {
    if (!courseData) return;
    let foundCurrent = false;
    let nextId: string | null = null;

    for (const mod of courseData.modules) {
      for (const les of mod.lessons) {
        if (foundCurrent) {
          nextId = les.id;
          break;
        }
        if (les.id === activeLessonId) {
          foundCurrent = true;
        }
      }
      if (nextId) break;
    }

    if (nextId) {
      setActiveLessonId(nextId);
    }
  };

  // Toggle Bookmark
  const handleToggleBookmark = async () => {
    if (!activeLessonId) return;
    try {
      const res = await api.toggleBookmark(activeLessonId);
      setIsBookmarked(res.bookmarked);
      showToast(res.bookmarked ? 'Lesson bookmarked.' : 'Bookmark removed.', 'info');
    } catch (err) {
      console.error('Bookmark error', err);
    }
  };

  // Submit Quiz for evaluation
  const handleSubmitAssessment = async () => {
    if (!assessment) return;
    try {
      setEvaluating(true);
      const res = await api.submitAssessment(assessment.id, answers);
      setAssessmentResult({
        scorePercent: res.scorePercent,
        isPassed: res.isPassed,
        passingThreshold: res.passingThreshold,
        feedback: res.attempt?.feedback || [],
      });
      setCourseData((prev) => (prev ? { ...prev, progression: res.progression } : null));
      if (res.isPassed) {
        showToast(`Congratulations! You passed with ${res.scorePercent}%!`, 'success');
      } else {
        showToast(`Score: ${res.scorePercent}%. Passing threshold is ${res.passingThreshold}%. Review feedback to retry.`, 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to grade assessment', 'error');
    } finally {
      setEvaluating(false);
    }
  };

  // Render Quiz Question Option
  const handleSelectOption = (questionId: string, optionId: string, isMulti: boolean) => {
    if (assessmentResult) return; // Locked after grading until retry
    if (isMulti) {
      const current = Array.isArray(answers[questionId]) ? [...answers[questionId]] : [];
      const idx = current.indexOf(optionId);
      if (idx >= 0) {
        current.splice(idx, 1);
      } else {
        current.push(optionId);
      }
      setAnswers((prev) => ({ ...prev, [questionId]: current }));
    } else {
      setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    }
  };

  if (!courseData) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500">Connecting to learning workspace...</p>
      </div>
    );
  }

  const { course, modules, progression } = courseData;

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-slate-50">
      
      {/* 1. CURRICULUM SIDEBAR */}
      <aside
        className={`${
          sidebarOpen ? 'w-80' : 'w-0'
        } shrink-0 bg-white border-r border-slate-200 flex flex-col transition-all duration-300 overflow-hidden z-20`}
      >
        {/* Course Header in Sidebar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <button
            onClick={onBackToCourse}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Course Details</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 tabular-nums">
              {progression?.progressPercent || 0}% Done
            </span>
            <button
              onClick={handleResetCourse}
              title="Reset course progression for testing or retaking"
              className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              aria-label="Reset course progression"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Modules & Lessons Scrollable Tree */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {modules.map((mod: any) => {
            const modState = progression?.moduleStates[mod.id];
            return (
              <div key={mod.id} className="space-y-1.5">
                <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>{mod.title}</span>
                  {modState?.isCompleted && <span className="text-emerald-600">✓</span>}
                </div>

                <div className="space-y-1">
                  {mod.lessons.map((les: any) => {
                    const lesState = progression?.lessonStates[les.id];
                    const isUnlocked = lesState ? lesState.isUnlocked : true;
                    const isDone = lesState?.isCompleted;
                    const isActive = les.id === activeLessonId;

                    return (
                      <button
                        key={les.id}
                        onClick={() => isUnlocked && setActiveLessonId(les.id)}
                        disabled={!isUnlocked}
                        className={`w-full text-left p-2.5 rounded-lg text-xs flex items-start gap-2.5 transition-colors ${
                          isActive
                            ? 'bg-slate-900 text-white font-semibold'
                            : isUnlocked
                            ? 'text-slate-700 hover:bg-slate-100'
                            : 'text-slate-400 bg-slate-50 cursor-not-allowed opacity-75'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isDone ? (
                            <CheckCircle2
                              className={`w-3.5 h-3.5 ${
                                isActive ? 'text-emerald-400' : 'text-emerald-600'
                              }`}
                            />
                          ) : isUnlocked ? (
                            <div
                              className={`w-3.5 h-3.5 rounded-full border ${
                                isActive ? 'border-white' : 'border-slate-400'
                              }`}
                            />
                          ) : (
                            <Lock className="w-3.5 h-3.5 text-amber-500" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate leading-tight">{les.title}</p>
                          <span
                            className={`text-[10px] block mt-0.5 ${
                              isActive ? 'text-slate-300' : 'text-slate-400'
                            }`}
                          >
                            {les.estimatedMinutes}m {les.hasAssessment ? '· Assessment' : ''}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer info */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/70 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Passing threshold: {course.passingThresholdPercent}%</span>
          {progression?.certificateEligible && (
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-emerald-600 font-bold hover:underline"
            >
              Get Certificate
            </button>
          )}
        </div>
      </aside>

      {/* 2. MAIN LEARNING VIEWPORT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Floating Control Bar */}
        <header className="h-14 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 focus:outline-none"
              title={sidebarOpen ? 'Hide curriculum' : 'Show curriculum'}
            >
              {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {lessonDetail && (
              <div className="truncate">
                <span className="text-xs font-semibold text-slate-900 truncate">
                  {lessonDetail.title}
                </span>
                <span className="text-[11px] text-slate-500 ml-2">
                  ({lessonDetail.estimatedMinutes} mins)
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* View switcher tabs */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setActiveTab('lesson')}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === 'lesson'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Theory</span>
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === 'code'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-blue-600" />
                <span>IDE Sandbox</span>
              </button>

              {lessonDetail?.hasAssessment && (
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                    activeTab === 'quiz'
                      ? 'bg-white text-amber-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>Quiz</span>
                </button>
              )}
            </div>

            {/* Bookmark button */}
            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'border-indigo-200 bg-indigo-50 text-indigo-600'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Bookmark this lesson'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="max-w-4xl mx-auto w-full p-6 sm:p-10 space-y-8 flex-1">
          
          {/* Locked State Warning */}
          {lockedReason ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center space-y-4">
              <Lock className="w-10 h-10 text-amber-500 mx-auto" />
              <h2 className="text-lg font-bold text-amber-900">This Lesson is Locked</h2>
              <p className="text-xs text-amber-800 max-w-md mx-auto">{lockedReason}</p>
              <button
                onClick={onBackToCourse}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Return to Course Syllabus
              </button>
            </div>
          ) : loading ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-500">Loading lesson content...</p>
            </div>
          ) : activeTab === 'lesson' && lessonDetail ? (
            
            /* LESSON STUDY VIEW */
            <div className="space-y-8">
              
              {/* Header */}
              <div className="space-y-2 border-b border-slate-200 pb-6">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Curriculum Unit
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {lessonDetail.title}
                </h1>
                {lessonDetail.summary && (
                  <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                    {lessonDetail.summary}
                  </p>
                )}
              </div>

              {/* Lesson Markdown Content */}
              <article className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4">
                {lessonDetail.contentMarkdown.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={idx} className="text-lg font-bold text-slate-900 mt-6 mb-2">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('#### ')) {
                    return (
                      <h4 key={idx} className="text-base font-semibold text-slate-800 mt-4 mb-2">
                        {paragraph.replace('#### ', '')}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('```')) {
                    const lines = paragraph.split('\n');
                    const lang = lines[0].replace('```', '');
                    const code = lines.slice(1, -1).join('\n');
                    return (
                      <div key={idx} className="my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 font-mono text-xs">
                        {lang && (
                          <div className="px-4 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
                            {lang}
                          </div>
                        )}
                        <pre className="p-4 overflow-x-auto leading-relaxed">
                          <code>{code}</code>
                        </pre>
                      </div>
                    );
                  }
                  if (paragraph.startsWith('* ') || paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n');
                    return (
                      <ul key={idx} className="list-disc list-inside space-y-1.5 text-slate-700 my-2">
                        {items.map((it, i) => (
                          <li key={i}>{it.replace(/^(\* |- )/, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (/^\d+\./.test(paragraph)) {
                    const items = paragraph.split('\n');
                    return (
                      <ol key={idx} className="list-decimal list-inside space-y-1.5 text-slate-700 my-2">
                        {items.map((it, i) => (
                          <li key={i}>{it.replace(/^\d+\.\s*/, '')}</li>
                        ))}
                      </ol>
                    );
                  }
                  return (
                    <p key={idx} className="text-slate-700 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </article>

              {/* Downloadable Reference Resources */}
              {lessonDetail.resources && lessonDetail.resources.length > 0 && (
                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 mt-8">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Download className="w-3.5 h-3.5 text-slate-600" />
                    <span>Downloadable Reference Resources</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {lessonDetail.resources.map((res) => (
                      <div key={res.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <FileCode className="w-4 h-4 text-slate-400" />
                          <span className="font-medium text-slate-900">{res.title}</span>
                          <span className="text-slate-400 uppercase">({res.resourceType})</span>
                        </div>
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                        >
                          View Resource
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Completion Action Bar */}
              <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  {progression?.lessonStates[lessonDetail.id]?.isCompleted ? (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Lesson Marked as Completed</span>
                    </span>
                  ) : (
                    <span>Ready to confirm understanding?</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {lessonDetail.hasAssessment && (
                    <button
                      onClick={() => setActiveTab('quiz')}
                      className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                    >
                      Open Module Quiz
                    </button>
                  )}

                  <button
                    onClick={handleCompleteLesson}
                    disabled={completing}
                    className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
                  >
                    <span>{completing ? 'Evaluating...' : 'Mark as Complete & Continue'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ) : activeTab === 'code' && lessonDetail ? (

            /* INTERACTIVE IN-BROWSER IDE / SANDBOX VIEW */
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  <span>In-Browser Interactive Coding Tool</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Algorithmic Lab: {lessonDetail.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Execute algorithmic implementations, write unit test assertions, and verify runtime invariants in an isolated execution sandbox.
                </p>
              </div>

              <CodePlayground
                initialLanguage="python"
                title={`Algorithm Lab · ${lessonDetail.title}`}
                onCodeExecuted={() => {
                  loadCourse();
                }}
              />

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <span className="text-blue-900">
                  Practiced this code? Return to the lesson theory or advance to the module quiz.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('lesson')}
                    className="px-3 py-1.5 rounded-lg bg-white text-slate-800 font-semibold border border-slate-300 hover:bg-slate-50"
                  >
                    View Theory
                  </button>
                  {lessonDetail.hasAssessment && (
                    <button
                      onClick={() => setActiveTab('quiz')}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                    >
                      Start Quiz
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : activeTab === 'quiz' && assessment ? (

            /* ASSESSMENT / QUIZ RUNNER VIEW */
            <div className="space-y-8">
              
              {/* Quiz Header */}
              <div className="space-y-2 border-b border-slate-200 pb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Module Mastery Assessment</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {assessment.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  {assessment.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-500 pt-2 font-medium">
                  <span>Passing threshold: <strong className="text-slate-900">{assessment.passingScorePercent}%</strong></span>
                  <span>·</span>
                  <span>Max attempts: 3</span>
                  <span>·</span>
                  <span>Server-graded evaluation</span>
                </div>
              </div>

              {/* Assessment Results Banner if already submitted */}
              {assessmentResult && (
                <div
                  className={`p-6 rounded-xl border space-y-3 ${
                    assessmentResult.isPassed
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {assessmentResult.isPassed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                      )}
                      <h3 className="text-base font-bold">
                        {assessmentResult.isPassed
                          ? 'Assessment Passed Successfully!'
                          : 'Passing Score Not Met'}
                      </h3>
                    </div>
                    <div className="text-base font-extrabold tabular-nums">
                      Score: {assessmentResult.scorePercent}%
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed">
                    {assessmentResult.isPassed
                      ? 'Congratulations! You have satisfied the mastery criteria for this module. Subsequent curriculum stages are now unlocked.'
                      : `You scored ${assessmentResult.scorePercent}%, but ${assessmentResult.passingThreshold}% is required. Missed concepts have been automatically scheduled in your Adaptive Revision Queue.`}
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    {!assessmentResult.isPassed ? (
                      <button
                        onClick={() => {
                          setAssessmentResult(null);
                          setAnswers({});
                        }}
                        className="px-4 py-2 bg-amber-900 text-white rounded-lg text-xs font-semibold hover:bg-amber-800 flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Retry Assessment</span>
                      </button>
                    ) : (
                      <button
                        onClick={findAndNavigateNextLesson}
                        className="px-4 py-2 bg-emerald-900 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 flex items-center gap-1.5"
                      >
                        <span>Continue to Next Lesson</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-6">
                {(assessment.questions || []).map((q, qIndex) => {
                  const feedbackItem = assessmentResult?.feedback.find((f) => f.questionId === q.id);

                  return (
                    <div
                      key={q.id}
                      className="bg-white p-6 rounded-xl border border-slate-200 space-y-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Question {qIndex + 1} ({q.points} Points)
                          </span>
                          <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                            {q.prompt}
                          </h4>
                        </div>
                        {feedbackItem && (
                          <div
                            className={`px-2.5 py-1 rounded text-xs font-bold shrink-0 ${
                              feedbackItem.isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {feedbackItem.isCorrect ? 'Correct (+10)' : 'Missed (0)'}
                          </div>
                        )}
                      </div>

                      {/* Options rendering */}
                      {q.questionType === 'short_answer' ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={answers[q.id] || ''}
                            onChange={(e) =>
                              !assessmentResult &&
                              setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                            }
                            disabled={assessmentResult !== null}
                            placeholder="Type concise answer keyword..."
                            className="w-full sm:w-80 px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-slate-400 font-mono"
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {q.options.map((opt) => {
                            const isSelected =
                              q.questionType === 'multiple_choice'
                                ? Array.isArray(answers[q.id]) && answers[q.id].includes(opt.id)
                                : answers[q.id] === opt.id;

                            const isCorrectOpt = feedbackItem?.correctOptionIds?.includes(opt.id);

                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() =>
                                  handleSelectOption(
                                    q.id,
                                    opt.id,
                                    q.questionType === 'multiple_choice'
                                  )
                                }
                                disabled={assessmentResult !== null}
                                className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                                  feedbackItem
                                    ? isCorrectOpt
                                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                                      : isSelected
                                      ? 'bg-rose-50 border-rose-300 text-rose-950 line-through'
                                      : 'bg-white border-slate-200 text-slate-500'
                                    : isSelected
                                    ? 'bg-slate-900 border-slate-900 text-white font-medium'
                                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <span>{opt.optionText}</span>
                                {feedbackItem && isCorrectOpt && (
                                  <span className="text-emerald-700 font-bold ml-2">✓ Key</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Pedagogical Explanation Reveal */}
                      {feedbackItem && feedbackItem.explanation && (
                        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                          <span className="font-bold text-slate-900">Concept Explanation:</span>
                          <p className="leading-relaxed">{feedbackItem.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quiz Submit button */}
              {!assessmentResult && (
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleSubmitAssessment}
                    disabled={evaluating}
                    className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors inline-flex items-center gap-2 shadow-sm"
                  >
                    <span>{evaluating ? 'Grading on Server...' : 'Submit Answers for Evaluation'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          ) : null}

        </div>
      </main>

    </div>
  );
};
