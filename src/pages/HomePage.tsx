/**
 * LearnPath Home Page
 * World-class progressive e-learning platform inspired by premier educational systems (Coursera, edX, Brilliant).
 * Purely learner-centric: structured curricula, prerequisite learning paths, and verifiable progress tracking.
 */
import React from 'react';
import { Course, LearningPath, ProgressionStatus } from '../types/index.ts';
import { CourseCard } from '../components/CourseCard.tsx';
import {
  ArrowRight,
  ShieldCheck,
  GitBranch,
  Repeat,
  Award,
  CheckCircle2,
  ChevronRight,
  Layers,
  Cpu,
  TrendingUp,
  BookOpen,
  Code,
  Compass,
  Sparkles,
  PlayCircle
} from 'lucide-react';

interface HomePageProps {
  courses: Course[];
  paths: LearningPath[];
  progressions: Record<string, ProgressionStatus>;
  onNavigate: (view: string, param?: string) => void;
}

const PEDAGOGICAL_PILLARS = [
  {
    icon: GitBranch,
    title: 'Prerequisite Dependency DAG',
    desc: 'Advanced modules unlock strictly upon proving comprehension of foundational concepts. Directed Acyclic Graph traversal prevents deadlocks and enforces mastery.',
    badge: 'Graph Theory',
  },
  {
    icon: Layers,
    title: 'Discrete Progress Formula',
    desc: 'Progress is calculated from empirical database records: Progress = (Completed Lessons ÷ Total Lessons) × 100%, updated server-side.',
    badge: 'Empirical Metrics',
  },
  {
    icon: TrendingUp,
    title: 'Cognitive Resumption Pointer',
    desc: 'Tracks your precise outstanding lesson node across sessions so you resume learning with a single click, eliminating course abandonment.',
    badge: 'Cognitive Science',
  },
  {
    icon: ShieldCheck,
    title: 'Server-Authoritative Evaluations',
    desc: 'Assessments and quiz milestones are securely graded server-side with strict anti-bypass validation protecting credential integrity.',
    badge: 'Assessment Integrity',
  },
  {
    icon: Repeat,
    title: 'Adaptive Spaced Revision Queue',
    desc: 'Missed assessment questions dynamically populate your personalized revision queue, scheduling timely review lessons.',
    badge: 'Spaced Repetition',
  },
  {
    icon: Award,
    title: 'Verifiable Credentials of Mastery',
    desc: 'Earn tamper-proof completion certificates issued with unique verification codes and public registry lookup.',
    badge: 'Credential Registry',
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  courses,
  paths,
  progressions,
  onNavigate,
}) => {
  return (
    <div className="space-y-24 pb-20 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Pill/Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-50 text-blue-800 border border-blue-200/90 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Progressive Learning Progress Tracking System</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17365D] tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Learn at Your Pace. Track Every Step.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Access structured courses, complete lessons at your own pace, and track your progressive learning achievements from one intelligent, mathematical dashboard.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onNavigate('catalogue')}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all inline-flex items-center gap-2 whitespace-nowrap shadow-sm hover:shadow"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('paths')}
                className="px-5 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs font-bold hover:bg-slate-50 transition-colors inline-flex items-center gap-2 whitespace-nowrap shadow-xs"
              >
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Learning Paths</span>
              </button>

              <button
                onClick={() => onNavigate('pretest')}
                className="px-5 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs font-bold hover:bg-slate-50 transition-colors whitespace-nowrap shadow-xs inline-flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-slate-500" />
                <span>Diagnostic Placement</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-4 grid grid-cols-3 gap-6 border-t border-slate-200 text-slate-700">
              <div>
                <div className="text-xl sm:text-2xl font-black text-[#17365D] tabular-nums">100%</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Discrete Progress Metrics</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-[#17365D] tabular-nums">DAG</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Prerequisite Mastery Gates</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-[#17365D] tabular-nums">0%</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Lost Resumption Position</div>
              </div>
            </div>

          </div>

          {/* Right Visual: Interactive System Architecture Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="bg-[#17365D] text-white p-5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-blue-200">
                    Active Student Pathway
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Synchronized
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">Full-Stack & Cloud Systems Architecture</h3>
                <p className="text-xs text-blue-100">Step-by-step progressive lesson trajectory</p>
              </div>

              <div className="p-5 space-y-4">
                {/* Visual Step Nodes */}
                <div className="space-y-3 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                  <div className="relative flex items-start gap-3 pl-1">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10">
                      ✓
                    </div>
                    <div className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
                      <div className="font-bold text-slate-900">Module 1: Foundations & Architecture</div>
                      <div className="text-[11px] text-emerald-700 font-medium mt-0.5">Completed (100%) · Quiz Passed 90%</div>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-3 pl-1">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10 animate-pulse">
                      2
                    </div>
                    <div className="flex-1 bg-blue-50/70 p-2.5 rounded-xl border border-blue-200 text-xs">
                      <div className="font-bold text-blue-900">Module 2: Client-Server Protocol Invariants</div>
                      <div className="text-[11px] text-blue-700 font-semibold mt-0.5">Active Resumption Node (Lesson 3 of 4)</div>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-3 pl-1">
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0 z-10">
                      🔒
                    </div>
                    <div className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs opacity-70">
                      <div className="font-bold text-slate-700">Module 3: Distributed Concurrency & Storage</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Locked · Requires Module 2 Mastery</div>
                    </div>
                  </div>
                </div>

                {/* Progress bar preview */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex justify-between items-center text-xs text-slate-600 font-medium mb-1">
                    <span>Overall Course Progress</span>
                    <span className="font-bold text-[#17365D]">60% Complete</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: '60%' }} />
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Open Student Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. PEDAGOGICAL PILLARS SECTION */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Core Engineering Philosophy
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#17365D] tracking-tight">
              Built Specifically for Structured, Progressive Mastery
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Conventional online courses suffer from over 85% abandonment due to unstructured access and vague progress estimates. LearnPath replaces guesswork with discrete, mathematically verified progression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PEDAGOGICAL_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#17365D]">{pillar.title}</h3>
                    
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. FEATURED CURRICULA & COURSES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Structured Curriculum
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#17365D]">
              Explore Available Courses
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Each course features verified lesson nodes, hands-on architectural code modules, and milestone mastery assessments.
            </p>
          </div>

          <button
            onClick={() => onNavigate('catalogue')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1.5 shrink-0"
          >
            <span>View All Curricula</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                progression={progressions[course.id]}
                onSelect={(id) => onNavigate('course', id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-500">Curricula are being loaded...</p>
          </div>
        )}

      </section>

      {/* 4. LEARNING PATHS TRAJECTORY PREVIEW */}
      {paths.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-1.5">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Career Roadmaps
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#17365D]">
              Prerequisite Learning Paths
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Multi-course trajectories linked by strict prerequisite dependency graphs. Complete foundational requirements to unlock advanced specializations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paths.map((path) => (
              <div
                key={path.id}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors shadow-2xs space-y-5"
              >
                <div className="space-y-2">
                  <div className="text-xs font-bold text-blue-600">
                    {path.level} Trajectory · {path.courses.length} Progressive Courses
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{path.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {path.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Sequential Course Chain
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {path.courses.map((pc, i) => (
                      <React.Fragment key={pc.courseId}>
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-medium">
                          {pc.course?.title || `Step ${pc.sequenceOrder}`}
                        </span>
                        {i < path.courses.length - 1 && (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('paths')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                  >
                    <span>Inspect Learning Path</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. DIAGNOSTIC PLACEMENT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#17365D] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-200 border border-blue-400/30 rounded-full text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Diagnostic Technical Placement</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Not sure which module to start with?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Take our 5-minute technical diagnostic screening. The system assesses your algorithmic and architectural baseline to recommend the ideal entry point in the curriculum.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('pretest')}
              className="px-6 py-3.5 bg-white text-[#17365D] hover:bg-blue-50 rounded-xl text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Start Diagnostic Placement</span>
            </button>
            <button
              onClick={() => onNavigate('catalogue')}
              className="px-6 py-3.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all"
            >
              <span>Browse Full Catalogue</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
