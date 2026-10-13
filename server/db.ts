/**
 * LearnPath Server Database Layer
 * Persistent transactional JSON store with memory caching and atomic disk backups.
 */
import fs from 'fs';
import path from 'path';
import {
  UserProfile,
  Category,
  Course,
  Module,
  LessonDetail,
  Assessment,
  AssessmentAttempt,
  Enrolment,
  LessonProgress,
  Bookmark,
  RevisionQueueItem,
  Certificate,
  AuditLog,
  LearningPath,
  TopicMastery,
  LearnerProgressRecord,
  CommunityMessage,
  ParticipantCohortMember,
  DirectChatMessage,
  InnovationProject
} from '../src/types/index.ts';
import {
  SEED_PROFILES,
  SEED_CATEGORIES,
  SEED_COURSES,
  SEED_COURSE_PREREQUISITES,
  SEED_MODULES,
  SEED_LESSONS,
  SEED_ASSESSMENTS,
  SEED_LEARNING_PATHS,
  SEED_TOPIC_MASTERIES,
  SEED_COMMUNITY_MESSAGES,
  SEED_COHORT_MEMBERS,
  SEED_DIRECT_MESSAGES,
  SEED_INNOVATION_PROJECTS
} from './seed-data.ts';
import { computeUserCourseProgression } from './progression.ts';

interface DataStoreSchema {
  profiles: UserProfile[];
  categories: Category[];
  courses: Course[];
  coursePrerequisites: Record<string, string[]>;
  modules: Module[];
  lessons: LessonDetail[];
  assessments: Assessment[];
  learningPaths: LearningPath[];
  enrolments: Enrolment[];
  lessonProgress: LessonProgress[];
  assessmentAttempts: AssessmentAttempt[];
  bookmarks: Bookmark[];
  revisionQueue: RevisionQueueItem[];
  certificates: Certificate[];
  auditLogs: AuditLog[];
  topicMasteries: Record<string, TopicMastery[]>;
  communityMessages: CommunityMessage[];
  cohortMembers: ParticipantCohortMember[];
  directMessages: DirectChatMessage[];
  innovationProjects: InnovationProject[];
}

const DATA_DIR = path.resolve(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'learnpath-store.json');

class Database {
  private data: DataStoreSchema;

  constructor() {
    this.data = this.initializeStore();
  }

