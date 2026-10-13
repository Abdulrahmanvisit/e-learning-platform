/**
 * LearnPath Course Catalogue Page
 * Search, filter, and discover progressive technical courses
 */
import React, { useState, useMemo } from 'react';
import { Course, Category, ProgressionStatus } from '../types/index.ts';
import { CourseCard } from '../components/CourseCard.tsx';
import { Search, Filter, BookOpen } from 'lucide-react';

interface CataloguePageProps {
  courses: Course[];
  categories: Category[];
  progressions: Record<string, ProgressionStatus>;
  onSelectCourse: (id: string) => void;
}

export const CataloguePage: React.FC<CataloguePageProps> = ({
  courses,
  categories,
  progressions,
  onSelectCourse,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === 'all' || c.categoryId === selectedCategory;
      const matchDifficulty = selectedDifficulty === 'all' || c.difficulty === selectedDifficulty;
      return matchSearch && matchCategory && matchDifficulty;
    });
  }, [courses, search, selectedCategory, selectedDifficulty]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Curriculum Catalogue</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Explore Technical Courses
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Select a course to view prerequisite structures, syllabus modules, and assessment criteria.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, topic, or keyword..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-slate-400 text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Difficulty Dropdown */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-slate-400"
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              progression={progressions[course.id]}
              onSelect={onSelectCourse}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-900">No courses match your filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
