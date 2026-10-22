import {
  Course,
  Blog,
  Exam,
  Question,
  TestPaper,
  Doubt,
  Order,
  User,
  Coupon,
  VideoMasterItem,
  DocumentMasterItem,
  TestSeriesMasterItem,
  LiveSessionMasterItem,
  CourseContentAssignment,
} from '@/types';
import {
  MOCK_COURSES,
  MOCK_BLOGS,
  MOCK_EXAMS,
  MOCK_QUESTIONS,
  MOCK_TEST_PAPERS,
  MOCK_DOUBTS,
  MOCK_ORDERS,
  MOCK_COUPONS,
} from './data';
import {
  INITIAL_VIDEO_MASTER,
  INITIAL_DOCUMENT_MASTER,
  INITIAL_TEST_SERIES_MASTER,
  INITIAL_LIVE_SESSIONS_MASTER,
  INITIAL_COURSE_ASSIGNMENTS,
} from './assignmentData';

const STORAGE_KEYS = {
  COURSES: '10q_courses_data',
  BLOGS: '10q_blogs_data',
  DOUBTS: '10q_doubts_data',
  ORDERS: '10q_orders_data',
  QUESTIONS: '10q_questions_data',
  TESTS: '10q_tests_data',
  VIDEOS: '10q_video_master_data',
  DOCUMENTS: '10q_document_master_data',
  TEST_SERIES: '10q_test_series_master_data',
  LIVE_SESSIONS: '10q_live_sessions_master_data',
  ASSIGNMENTS: '10q_course_assignments_data',
};

function getFromStorage<T>(key: string, initialData: T): T {
  if (typeof window === 'undefined') return initialData;
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
    const parsed = JSON.parse(item);
    if (Array.isArray(initialData) && Array.isArray(parsed) && parsed.length < initialData.length) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
    return parsed;
  } catch (e) {
    return initialData;
  }
}

function setToStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Storage write error:', e);
  }
}