  private initializeStore(): DataStoreSchema {
    if (fs.existsSync(DATA_FILE)) {
      try {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        return parsed;
      } catch (err) {
        console.warn('Failed to parse persistent store file. Initializing with seed data.', err);
      }
    }

    // Default Seed Initialization
    const initialEnrolments: Enrolment[] = [
      {
        id: 'enr-alex-c1',
        userId: 'usr-learner-01',
        courseId: 'course-1-fullstack',
        status: 'active',
        currentLessonId: 'les-101-2',
        createdAt: '2026-09-12T10:00:00Z',
        progressPercent: 25,
      },
    ];

    const initialLessonProgress: LessonProgress[] = [
      {
        id: 'prog-alex-les-101-1',
        userId: 'usr-learner-01',
        lessonId: 'les-101-1',
        courseId: 'course-1-fullstack',
        status: 'completed',
        startedAt: '2026-09-12T10:05:00Z',
        completedAt: '2026-09-12T10:28:00Z',
        timeSpentSeconds: 1380,
      },
    ];

    const initialRevisionQueue: RevisionQueueItem[] = [
      {
        id: 'rev-01',
        userId: 'usr-learner-01',
        topicId: 'top-db',
        topicName: 'Database Normalization & ACID Transactions',
        recommendedLessonId: 'les-102-1',
        recommendedLessonTitle: '03. Database Normalization (3NF) & ACID Guarantees',
        courseId: 'course-1-fullstack',
        courseTitle: 'Modern Full-Stack TypeScript & Systems Architecture',
        reason: 'Mastery score below threshold (40%). Review non-transitive dependency rules.',
        dueDate: new Date().toISOString().split('T')[0],
        isCompleted: false,
      },
    ];

    const initialBookmarks: Bookmark[] = [
      {
        id: 'bm-01',
        userId: 'usr-learner-01',
        lessonId: 'les-101-1',
        lessonTitle: '01. Client-Server Protocols & REST Invariants',
        courseId: 'course-1-fullstack',
        courseTitle: 'Modern Full-Stack TypeScript & Systems Architecture',
        note: 'Refer to RFC 9110 Idempotent Method specifications table for API review.',
        createdAt: '2026-09-12T10:30:00Z',
      },
    ];

    const initialLogs: AuditLog[] = [
      {
        id: 'log-01',
        actorId: 'usr-admin-01',
        actorName: 'Elena Rostova',
        action: 'COURSE_PUBLISHED',
        entityType: 'course',
        entityId: 'course-1-fullstack',
        metadata: { title: 'Modern Full-Stack TypeScript & Systems Architecture' },
        createdAt: '2026-09-10T10:00:00Z',
      },
    ];

    const store: DataStoreSchema = {
      profiles: [...SEED_PROFILES],
      categories: [...SEED_CATEGORIES],
      courses: [...SEED_COURSES],
      coursePrerequisites: { ...SEED_COURSE_PREREQUISITES },
      modules: [...SEED_MODULES],
      lessons: [...SEED_LESSONS],
      assessments: [...SEED_ASSESSMENTS],
      learningPaths: [...SEED_LEARNING_PATHS],
      enrolments: [], // Progress does NOT start automatically until student starts/enrolls
      lessonProgress: [],
      assessmentAttempts: [],
      bookmarks: initialBookmarks,
      revisionQueue: initialRevisionQueue,
      certificates: [],
      auditLogs: initialLogs,
      topicMasteries: { ...SEED_TOPIC_MASTERIES },
      communityMessages: [...SEED_COMMUNITY_MESSAGES],
      cohortMembers: [...SEED_COHORT_MEMBERS],
      directMessages: [...SEED_DIRECT_MESSAGES],
      innovationProjects: [...SEED_INNOVATION_PROJECTS],
    };

    this.saveToDisk(store);
    return store;
  }

