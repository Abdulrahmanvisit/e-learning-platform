/**
 * LearnPath Progressive E-Learning Platform - Core Type Definitions
 */

export type UserRole = 'learner' | 'instructor' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  bio?: string;
  learningStreak: number;
  lastActiveDate: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export type CourseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type CourseStatus = 'draft' | 'published' | 'archived';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  categoryId: string;
  categoryName?: string;
  difficulty: CourseDifficulty;
  estimatedHours: number;
  thumbnailUrl: string;
  status: CourseStatus;
  passingThresholdPercent: number; // e.g. 75
  createdBy: string;
  instructorName?: string;
  createdAt: string;
  modulesCount?: number;
  lessonsCount?: number;
}

export interface LearningPath {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Comprehensive';
  thumbnailUrl?: string;
  isPublished: boolean;
  courses: {
    courseId: string;
    sequenceOrder: number;
    course?: Course;
  }[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  sequenceOrder: number;
  lessons?: LessonSummary[];
}

export interface LessonSummary {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  summary?: string;
  estimatedMinutes: number;
  sequenceOrder: number;
  isPublished: boolean;
  hasAssessment: boolean;
  prerequisiteLessonIds?: string[];
}

export interface LessonResource {
  id: string;
  lessonId: string;
  title: string;
  resourceType: 'pdf' | 'code' | 'link' | 'archive';
  url: string;
  fileSizeKb?: number;
}

export interface LessonDetail extends LessonSummary {
  contentMarkdown: string;
  videoUrl?: string;
  resources: LessonResource[];
  assessmentId?: string;
}

export type QuestionType = 'single_choice' | 'multiple_choice' | 'true_false' | 'short_answer';

export interface AssessmentOption {
  id: string;
  questionId: string;
  optionText: string;
  sequenceOrder: number;
  isCorrect?: boolean; // Hidden from learners before submission
}

export interface AssessmentQuestion {
  id: string;
  assessmentId: string;
  topicId?: string;
  topicName?: string;
  prompt: string;
  questionType: QuestionType;
  explanation: string;
  points: number;
  sequenceOrder: number;
  options: AssessmentOption[];
}

export interface Assessment {
  id: string;
  courseId: string;
  moduleId?: string;
  lessonId?: string;
  title: string;
  description?: string;
  passingScorePercent: number;
  maxAttempts: number | null;
  retryDelayMinutes: number;
  timeLimitMinutes: number | null;
  isRequiredForModule: boolean;
  questions?: AssessmentQuestion[];
}

export interface Enrolment {
  id: string;
  userId: string;
  courseId: string;
  status: 'active' | 'completed' | 'dropped';
  currentLessonId?: string;
  completedAt?: string;
  createdAt: string;
  progressPercent: number;
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  courseId: string;
  status: 'started' | 'completed';
  startedAt: string;
  completedAt?: string;
  timeSpentSeconds: number;
}

export interface AssessmentAttempt {
  id: string;
  userId: string;
  assessmentId: string;
  attemptNumber: number;
  scorePercent: number;
  isPassed: boolean;
  startedAt: string;
  completedAt: string;
  feedback: {
    questionId: string;
    isCorrect: boolean;
    earnedPoints: number;
    explanation: string;
    correctOptionIds?: string[];
  }[];
}

export interface TopicMastery {
  topicId: string;
  topicName: string;
  masteryScore: number; // 0-100
  evidenceCount: number;
  lastEvaluatedAt: string;
}

export interface RevisionQueueItem {
  id: string;
  userId: string;
  topicId: string;
  topicName: string;
  recommendedLessonId: string;
  recommendedLessonTitle: string;
  courseId: string;
  courseTitle: string;
  reason: string;
  dueDate: string;
  isCompleted: boolean;
  completedAt?: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  lessonId: string;
  lessonTitle: string;
  courseId: string;
  courseTitle: string;
  note?: string;
  createdAt: string;
}

export interface Certificate {
  id: string;
  verificationCode: string;
  userId: string;
  recipientName: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  finalScorePercent: number;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface ProgressionStatus {
  courseId: string;
  courseTitle: string;
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
  outstandingLessonsCount: number;
  lastCompletedLessonId?: string;
  lastCompletedLessonTitle?: string;
  lastCompletedAt?: string;
  nextOutstandingLessonId?: string;
  nextOutstandingLessonTitle?: string;
  isCourseUnlocked: boolean;
  coursePrerequisitesMet: boolean;
  missingCoursePrerequisites: string[];
  isCourseCompleted: boolean;
  certificateEligible: boolean;
  certificateCode?: string;
  lessonStates: Record<
    string,
    {
      isUnlocked: boolean;
      isCompleted: boolean;
      completedAt?: string;
      title?: string;
      unmetPrerequisiteTitles: string[];
      hasPassedAssessment: boolean;
    }
  >;
  moduleStates: Record<
    string,
    {
      isCompleted: boolean;
      completedLessons: number;
      totalLessons: number;
    }
  >;
}

export interface LearnerProgressRecord {
  userId: string;
  fullName: string;
  email: string;
  courseId: string;
  courseTitle: string;
  completedLessons: number;
  totalLessons: number;
  outstandingLessonsCount: number;
  progressPercent: number;
  lastCompletedLessonTitle?: string;
  lastCompletedAt?: string;
  status: 'active' | 'completed' | 'dropped';
}

export interface CommunityMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  channelId: string; // 'general', 'ai-deep-learning', 'software-systems', 'data-science', 'ml-engineering'
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  likesCount: number;
  likedBy: string[];
  createdAt: string;
}

export interface ParticipantCohortMember {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  specializationTrack: string;
  institutionOrOrg: string;
  stateOfOrigin?: string;
  innovationProjectTitle?: string;
  innovationProjectPitch?: string;
  skillsTags?: string[];
  statusBadge?: string;
  learningStreak: number;
  completedCoursesCount: number;
  enrolledCoursesCount: number;
  isOnline: boolean;
  bio?: string;
}

export interface DirectChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  createdAt: string;
  read: boolean;
}

export interface InnovationProject {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorInstitution: string;
  title: string;
  track: string;
  abstract: string;
  techStack: string[];
  likesCount: number;
  likedBy: string[];
  status: 'Prototype' | 'Field Validated' | 'In Incubation';
  createdAt: string;
}

export interface CodingExercise {
  id: string;
  lessonId: string;
  title: string;
  language: 'python' | 'javascript' | 'typescript' | 'sql';
  starterCode: string;
  instructions: string;
  solutionCode?: string;
  testCases: {
    inputDescription: string;
    expectedOutput: string;
  }[];
}


