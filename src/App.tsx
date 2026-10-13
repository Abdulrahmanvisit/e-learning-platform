/**
 * LearnPath Academy - Progressive E-Learning Platform
 * Purely learner-centric architecture with mathematical progress tracking,
 * prerequisite directed acyclic graphs (DAG), and cognitive resumption pointers.
 */
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { ToastProvider } from './context/ToastContext.tsx';
import { api } from './api/client.ts';
import { Course, Category, LearningPath, ProgressionStatus } from './types/index.ts';

// Components
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';

// Pages
import { HomePage } from './pages/HomePage.tsx';
import { CataloguePage } from './pages/CataloguePage.tsx';
import { CourseDetailPage } from './pages/CourseDetailPage.tsx';
import { LearningExperiencePage } from './pages/LearningExperiencePage.tsx';
import { LearningPathsPage } from './pages/LearningPathsPage.tsx';
import { PreTestScreeningPage } from './pages/PreTestScreeningPage.tsx';
import { LearnerDashboard } from './pages/LearnerDashboard.tsx';
import { CohortCommunityPage } from './pages/CohortCommunityPage.tsx';
import { CertificateVerifyPage } from './pages/CertificateVerifyPage.tsx';
import { AboutPage, ContactPage, PrivacyPage, TermsPage } from './pages/StaticPages.tsx';
import { AuthModal } from './pages/AuthModal.tsx';

function AppContent() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string | undefined>(undefined);
  const [learningLessonId, setLearningLessonId] = useState<string | undefined>(undefined);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Global catalogue & data states
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [progressions, setProgressions] = useState<Record<string, ProgressionStatus>>({});

  const loadData = async () => {
    try {
      const [cRes, pRes] = await Promise.all([api.getCourses(), api.getPaths()]);
      setCourses(cRes.courses);
      setPaths(pRes.paths);

      // Load progressions for current student across courses
      if (user) {
        const progMap: Record<string, ProgressionStatus> = {};
        for (const course of cRes.courses) {
          try {
            const p = await api.getCourseProgression(course.id);
            progMap[course.id] = p.progression;
          } catch {
            // not enrolled or error
          }
        }
        setProgressions(progMap);
      }
    } catch (err) {
      console.error('Failed to load initial data', err);
    }
  };

  useEffect(() => {
    loadData();
  }, [user?.id]);

  const handleNavigate = (view: string, param?: string) => {
    setCurrentView(view);
    setViewParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLesson = (courseId: string, lessonId: string) => {
    setViewParam(courseId);
    setLearningLessonId(lessonId);
    setCurrentView('learn');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            courses={courses}
            paths={paths}
            progressions={progressions}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'catalogue' && (
          <CataloguePage
            courses={courses}
            categories={categories}
            progressions={progressions}
            onSelectCourse={(id) => handleNavigate('course', id)}
          />
        )}

        {currentView === 'paths' && (
          <LearningPathsPage
            paths={paths}
            onSelectCourse={(id) => handleNavigate('course', id)}
          />
        )}

        {currentView === 'pretest' && (
          <PreTestScreeningPage onNavigate={handleNavigate} />
        )}

        {currentView === 'course' && viewParam && (
          <CourseDetailPage
            courseId={viewParam}
            onStartLesson={handleStartLesson}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'learn' && viewParam && (
          <LearningExperiencePage
            courseId={viewParam}
            initialLessonId={learningLessonId}
            onBackToCourse={() => handleNavigate('course', viewParam)}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'dashboard' && (
          <LearnerDashboard
            onStartLesson={handleStartLesson}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'community' && (
          <CohortCommunityPage onNavigate={handleNavigate} />
        )}

        {currentView === 'verify' && (
          <CertificateVerifyPage initialCode={viewParam} />
        )}

        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'privacy' && <PrivacyPage />}
        {currentView === 'terms' && <TermsPage />}
      </main>

      {/* Render Footer everywhere except in active full-height learning session */}
      {currentView !== 'learn' && <Footer onNavigate={handleNavigate} />}

      {/* Learner Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
          loadData();
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}
