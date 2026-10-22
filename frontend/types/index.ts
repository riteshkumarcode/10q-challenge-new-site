export type CourseCategory =
  | 'CRASH_COURSE'
  | 'TEST_SERIES'
  | 'MENTORSHIP'
  | 'FULL_COURSE';

export type ContentType = 'VIDEO' | 'DOCUMENT' | 'TEST_PAPER';

export interface CourseDocument {
  id: number;
  chapterId?: number;
  title: string;
  pdfUrl: string;
  fileSizeBytes?: string;
  pageCount?: number;
  description?: string;
}

export interface ChapterTestPaper {
  id: number;
  chapterId?: number;
  testPaperId?: number;
  title: string;
  durationMinutes: number;
  totalQuestions: number;
  totalMarks?: number;
  examTag?: string;
  questions?: Question[];
}

export interface Lesson {
  id: number;
  chapterId?: number;
  title: string;
  type?: ContentType;
  // Video attributes
  vimeoVideoId?: string;
  durationMinutes?: number;
  durationSeconds?: number;
  isFreePreview?: boolean;
  // Document attributes
  pdfNotesUrl?: string;
  fileSizeBytes?: string;
  pageCount?: number;
  // Test Paper attributes
  testPaperId?: number;
  totalQuestions?: number;
  totalMarks?: number;
}

export interface Chapter {
  id: number;
  subjectId?: number;
  subjectName?: string;
  title: string;
  name?: string;
  sequenceOrder?: number;
  lessons: Lesson[];
  videos?: Lesson[];
  documents?: CourseDocument[];
  testPapers?: ChapterTestPaper[];
}

export interface CourseSubject {
  id: number;
  name: string;
  code?: string;
  icon?: string;
  chapters: Chapter[];
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  description?: string;
  fullDescriptionHtml?: string;
  discountPrice: number;
  originalPrice: number;
  price?: number;
  examTag: string;
  category: CourseCategory | string;
  rating: number;
  reviewCount: number;
  enrolledCount: number;
  thumbnailUrl: string;
  bannerUrl?: string;
  isBestseller?: boolean;
  isFeatured?: boolean;
  features: string[];
  subjects?: CourseSubject[];
  chapters?: Chapter[];
  documents?: CourseDocument[];
  testPapers?: TestPaper[];
}

export interface QuestionOption {
  key: string;
  text: string;
}

export interface Question {
  id: number;
  subject: string;
  chapter?: string;
  type: 'MCQ' | 'NUMERICAL' | string;
  questionText: string;
  options: QuestionOption[];
  correctOption?: string;
  marksPositive: number;
  marksNegative: number;
  explanation?: string;
}

export interface TestPaper {
  id: number;
  title: string;
  examTag?: string;
  durationMinutes: number;
  totalMarks: number;
  totalQuestions?: number;
  questions?: Question[];
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  category: string;
  summary: string;
  contentHtml: string;
  featuredImage?: string;
  authorName: string;
  authorRole?: string;
  readTimeMinutes: number;
  publishedAt: string;
  isPublished: boolean;
  tags: string[];
}

export interface Testimonial {
  id: number;
  studentName: string;
  college?: string;
  exam?: string;
  score?: string;
  rating: number;
  content: string;
  avatarUrl?: string;
}

export interface Faculty {
  id: number;
  name: string;
  qualification: string;
  specialization: string;
  experienceYears: number;
  studentsMentored: number;
  avatarUrl: string;
}

export interface Doubt {
  id: number;
  studentId: number | string;
  studentName: string;
  courseId: number;
  courseTitle: string;
  lessonId?: number;
  lessonTitle?: string;
  queryText: string;
  timestampMinutes?: string;
  screenshotUrl?: string;
  status: 'PENDING' | 'RESOLVED' | string;
  facultyName?: string;
  solutionText?: string;
  createdAt: string;
  solvedAt?: string;
}

export interface OrderItem {
  courseId: number;
  courseTitle: string;
  price: number;
}

export interface Order {
  id: number | string;
  orderNumber: string;
  studentId?: number | string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  items: OrderItem[];
  subtotalAmount: number;
  discountAmount: number;
  totalAmount: number;
  couponCode?: string;
  paymentGateway: string;
  gatewayTxnId?: string;
  paymentStatus: string;
  createdAt: string;
}

export interface User {
  id: number | string;
  fullName: string;
  email: string;
  mobileNumber?: string;
  role: 'STUDENT' | 'ADMIN' | 'FACULTY' | string;
  targetExam?: string;
  avatarUrl?: string;
}

export interface Coupon {
  id: number;
  code: string;
  discountType: 'PERCENTAGE' | 'FLAT' | string;
  discountValue: number;
  minOrderAmount: number;
  description?: string;
  isActive: boolean;
}

export interface Exam {
  id: number;
  name: string;
  fullName: string;
  slug: string;
  description: string;
  totalMarks?: number;
  durationMinutes?: number;
}

// ============================================================================
// CONTENT MASTER MODELS & COURSE ASSIGNMENTS
// ============================================================================

export type ContentPublicationStatus = 'Draft' | 'Published' | 'Archived';

export interface VideoMasterItem {
  id: number;
  title: string;
  vimeoVideoId: string;
  videoUrl?: string;
  subject: string;
  chapter: string;
  description?: string;
  thumbnailUrl?: string;
  durationMinutes: number;
  isFreePreview?: boolean;
  status: ContentPublicationStatus;
  displayOrder?: number;
  createdAt?: string;
}

export interface DocumentMasterItem {
  id: number;
  title: string;
  subject: string;
  chapter: string;
  fileType: 'PDF' | 'DOC' | 'DOCX';
  fileUrl: string;
  fileSizeBytes?: string;
  pageCount?: number;
  description?: string;
  status: ContentPublicationStatus;
  displayOrder?: number;
  createdAt?: string;
}

export interface TestSeriesMasterItem {
  id: number;
  title: string;
  examTag: string;
  targetYear: number;
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  testPaperId?: number;
  status: ContentPublicationStatus;
  price?: number;
  createdAt?: string;
}

export interface LiveSessionMasterItem {
  id: number;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  timeZone: string;
  meetingUrl: string;
  subject?: string;
  chapter?: string;
  facultyName: string;
  status: 'Scheduled' | 'Live' | 'Completed' | 'Cancelled';
  createdAt?: string;
}

export interface CourseContentAssignment {
  courseId: number;
  assignedVideoIds: number[];
  assignedDocumentIds: number[];
  assignedTestSeriesIds: number[];
  assignedLiveSessionIds: number[];
  updatedAt: string;
}