  private saveToDisk(store: DataStoreSchema) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const tmpFile = `${DATA_FILE}.tmp`;
      fs.writeFileSync(tmpFile, JSON.stringify(store, null, 2), 'utf-8');
      fs.renameSync(tmpFile, DATA_FILE);
    } catch (err) {
      console.error('Failed to persist LearnPath store to disk:', err);
    }
  }

  // --- PROFILES & AUTH ---
  getProfiles(): UserProfile[] {
    return this.data.profiles;
  }

  getProfileById(id: string): UserProfile | undefined {
    return this.data.profiles.find((p) => p.id === id);
  }

  getProfileByEmail(email: string): UserProfile | undefined {
    return this.data.profiles.find((p) => p.email.toLowerCase() === email.toLowerCase());
  }

  createProfile(profile: UserProfile): UserProfile {
    this.data.profiles.push(profile);
    this.saveToDisk(this.data);
    return profile;
  }

  updateProfileRole(id: string, role: UserProfile['role']): UserProfile | undefined {
    const p = this.data.profiles.find((x) => x.id === id);
    if (p) {
      p.role = role;
      this.saveToDisk(this.data);
    }
    return p;
  }

  // --- COURSES & PATHS ---
  getCourses(filters?: { status?: string; categoryId?: string; search?: string }): Course[] {
    return this.data.courses.filter((c) => {
      if (filters?.status && c.status !== filters.status) return false;
      if (filters?.categoryId && c.categoryId !== filters.categoryId) return false;
      if (filters?.search) {
        const q = filters.search.toLowerCase();
        return c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
      }
      return true;
    });
  }

  getCourseById(id: string): Course | undefined {
    return this.data.courses.find((c) => c.id === id);
  }

  createCourse(course: Course): Course {
    this.data.courses.push(course);
    this.saveToDisk(this.data);
    return course;
  }

  updateCourse(id: string, updates: Partial<Course>): Course | undefined {
    const c = this.data.courses.find((x) => x.id === id);
    if (c) {
      Object.assign(c, updates);
      this.saveToDisk(this.data);
    }
    return c;
  }

  getCoursePrerequisites(courseId: string): string[] {
    return this.data.coursePrerequisites[courseId] || [];
  }

  setCoursePrerequisites(courseId: string, prerequisites: string[]) {
    this.data.coursePrerequisites[courseId] = prerequisites;
    this.saveToDisk(this.data);
  }

  getLearningPaths(): LearningPath[] {
    return this.data.learningPaths.map((lp) => ({
      ...lp,
      courses: lp.courses.map((c) => ({
        ...c,
        course: this.getCourseById(c.courseId),
      })),
    }));
  }

  getLearningPathById(id: string): LearningPath | undefined {
    const lp = this.data.learningPaths.find((p) => p.id === id);
    if (!lp) return undefined;
    return {
      ...lp,
      courses: lp.courses.map((c) => ({
        ...c,
        course: this.getCourseById(c.courseId),
      })),
    };
  }

  // --- MODULES & LESSONS ---
  getModulesByCourse(courseId: string): Module[] {
    return this.data.modules
      .filter((m) => m.courseId === courseId)
      .sort((a, b) => a.sequenceOrder - b.sequenceOrder);
  }

  createModule(module: Module): Module {
    this.data.modules.push(module);
    this.saveToDisk(this.data);
    return module;
  }

  getLessonsByCourse(courseId: string): LessonDetail[] {
    return this.data.lessons
      .filter((l) => l.courseId === courseId)
      .sort((a, b) => a.sequenceOrder - b.sequenceOrder);
  }

  getLessonById(lessonId: string): LessonDetail | undefined {
    return this.data.lessons.find((l) => l.id === lessonId);
  }

  createLesson(lesson: LessonDetail): LessonDetail {
    this.data.lessons.push(lesson);
    this.saveToDisk(this.data);
    return lesson;
  }

  updateLesson(id: string, updates: Partial<LessonDetail>): LessonDetail | undefined {
    const les = this.data.lessons.find((x) => x.id === id);
    if (les) {
      Object.assign(les, updates);
      this.saveToDisk(this.data);
    }
    return les;
  }

  // --- ASSESSMENTS ---
  getAssessmentsByCourse(courseId: string): Assessment[] {
    return this.data.assessments.filter((a) => a.courseId === courseId);
  }

  getAssessmentById(id: string): Assessment | undefined {
    return this.data.assessments.find((a) => a.id === id);
  }

  createAssessment(assessment: Assessment): Assessment {
    this.data.assessments.push(assessment);
    this.saveToDisk(this.data);
    return assessment;
  }

  // --- PROGRESSION & ENROLMENT ---
  getUserEnrolments(userId: string): Enrolment[] {
    return this.data.enrolments.filter((e) => e.userId === userId);
  }

  getEnrolment(userId: string, courseId: string): Enrolment | undefined {
    return this.data.enrolments.find((e) => e.userId === userId && e.courseId === courseId);
  }

  enrollUser(userId: string, courseId: string): Enrolment {
    const existing = this.getEnrolment(userId, courseId);
    if (existing) return existing;

    const courseLessons = this.getLessonsByCourse(courseId);
    const firstLessonId = courseLessons[0]?.id;

    const enr: Enrolment = {
      id: `enr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      userId,
      courseId,
      status: 'active',
      currentLessonId: firstLessonId,
      createdAt: new Date().toISOString(),
      progressPercent: 0,
    };
    this.data.enrolments.push(enr);
    this.saveToDisk(this.data);
    return enr;
  }

  getUserCompletedCourseIds(userId: string): Set<string> {
    const completedCourses = this.data.enrolments
      .filter((e) => e.userId === userId && e.status === 'completed')
      .map((e) => e.courseId);
    return new Set(completedCourses);
  }

  getUserCompletedLessonIds(userId: string, courseId?: string): Set<string> {
    const completed = this.data.lessonProgress
      .filter((p) => p.userId === userId && p.status === 'completed' && (!courseId || p.courseId === courseId))
      .map((p) => p.lessonId);
    return new Set(completed);
  }

  getUserPassedAssessmentIds(userId: string): Set<string> {
    const passed = this.data.assessmentAttempts
      .filter((a) => a.userId === userId && a.isPassed)
      .map((a) => a.assessmentId);
    return new Set(passed);
  }

  getCourseProgression(userId: string, courseId: string) {
    const course = this.getCourseById(courseId);
    if (!course) return null;

    const coursePrereqs = this.getCoursePrerequisites(courseId);
    const userCompletedCourses = this.getUserCompletedCourseIds(userId);
    const modules = this.getModulesByCourse(courseId);
    const lessons = this.getLessonsByCourse(courseId);
    const assessments = this.getAssessmentsByCourse(courseId);
    const userCompletedLessons = this.getUserCompletedLessonIds(userId, courseId);
    const userPassedAssessments = this.getUserPassedAssessmentIds(userId);

    const cert = this.data.certificates.find((c) => c.userId === userId && c.courseId === courseId);

    const status = computeUserCourseProgression({
      userId,
      course,
      coursePrerequisites: coursePrereqs,
      userCompletedCourseIds: userCompletedCourses,
      modules,
      lessons,
      assessments,
      userCompletedLessonIds: userCompletedLessons,
      userPassedAssessmentIds: userPassedAssessments,
      certificateCode: cert?.verificationCode,
    });

    // Update enrolment progress percentage
    const enrolment = this.getEnrolment(userId, courseId);
    if (enrolment) {
      enrolment.progressPercent = status.progressPercent;
      if (status.isCourseCompleted && enrolment.status !== 'completed') {
        enrolment.status = 'completed';
        enrolment.completedAt = new Date().toISOString();
      }
      this.saveToDisk(this.data);
    }

    return status;
  }

  markLessonComplete(userId: string, lessonId: string, timeSpentSeconds = 60) {
    const lesson = this.getLessonById(lessonId);
    if (!lesson) throw new Error('Lesson not found');

    // Ensure enrolment exists
    this.enrollUser(userId, lesson.courseId);

    let progress = this.data.lessonProgress.find((p) => p.userId === userId && p.lessonId === lessonId);
    if (!progress) {
      progress = {
        id: `prog-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        userId,
        lessonId,
        courseId: lesson.courseId,
        status: 'completed',
        startedAt: new Date(Date.now() - timeSpentSeconds * 1000).toISOString(),
        completedAt: new Date().toISOString(),
        timeSpentSeconds,
      };
      this.data.lessonProgress.push(progress);
    } else {
      progress.status = 'completed';
      progress.completedAt = new Date().toISOString();
      progress.timeSpentSeconds += timeSpentSeconds;
    }

    // Update user learning streak dynamically
    this.touchUserActivity(userId);

    this.saveToDisk(this.data);
    return this.getCourseProgression(userId, lesson.courseId);
  }

  resetCourseProgress(userId: string, courseId: string) {
    const course = this.getCourseById(courseId);
    if (!course) throw new Error('Course not found');

    const courseLessons = this.getLessonsByCourse(courseId);
    const lessonIds = new Set(courseLessons.map((l) => l.id));
    const assessments = this.getAssessmentsByCourse(courseId);
    const assessmentIds = new Set(assessments.map((a) => a.id));

    // Reset lesson progress for this course
    this.data.lessonProgress = this.data.lessonProgress.filter(
      (p) => !(p.userId === userId && lessonIds.has(p.lessonId))
    );

    // Reset assessment attempts for this course
    this.data.assessmentAttempts = this.data.assessmentAttempts.filter(
      (a) => !(a.userId === userId && assessmentIds.has(a.assessmentId))
    );

    // Reset certificate for this course if issued
    this.data.certificates = this.data.certificates.filter(
      (c) => !(c.userId === userId && c.courseId === courseId)
    );

    // Reset enrolment record
    const enrolment = this.getEnrolment(userId, courseId);
    if (enrolment) {
      enrolment.progressPercent = 0;
      enrolment.status = 'active';
      enrolment.completedAt = undefined;
      enrolment.currentLessonId = courseLessons[0]?.id;
    }

    this.saveToDisk(this.data);
    return this.getCourseProgression(userId, courseId);
  }

  recordAssessmentAttempt(attempt: AssessmentAttempt) {
    this.data.assessmentAttempts.push(attempt);
    this.saveToDisk(this.data);
    return attempt;
  }

  // --- REVISION QUEUE & TOPIC MASTERY ---
  getRevisionQueue(userId: string): RevisionQueueItem[] {
    return this.data.revisionQueue.filter((r) => r.userId === userId && !r.isCompleted);
  }

  addRevisionItem(item: RevisionQueueItem) {
    // Avoid duplicate open items for same topic
    const existing = this.data.revisionQueue.find(
      (r) => r.userId === item.userId && r.topicId === item.topicId && !r.isCompleted
    );
    if (!existing) {
      this.data.revisionQueue.push(item);
      this.saveToDisk(this.data);
    }
  }

  completeRevisionItem(userId: string, itemId: string) {
    const item = this.data.revisionQueue.find((r) => r.id === itemId && r.userId === userId);
    if (item) {
      item.isCompleted = true;
      item.completedAt = new Date().toISOString();
      this.saveToDisk(this.data);
    }
    return item;
  }

  getTopicMasteries(userId: string): TopicMastery[] {
    return this.data.topicMasteries[userId] || [];
  }

  updateTopicMastery(userId: string, topicId: string, topicName: string, passed: boolean) {
    if (!this.data.topicMasteries[userId]) {
      this.data.topicMasteries[userId] = [];
    }
    const list = this.data.topicMasteries[userId];
    let tm = list.find((x) => x.topicId === topicId);
    if (!tm) {
      tm = {
        topicId,
        topicName,
        masteryScore: passed ? 80 : 30,
        evidenceCount: 1,
        lastEvaluatedAt: new Date().toISOString(),
      };
      list.push(tm);
    } else {
      tm.evidenceCount += 1;
      tm.masteryScore = passed
        ? Math.min(100, tm.masteryScore + 15)
        : Math.max(0, tm.masteryScore - 20);
      tm.lastEvaluatedAt = new Date().toISOString();
    }
    this.saveToDisk(this.data);
  }

  // --- BOOKMARKS ---
  getBookmarks(userId: string): Bookmark[] {
    return this.data.bookmarks.filter((b) => b.userId === userId);
  }

  toggleBookmark(userId: string, lessonId: string, note?: string): { bookmarked: boolean } {
    const lesson = this.getLessonById(lessonId);
    if (!lesson) throw new Error('Lesson not found');
    const course = this.getCourseById(lesson.courseId);

    const index = this.data.bookmarks.findIndex((b) => b.userId === userId && b.lessonId === lessonId);
    if (index >= 0) {
      this.data.bookmarks.splice(index, 1);
      this.saveToDisk(this.data);
      return { bookmarked: false };
    } else {
      this.data.bookmarks.push({
        id: `bm-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        userId,
        lessonId,
        lessonTitle: lesson.title,
        courseId: lesson.courseId,
        courseTitle: course ? course.title : 'Course',
        note,
        createdAt: new Date().toISOString(),
      });
      this.saveToDisk(this.data);
      return { bookmarked: true };
    }
  }

  // --- CERTIFICATES ---
  getCertificates(userId?: string): Certificate[] {
    if (userId) {
      return this.data.certificates.filter((c) => c.userId === userId);
    }
    return this.data.certificates;
  }

  getCertificateByCode(code: string): Certificate | undefined {
    return this.data.certificates.find((c) => c.verificationCode === code);
  }

  issueCertificate(userId: string, courseId: string, finalScore: number): Certificate {
    const user = this.getProfileById(userId);
    const course = this.getCourseById(courseId);
    if (!user || !course) throw new Error('Invalid user or course for certificate');

    const existing = this.data.certificates.find((c) => c.userId === userId && c.courseId === courseId);
    if (existing) return existing;

    const code = `LP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const cert: Certificate = {
      id: `cert-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      verificationCode: code,
      userId,
      recipientName: user.fullName,
      courseId,
      courseTitle: course.title,
      issuedAt: new Date().toISOString(),
      finalScorePercent: Math.max(75, Math.min(100, Math.round(finalScore))),
    };

    this.data.certificates.push(cert);
    this.addAuditLog({
      id: `log-${Date.now()}`,
      actorId: userId,
      actorName: user.fullName,
      action: 'CERTIFICATE_ISSUED',
      entityType: 'certificate',
      entityId: cert.id,
      metadata: { code, courseTitle: course.title },
      createdAt: new Date().toISOString(),
    });

    this.saveToDisk(this.data);
    return cert;
  }

  // --- AUDIT LOGS ---
  getAuditLogs(): AuditLog[] {
    return [...this.data.auditLogs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  addAuditLog(log: AuditLog) {
    this.data.auditLogs.push(log);
    this.saveToDisk(this.data);
  }

  // Learner Progress Tracking Ledger for Instructors & Admins
  getLearnerProgressLedger(): LearnerProgressRecord[] {
    const records: LearnerProgressRecord[] = [];
    for (const enr of this.data.enrolments) {
      const user = this.getProfileById(enr.userId);
      const course = this.getCourseById(enr.courseId);
      if (!user || !course) continue;
      const progression = this.getCourseProgression(user.id, course.id);
      records.push({
        userId: user.id,
        fullName: user.fullName,
        email: user.email,
        courseId: course.id,
        courseTitle: course.title,
        completedLessons: progression?.completedLessons || 0,
        totalLessons: progression?.totalLessons || 0,
        outstandingLessonsCount: progression?.outstandingLessonsCount || 0,
        progressPercent: progression?.progressPercent || 0,
        lastCompletedLessonTitle: progression?.lastCompletedLessonTitle,
        lastCompletedAt: enr.completedAt || progression?.lastCompletedAt,
        status: enr.status,
      });
    }
    return records;
  }

  // Dynamic Learning Streak Calculation
  touchUserActivity(userId: string, forceIncrement = false): { learningStreak: number; lastActiveDate: string } {
    const user = this.getProfileById(userId);
    const today = new Date().toISOString().split('T')[0];
    if (!user) return { learningStreak: 1, lastActiveDate: today };

    if (forceIncrement) {
      user.learningStreak = (user.learningStreak || 1) + 1;
      user.lastActiveDate = today;
      this.saveToDisk(this.data);
      return { learningStreak: user.learningStreak, lastActiveDate: user.lastActiveDate };
    }

    if (user.lastActiveDate === today) {
      return { learningStreak: user.learningStreak || 1, lastActiveDate: user.lastActiveDate };
    }

    if (user.lastActiveDate) {
      const lastDate = new Date(user.lastActiveDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        user.learningStreak = (user.learningStreak || 0) + 1;
      } else if (diffDays > 1) {
        user.learningStreak = 1;
      }
    } else {
      user.learningStreak = 1;
    }

    user.lastActiveDate = today;
    this.saveToDisk(this.data);
    return { learningStreak: user.learningStreak, lastActiveDate: user.lastActiveDate };
  }

  // Community Cohort Discussions & Direct Messaging
  getCommunityMessages(channelId?: string): CommunityMessage[] {
    let msgs = this.data.communityMessages || [];
    if (channelId && channelId !== 'all') {
      msgs = msgs.filter((m) => m.channelId === channelId);
    }
    return msgs.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  addCommunityMessage(message: CommunityMessage): CommunityMessage {
    if (!this.data.communityMessages) {
      this.data.communityMessages = [];
    }
    this.data.communityMessages.push(message);
    this.touchUserActivity(message.senderId);
    this.saveToDisk(this.data);
    return message;
  }

  toggleLikeMessage(messageId: string, userId: string): CommunityMessage | null {
    if (!this.data.communityMessages) return null;
    const msg = this.data.communityMessages.find((m) => m.id === messageId);
    if (!msg) return null;

    if (!msg.likedBy) msg.likedBy = [];
    const idx = msg.likedBy.indexOf(userId);
    if (idx >= 0) {
      msg.likedBy.splice(idx, 1);
      msg.likesCount = Math.max(0, msg.likesCount - 1);
    } else {
      msg.likedBy.push(userId);
      msg.likesCount = (msg.likesCount || 0) + 1;
    }
    this.saveToDisk(this.data);
    return msg;
  }

  getCohortMembers(): ParticipantCohortMember[] {
    return this.data.cohortMembers || [];
  }

  // Peer Direct Messaging (YSI Participant Portal Feature)
  getDirectMessages(user1: string, user2: string): DirectChatMessage[] {
    const msgs = this.data.directMessages || [];
    return msgs
      .filter(
        (m) =>
          (m.senderId === user1 && m.receiverId === user2) ||
          (m.senderId === user2 && m.receiverId === user1)
      )
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  addDirectMessage(msg: DirectChatMessage): DirectChatMessage {
    if (!this.data.directMessages) {
      this.data.directMessages = [];
    }
    this.data.directMessages.push(msg);
    this.touchUserActivity(msg.senderId);
    this.saveToDisk(this.data);
    return msg;
  }

  // Cohort Innovation Projects Showcase
  getInnovationProjects(): InnovationProject[] {
    return this.data.innovationProjects || [];
  }

  toggleLikeInnovationProject(projectId: string, userId: string): InnovationProject | null {
    if (!this.data.innovationProjects) return null;
    const project = this.data.innovationProjects.find((p) => p.id === projectId);
    if (!project) return null;

    if (!project.likedBy) project.likedBy = [];
    const idx = project.likedBy.indexOf(userId);
    if (idx >= 0) {
      project.likedBy.splice(idx, 1);
      project.likesCount = Math.max(0, project.likesCount - 1);
    } else {
      project.likedBy.push(userId);
      project.likesCount = (project.likesCount || 0) + 1;
    }
    this.saveToDisk(this.data);
    return project;
  }

  // Platform Analytics for Dashboards
  getPlatformAnalytics() {
    const totalLearners = this.data.profiles.filter((p) => p.role === 'learner').length;
    const totalInstructors = this.data.profiles.filter((p) => p.role === 'instructor').length;
    const totalCourses = this.data.courses.length;
    const totalEnrolments = this.data.enrolments.length;
    const completedCourses = this.data.enrolments.filter((e) => e.status === 'completed').length;
    const completionRatePercent = totalEnrolments > 0 ? Math.round((completedCourses / totalEnrolments) * 100) : 0;
    const totalAttempts = this.data.assessmentAttempts.length;
    const passedAttempts = this.data.assessmentAttempts.filter((a) => a.isPassed).length;
    const assessmentPassRate = totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0;

    return {
      totalLearners,
      totalInstructors,
      totalCourses,
      totalEnrolments,
      completedCourses,
      completionRatePercent,
      totalAttempts,
      assessmentPassRate,
      certificatesIssued: this.data.certificates.length,
    };
  }
}

export const db = new Database();
