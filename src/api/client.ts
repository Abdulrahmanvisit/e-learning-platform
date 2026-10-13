/**
 * LearnPath API Client
 * Typed fetch requests with auth headers and error handling
 */
import {
  UserProfile,
  Course,
  LearningPath,
  LessonDetail,
  Assessment,
  ProgressionStatus,
  RevisionQueueItem,
  Bookmark,
  Certificate,
  AuditLog,
  CommunityMessage,
  ParticipantCohortMember
} from '../types/index.ts';

class ApiClient {
  private activeUserId: string = 'usr-learner-01';

  setActiveUserId(id: string) {
    this.activeUserId = id;
    localStorage.setItem('learnpath_active_user_id', id);
  }

  getActiveUserId(): string {
    const saved = localStorage.getItem('learnpath_active_user_id');
    return saved || this.activeUserId;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = new Headers(options.headers || {});
    headers.set('Content-Type', 'application/json');
    headers.set('x-user-id', this.getActiveUserId());

    const response = await fetch(endpoint, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.reason || errorMessage;
      } catch {
        // fallback
      }
      throw new Error(errorMessage);
    }

    return response.json();
  }

  // --- AUTH ---
  async getMe(): Promise<{ user: UserProfile; availableAccounts: UserProfile[] }> {
    return this.request('/api/auth/me');
  }

  async switchAccount(userId: string): Promise<{ success: boolean; user: UserProfile }> {
    this.setActiveUserId(userId);
    return this.request('/api/auth/switch-account', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  async login(email: string): Promise<{ success: boolean; user: UserProfile; token: string }> {
    const res = await this.request<{ success: boolean; user: UserProfile; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    if (res.user) {
      this.setActiveUserId(res.user.id);
    }
    return res;
  }

  async register(data: { email: string; fullName: string; role?: string }): Promise<{ success: boolean; user: UserProfile }> {
    const res = await this.request<{ success: boolean; user: UserProfile }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res.user) {
      this.setActiveUserId(res.user.id);
    }
    return res;
  }

  // --- COURSES & PATHS ---
  async getCourses(filters?: { status?: string; categoryId?: string; search?: string }): Promise<{ courses: Course[] }> {
    const params = new URLSearchParams();
    if (filters?.status) params.set('status', filters.status);
    if (filters?.categoryId) params.set('categoryId', filters.categoryId);
    if (filters?.search) params.set('search', filters.search);
    return this.request(`/api/courses?${params.toString()}`);
  }

  async getCourse(id: string): Promise<{
    course: Course;
    prerequisites: Course[];
    modules: any[];
    progression: ProgressionStatus | null;
  }> {
    return this.request(`/api/courses/${id}`);
  }

  async createCourse(data: any): Promise<{ success: boolean; course: Course }> {
    return this.request('/api/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCourse(id: string, data: any): Promise<{ success: boolean; course: Course }> {
    return this.request(`/api/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async toggleCoursePublish(id: string): Promise<{ success: boolean; course: Course }> {
    return this.request(`/api/courses/${id}/publish`, {
      method: 'POST',
    });
  }

  async getPaths(): Promise<{ paths: LearningPath[] }> {
    return this.request('/api/paths');
  }

  async getPath(id: string): Promise<{ path: LearningPath }> {
    return this.request(`/api/paths/${id}`);
  }

  // --- PROGRESSION & LESSONS ---
  async enroll(courseId: string): Promise<{ success: boolean; progression: ProgressionStatus }> {
    return this.request(`/api/courses/${courseId}/enroll`, {
      method: 'POST',
    });
  }

  async resetCourse(courseId: string): Promise<{ success: boolean; progression: ProgressionStatus }> {
    return this.request(`/api/courses/${courseId}/reset`, {
      method: 'POST',
    });
  }

  async getCourseProgression(courseId: string): Promise<{ progression: ProgressionStatus }> {
    return this.request(`/api/courses/${courseId}/progression`);
  }

  async getLesson(id: string): Promise<{ lesson: LessonDetail; isBookmarked: boolean }> {
    return this.request(`/api/lessons/${id}`);
  }

  async completeLesson(id: string, timeSpentSeconds: number): Promise<{ success: boolean; progression: ProgressionStatus }> {
    return this.request(`/api/lessons/${id}/complete`, {
      method: 'POST',
      body: JSON.stringify({ timeSpentSeconds }),
    });
  }

  async toggleBookmark(lessonId: string, note?: string): Promise<{ success: boolean; bookmarked: boolean }> {
    return this.request(`/api/lessons/${lessonId}/bookmark`, {
      method: 'POST',
      body: JSON.stringify({ note }),
    });
  }

  // --- ASSESSMENTS ---
  async getAssessment(id: string): Promise<{ assessment: Assessment }> {
    return this.request(`/api/assessments/${id}`);
  }

  async submitAssessment(
    id: string,
    answers: Record<string, string | string[]>
  ): Promise<{
    success: boolean;
    scorePercent: number;
    isPassed: boolean;
    passingThreshold: number;
    attempt: any;
    progression: ProgressionStatus;
  }> {
    return this.request(`/api/assessments/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  }

  // --- REVISION QUEUE & DASHBOARD ---
  async getRevisionQueue(): Promise<{ queue: RevisionQueueItem[]; masteries: any[] }> {
    return this.request('/api/revision');
  }

  async completeRevisionItem(id: string): Promise<{ success: boolean; item: RevisionQueueItem }> {
    return this.request(`/api/revision/${id}/complete`, {
      method: 'POST',
    });
  }

  async getBookmarks(): Promise<{ bookmarks: Bookmark[] }> {
    return this.request('/api/bookmarks');
  }

  async getDashboardStats(): Promise<any> {
    return this.request('/api/dashboard/stats');
  }

  // --- CERTIFICATES ---
  async claimCertificate(courseId: string): Promise<{ success: boolean; certificate: Certificate }> {
    return this.request(`/api/courses/${courseId}/certificate`, {
      method: 'POST',
    });
  }

  async verifyCertificate(code: string): Promise<{ valid: boolean; certificate: Certificate }> {
    return this.request(`/api/certificates/${code}`);
  }

  // --- COHORT COMMUNITY & DISCUSSION ---
  async getCommunityMessages(channelId?: string): Promise<{ messages: CommunityMessage[] }> {
    const q = channelId ? `?channelId=${channelId}` : '';
    return this.request(`/api/community/messages${q}`);
  }

  async postCommunityMessage(
    channelId: string,
    content: string,
    codeSnippet?: { language: string; code: string }
  ): Promise<{ success: boolean; message: CommunityMessage }> {
    return this.request('/api/community/messages', {
      method: 'POST',
      body: JSON.stringify({ channelId, content, codeSnippet }),
    });
  }

  async likeCommunityMessage(messageId: string): Promise<{ success: boolean; message: CommunityMessage }> {
    return this.request(`/api/community/messages/${messageId}/like`, {
      method: 'POST',
    });
  }

  async getCohortMembers(): Promise<{ members: ParticipantCohortMember[] }> {
    return this.request('/api/community/members');
  }

  async touchActivity(): Promise<{ success: boolean; learningStreak: number; lastActiveDate: string }> {
    return this.request('/api/user/touch-activity', {
      method: 'POST',
    });
  }

  // --- PEER DIRECT MESSAGING (YSI PARTICIPANT PORTAL INTEGRATION) ---
  async getDirectMessages(otherUserId: string): Promise<{ messages: any[] }> {
    return this.request(`/api/community/direct-messages/${otherUserId}`);
  }

  async sendDirectMessage(
    receiverId: string,
    content: string,
    codeSnippet?: { language: string; code: string }
  ): Promise<{ success: boolean; message: any }> {
    return this.request('/api/community/direct-messages', {
      method: 'POST',
      body: JSON.stringify({ receiverId, content, codeSnippet }),
    });
  }

  // --- COHORT INNOVATION SHOWCASE ---
  async getInnovationProjects(): Promise<{ projects: any[] }> {
    return this.request('/api/community/projects');
  }

  async likeInnovationProject(projectId: string): Promise<{ success: boolean; project: any }> {
    return this.request(`/api/community/projects/${projectId}/like`, {
      method: 'POST',
    });
  }

  // --- IN-BROWSER CODE EXECUTION SANDBOX ---
  async executeCode(
    code: string,
    language: string = 'python',
    testCases?: { inputDescription: string; expectedOutput: string }[]
  ): Promise<{
    success: boolean;
    stdout: string;
    stderr: string;
    exitCode: number;
    executionTimeMs: number;
    memoryKb: number;
    testResults?: { description: string; passed: boolean; output: string }[];
  }> {
    return this.request('/api/code/execute', {
      method: 'POST',
      body: JSON.stringify({ code, language, testCases }),
    });
  }
}

export const api = new ApiClient();
