import {
  Course,
  Blog,
  Exam,
  Question,
  TestPaper,
  Doubt,
  Order,
  Coupon,
  Faculty,
  Testimonial,
  CourseSubject,
} from '@/types';

// ============================================================================
// 1. EXAM CATEGORIES (Supported Entrance Exams)
// ============================================================================
export const MOCK_EXAMS: Exam[] = [
  {
    id: 1,
    name: 'BITSAT',
    slug: 'BITSAT',
    fullName: 'Birla Institute of Technology and Science Admission Test',
    conductingBody: 'BITS Pilani (Pilani, Goa & Hyderabad Campuses)',
    examDate: 'May 2026 (Session 1) & June 2026 (Session 2)',
    totalMarks: 390,
    totalQuestions: 130,
    durationMinutes: 180,
    markingScheme: '+3 for Correct, -1 for Incorrect (+12 Bonus Questions)',
    description:
      'BITSAT is a computer-based online test for admission to Integrated First Degree Programmes of BITS Pilani.',
    syllabusHighlights: [
      'Physics (30 Questions - 90 Marks)',
      'Chemistry (30 Questions - 90 Marks)',
      'English Proficiency (10 Questions) & Logical Reasoning (20 Questions)',
      'Mathematics / Biology (40 Questions - 120 Marks)',
      '12 Extra Bonus Questions unlocked after attempting all 130 questions',
    ],
  },
  {
    id: 2,
    name: 'JEE Main',
    slug: 'JEE-Main',
    fullName: 'Joint Entrance Examination (Main)',
    conductingBody: 'National Testing Agency (NTA)',
    examDate: 'January 2026 & April 2026',
    totalMarks: 300,
    totalQuestions: 75,
    durationMinutes: 180,
    markingScheme: '+4 for Correct, -1 for Incorrect',
    description:
      'National level engineering entrance exam for NITs, IIITs, CFTIs, and the qualifying test for JEE Advanced.',
    syllabusHighlights: [
      'Physics: 20 MCQs + 5 Numerical Value Questions',
      'Chemistry: 20 MCQs + 5 Numerical Value Questions',
      'Mathematics: 20 MCQs + 5 Numerical Value Questions',
    ],
  },
  {
    id: 3,
    name: 'JEE Advanced',
    slug: 'JEE-Advanced',
    fullName: 'Joint Entrance Examination (Advanced)',
    conductingBody: 'Indian Institutes of Technology (IITs)',
    examDate: 'May 2026',
    totalMarks: 360,
    totalQuestions: 54,
    durationMinutes: 360,
    markingScheme: 'Multi-correct, Integer, Matrix Match & Partial Marking',
    description:
      'Gateway to the 23 prestigious Indian Institutes of Technology (IITs).',
    syllabusHighlights: [
      'Paper 1 & Paper 2 (3 Hours Each - Compulsory)',
      'Advanced Multi-Concept Derivations in Mechanics & Electrodynamics',
      'Stereo-isomerism & Reaction Mechanisms in Organic Chemistry',
      'Calculus, Coordinate Geometry, Vectors & 3D',
    ],
  },
  {
    id: 4,
    name: 'VITEEE',
    slug: 'VITEEE',
    fullName: 'VIT Engineering Entrance Examination',
    conductingBody: 'Vellore Institute of Technology (VIT)',
    examDate: 'April 2026',
    totalMarks: 125,
    totalQuestions: 125,
    durationMinutes: 150,
    markingScheme: '+1 for Correct, 0 Negative Marking',
    description:
      'Common entrance test for admission to B.Tech programmes at VIT Vellore, Chennai, AP, and Bhopal campuses.',
    syllabusHighlights: [
      'Mathematics / Biology (40 Questions)',
      'Physics (35 Questions)',
      'Chemistry (35 Questions)',
      'Aptitude (10 Questions) & English (5 Questions)',
    ],
  },
  {
    id: 5,
    name: 'MET',
    slug: 'MET',
    fullName: 'Manipal Entrance Test',
    conductingBody: 'Manipal Academy of Higher Education (MAHE)',
    examDate: 'April & May 2026',
    totalMarks: 240,
    totalQuestions: 60,
    durationMinutes: 120,
    markingScheme: '+4 for Correct, -1 for Incorrect (MCQs), 0 Negative for NAT',
    description:
      'Online entrance exam for B.Tech admissions at MIT Manipal, Bengaluru, and SMIT Sikkim.',
    syllabusHighlights: [
      'Mathematics (15 MCQs + 5 Numerical Questions)',
      'Physics (10 MCQs + 5 Numerical Questions)',
      'Chemistry (10 MCQs + 5 Numerical Questions)',
      'English & General Aptitude (10 MCQs)',
    ],
  },
  {
    id: 6,
    name: 'COMEDK',
    slug: 'COMEDK',
    fullName: 'COMEDK Undergraduate Entrance Test (UGET)',
    conductingBody: 'Consortium of Medical, Engineering and Dental Colleges of Karnataka',
    examDate: 'May 2026',
    totalMarks: 180,
    totalQuestions: 180,
    durationMinutes: 180,
    markingScheme: '+1 for Correct, No Negative Marking',
    description:
      'State-level national open entrance test for 190+ top private engineering colleges in Bengaluru and Karnataka.',
    syllabusHighlights: [
      'Physics (60 Questions)',
      'Chemistry (60 Questions)',
      'Mathematics (60 Questions)',
      'High-speed 1-minute per question accuracy test',
    ],
  },
];

// ============================================================================
// 2. FRESH / EMPTY DATA REPOSITORIES (NO DUMMY COURSES OR MOCK DATA)
// ============================================================================
export const MOCK_FACULTY: Faculty[] = [];

export const MOCK_COURSE_SUBJECTS: CourseSubject[] = [];

export const MOCK_COURSES: Course[] = [];

export const MOCK_BLOGS: Blog[] = [];

export const MOCK_TESTIMONIALS: Testimonial[] = [];

export const MOCK_QUESTIONS: Question[] = [];

export const MOCK_TEST_PAPERS: TestPaper[] = [];

export const MOCK_DOUBTS: Doubt[] = [];

export const MOCK_ORDERS: Order[] = [];

export const MOCK_COUPONS: Coupon[] = [];

// Alias exports for compatibility
export const INITIAL_COURSES = MOCK_COURSES;
export const INITIAL_BLOGS = MOCK_BLOGS;
export const INITIAL_EXAMS = MOCK_EXAMS;
export const INITIAL_QUESTIONS = MOCK_QUESTIONS;
export const INITIAL_TEST_PAPER = undefined;
export const INITIAL_TEST_PAPERS = MOCK_TEST_PAPERS;
export const INITIAL_DOUBTS = MOCK_DOUBTS;
export const INITIAL_ORDERS = MOCK_ORDERS;
export const INITIAL_COUPONS = MOCK_COUPONS;
export const INITIAL_FACULTY = MOCK_FACULTY;
export const INITIAL_TESTIMONIALS = MOCK_TESTIMONIALS;
