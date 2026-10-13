/**
 * LearnPath Learning Paths Page
 * Multi-course sequential trajectories for comprehensive career mastery
 */
import React from 'react';
import { LearningPath, Course } from '../types/index.ts';
import { ArrowRight, GitMerge, Clock, CheckCircle2 } from 'lucide-react';

interface LearningPathsPageProps {
  paths: LearningPath[];
  onSelectCourse: (courseId: string) => void;
}

export const LearningPathsPage: React.FC<LearningPathsPageProps> = ({ paths, onSelectCourse }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Structured Career Roadmaps
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Progressive Learning Paths
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          Follow an ordered sequence of interconnected courses designed to take you from foundational syntax to distributed production systems.
        </p>
      </div>

      {/* Paths list */}
      <div className="space-y-8">
        {paths.map((path) => (
          <div
            key={path.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs space-y-6 p-6 sm:p-8"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
                <GitMerge className="w-4 h-4" />
                <span>{path.level} Curriculum Trajectory</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{path.title}</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                {path.description}
              </p>
            </div>

            {/* Sequential Courses Timeline */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Sequential Course Trajectory
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {path.courses.map((item, idx) => {
                  const course = item.course;
                  return (
                    <div
                      key={item.courseId}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-400">
                            Stage 0{idx + 1}
                          </span>
                          <span className="text-[11px] text-slate-500 tabular-nums">
                            {course?.estimatedHours || 12}h
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                          {course ? course.title : `Course ${item.courseId}`}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2">
                          {course?.description}
                        </p>
                      </div>

                      <button
                        onClick={() => onSelectCourse(item.courseId)}
                        className="text-xs font-semibold text-slate-900 hover:text-indigo-600 inline-flex items-center gap-1.5 pt-2 border-t border-slate-200/60"
                      >
                        <span>View Curriculum</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