export const api = {
  // COURSES
  async getCourses(): Promise<Course[]> {
    return getFromStorage<Course[]>(STORAGE_KEYS.COURSES, MOCK_COURSES);
  },

  async getCourseById(id: number): Promise<Course | null> {
    const courses = await this.getCourses();
    return courses.find((c) => c.id === id) || null;
  },

  async getCourseBySlug(slug: string): Promise<Course | null> {
    const courses = await this.getCourses();
    return courses.find((c) => c.slug.toLowerCase() === slug.toLowerCase()) || null;
  },

  async createCourse(course: Course): Promise<Course> {
    const courses = await this.getCourses();
    const updated = [course, ...courses];
    setToStorage(STORAGE_KEYS.COURSES, updated);
    return course;
  },

  async updateCourse(updatedCourse: Course): Promise<Course> {
    const courses = await this.getCourses();
    const index = courses.findIndex((c) => c.id === updatedCourse.id);
    let updated: Course[];
    if (index !== -1) {
      updated = [...courses];
      updated[index] = updatedCourse;
    } else {
      updated = [updatedCourse, ...courses];
    }
    setToStorage(STORAGE_KEYS.COURSES, updated);
    return updatedCourse;
  },

  // EXAMS
  async getExams(): Promise<Exam[]> {
    return MOCK_EXAMS;
  },

  // BLOGS
  async getBlogs(): Promise<Blog[]> {
    return getFromStorage<Blog[]>(STORAGE_KEYS.BLOGS, MOCK_BLOGS);
  },

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    const blogs = await this.getBlogs();
    return blogs.find((b) => b.slug.toLowerCase() === slug.toLowerCase()) || null;
  },

  async createBlog(blog: Blog): Promise<Blog> {
    const blogs = await this.getBlogs();
    const updated = [blog, ...blogs];
    setToStorage(STORAGE_KEYS.BLOGS, updated);
    return blog;
  },

  // QUESTIONS
  async getQuestions(): Promise<Question[]> {
    return getFromStorage<Question[]>(STORAGE_KEYS.QUESTIONS, MOCK_QUESTIONS);
  },

  // TEST PAPERS
  async getTestPapers(): Promise<TestPaper[]> {
    return getFromStorage<TestPaper[]>(STORAGE_KEYS.TESTS, MOCK_TEST_PAPERS);
  },

  async getTestPaperById(id: number): Promise<TestPaper | null> {
    const tests = await this.getTestPapers();
    return tests.find((t) => t.id === id) || null;
  },

  // DOUBTS
  async getDoubts(studentId?: number | string): Promise<Doubt[]> {
    const doubts = getFromStorage<Doubt[]>(STORAGE_KEYS.DOUBTS, MOCK_DOUBTS);
    if (studentId) {
      return doubts.filter((d) => String(d.studentId) === String(studentId));
    }
    return doubts;
  },

  async createDoubt(payload: {
    studentId: number | string;
    studentName: string;
    courseId: number;
    courseTitle: string;
    lessonId?: number;
    lessonTitle?: string;
    queryText: string;
    timestampMinutes?: string;
    screenshotUrl?: string;
  }): Promise<Doubt> {
    const doubts = await this.getDoubts();
    const newDoubt: Doubt = {
      id: Date.now(),
      studentId: payload.studentId,
      studentName: payload.studentName,
      courseId: payload.courseId,
      courseTitle: payload.courseTitle,
      lessonId: payload.lessonId,
      lessonTitle: payload.lessonTitle,
      queryText: payload.queryText,
      timestampMinutes: payload.timestampMinutes,
      screenshotUrl: payload.screenshotUrl,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    const updated = [newDoubt, ...doubts];
    setToStorage(STORAGE_KEYS.DOUBTS, updated);
    return newDoubt;
  },

  async resolveDoubt(
    doubtId: number,
    solutionText: string,
    facultyName: string
  ): Promise<Doubt> {
    const doubts = await this.getDoubts();
    let updatedDoubt: Doubt | null = null;

    const updated = doubts.map((d) => {
      if (d.id === doubtId) {
        updatedDoubt = {
          ...d,
          solutionText,
          facultyName,
          status: 'RESOLVED',
          solvedAt: new Date().toISOString(),
        };
        return updatedDoubt;
      }
      return d;
    });

    setToStorage(STORAGE_KEYS.DOUBTS, updated);
    return updatedDoubt || doubts[0];
  },

  // ORDERS
  async getOrders(studentId?: number | string): Promise<Order[]> {
    const orders = getFromStorage<Order[]>(STORAGE_KEYS.ORDERS, MOCK_ORDERS);
    if (studentId) {
      return orders.filter((o) => String(o.studentId) === String(studentId));
    }
    return orders;
  },

  async createOrder(payload: {
    studentId: number | string;
    studentName: string;
    studentEmail: string;
    studentPhone?: string;
    items: { courseId: number; courseTitle: string; price: number }[];
    subtotalAmount: number;
    discountAmount: number;
    totalAmount: number;
    couponCode?: string;
    paymentGateway: string;
    gatewayTxnId?: string;
  }): Promise<Order> {
    const orders = await this.getOrders();
    const newOrder: Order = {
      id: Date.now(),
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
      studentId: payload.studentId,
      studentName: payload.studentName,
      studentEmail: payload.studentEmail,
      studentPhone: payload.studentPhone,
      items: payload.items,
      subtotalAmount: payload.subtotalAmount,
      discountAmount: payload.discountAmount,
      totalAmount: payload.totalAmount,
      couponCode: payload.couponCode,
      paymentGateway: payload.paymentGateway || 'PayU',
      gatewayTxnId: payload.gatewayTxnId || `10Q_TXN_${Date.now()}`,
      paymentStatus: 'SUCCESS',
      createdAt: new Date().toISOString(),
    };

    const updated = [newOrder, ...orders];
    setToStorage(STORAGE_KEYS.ORDERS, updated);
    return newOrder;
  },

  // COUPONS
  async getCoupons(): Promise<Coupon[]> {
    return MOCK_COUPONS;
  },

  async validateCoupon(
    code: string,
    subtotal: number
  ): Promise<{ valid: boolean; discount: number; coupon?: Coupon; message?: string }> {
    const coupons = await this.getCoupons();
    const match = coupons.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive
    );

    if (!match) {
      return { valid: false, discount: 0, message: 'Invalid coupon code.' };
    }

    if (subtotal < match.minOrderAmount) {
      return {
        valid: false,
        discount: 0,
        message: `Minimum order amount of ₹${match.minOrderAmount} required for this coupon.`,
      };
    }

    const discount =
      match.discountType === 'PERCENTAGE'
        ? Math.round((subtotal * match.discountValue) / 100)
        : match.discountValue;

    return { valid: true, discount, coupon: match };
  },

  // ==========================================================================
  // VIDEO MASTER (CENTRAL VIMEO REPOSITORY)
  // ==========================================================================
  async getVideos(): Promise<VideoMasterItem[]> {
    return getFromStorage<VideoMasterItem[]>(STORAGE_KEYS.VIDEOS, INITIAL_VIDEO_MASTER);
  },

  async getVideoById(id: number): Promise<VideoMasterItem | null> {
    const videos = await this.getVideos();
    return videos.find((v) => v.id === id) || null;
  },

  async createVideo(video: Omit<VideoMasterItem, 'id'>): Promise<VideoMasterItem> {
    const videos = await this.getVideos();
    const newId = videos.length > 0 ? Math.max(...videos.map((v) => v.id)) + 1 : 1;
    const newVideo: VideoMasterItem = {
      ...video,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    const updated = [newVideo, ...videos];
    setToStorage(STORAGE_KEYS.VIDEOS, updated);
    return newVideo;
  },

  async updateVideo(updatedVideo: VideoMasterItem): Promise<VideoMasterItem> {
    const videos = await this.getVideos();
    const index = videos.findIndex((v) => v.id === updatedVideo.id);
    let updated: VideoMasterItem[];
    if (index !== -1) {
      updated = [...videos];
      updated[index] = updatedVideo;
    } else {
      updated = [updatedVideo, ...videos];
    }
    setToStorage(STORAGE_KEYS.VIDEOS, updated);
    return updatedVideo;
  },

  async deleteVideo(id: number): Promise<boolean> {
    const videos = await this.getVideos();
    const updated = videos.filter((v) => v.id !== id);
    setToStorage(STORAGE_KEYS.VIDEOS, updated);
    return true;
  },

  // ==========================================================================
  // DOCUMENT MASTER (CENTRAL STUDY MATERIALS REPOSITORY)
  // ==========================================================================
  async getDocuments(): Promise<DocumentMasterItem[]> {
    return getFromStorage<DocumentMasterItem[]>(STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENT_MASTER);
  },

  async getDocumentById(id: number): Promise<DocumentMasterItem | null> {
    const docs = await this.getDocuments();
    return docs.find((d) => d.id === id) || null;
  },

  async createDocument(doc: Omit<DocumentMasterItem, 'id'>): Promise<DocumentMasterItem> {
    const docs = await this.getDocuments();
    const newId = docs.length > 0 ? Math.max(...docs.map((d) => d.id)) + 1 : 1;
    const newDoc: DocumentMasterItem = {
      ...doc,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    const updated = [newDoc, ...docs];
    setToStorage(STORAGE_KEYS.DOCUMENTS, updated);
    return newDoc;
  },

  async updateDocument(updatedDoc: DocumentMasterItem): Promise<DocumentMasterItem> {
    const docs = await this.getDocuments();
    const index = docs.findIndex((d) => d.id === updatedDoc.id);
    let updated: DocumentMasterItem[];
    if (index !== -1) {
      updated = [...docs];
      updated[index] = updatedDoc;
    } else {
      updated = [updatedDoc, ...docs];
    }
    setToStorage(STORAGE_KEYS.DOCUMENTS, updated);
    return updatedDoc;
  },

  async deleteDocument(id: number): Promise<boolean> {
    const docs = await this.getDocuments();
    const updated = docs.filter((d) => d.id !== id);
    setToStorage(STORAGE_KEYS.DOCUMENTS, updated);
    return true;
  },

  // ==========================================================================
  // TEST SERIES MASTER (CENTRAL ASSESSMENTS REPOSITORY)
  // ==========================================================================
  async getTestSeries(): Promise<TestSeriesMasterItem[]> {
    return getFromStorage<TestSeriesMasterItem[]>(STORAGE_KEYS.TEST_SERIES, INITIAL_TEST_SERIES_MASTER);
  },

  async getTestSeriesById(id: number): Promise<TestSeriesMasterItem | null> {
    const tests = await this.getTestSeries();
    return tests.find((t) => t.id === id) || null;
  },

  async createTestSeries(test: Omit<TestSeriesMasterItem, 'id'>): Promise<TestSeriesMasterItem> {
    const tests = await this.getTestSeries();
    const newId = tests.length > 0 ? Math.max(...tests.map((t) => t.id)) + 1 : 1;
    const newTest: TestSeriesMasterItem = {
      ...test,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    const updated = [newTest, ...tests];
    setToStorage(STORAGE_KEYS.TEST_SERIES, updated);
    return newTest;
  },

  async updateTestSeries(updatedTest: TestSeriesMasterItem): Promise<TestSeriesMasterItem> {
    const tests = await this.getTestSeries();
    const index = tests.findIndex((t) => t.id === updatedTest.id);
    let updated: TestSeriesMasterItem[];
    if (index !== -1) {
      updated = [...tests];
      updated[index] = updatedTest;
    } else {
      updated = [updatedTest, ...tests];
    }
    setToStorage(STORAGE_KEYS.TEST_SERIES, updated);
    return updatedTest;
  },

  async deleteTestSeries(id: number): Promise<boolean> {
    const tests = await this.getTestSeries();
    const updated = tests.filter((t) => t.id !== id);
    setToStorage(STORAGE_KEYS.TEST_SERIES, updated);
    return true;
  },

  // ==========================================================================
  // LIVE SESSIONS MASTER (CENTRAL LIVE CLASSES REPOSITORY)
  // ==========================================================================
  async getLiveSessions(): Promise<LiveSessionMasterItem[]> {
    return getFromStorage<LiveSessionMasterItem[]>(STORAGE_KEYS.LIVE_SESSIONS, INITIAL_LIVE_SESSIONS_MASTER);
  },

  async getLiveSessionById(id: number): Promise<LiveSessionMasterItem | null> {
    const sessions = await this.getLiveSessions();
    return sessions.find((s) => s.id === id) || null;
  },

  async createLiveSession(session: Omit<LiveSessionMasterItem, 'id'>): Promise<LiveSessionMasterItem> {
    const sessions = await this.getLiveSessions();
    const newId = sessions.length > 0 ? Math.max(...sessions.map((s) => s.id)) + 1 : 1;
    const newSession: LiveSessionMasterItem = {
      ...session,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    const updated = [newSession, ...sessions];
    setToStorage(STORAGE_KEYS.LIVE_SESSIONS, updated);
    return newSession;
  },

  async updateLiveSession(updatedSession: LiveSessionMasterItem): Promise<LiveSessionMasterItem> {
    const sessions = await this.getLiveSessions();
    const index = sessions.findIndex((s) => s.id === updatedSession.id);
    let updated: LiveSessionMasterItem[];
    if (index !== -1) {
      updated = [...sessions];
      updated[index] = updatedSession;
    } else {
      updated = [updatedSession, ...sessions];
    }
    setToStorage(STORAGE_KEYS.LIVE_SESSIONS, updated);
    return updatedSession;
  },

  async deleteLiveSession(id: number): Promise<boolean> {
    const sessions = await this.getLiveSessions();
    const updated = sessions.filter((s) => s.id !== id);
    setToStorage(STORAGE_KEYS.LIVE_SESSIONS, updated);
    return true;
  },

  // ==========================================================================
  // COURSE CONTENT ASSIGNMENT (MANY-TO-MANY RELATIONSHIPS)
  // ==========================================================================
  async getAllAssignments(): Promise<Record<number, CourseContentAssignment>> {
    return getFromStorage<Record<number, CourseContentAssignment>>(
      STORAGE_KEYS.ASSIGNMENTS,
      INITIAL_COURSE_ASSIGNMENTS
    );
  },

  async getCourseAssignments(courseId: number): Promise<CourseContentAssignment> {
    const all = await this.getAllAssignments();
    if (all[courseId]) {
      return all[courseId];
    }
    // Return empty assignment structure if course has no assignments yet
    return {
      courseId,
      assignedVideoIds: [],
      assignedDocumentIds: [],
      assignedTestSeriesIds: [],
      assignedLiveSessionIds: [],
      updatedAt: new Date().toISOString(),
    };
  },

  async saveCourseAssignments(
    courseId: number,
    partial: {
      assignedVideoIds?: number[];
      assignedDocumentIds?: number[];
      assignedTestSeriesIds?: number[];
      assignedLiveSessionIds?: number[];
    }
  ): Promise<CourseContentAssignment> {
    const all = await this.getAllAssignments();
    const existing = all[courseId] || {
      courseId,
      assignedVideoIds: [],
      assignedDocumentIds: [],
      assignedTestSeriesIds: [],
      assignedLiveSessionIds: [],
      updatedAt: new Date().toISOString(),
    };

    const updatedAssignment: CourseContentAssignment = {
      courseId,
      assignedVideoIds:
        partial.assignedVideoIds !== undefined
          ? Array.from(new Set(partial.assignedVideoIds))
          : existing.assignedVideoIds,
      assignedDocumentIds:
        partial.assignedDocumentIds !== undefined
          ? Array.from(new Set(partial.assignedDocumentIds))
          : existing.assignedDocumentIds,
      assignedTestSeriesIds:
        partial.assignedTestSeriesIds !== undefined
          ? Array.from(new Set(partial.assignedTestSeriesIds))
          : existing.assignedTestSeriesIds,
      assignedLiveSessionIds:
        partial.assignedLiveSessionIds !== undefined
          ? Array.from(new Set(partial.assignedLiveSessionIds))
          : existing.assignedLiveSessionIds,
      updatedAt: new Date().toISOString(),
    };

    all[courseId] = updatedAssignment;
    setToStorage(STORAGE_KEYS.ASSIGNMENTS, all);
    return updatedAssignment;
  },

  async removeAssignmentItem(
    courseId: number,
    itemType: 'video' | 'document' | 'testSeries' | 'liveSession',
    itemId: number
  ): Promise<CourseContentAssignment> {
    const current = await this.getCourseAssignments(courseId);
    let patch: Partial<CourseContentAssignment> = {};

    if (itemType === 'video') {
      patch.assignedVideoIds = current.assignedVideoIds.filter((id) => id !== itemId);
    } else if (itemType === 'document') {
      patch.assignedDocumentIds = current.assignedDocumentIds.filter((id) => id !== itemId);
    } else if (itemType === 'testSeries') {
      patch.assignedTestSeriesIds = current.assignedTestSeriesIds.filter((id) => id !== itemId);
    } else if (itemType === 'liveSession') {
      patch.assignedLiveSessionIds = current.assignedLiveSessionIds.filter((id) => id !== itemId);
    }

    return this.saveCourseAssignments(courseId, patch);
  },

  // Helper: Retrieve hydrated assigned content objects for a course
  async getCourseAssignedContent(courseId: number): Promise<{
    videos: VideoMasterItem[];
    documents: DocumentMasterItem[];
    testSeries: TestSeriesMasterItem[];
    liveSessions: LiveSessionMasterItem[];
  }> {
    const assignment = await this.getCourseAssignments(courseId);
    const [allVideos, allDocs, allTests, allSessions] = await Promise.all([
      this.getVideos(),
      this.getDocuments(),
      this.getTestSeries(),
      this.getLiveSessions(),
    ]);

    const videos = allVideos.filter((v) => assignment.assignedVideoIds.includes(v.id));
    const documents = allDocs.filter((d) => assignment.assignedDocumentIds.includes(d.id));
    const testSeries = allTests.filter((t) => assignment.assignedTestSeriesIds.includes(t.id));
    const liveSessions = allSessions.filter((s) => assignment.assignedLiveSessionIds.includes(s.id));

    return { videos, documents, testSeries, liveSessions };
  },

  // Helper: Find which courses an individual master item is currently linked to
  async getCoursesLinkedToItem(
    itemType: 'video' | 'document' | 'testSeries' | 'liveSession',
    itemId: number
  ): Promise<{ id: number; title: string }[]> {
    const [allCourses, allAssignments] = await Promise.all([
      this.getCourses(),
      this.getAllAssignments(),
    ]);

    const linkedCourseIds = Object.keys(allAssignments)
      .map(Number)
      .filter((cid) => {
        const a = allAssignments[cid];
        if (!a) return false;
        if (itemType === 'video') return a.assignedVideoIds.includes(itemId);
        if (itemType === 'document') return a.assignedDocumentIds.includes(itemId);
        if (itemType === 'testSeries') return a.assignedTestSeriesIds.includes(itemId);
        if (itemType === 'liveSession') return a.assignedLiveSessionIds.includes(itemId);
        return false;
      });

    return allCourses
      .filter((c) => linkedCourseIds.includes(c.id))
      .map((c) => ({ id: c.id, title: c.title }));
  },
};

export const apiService = api;
