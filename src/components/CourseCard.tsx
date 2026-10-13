/**
 * LearnPath Course Card Component
 * Strictly enforces Zero-Pill discipline: unboxed metadata with '·' separators
 */
import React from 'react';
import { Course, ProgressionStatus } from '../types/index.ts';
import { Clock, BookOpen, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  progression?: ProgressionStatus | null;
  onSelect: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, progression, onSelect }) => {
  const isCompleted = progression?.isCourseCompleted;
  const isEnrolled = progression !== undefined && progression !== null;
  const progressPercent = progression?.progressPercent ?? 0;
  const isLocked = progression?.isCourseUnlocked === false;

  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-sm transition-all flex flex-col h-full">
      {/* Thumbnail with styled fallback */}
      <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
        {course.thumbnailUrl ? (
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 opacity-90"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 text-slate-300 text-sm">
            <BookOpen className="w-8 h-8 text-slate-600 mb-2" />
          </div>
        )}

        {/* Lock Overlay if course has unmet course prerequisites */}
        {isLocked && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex items-center justify-center p-4 text-center">
            <div className="text-white space-y-1">
              <Lock className="w-6 h-6 mx-auto text-amber-400" />
              <p className="text-xs font-semibold">Prerequisites Required</p>
              <p className="text-[11px] text-slate-300">Complete prerequisite courses first</p>
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Zero-Pill Unboxed Metadata with · separator */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>{course.categoryName || 'Engineering'}</span>
            <span aria-hidden="true">·</span>
            <span>{course.difficulty}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{course.estimatedHours} Hours</span>
          </div>

          <h3 className="text-base font-semibold text-slate-900 mt-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {course.title}
          </h3>

          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Footer info & Progress */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          {isEnrolled && (
            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Progress</span>
                <span className="font-semibold tabular-nums text-slate-900">
                  {isCompleted ? '100% Completed' : `${progressPercent}%`}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Instructor: <span className="font-medium text-slate-700">{course.instructorName || 'Academic Faculty'}</span>
            </div>

            <button
              onClick={() => onSelect(course.id)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
            >
              <span>{isEnrolled ? (isCompleted ? 'Review' : 'Continue') : 'View Course'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
