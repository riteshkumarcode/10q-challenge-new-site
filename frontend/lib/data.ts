import {
  Course,
  CourseSubject,
  Chapter,
  Lesson,
  CourseDocument,
  ChapterTestPaper,
  Blog,
  Exam,
  Faculty,
  Testimonial,
  Question,
  TestPaper,
  Doubt,
  Order,
  Coupon,
} from '@/types';

export const MOCK_EXAMS: Exam[] = [
  {
    id: 1,
    name: 'BITSAT',
    fullName: 'Birla Institute of Technology and Science Admission Test',
    slug: 'bitsat',
    description:
      'Premier entrance exam for BITS Pilani, Goa & Hyderabad campuses. Speed-accuracy oriented with 130 questions + 12 bonus questions.',
    totalMarks: 390,
    durationMinutes: 180,
  },
  {
    id: 2,
    name: 'JEE Main',
    fullName: 'Joint Entrance Examination (Main)',
    slug: 'jee-main',
    description:
      'National entrance examination conducted by NTA for admission to NITs, IIITs, CFTIs and qualifying for JEE Advanced.',
    totalMarks: 300,
    durationMinutes: 180,
  },
  {
    id: 3,
    name: 'JEE Advanced',
    fullName: 'Joint Entrance Examination (Advanced)',
    slug: 'jee-advanced',
    description:
      'The gateway to premier Indian Institutes of Technology (IITs) featuring deep multi-concept problem solving.',
    totalMarks: 360,
    durationMinutes: 360,
  },
  {
    id: 4,
    name: 'COMEDK',
    fullName: 'Consortium of Medical, Engineering and Dental Colleges of Karnataka',
    slug: 'comedk',
    description:
      'State-level entrance exam for top Karnataka engineering colleges including RVCE, BMSCE, and MSRIT.',
    totalMarks: 180,
    durationMinutes: 180,
  },
  {
    id: 5,
    name: 'MET',
    fullName: 'Manipal Entrance Test',
    slug: 'met',
    description:
      'Online entrance test for admissions into Manipal Academy of Higher Education (MAHE) engineering campuses.',
    totalMarks: 240,
    durationMinutes: 120,
  },
  {
    id: 6,
    name: 'VITEEE',
    fullName: 'VIT Engineering Entrance Examination',
    slug: 'viteee',
    description:
      'Computer-based test for admission to B.Tech programs across Vellore, Chennai, AP, and Bhopal campuses.',
    totalMarks: 125,
    durationMinutes: 150,
  },
];

export const MOCK_FACULTY: Faculty[] = [
  {
    id: 1,
    name: 'Ritesh Sharma',
    qualification: 'BITS Pilani Alum (B.E. Computer Science)',
    specialization: 'Speed Mathematics, Short-Tricks & Exam Strategy',
    experienceYears: 8,
    studentsMentored: 12000,
    avatarUrl: '/site/assets/images/faculty-ritesh.jpg',
  },
  {
    id: 2,
    name: 'Dr. Vivek Agrawal',
    qualification: 'Ph.D. Physics (IIT Delhi)',
    specialization: 'Mechanics, Electrodynamics & Speed Approximations',
    experienceYears: 12,
    studentsMentored: 15000,
    avatarUrl: '/site/assets/images/faculty-vivek.jpg',
  },
  {
    id: 3,
    name: 'Prof. Neha Singhal',
    qualification: 'M.Sc. Chemistry (BITS Pilani)',
    specialization: 'Organic Reaction Mechanisms & Physical Chemistry Shortcut Tables',
    experienceYears: 9,
    studentsMentored: 9500,
    avatarUrl: '/site/assets/images/faculty-neha.jpg',
  },
];

export const MOCK_COURSE_SUBJECTS: CourseSubject[] = [
  {
    "id": 1,
    "name": "Physics",
    "code": "PHY",
    "icon": "⚛️",
    "chapters": [
      {
        "id": 101,
        "subjectId": 1,
        "subjectName": "Physics",
        "title": "Electrostatics & Capacitance",
        "sequenceOrder": 1,
        "lessons": [
          {
            "id": 1011,
            "chapterId": 101,
            "type": "VIDEO",
            "title": "Coulomb's Law, Electric Fields & Superposition Tricks",
            "vimeoVideoId": "76979871",
            "durationMinutes": 45,
            "isFreePreview": true,
            "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
          },
          {
            "id": 1012,
            "chapterId": 101,
            "type": "VIDEO",
            "title": "Gauss Law, Electric Flux & Symmetric Charge Distributions",
            "vimeoVideoId": "76979871",
            "durationMinutes": 50,
            "isFreePreview": false,
            "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
          },
          {
            "id": 1013,
            "chapterId": 101,
            "type": "VIDEO",
            "title": "Capacitor Networks, Dielectric Insertion & Energy Tricks",
            "vimeoVideoId": "76979871",
            "durationMinutes": 48,
            "isFreePreview": false,
            "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
          }
        ],
        "documents": [
          {
            "id": 1014,
            "chapterId": 101,
            "title": "Electrostatics Complete Formula Book & Cheatsheet",
            "pdfUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf",
            "fileSizeBytes": "2.4 MB",
            "pageCount": 12,
            "description": "Quick memory formulas, charge distribution tables, and Gauss law shortcuts."
          },
          {
            "id": 1015,
            "chapterId": 101,
            "title": "Capacitance 50 High-Yield DPP Practice Sheet",
            "pdfUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf",
            "fileSizeBytes": "1.8 MB",
            "pageCount": 8,
            "description": "Daily practice problem set with step-by-step verified solutions."
          }
        ],
        "testPapers": [
          {
            "id": 1016,
            "chapterId": 101,
            "testPaperId": 1,
            "title": "Electrostatics & Capacitance Chapter Speed Test",
            "durationMinutes": 45,
            "totalQuestions": 25,
            "totalMarks": 75,
            "examTag": "BITSAT"
          }
        ]
      },
      {
        "id": 102,
        "subjectId": 1,
        "subjectName": "Physics",
        "title": "Current Electricity & Magnetism",
        "sequenceOrder": 2,
        "lessons": [
          {
            "id": 1021,
            "chapterId": 102,
            "type": "VIDEO",
            "title": "Kirchhoff's Laws & Infinite Ladder Nodal Analysis",
            "vimeoVideoId": "76979871",
            "durationMinutes": 52,
            "isFreePreview": false,
            "pdfNotesUrl": "/site/assets/docs/kinematics-shortcuts.pdf"
          },
          {
            "id": 1022,
            "chapterId": 102,
            "type": "VIDEO",
            "title": "Magnetic Force, Biot-Savart Law & Ampere Law Shortcuts",
            "vimeoVideoId": "76979871",
            "durationMinutes": 55,
            "isFreePreview": false,
            "pdfNotesUrl": "/site/assets/docs/kinematics-shortcuts.pdf"
          }
        ],
        "documents": [
          {
            "id": 1023,
            "chapterId": 102,
            "title": "Current Electricity & Magnetism Formula Summary",
            "pdfUrl": "/site/assets/docs/kinematics-shortcuts.pdf",
            "fileSizeBytes": "1.9 MB",
            "pageCount": 10,
            "description": "Color-coded circuit diagrams, galvanometer conversions, and Biot-Savart formulas."
          }
        ],
        "testPapers": [
          {
            "id": 1024,
            "chapterId": 102,
            "testPaperId": 2,
            "title": "Current Electricity & Circuits Mastery Test",
            "durationMinutes": 40,
            "totalQuestions": 20,
            "totalMarks": 60,
            "examTag": "BITSAT"
          }
        ]
      },
      {
        "id": 103,
        "subjectId": 1,
        "subjectName": "Physics",
        "title": "Oscillations, SHM & Waves",
        "sequenceOrder": 3,
        "lessons": [
          {
            "id": 1031,
            "chapterId": 103,
            "type": "VIDEO",
            "title": "Simple Harmonic Motion Phase & Time Period Shortcuts",
            "vimeoVideoId": "76979871",
            "durationMinutes": 45,
            "isFreePreview": true,
            "pdfNotesUrl": "/site/assets/docs/rotation-notes.pdf"
          },
          {
            "id": 1032,
            "chapterId": 103,
            "type": "VIDEO",
            "title": "Doppler Effect & Standing Wave Resonances in 30 Seconds",
            "vimeoVideoId": "76979871",
            "durationMinutes": 40,
            "isFreePreview": false,
            "pdfNotesUrl": "/site/assets/docs/rotation-notes.pdf"
          }
        ],
        "documents": [
          {
            "id": 1033,
            "chapterId": 103,
            "title": "SHM & Wave Optics High-Yield Revision Cheatsheet",
            "pdfUrl": "/site/assets/docs/rotation-notes.pdf",
            "fileSizeBytes": "1.5 MB",
            "pageCount": 9,
            "description": "Phase circle method, resonance tube formulas, and Doppler shift tables."
          }
        ],
        "testPapers": [
          {
            "id": 1034,
            "chapterId": 103,
            "testPaperId": 4,
            "title": "Legacy Oscillations & Comprehensive Science Exam (37 Qs)",
            "durationMinutes": 60,
            "totalQuestions": 37,
            "totalMarks": 111,
            "examTag": "BITSAT"
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "name": "Chemistry",
    "code": "CHEM",
    "icon": "🧪",
    "chapters": [
      {
        "id": 201,
        "subjectId": 2,
        "subjectName": "Chemistry",
        "title": "Chemical Kinetics & Ionic Equilibrium",
        "sequenceOrder": 1,
        "lessons": [
          {
            "id": 2011,
            "chapterId": 201,
            "type": "VIDEO",
            "title": "First-Order Reaction Half-Life & Rate Law Hacks",
            "vimeoVideoId": "76979871",
            "durationMinutes": 48,
            "isFreePreview": true,
            "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
          },
          {
            "id": 2012,
            "chapterId": 201,
            "type": "VIDEO",
            "title": "Buffer Solutions, Henderson-Hasselbalch & Solubility Product",
            "vimeoVideoId": "76979871",
            "durationMinutes": 42,
            "isFreePreview": false,
            "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
          }
        ],
        "documents": [
          {
            "id": 2013,
            "chapterId": 201,
            "title": "Chemical Kinetics & Ionic Equilibrium Cheat Sheet",
            "pdfUrl": "/site/assets/docs/calculus-notes.pdf",
            "fileSizeBytes": "1.6 MB",
            "pageCount": 8,
            "description": "Key pH formulas, buffer systems of human blood, and Arrhenius plots."
          }
        ],
        "testPapers": [
          {
            "id": 2014,
            "chapterId": 201,
            "testPaperId": 3,
            "title": "Chemical Kinetics & Equilibrium Chapter Mock",
            "durationMinutes": 35,
            "totalQuestions": 20,
            "totalMarks": 60,
            "examTag": "BITSAT"
          }
        ]
      },
      {
        "id": 202,
        "subjectId": 2,
        "subjectName": "Chemistry",
        "title": "Metallurgy & Inorganic Extraction",
        "sequenceOrder": 2,
        "lessons": [
          {
            "id": 2021,
            "chapterId": 202,
            "type": "VIDEO",
            "title": "Ellingham Diagrams, Smelting & Roasting Fundamentals",
            "vimeoVideoId": "76979871",
            "durationMinutes": 46,
            "isFreePreview": false,
            "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
          }
        ],
        "documents": [
          {
            "id": 2022,
            "chapterId": 202,
            "title": "Ores, Minerals & Extraction Flowcharts (PDF)",
            "pdfUrl": "/site/assets/docs/conics-notes.pdf",
            "fileSizeBytes": "2.8 MB",
            "pageCount": 14,
            "description": "Complete Indian mineral distributions (Monazite, Bauxite) and smelting reactions."
          }
        ],
        "testPapers": [
          {
            "id": 2023,
            "chapterId": 202,
            "testPaperId": 1,
            "title": "Inorganic Chemistry & Metallurgy Practice Test",
            "durationMinutes": 30,
            "totalQuestions": 25,
            "totalMarks": 75,
            "examTag": "BITSAT"
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "name": "Mathematics",
    "code": "MATH",
    "icon": "📐",
    "chapters": [
      {
        "id": 301,
        "subjectId": 3,
        "subjectName": "Mathematics",
        "title": "Speed Calculus & Definite Integration",
        "sequenceOrder": 1,
        "lessons": [
          {
            "id": 3011,
            "chapterId": 301,
            "type": "VIDEO",
            "title": "King's Property & Symmetric Definite Integrals in 20s",
            "vimeoVideoId": "76979871",
            "durationMinutes": 55,
            "isFreePreview": true,
            "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
          },
          {
            "id": 3012,
            "chapterId": 301,
            "type": "VIDEO",
            "title": "Area Under Curve & Differential Equations Direct Patterns",
            "vimeoVideoId": "76979871",
            "durationMinutes": 50,
            "isFreePreview": false,
            "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
          }
        ],
        "documents": [
          {
            "id": 3013,
            "chapterId": 301,
            "title": "Calculus 100 Speed Formulas & Quick Graph Reference",
            "pdfUrl": "/site/assets/docs/calculus-notes.pdf",
            "fileSizeBytes": "3.2 MB",
            "pageCount": 16,
            "description": "Standard integral shortcuts, reduction formulas, and Leibniz rule."
          }
        ],
        "testPapers": [
          {
            "id": 3014,
            "chapterId": 301,
            "testPaperId": 1,
            "title": "Calculus High-Speed Diagnostic Test",
            "durationMinutes": 45,
            "totalQuestions": 30,
            "totalMarks": 90,
            "examTag": "BITSAT"
          }
        ]
      },
      {
        "id": 302,
        "subjectId": 3,
        "subjectName": "Mathematics",
        "title": "Vectors & 3D Coordinate Geometry",
        "sequenceOrder": 2,
        "lessons": [
          {
            "id": 3021,
            "chapterId": 302,
            "type": "VIDEO",
            "title": "Vector Triple Products & Plane Projection Shortcuts",
            "vimeoVideoId": "76979871",
            "durationMinutes": 48,
            "isFreePreview": false,
            "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
          },
          {
            "id": 3022,
            "chapterId": 302,
            "type": "VIDEO",
            "title": "Shortest Distance Between Skew Lines in 30 Seconds",
            "vimeoVideoId": "76979871",
            "durationMinutes": 45,
            "isFreePreview": false,
            "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
          }
        ],
        "documents": [
          {
            "id": 3023,
            "chapterId": 302,
            "title": "3D Geometry & Vector Algebra Cheatsheet",
            "pdfUrl": "/site/assets/docs/conics-notes.pdf",
            "fileSizeBytes": "2.1 MB",
            "pageCount": 11,
            "description": "Coplanarity conditions, angle between planes, and image of points."
          }
        ],
        "testPapers": [
          {
            "id": 3024,
            "chapterId": 302,
            "testPaperId": 2,
            "title": "Vectors & 3D Geometry Speed Mock",
            "durationMinutes": 35,
            "totalQuestions": 20,
            "totalMarks": 60,
            "examTag": "BITSAT"
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "name": "English & Logical Reasoning",
    "code": "ELR",
    "icon": "🧠",
    "chapters": [
      {
        "id": 401,
        "subjectId": 4,
        "subjectName": "English & Logical Reasoning",
        "title": "English Proficiency (Grammar & Vocabulary)",
        "sequenceOrder": 1,
        "lessons": [
          {
            "id": 4011,
            "chapterId": 401,
            "type": "VIDEO",
            "title": "High-Frequency Vocabulary, Root Words & Spotting Errors",
            "vimeoVideoId": "76979871",
            "durationMinutes": 40,
            "isFreePreview": true,
            "pdfNotesUrl": "/site/assets/docs/english-notes.pdf"
          }
        ],
        "documents": [
          {
            "id": 4012,
            "chapterId": 401,
            "title": "BITSAT 500 High-Frequency English Words & Idioms",
            "pdfUrl": "/site/assets/docs/english-notes.pdf",
            "fileSizeBytes": "3.5 MB",
            "pageCount": 20,
            "description": "Guaranteed vocabulary lists, common spelling traps, and grammar rules."
          }
        ],
        "testPapers": [
          {
            "id": 4013,
            "chapterId": 401,
            "testPaperId": 1,
            "title": "English Proficiency Rapid Fire Practice Test",
            "durationMinutes": 20,
            "totalQuestions": 25,
            "totalMarks": 75,
            "examTag": "BITSAT"
          }
        ]
      },
      {
        "id": 402,
        "subjectId": 4,
        "subjectName": "English & Logical Reasoning",
        "title": "Logical Reasoning & Pattern Analysis",
        "sequenceOrder": 2,
        "lessons": [
          {
            "id": 4021,
            "chapterId": 402,
            "type": "VIDEO",
            "title": "Number Series, Syllogisms & Figure Matrix Rules",
            "vimeoVideoId": "76979871",
            "durationMinutes": 42,
            "isFreePreview": false,
            "pdfNotesUrl": "/site/assets/docs/lr-notes.pdf"
          }
        ],
        "documents": [
          {
            "id": 4022,
            "chapterId": 402,
            "title": "Logical Reasoning Mental Shortcuts & Rulebook",
            "pdfUrl": "/site/assets/docs/lr-notes.pdf",
            "fileSizeBytes": "2.6 MB",
            "pageCount": 15,
            "description": "Direction tests, blood relations, and non-verbal reasoning techniques."
          }
        ],
        "testPapers": [
          {
            "id": 4023,
            "chapterId": 402,
            "testPaperId": 1,
            "title": "Logical Reasoning Speed Booster Test",
            "durationMinutes": 25,
            "totalQuestions": 25,
            "totalMarks": 75,
            "examTag": "BITSAT"
          }
        ]
      }
    ]
  }
];

export const MOCK_COURSES: Course[] = [
  {
    id: 1,
    title: 'BITSAT 2026: Master Crash Course & Speed Blueprint',
    slug: 'bitsat-master-crash-course',
    shortDescription:
      'Comprehensive high-yield video crash course covering Physics, Chemistry, Maths, English & Logical Reasoning with subject-wise chapters, PDF formula notes, and CBT test papers.',
    description:
      'Engineered specifically for BITSAT rankers. Master 130 questions in 180 minutes with subject-wise chapters, full Vimeo video lectures, downloadable formula PDF books, and authentic chapter CBT test series.',
    discountPrice: 4999,
    originalPrice: 9999,
    examTag: 'BITSAT',
    category: 'CRASH_COURSE',
    rating: 4.9,
    reviewCount: 1420,
    enrolledCount: 8450,
    thumbnailUrl: '/site/assets/images/course-bitsat-crash.jpg',
    isBestseller: true,
    isFeatured: true,
    features: [
      '4 Core Subjects: Physics, Chemistry, Mathematics & English/LR',
      '120+ Hours Vimeo HD Video Lectures with Speed Controls',
      'Downloadable Formula Books, DPP Notes & Cheatsheets (PDF)',
      'Chapter-wise Question Papers & Full CBT Mock Test Papers',
      'Direct 24/7 Doubt Resolution with Video Timestamping by BITS Mentors',
    ],
    subjects: MOCK_COURSE_SUBJECTS,
    chapters: [
  {
    "id": 101,
    "subjectId": 1,
    "subjectName": "Physics",
    "title": "Electrostatics & Capacitance",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 1011,
        "chapterId": 101,
        "type": "VIDEO",
        "title": "Coulomb's Law, Electric Fields & Superposition Tricks",
        "vimeoVideoId": "76979871",
        "durationMinutes": 45,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
      },
      {
        "id": 1012,
        "chapterId": 101,
        "type": "VIDEO",
        "title": "Gauss Law, Electric Flux & Symmetric Charge Distributions",
        "vimeoVideoId": "76979871",
        "durationMinutes": 50,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
      },
      {
        "id": 1013,
        "chapterId": 101,
        "type": "VIDEO",
        "title": "Capacitor Networks, Dielectric Insertion & Energy Tricks",
        "vimeoVideoId": "76979871",
        "durationMinutes": 48,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
      }
    ],
    "documents": [
      {
        "id": 1014,
        "chapterId": 101,
        "title": "Electrostatics Complete Formula Book & Cheatsheet",
        "pdfUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf",
        "fileSizeBytes": "2.4 MB",
        "pageCount": 12,
        "description": "Quick memory formulas, charge distribution tables, and Gauss law shortcuts."
      },
      {
        "id": 1015,
        "chapterId": 101,
        "title": "Capacitance 50 High-Yield DPP Practice Sheet",
        "pdfUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf",
        "fileSizeBytes": "1.8 MB",
        "pageCount": 8,
        "description": "Daily practice problem set with step-by-step verified solutions."
      }
    ],
    "testPapers": [
      {
        "id": 1016,
        "chapterId": 101,
        "testPaperId": 1,
        "title": "Electrostatics & Capacitance Chapter Speed Test",
        "durationMinutes": 45,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 102,
    "subjectId": 1,
    "subjectName": "Physics",
    "title": "Current Electricity & Magnetism",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 1021,
        "chapterId": 102,
        "type": "VIDEO",
        "title": "Kirchhoff's Laws & Infinite Ladder Nodal Analysis",
        "vimeoVideoId": "76979871",
        "durationMinutes": 52,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/kinematics-shortcuts.pdf"
      },
      {
        "id": 1022,
        "chapterId": 102,
        "type": "VIDEO",
        "title": "Magnetic Force, Biot-Savart Law & Ampere Law Shortcuts",
        "vimeoVideoId": "76979871",
        "durationMinutes": 55,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/kinematics-shortcuts.pdf"
      }
    ],
    "documents": [
      {
        "id": 1023,
        "chapterId": 102,
        "title": "Current Electricity & Magnetism Formula Summary",
        "pdfUrl": "/site/assets/docs/kinematics-shortcuts.pdf",
        "fileSizeBytes": "1.9 MB",
        "pageCount": 10,
        "description": "Color-coded circuit diagrams, galvanometer conversions, and Biot-Savart formulas."
      }
    ],
    "testPapers": [
      {
        "id": 1024,
        "chapterId": 102,
        "testPaperId": 2,
        "title": "Current Electricity & Circuits Mastery Test",
        "durationMinutes": 40,
        "totalQuestions": 20,
        "totalMarks": 60,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 103,
    "subjectId": 1,
    "subjectName": "Physics",
    "title": "Oscillations, SHM & Waves",
    "sequenceOrder": 3,
    "lessons": [
      {
        "id": 1031,
        "chapterId": 103,
        "type": "VIDEO",
        "title": "Simple Harmonic Motion Phase & Time Period Shortcuts",
        "vimeoVideoId": "76979871",
        "durationMinutes": 45,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/rotation-notes.pdf"
      },
      {
        "id": 1032,
        "chapterId": 103,
        "type": "VIDEO",
        "title": "Doppler Effect & Standing Wave Resonances in 30 Seconds",
        "vimeoVideoId": "76979871",
        "durationMinutes": 40,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/rotation-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 1033,
        "chapterId": 103,
        "title": "SHM & Wave Optics High-Yield Revision Cheatsheet",
        "pdfUrl": "/site/assets/docs/rotation-notes.pdf",
        "fileSizeBytes": "1.5 MB",
        "pageCount": 9,
        "description": "Phase circle method, resonance tube formulas, and Doppler shift tables."
      }
    ],
    "testPapers": [
      {
        "id": 1034,
        "chapterId": 103,
        "testPaperId": 4,
        "title": "Legacy Oscillations & Comprehensive Science Exam (37 Qs)",
        "durationMinutes": 60,
        "totalQuestions": 37,
        "totalMarks": 111,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 201,
    "subjectId": 2,
    "subjectName": "Chemistry",
    "title": "Chemical Kinetics & Ionic Equilibrium",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 2011,
        "chapterId": 201,
        "type": "VIDEO",
        "title": "First-Order Reaction Half-Life & Rate Law Hacks",
        "vimeoVideoId": "76979871",
        "durationMinutes": 48,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      },
      {
        "id": 2012,
        "chapterId": 201,
        "type": "VIDEO",
        "title": "Buffer Solutions, Henderson-Hasselbalch & Solubility Product",
        "vimeoVideoId": "76979871",
        "durationMinutes": 42,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 2013,
        "chapterId": 201,
        "title": "Chemical Kinetics & Ionic Equilibrium Cheat Sheet",
        "pdfUrl": "/site/assets/docs/calculus-notes.pdf",
        "fileSizeBytes": "1.6 MB",
        "pageCount": 8,
        "description": "Key pH formulas, buffer systems of human blood, and Arrhenius plots."
      }
    ],
    "testPapers": [
      {
        "id": 2014,
        "chapterId": 201,
        "testPaperId": 3,
        "title": "Chemical Kinetics & Equilibrium Chapter Mock",
        "durationMinutes": 35,
        "totalQuestions": 20,
        "totalMarks": 60,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 202,
    "subjectId": 2,
    "subjectName": "Chemistry",
    "title": "Metallurgy & Inorganic Extraction",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 2021,
        "chapterId": 202,
        "type": "VIDEO",
        "title": "Ellingham Diagrams, Smelting & Roasting Fundamentals",
        "vimeoVideoId": "76979871",
        "durationMinutes": 46,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 2022,
        "chapterId": 202,
        "title": "Ores, Minerals & Extraction Flowcharts (PDF)",
        "pdfUrl": "/site/assets/docs/conics-notes.pdf",
        "fileSizeBytes": "2.8 MB",
        "pageCount": 14,
        "description": "Complete Indian mineral distributions (Monazite, Bauxite) and smelting reactions."
      }
    ],
    "testPapers": [
      {
        "id": 2023,
        "chapterId": 202,
        "testPaperId": 1,
        "title": "Inorganic Chemistry & Metallurgy Practice Test",
        "durationMinutes": 30,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 301,
    "subjectId": 3,
    "subjectName": "Mathematics",
    "title": "Speed Calculus & Definite Integration",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 3011,
        "chapterId": 301,
        "type": "VIDEO",
        "title": "King's Property & Symmetric Definite Integrals in 20s",
        "vimeoVideoId": "76979871",
        "durationMinutes": 55,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      },
      {
        "id": 3012,
        "chapterId": 301,
        "type": "VIDEO",
        "title": "Area Under Curve & Differential Equations Direct Patterns",
        "vimeoVideoId": "76979871",
        "durationMinutes": 50,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 3013,
        "chapterId": 301,
        "title": "Calculus 100 Speed Formulas & Quick Graph Reference",
        "pdfUrl": "/site/assets/docs/calculus-notes.pdf",
        "fileSizeBytes": "3.2 MB",
        "pageCount": 16,
        "description": "Standard integral shortcuts, reduction formulas, and Leibniz rule."
      }
    ],
    "testPapers": [
      {
        "id": 3014,
        "chapterId": 301,
        "testPaperId": 1,
        "title": "Calculus High-Speed Diagnostic Test",
        "durationMinutes": 45,
        "totalQuestions": 30,
        "totalMarks": 90,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 302,
    "subjectId": 3,
    "subjectName": "Mathematics",
    "title": "Vectors & 3D Coordinate Geometry",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 3021,
        "chapterId": 302,
        "type": "VIDEO",
        "title": "Vector Triple Products & Plane Projection Shortcuts",
        "vimeoVideoId": "76979871",
        "durationMinutes": 48,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
      },
      {
        "id": 3022,
        "chapterId": 302,
        "type": "VIDEO",
        "title": "Shortest Distance Between Skew Lines in 30 Seconds",
        "vimeoVideoId": "76979871",
        "durationMinutes": 45,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 3023,
        "chapterId": 302,
        "title": "3D Geometry & Vector Algebra Cheatsheet",
        "pdfUrl": "/site/assets/docs/conics-notes.pdf",
        "fileSizeBytes": "2.1 MB",
        "pageCount": 11,
        "description": "Coplanarity conditions, angle between planes, and image of points."
      }
    ],
    "testPapers": [
      {
        "id": 3024,
        "chapterId": 302,
        "testPaperId": 2,
        "title": "Vectors & 3D Geometry Speed Mock",
        "durationMinutes": 35,
        "totalQuestions": 20,
        "totalMarks": 60,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 401,
    "subjectId": 4,
    "subjectName": "English & Logical Reasoning",
    "title": "English Proficiency (Grammar & Vocabulary)",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 4011,
        "chapterId": 401,
        "type": "VIDEO",
        "title": "High-Frequency Vocabulary, Root Words & Spotting Errors",
        "vimeoVideoId": "76979871",
        "durationMinutes": 40,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/english-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 4012,
        "chapterId": 401,
        "title": "BITSAT 500 High-Frequency English Words & Idioms",
        "pdfUrl": "/site/assets/docs/english-notes.pdf",
        "fileSizeBytes": "3.5 MB",
        "pageCount": 20,
        "description": "Guaranteed vocabulary lists, common spelling traps, and grammar rules."
      }
    ],
    "testPapers": [
      {
        "id": 4013,
        "chapterId": 401,
        "testPaperId": 1,
        "title": "English Proficiency Rapid Fire Practice Test",
        "durationMinutes": 20,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 402,
    "subjectId": 4,
    "subjectName": "English & Logical Reasoning",
    "title": "Logical Reasoning & Pattern Analysis",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 4021,
        "chapterId": 402,
        "type": "VIDEO",
        "title": "Number Series, Syllogisms & Figure Matrix Rules",
        "vimeoVideoId": "76979871",
        "durationMinutes": 42,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/lr-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 4022,
        "chapterId": 402,
        "title": "Logical Reasoning Mental Shortcuts & Rulebook",
        "pdfUrl": "/site/assets/docs/lr-notes.pdf",
        "fileSizeBytes": "2.6 MB",
        "pageCount": 15,
        "description": "Direction tests, blood relations, and non-verbal reasoning techniques."
      }
    ],
    "testPapers": [
      {
        "id": 4023,
        "chapterId": 402,
        "testPaperId": 1,
        "title": "Logical Reasoning Speed Booster Test",
        "durationMinutes": 25,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  }
],
    documents: [
  {
    "id": 1014,
    "chapterId": 101,
    "title": "Electrostatics Complete Formula Book & Cheatsheet",
    "pdfUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf",
    "fileSizeBytes": "2.4 MB",
    "pageCount": 12,
    "description": "Quick memory formulas, charge distribution tables, and Gauss law shortcuts."
  },
  {
    "id": 1015,
    "chapterId": 101,
    "title": "Capacitance 50 High-Yield DPP Practice Sheet",
    "pdfUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf",
    "fileSizeBytes": "1.8 MB",
    "pageCount": 8,
    "description": "Daily practice problem set with step-by-step verified solutions."
  },
  {
    "id": 1023,
    "chapterId": 102,
    "title": "Current Electricity & Magnetism Formula Summary",
    "pdfUrl": "/site/assets/docs/kinematics-shortcuts.pdf",
    "fileSizeBytes": "1.9 MB",
    "pageCount": 10,
    "description": "Color-coded circuit diagrams, galvanometer conversions, and Biot-Savart formulas."
  },
  {
    "id": 1033,
    "chapterId": 103,
    "title": "SHM & Wave Optics High-Yield Revision Cheatsheet",
    "pdfUrl": "/site/assets/docs/rotation-notes.pdf",
    "fileSizeBytes": "1.5 MB",
    "pageCount": 9,
    "description": "Phase circle method, resonance tube formulas, and Doppler shift tables."
  },
  {
    "id": 2013,
    "chapterId": 201,
    "title": "Chemical Kinetics & Ionic Equilibrium Cheat Sheet",
    "pdfUrl": "/site/assets/docs/calculus-notes.pdf",
    "fileSizeBytes": "1.6 MB",
    "pageCount": 8,
    "description": "Key pH formulas, buffer systems of human blood, and Arrhenius plots."
  },
  {
    "id": 2022,
    "chapterId": 202,
    "title": "Ores, Minerals & Extraction Flowcharts (PDF)",
    "pdfUrl": "/site/assets/docs/conics-notes.pdf",
    "fileSizeBytes": "2.8 MB",
    "pageCount": 14,
    "description": "Complete Indian mineral distributions (Monazite, Bauxite) and smelting reactions."
  },
  {
    "id": 3013,
    "chapterId": 301,
    "title": "Calculus 100 Speed Formulas & Quick Graph Reference",
    "pdfUrl": "/site/assets/docs/calculus-notes.pdf",
    "fileSizeBytes": "3.2 MB",
    "pageCount": 16,
    "description": "Standard integral shortcuts, reduction formulas, and Leibniz rule."
  },
  {
    "id": 3023,
    "chapterId": 302,
    "title": "3D Geometry & Vector Algebra Cheatsheet",
    "pdfUrl": "/site/assets/docs/conics-notes.pdf",
    "fileSizeBytes": "2.1 MB",
    "pageCount": 11,
    "description": "Coplanarity conditions, angle between planes, and image of points."
  },
  {
    "id": 4012,
    "chapterId": 401,
    "title": "BITSAT 500 High-Frequency English Words & Idioms",
    "pdfUrl": "/site/assets/docs/english-notes.pdf",
    "fileSizeBytes": "3.5 MB",
    "pageCount": 20,
    "description": "Guaranteed vocabulary lists, common spelling traps, and grammar rules."
  },
  {
    "id": 4022,
    "chapterId": 402,
    "title": "Logical Reasoning Mental Shortcuts & Rulebook",
    "pdfUrl": "/site/assets/docs/lr-notes.pdf",
    "fileSizeBytes": "2.6 MB",
    "pageCount": 15,
    "description": "Direction tests, blood relations, and non-verbal reasoning techniques."
  }
],
  },
  {
    id: 2,
    title: 'BITSAT Master 20 CBT Mock Test Series 2026',
    slug: 'bitsat-test-series',
    shortDescription:
      'Exact exam interface replica with 20 Full-Length Mocks, 12 Bonus Question unlocking logic, All-India Rank predict, and deep chapter diagnostics.',
    description:
      'Experience the exact speed pressure before exam day. Every test is timed for 180 minutes with instant KaTeX math solutions and subject-wise accuracy analysis.',
    discountPrice: 1999,
    originalPrice: 4499,
    examTag: 'BITSAT',
    category: 'TEST_SERIES',
    rating: 4.9,
    reviewCount: 2150,
    enrolledCount: 12400,
    thumbnailUrl: '/site/assets/images/course-bitsat-test.jpg',
    isBestseller: true,
    isFeatured: true,
    features: [
      '20 Full-Length BITSAT Mock Papers (130 Qs + 12 Bonus)',
      '45 Chapter-Wise Practice Speed Drill Tests',
      'All India Percentile & BITS Campus Predictor',
      'Instant KaTeX LaTeX Step-by-Step Solutions',
      'Unlimited Re-take attempts till Session 2 Exam',
    ],
    subjects: MOCK_COURSE_SUBJECTS,
    chapters: [
  {
    "id": 101,
    "subjectId": 1,
    "subjectName": "Physics",
    "title": "Electrostatics & Capacitance",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 1011,
        "chapterId": 101,
        "type": "VIDEO",
        "title": "Coulomb's Law, Electric Fields & Superposition Tricks",
        "vimeoVideoId": "76979871",
        "durationMinutes": 45,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
      },
      {
        "id": 1012,
        "chapterId": 101,
        "type": "VIDEO",
        "title": "Gauss Law, Electric Flux & Symmetric Charge Distributions",
        "vimeoVideoId": "76979871",
        "durationMinutes": 50,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
      },
      {
        "id": 1013,
        "chapterId": 101,
        "type": "VIDEO",
        "title": "Capacitor Networks, Dielectric Insertion & Energy Tricks",
        "vimeoVideoId": "76979871",
        "durationMinutes": 48,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
      }
    ],
    "documents": [
      {
        "id": 1014,
        "chapterId": 101,
        "title": "Electrostatics Complete Formula Book & Cheatsheet",
        "pdfUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf",
        "fileSizeBytes": "2.4 MB",
        "pageCount": 12,
        "description": "Quick memory formulas, charge distribution tables, and Gauss law shortcuts."
      },
      {
        "id": 1015,
        "chapterId": 101,
        "title": "Capacitance 50 High-Yield DPP Practice Sheet",
        "pdfUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf",
        "fileSizeBytes": "1.8 MB",
        "pageCount": 8,
        "description": "Daily practice problem set with step-by-step verified solutions."
      }
    ],
    "testPapers": [
      {
        "id": 1016,
        "chapterId": 101,
        "testPaperId": 1,
        "title": "Electrostatics & Capacitance Chapter Speed Test",
        "durationMinutes": 45,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 102,
    "subjectId": 1,
    "subjectName": "Physics",
    "title": "Current Electricity & Magnetism",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 1021,
        "chapterId": 102,
        "type": "VIDEO",
        "title": "Kirchhoff's Laws & Infinite Ladder Nodal Analysis",
        "vimeoVideoId": "76979871",
        "durationMinutes": 52,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/kinematics-shortcuts.pdf"
      },
      {
        "id": 1022,
        "chapterId": 102,
        "type": "VIDEO",
        "title": "Magnetic Force, Biot-Savart Law & Ampere Law Shortcuts",
        "vimeoVideoId": "76979871",
        "durationMinutes": 55,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/kinematics-shortcuts.pdf"
      }
    ],
    "documents": [
      {
        "id": 1023,
        "chapterId": 102,
        "title": "Current Electricity & Magnetism Formula Summary",
        "pdfUrl": "/site/assets/docs/kinematics-shortcuts.pdf",
        "fileSizeBytes": "1.9 MB",
        "pageCount": 10,
        "description": "Color-coded circuit diagrams, galvanometer conversions, and Biot-Savart formulas."
      }
    ],
    "testPapers": [
      {
        "id": 1024,
        "chapterId": 102,
        "testPaperId": 2,
        "title": "Current Electricity & Circuits Mastery Test",
        "durationMinutes": 40,
        "totalQuestions": 20,
        "totalMarks": 60,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 103,
    "subjectId": 1,
    "subjectName": "Physics",
    "title": "Oscillations, SHM & Waves",
    "sequenceOrder": 3,
    "lessons": [
      {
        "id": 1031,
        "chapterId": 103,
        "type": "VIDEO",
        "title": "Simple Harmonic Motion Phase & Time Period Shortcuts",
        "vimeoVideoId": "76979871",
        "durationMinutes": 45,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/rotation-notes.pdf"
      },
      {
        "id": 1032,
        "chapterId": 103,
        "type": "VIDEO",
        "title": "Doppler Effect & Standing Wave Resonances in 30 Seconds",
        "vimeoVideoId": "76979871",
        "durationMinutes": 40,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/rotation-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 1033,
        "chapterId": 103,
        "title": "SHM & Wave Optics High-Yield Revision Cheatsheet",
        "pdfUrl": "/site/assets/docs/rotation-notes.pdf",
        "fileSizeBytes": "1.5 MB",
        "pageCount": 9,
        "description": "Phase circle method, resonance tube formulas, and Doppler shift tables."
      }
    ],
    "testPapers": [
      {
        "id": 1034,
        "chapterId": 103,
        "testPaperId": 4,
        "title": "Legacy Oscillations & Comprehensive Science Exam (37 Qs)",
        "durationMinutes": 60,
        "totalQuestions": 37,
        "totalMarks": 111,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 201,
    "subjectId": 2,
    "subjectName": "Chemistry",
    "title": "Chemical Kinetics & Ionic Equilibrium",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 2011,
        "chapterId": 201,
        "type": "VIDEO",
        "title": "First-Order Reaction Half-Life & Rate Law Hacks",
        "vimeoVideoId": "76979871",
        "durationMinutes": 48,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      },
      {
        "id": 2012,
        "chapterId": 201,
        "type": "VIDEO",
        "title": "Buffer Solutions, Henderson-Hasselbalch & Solubility Product",
        "vimeoVideoId": "76979871",
        "durationMinutes": 42,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 2013,
        "chapterId": 201,
        "title": "Chemical Kinetics & Ionic Equilibrium Cheat Sheet",
        "pdfUrl": "/site/assets/docs/calculus-notes.pdf",
        "fileSizeBytes": "1.6 MB",
        "pageCount": 8,
        "description": "Key pH formulas, buffer systems of human blood, and Arrhenius plots."
      }
    ],
    "testPapers": [
      {
        "id": 2014,
        "chapterId": 201,
        "testPaperId": 3,
        "title": "Chemical Kinetics & Equilibrium Chapter Mock",
        "durationMinutes": 35,
        "totalQuestions": 20,
        "totalMarks": 60,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 202,
    "subjectId": 2,
    "subjectName": "Chemistry",
    "title": "Metallurgy & Inorganic Extraction",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 2021,
        "chapterId": 202,
        "type": "VIDEO",
        "title": "Ellingham Diagrams, Smelting & Roasting Fundamentals",
        "vimeoVideoId": "76979871",
        "durationMinutes": 46,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 2022,
        "chapterId": 202,
        "title": "Ores, Minerals & Extraction Flowcharts (PDF)",
        "pdfUrl": "/site/assets/docs/conics-notes.pdf",
        "fileSizeBytes": "2.8 MB",
        "pageCount": 14,
        "description": "Complete Indian mineral distributions (Monazite, Bauxite) and smelting reactions."
      }
    ],
    "testPapers": [
      {
        "id": 2023,
        "chapterId": 202,
        "testPaperId": 1,
        "title": "Inorganic Chemistry & Metallurgy Practice Test",
        "durationMinutes": 30,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 301,
    "subjectId": 3,
    "subjectName": "Mathematics",
    "title": "Speed Calculus & Definite Integration",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 3011,
        "chapterId": 301,
        "type": "VIDEO",
        "title": "King's Property & Symmetric Definite Integrals in 20s",
        "vimeoVideoId": "76979871",
        "durationMinutes": 55,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      },
      {
        "id": 3012,
        "chapterId": 301,
        "type": "VIDEO",
        "title": "Area Under Curve & Differential Equations Direct Patterns",
        "vimeoVideoId": "76979871",
        "durationMinutes": 50,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 3013,
        "chapterId": 301,
        "title": "Calculus 100 Speed Formulas & Quick Graph Reference",
        "pdfUrl": "/site/assets/docs/calculus-notes.pdf",
        "fileSizeBytes": "3.2 MB",
        "pageCount": 16,
        "description": "Standard integral shortcuts, reduction formulas, and Leibniz rule."
      }
    ],
    "testPapers": [
      {
        "id": 3014,
        "chapterId": 301,
        "testPaperId": 1,
        "title": "Calculus High-Speed Diagnostic Test",
        "durationMinutes": 45,
        "totalQuestions": 30,
        "totalMarks": 90,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 302,
    "subjectId": 3,
    "subjectName": "Mathematics",
    "title": "Vectors & 3D Coordinate Geometry",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 3021,
        "chapterId": 302,
        "type": "VIDEO",
        "title": "Vector Triple Products & Plane Projection Shortcuts",
        "vimeoVideoId": "76979871",
        "durationMinutes": 48,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
      },
      {
        "id": 3022,
        "chapterId": 302,
        "type": "VIDEO",
        "title": "Shortest Distance Between Skew Lines in 30 Seconds",
        "vimeoVideoId": "76979871",
        "durationMinutes": 45,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 3023,
        "chapterId": 302,
        "title": "3D Geometry & Vector Algebra Cheatsheet",
        "pdfUrl": "/site/assets/docs/conics-notes.pdf",
        "fileSizeBytes": "2.1 MB",
        "pageCount": 11,
        "description": "Coplanarity conditions, angle between planes, and image of points."
      }
    ],
    "testPapers": [
      {
        "id": 3024,
        "chapterId": 302,
        "testPaperId": 2,
        "title": "Vectors & 3D Geometry Speed Mock",
        "durationMinutes": 35,
        "totalQuestions": 20,
        "totalMarks": 60,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 401,
    "subjectId": 4,
    "subjectName": "English & Logical Reasoning",
    "title": "English Proficiency (Grammar & Vocabulary)",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 4011,
        "chapterId": 401,
        "type": "VIDEO",
        "title": "High-Frequency Vocabulary, Root Words & Spotting Errors",
        "vimeoVideoId": "76979871",
        "durationMinutes": 40,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/english-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 4012,
        "chapterId": 401,
        "title": "BITSAT 500 High-Frequency English Words & Idioms",
        "pdfUrl": "/site/assets/docs/english-notes.pdf",
        "fileSizeBytes": "3.5 MB",
        "pageCount": 20,
        "description": "Guaranteed vocabulary lists, common spelling traps, and grammar rules."
      }
    ],
    "testPapers": [
      {
        "id": 4013,
        "chapterId": 401,
        "testPaperId": 1,
        "title": "English Proficiency Rapid Fire Practice Test",
        "durationMinutes": 20,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 402,
    "subjectId": 4,
    "subjectName": "English & Logical Reasoning",
    "title": "Logical Reasoning & Pattern Analysis",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 4021,
        "chapterId": 402,
        "type": "VIDEO",
        "title": "Number Series, Syllogisms & Figure Matrix Rules",
        "vimeoVideoId": "76979871",
        "durationMinutes": 42,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/lr-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 4022,
        "chapterId": 402,
        "title": "Logical Reasoning Mental Shortcuts & Rulebook",
        "pdfUrl": "/site/assets/docs/lr-notes.pdf",
        "fileSizeBytes": "2.6 MB",
        "pageCount": 15,
        "description": "Direction tests, blood relations, and non-verbal reasoning techniques."
      }
    ],
    "testPapers": [
      {
        "id": 4023,
        "chapterId": 402,
        "testPaperId": 1,
        "title": "Logical Reasoning Speed Booster Test",
        "durationMinutes": 25,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  }
],
  },
  {
    id: 3,
    title: '1-on-1 Elite Mentorship by BITS Pilani Top Rankers',
    slug: 'bitsat-mentorship',
    shortDescription:
      'Personalized roadmap, weekly 1-on-1 strategy video calls, mock test analysis, and daily WhatsApp accountability by BITS Pilani seniors.',
    description:
      'Eliminate doubts, stress, and poor strategy. Get paired with an experienced BITS Pilani mentor who scored 340+ in BITSAT to guide your daily timetable, weak-topic remediation, and college branch selection.',
    discountPrice: 5999,
    originalPrice: 11999,
    examTag: 'BITSAT',
    category: 'MENTORSHIP',
    rating: 5.0,
    reviewCount: 380,
    enrolledCount: 950,
    thumbnailUrl: '/site/assets/images/course-mentorship.jpg',
    isBestseller: false,
    isFeatured: true,
    features: [
      'Weekly 1-on-1 Strategy Video Consultation',
      'Personalized Day-by-Day Score Boosting Timetable',
      'Mock Test Score Diagnosis & Error Correction',
      'Daily WhatsApp Mentorship & Motivation',
      'BITS Pilani Campus & Branch Counseling Support',
    ],
    subjects: MOCK_COURSE_SUBJECTS,
    chapters: [
  {
    "id": 101,
    "subjectId": 1,
    "subjectName": "Physics",
    "title": "Electrostatics & Capacitance",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 1011,
        "chapterId": 101,
        "type": "VIDEO",
        "title": "Coulomb's Law, Electric Fields & Superposition Tricks",
        "vimeoVideoId": "76979871",
        "durationMinutes": 45,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
      },
      {
        "id": 1012,
        "chapterId": 101,
        "type": "VIDEO",
        "title": "Gauss Law, Electric Flux & Symmetric Charge Distributions",
        "vimeoVideoId": "76979871",
        "durationMinutes": 50,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
      },
      {
        "id": 1013,
        "chapterId": 101,
        "type": "VIDEO",
        "title": "Capacitor Networks, Dielectric Insertion & Energy Tricks",
        "vimeoVideoId": "76979871",
        "durationMinutes": 48,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
      }
    ],
    "documents": [
      {
        "id": 1014,
        "chapterId": 101,
        "title": "Electrostatics Complete Formula Book & Cheatsheet",
        "pdfUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf",
        "fileSizeBytes": "2.4 MB",
        "pageCount": 12,
        "description": "Quick memory formulas, charge distribution tables, and Gauss law shortcuts."
      },
      {
        "id": 1015,
        "chapterId": 101,
        "title": "Capacitance 50 High-Yield DPP Practice Sheet",
        "pdfUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf",
        "fileSizeBytes": "1.8 MB",
        "pageCount": 8,
        "description": "Daily practice problem set with step-by-step verified solutions."
      }
    ],
    "testPapers": [
      {
        "id": 1016,
        "chapterId": 101,
        "testPaperId": 1,
        "title": "Electrostatics & Capacitance Chapter Speed Test",
        "durationMinutes": 45,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 102,
    "subjectId": 1,
    "subjectName": "Physics",
    "title": "Current Electricity & Magnetism",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 1021,
        "chapterId": 102,
        "type": "VIDEO",
        "title": "Kirchhoff's Laws & Infinite Ladder Nodal Analysis",
        "vimeoVideoId": "76979871",
        "durationMinutes": 52,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/kinematics-shortcuts.pdf"
      },
      {
        "id": 1022,
        "chapterId": 102,
        "type": "VIDEO",
        "title": "Magnetic Force, Biot-Savart Law & Ampere Law Shortcuts",
        "vimeoVideoId": "76979871",
        "durationMinutes": 55,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/kinematics-shortcuts.pdf"
      }
    ],
    "documents": [
      {
        "id": 1023,
        "chapterId": 102,
        "title": "Current Electricity & Magnetism Formula Summary",
        "pdfUrl": "/site/assets/docs/kinematics-shortcuts.pdf",
        "fileSizeBytes": "1.9 MB",
        "pageCount": 10,
        "description": "Color-coded circuit diagrams, galvanometer conversions, and Biot-Savart formulas."
      }
    ],
    "testPapers": [
      {
        "id": 1024,
        "chapterId": 102,
        "testPaperId": 2,
        "title": "Current Electricity & Circuits Mastery Test",
        "durationMinutes": 40,
        "totalQuestions": 20,
        "totalMarks": 60,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 103,
    "subjectId": 1,
    "subjectName": "Physics",
    "title": "Oscillations, SHM & Waves",
    "sequenceOrder": 3,
    "lessons": [
      {
        "id": 1031,
        "chapterId": 103,
        "type": "VIDEO",
        "title": "Simple Harmonic Motion Phase & Time Period Shortcuts",
        "vimeoVideoId": "76979871",
        "durationMinutes": 45,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/rotation-notes.pdf"
      },
      {
        "id": 1032,
        "chapterId": 103,
        "type": "VIDEO",
        "title": "Doppler Effect & Standing Wave Resonances in 30 Seconds",
        "vimeoVideoId": "76979871",
        "durationMinutes": 40,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/rotation-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 1033,
        "chapterId": 103,
        "title": "SHM & Wave Optics High-Yield Revision Cheatsheet",
        "pdfUrl": "/site/assets/docs/rotation-notes.pdf",
        "fileSizeBytes": "1.5 MB",
        "pageCount": 9,
        "description": "Phase circle method, resonance tube formulas, and Doppler shift tables."
      }
    ],
    "testPapers": [
      {
        "id": 1034,
        "chapterId": 103,
        "testPaperId": 4,
        "title": "Legacy Oscillations & Comprehensive Science Exam (37 Qs)",
        "durationMinutes": 60,
        "totalQuestions": 37,
        "totalMarks": 111,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 201,
    "subjectId": 2,
    "subjectName": "Chemistry",
    "title": "Chemical Kinetics & Ionic Equilibrium",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 2011,
        "chapterId": 201,
        "type": "VIDEO",
        "title": "First-Order Reaction Half-Life & Rate Law Hacks",
        "vimeoVideoId": "76979871",
        "durationMinutes": 48,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      },
      {
        "id": 2012,
        "chapterId": 201,
        "type": "VIDEO",
        "title": "Buffer Solutions, Henderson-Hasselbalch & Solubility Product",
        "vimeoVideoId": "76979871",
        "durationMinutes": 42,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 2013,
        "chapterId": 201,
        "title": "Chemical Kinetics & Ionic Equilibrium Cheat Sheet",
        "pdfUrl": "/site/assets/docs/calculus-notes.pdf",
        "fileSizeBytes": "1.6 MB",
        "pageCount": 8,
        "description": "Key pH formulas, buffer systems of human blood, and Arrhenius plots."
      }
    ],
    "testPapers": [
      {
        "id": 2014,
        "chapterId": 201,
        "testPaperId": 3,
        "title": "Chemical Kinetics & Equilibrium Chapter Mock",
        "durationMinutes": 35,
        "totalQuestions": 20,
        "totalMarks": 60,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 202,
    "subjectId": 2,
    "subjectName": "Chemistry",
    "title": "Metallurgy & Inorganic Extraction",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 2021,
        "chapterId": 202,
        "type": "VIDEO",
        "title": "Ellingham Diagrams, Smelting & Roasting Fundamentals",
        "vimeoVideoId": "76979871",
        "durationMinutes": 46,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 2022,
        "chapterId": 202,
        "title": "Ores, Minerals & Extraction Flowcharts (PDF)",
        "pdfUrl": "/site/assets/docs/conics-notes.pdf",
        "fileSizeBytes": "2.8 MB",
        "pageCount": 14,
        "description": "Complete Indian mineral distributions (Monazite, Bauxite) and smelting reactions."
      }
    ],
    "testPapers": [
      {
        "id": 2023,
        "chapterId": 202,
        "testPaperId": 1,
        "title": "Inorganic Chemistry & Metallurgy Practice Test",
        "durationMinutes": 30,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 301,
    "subjectId": 3,
    "subjectName": "Mathematics",
    "title": "Speed Calculus & Definite Integration",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 3011,
        "chapterId": 301,
        "type": "VIDEO",
        "title": "King's Property & Symmetric Definite Integrals in 20s",
        "vimeoVideoId": "76979871",
        "durationMinutes": 55,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      },
      {
        "id": 3012,
        "chapterId": 301,
        "type": "VIDEO",
        "title": "Area Under Curve & Differential Equations Direct Patterns",
        "vimeoVideoId": "76979871",
        "durationMinutes": 50,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 3013,
        "chapterId": 301,
        "title": "Calculus 100 Speed Formulas & Quick Graph Reference",
        "pdfUrl": "/site/assets/docs/calculus-notes.pdf",
        "fileSizeBytes": "3.2 MB",
        "pageCount": 16,
        "description": "Standard integral shortcuts, reduction formulas, and Leibniz rule."
      }
    ],
    "testPapers": [
      {
        "id": 3014,
        "chapterId": 301,
        "testPaperId": 1,
        "title": "Calculus High-Speed Diagnostic Test",
        "durationMinutes": 45,
        "totalQuestions": 30,
        "totalMarks": 90,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 302,
    "subjectId": 3,
    "subjectName": "Mathematics",
    "title": "Vectors & 3D Coordinate Geometry",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 3021,
        "chapterId": 302,
        "type": "VIDEO",
        "title": "Vector Triple Products & Plane Projection Shortcuts",
        "vimeoVideoId": "76979871",
        "durationMinutes": 48,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
      },
      {
        "id": 3022,
        "chapterId": 302,
        "type": "VIDEO",
        "title": "Shortest Distance Between Skew Lines in 30 Seconds",
        "vimeoVideoId": "76979871",
        "durationMinutes": 45,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 3023,
        "chapterId": 302,
        "title": "3D Geometry & Vector Algebra Cheatsheet",
        "pdfUrl": "/site/assets/docs/conics-notes.pdf",
        "fileSizeBytes": "2.1 MB",
        "pageCount": 11,
        "description": "Coplanarity conditions, angle between planes, and image of points."
      }
    ],
    "testPapers": [
      {
        "id": 3024,
        "chapterId": 302,
        "testPaperId": 2,
        "title": "Vectors & 3D Geometry Speed Mock",
        "durationMinutes": 35,
        "totalQuestions": 20,
        "totalMarks": 60,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 401,
    "subjectId": 4,
    "subjectName": "English & Logical Reasoning",
    "title": "English Proficiency (Grammar & Vocabulary)",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 4011,
        "chapterId": 401,
        "type": "VIDEO",
        "title": "High-Frequency Vocabulary, Root Words & Spotting Errors",
        "vimeoVideoId": "76979871",
        "durationMinutes": 40,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/english-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 4012,
        "chapterId": 401,
        "title": "BITSAT 500 High-Frequency English Words & Idioms",
        "pdfUrl": "/site/assets/docs/english-notes.pdf",
        "fileSizeBytes": "3.5 MB",
        "pageCount": 20,
        "description": "Guaranteed vocabulary lists, common spelling traps, and grammar rules."
      }
    ],
    "testPapers": [
      {
        "id": 4013,
        "chapterId": 401,
        "testPaperId": 1,
        "title": "English Proficiency Rapid Fire Practice Test",
        "durationMinutes": 20,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 402,
    "subjectId": 4,
    "subjectName": "English & Logical Reasoning",
    "title": "Logical Reasoning & Pattern Analysis",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 4021,
        "chapterId": 402,
        "type": "VIDEO",
        "title": "Number Series, Syllogisms & Figure Matrix Rules",
        "vimeoVideoId": "76979871",
        "durationMinutes": 42,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/lr-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 4022,
        "chapterId": 402,
        "title": "Logical Reasoning Mental Shortcuts & Rulebook",
        "pdfUrl": "/site/assets/docs/lr-notes.pdf",
        "fileSizeBytes": "2.6 MB",
        "pageCount": 15,
        "description": "Direction tests, blood relations, and non-verbal reasoning techniques."
      }
    ],
    "testPapers": [
      {
        "id": 4023,
        "chapterId": 402,
        "testPaperId": 1,
        "title": "Logical Reasoning Speed Booster Test",
        "durationMinutes": 25,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  }
],
  },
  {
    id: 4,
    title: 'JEE Main 2026 High-Yield Crash Batch & Problem Sprints',
    slug: 'jee-main-crash-batch',
    shortDescription:
      'Target 99+ Percentile with targeted chapter sprints, top 500 must-solve problems, formula PDFs, and full-length NTA pattern tests.',
    description:
      'Master the high-weightage topics of JEE Main with crisp concept masterclasses, shortcut approximations, and intensive CBT problem solving.',
    discountPrice: 3999,
    originalPrice: 7999,
    examTag: 'JEE Main',
    category: 'CRASH_COURSE',
    rating: 4.8,
    reviewCount: 940,
    enrolledCount: 5200,
    thumbnailUrl: '/site/assets/images/course-jee-crash.jpg',
    isBestseller: false,
    isFeatured: true,
    features: [
      'Chapter-Wise Video Problem Sprints covering Physics, Chemistry, Maths',
      'Top 500 Must-Solve High Probability Problems',
      '15 NTA Full Syllabus Computer Based Tests',
      'Downloadable Formula Cheatsheets (PDF)',
      'LaTeX Step-by-Step KaTeX Solutions',
    ],
    subjects: MOCK_COURSE_SUBJECTS,
    chapters: [
  {
    "id": 101,
    "subjectId": 1,
    "subjectName": "Physics",
    "title": "Electrostatics & Capacitance",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 1011,
        "chapterId": 101,
        "type": "VIDEO",
        "title": "Coulomb's Law, Electric Fields & Superposition Tricks",
        "vimeoVideoId": "76979871",
        "durationMinutes": 45,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
      },
      {
        "id": 1012,
        "chapterId": 101,
        "type": "VIDEO",
        "title": "Gauss Law, Electric Flux & Symmetric Charge Distributions",
        "vimeoVideoId": "76979871",
        "durationMinutes": 50,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
      },
      {
        "id": 1013,
        "chapterId": 101,
        "type": "VIDEO",
        "title": "Capacitor Networks, Dielectric Insertion & Energy Tricks",
        "vimeoVideoId": "76979871",
        "durationMinutes": 48,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
      }
    ],
    "documents": [
      {
        "id": 1014,
        "chapterId": 101,
        "title": "Electrostatics Complete Formula Book & Cheatsheet",
        "pdfUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf",
        "fileSizeBytes": "2.4 MB",
        "pageCount": 12,
        "description": "Quick memory formulas, charge distribution tables, and Gauss law shortcuts."
      },
      {
        "id": 1015,
        "chapterId": 101,
        "title": "Capacitance 50 High-Yield DPP Practice Sheet",
        "pdfUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf",
        "fileSizeBytes": "1.8 MB",
        "pageCount": 8,
        "description": "Daily practice problem set with step-by-step verified solutions."
      }
    ],
    "testPapers": [
      {
        "id": 1016,
        "chapterId": 101,
        "testPaperId": 1,
        "title": "Electrostatics & Capacitance Chapter Speed Test",
        "durationMinutes": 45,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 102,
    "subjectId": 1,
    "subjectName": "Physics",
    "title": "Current Electricity & Magnetism",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 1021,
        "chapterId": 102,
        "type": "VIDEO",
        "title": "Kirchhoff's Laws & Infinite Ladder Nodal Analysis",
        "vimeoVideoId": "76979871",
        "durationMinutes": 52,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/kinematics-shortcuts.pdf"
      },
      {
        "id": 1022,
        "chapterId": 102,
        "type": "VIDEO",
        "title": "Magnetic Force, Biot-Savart Law & Ampere Law Shortcuts",
        "vimeoVideoId": "76979871",
        "durationMinutes": 55,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/kinematics-shortcuts.pdf"
      }
    ],
    "documents": [
      {
        "id": 1023,
        "chapterId": 102,
        "title": "Current Electricity & Magnetism Formula Summary",
        "pdfUrl": "/site/assets/docs/kinematics-shortcuts.pdf",
        "fileSizeBytes": "1.9 MB",
        "pageCount": 10,
        "description": "Color-coded circuit diagrams, galvanometer conversions, and Biot-Savart formulas."
      }
    ],
    "testPapers": [
      {
        "id": 1024,
        "chapterId": 102,
        "testPaperId": 2,
        "title": "Current Electricity & Circuits Mastery Test",
        "durationMinutes": 40,
        "totalQuestions": 20,
        "totalMarks": 60,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 103,
    "subjectId": 1,
    "subjectName": "Physics",
    "title": "Oscillations, SHM & Waves",
    "sequenceOrder": 3,
    "lessons": [
      {
        "id": 1031,
        "chapterId": 103,
        "type": "VIDEO",
        "title": "Simple Harmonic Motion Phase & Time Period Shortcuts",
        "vimeoVideoId": "76979871",
        "durationMinutes": 45,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/rotation-notes.pdf"
      },
      {
        "id": 1032,
        "chapterId": 103,
        "type": "VIDEO",
        "title": "Doppler Effect & Standing Wave Resonances in 30 Seconds",
        "vimeoVideoId": "76979871",
        "durationMinutes": 40,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/rotation-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 1033,
        "chapterId": 103,
        "title": "SHM & Wave Optics High-Yield Revision Cheatsheet",
        "pdfUrl": "/site/assets/docs/rotation-notes.pdf",
        "fileSizeBytes": "1.5 MB",
        "pageCount": 9,
        "description": "Phase circle method, resonance tube formulas, and Doppler shift tables."
      }
    ],
    "testPapers": [
      {
        "id": 1034,
        "chapterId": 103,
        "testPaperId": 4,
        "title": "Legacy Oscillations & Comprehensive Science Exam (37 Qs)",
        "durationMinutes": 60,
        "totalQuestions": 37,
        "totalMarks": 111,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 201,
    "subjectId": 2,
    "subjectName": "Chemistry",
    "title": "Chemical Kinetics & Ionic Equilibrium",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 2011,
        "chapterId": 201,
        "type": "VIDEO",
        "title": "First-Order Reaction Half-Life & Rate Law Hacks",
        "vimeoVideoId": "76979871",
        "durationMinutes": 48,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      },
      {
        "id": 2012,
        "chapterId": 201,
        "type": "VIDEO",
        "title": "Buffer Solutions, Henderson-Hasselbalch & Solubility Product",
        "vimeoVideoId": "76979871",
        "durationMinutes": 42,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 2013,
        "chapterId": 201,
        "title": "Chemical Kinetics & Ionic Equilibrium Cheat Sheet",
        "pdfUrl": "/site/assets/docs/calculus-notes.pdf",
        "fileSizeBytes": "1.6 MB",
        "pageCount": 8,
        "description": "Key pH formulas, buffer systems of human blood, and Arrhenius plots."
      }
    ],
    "testPapers": [
      {
        "id": 2014,
        "chapterId": 201,
        "testPaperId": 3,
        "title": "Chemical Kinetics & Equilibrium Chapter Mock",
        "durationMinutes": 35,
        "totalQuestions": 20,
        "totalMarks": 60,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 202,
    "subjectId": 2,
    "subjectName": "Chemistry",
    "title": "Metallurgy & Inorganic Extraction",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 2021,
        "chapterId": 202,
        "type": "VIDEO",
        "title": "Ellingham Diagrams, Smelting & Roasting Fundamentals",
        "vimeoVideoId": "76979871",
        "durationMinutes": 46,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 2022,
        "chapterId": 202,
        "title": "Ores, Minerals & Extraction Flowcharts (PDF)",
        "pdfUrl": "/site/assets/docs/conics-notes.pdf",
        "fileSizeBytes": "2.8 MB",
        "pageCount": 14,
        "description": "Complete Indian mineral distributions (Monazite, Bauxite) and smelting reactions."
      }
    ],
    "testPapers": [
      {
        "id": 2023,
        "chapterId": 202,
        "testPaperId": 1,
        "title": "Inorganic Chemistry & Metallurgy Practice Test",
        "durationMinutes": 30,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 301,
    "subjectId": 3,
    "subjectName": "Mathematics",
    "title": "Speed Calculus & Definite Integration",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 3011,
        "chapterId": 301,
        "type": "VIDEO",
        "title": "King's Property & Symmetric Definite Integrals in 20s",
        "vimeoVideoId": "76979871",
        "durationMinutes": 55,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      },
      {
        "id": 3012,
        "chapterId": 301,
        "type": "VIDEO",
        "title": "Area Under Curve & Differential Equations Direct Patterns",
        "vimeoVideoId": "76979871",
        "durationMinutes": 50,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 3013,
        "chapterId": 301,
        "title": "Calculus 100 Speed Formulas & Quick Graph Reference",
        "pdfUrl": "/site/assets/docs/calculus-notes.pdf",
        "fileSizeBytes": "3.2 MB",
        "pageCount": 16,
        "description": "Standard integral shortcuts, reduction formulas, and Leibniz rule."
      }
    ],
    "testPapers": [
      {
        "id": 3014,
        "chapterId": 301,
        "testPaperId": 1,
        "title": "Calculus High-Speed Diagnostic Test",
        "durationMinutes": 45,
        "totalQuestions": 30,
        "totalMarks": 90,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 302,
    "subjectId": 3,
    "subjectName": "Mathematics",
    "title": "Vectors & 3D Coordinate Geometry",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 3021,
        "chapterId": 302,
        "type": "VIDEO",
        "title": "Vector Triple Products & Plane Projection Shortcuts",
        "vimeoVideoId": "76979871",
        "durationMinutes": 48,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
      },
      {
        "id": 3022,
        "chapterId": 302,
        "type": "VIDEO",
        "title": "Shortest Distance Between Skew Lines in 30 Seconds",
        "vimeoVideoId": "76979871",
        "durationMinutes": 45,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 3023,
        "chapterId": 302,
        "title": "3D Geometry & Vector Algebra Cheatsheet",
        "pdfUrl": "/site/assets/docs/conics-notes.pdf",
        "fileSizeBytes": "2.1 MB",
        "pageCount": 11,
        "description": "Coplanarity conditions, angle between planes, and image of points."
      }
    ],
    "testPapers": [
      {
        "id": 3024,
        "chapterId": 302,
        "testPaperId": 2,
        "title": "Vectors & 3D Geometry Speed Mock",
        "durationMinutes": 35,
        "totalQuestions": 20,
        "totalMarks": 60,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 401,
    "subjectId": 4,
    "subjectName": "English & Logical Reasoning",
    "title": "English Proficiency (Grammar & Vocabulary)",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 4011,
        "chapterId": 401,
        "type": "VIDEO",
        "title": "High-Frequency Vocabulary, Root Words & Spotting Errors",
        "vimeoVideoId": "76979871",
        "durationMinutes": 40,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/english-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 4012,
        "chapterId": 401,
        "title": "BITSAT 500 High-Frequency English Words & Idioms",
        "pdfUrl": "/site/assets/docs/english-notes.pdf",
        "fileSizeBytes": "3.5 MB",
        "pageCount": 20,
        "description": "Guaranteed vocabulary lists, common spelling traps, and grammar rules."
      }
    ],
    "testPapers": [
      {
        "id": 4013,
        "chapterId": 401,
        "testPaperId": 1,
        "title": "English Proficiency Rapid Fire Practice Test",
        "durationMinutes": 20,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 402,
    "subjectId": 4,
    "subjectName": "English & Logical Reasoning",
    "title": "Logical Reasoning & Pattern Analysis",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 4021,
        "chapterId": 402,
        "type": "VIDEO",
        "title": "Number Series, Syllogisms & Figure Matrix Rules",
        "vimeoVideoId": "76979871",
        "durationMinutes": 42,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/lr-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 4022,
        "chapterId": 402,
        "title": "Logical Reasoning Mental Shortcuts & Rulebook",
        "pdfUrl": "/site/assets/docs/lr-notes.pdf",
        "fileSizeBytes": "2.6 MB",
        "pageCount": 15,
        "description": "Direction tests, blood relations, and non-verbal reasoning techniques."
      }
    ],
    "testPapers": [
      {
        "id": 4023,
        "chapterId": 402,
        "testPaperId": 1,
        "title": "Logical Reasoning Speed Booster Test",
        "durationMinutes": 25,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  }
],
  },
  {
    id: 5,
    title: 'COMEDK & MET High Yield Booster 2026',
    slug: 'comedk-met-booster',
    shortDescription:
      'Specialized speed test series, formula PDF notes, and shortcut tricks tailored for RVCE, BMSCE, and Manipal aspirants.',
    description:
      'Speed-focused preparation for Karnataka & Manipal engineering entrances. Learn how to solve 180 questions with maximum speed and zero negative mark anxiety.',
    discountPrice: 1999,
    originalPrice: 3999,
    examTag: 'COMEDK',
    category: 'CRASH_COURSE',
    rating: 4.8,
    reviewCount: 620,
    enrolledCount: 3800,
    thumbnailUrl: '/site/assets/images/course-comedk.jpg',
    isBestseller: false,
    isFeatured: false,
    features: [
      'Speed Solving Video Tricks for COMEDK & MET',
      '15 Full Mock Papers with Instant Rank Predictor',
      'Chapter-wise PDF Notes & Formula Sheets',
      'South India Top College Cutoff Analysis',
    ],
    subjects: MOCK_COURSE_SUBJECTS,
    chapters: [
  {
    "id": 101,
    "subjectId": 1,
    "subjectName": "Physics",
    "title": "Electrostatics & Capacitance",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 1011,
        "chapterId": 101,
        "type": "VIDEO",
        "title": "Coulomb's Law, Electric Fields & Superposition Tricks",
        "vimeoVideoId": "76979871",
        "durationMinutes": 45,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
      },
      {
        "id": 1012,
        "chapterId": 101,
        "type": "VIDEO",
        "title": "Gauss Law, Electric Flux & Symmetric Charge Distributions",
        "vimeoVideoId": "76979871",
        "durationMinutes": 50,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
      },
      {
        "id": 1013,
        "chapterId": 101,
        "type": "VIDEO",
        "title": "Capacitor Networks, Dielectric Insertion & Energy Tricks",
        "vimeoVideoId": "76979871",
        "durationMinutes": 48,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
      }
    ],
    "documents": [
      {
        "id": 1014,
        "chapterId": 101,
        "title": "Electrostatics Complete Formula Book & Cheatsheet",
        "pdfUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf",
        "fileSizeBytes": "2.4 MB",
        "pageCount": 12,
        "description": "Quick memory formulas, charge distribution tables, and Gauss law shortcuts."
      },
      {
        "id": 1015,
        "chapterId": 101,
        "title": "Capacitance 50 High-Yield DPP Practice Sheet",
        "pdfUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf",
        "fileSizeBytes": "1.8 MB",
        "pageCount": 8,
        "description": "Daily practice problem set with step-by-step verified solutions."
      }
    ],
    "testPapers": [
      {
        "id": 1016,
        "chapterId": 101,
        "testPaperId": 1,
        "title": "Electrostatics & Capacitance Chapter Speed Test",
        "durationMinutes": 45,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 102,
    "subjectId": 1,
    "subjectName": "Physics",
    "title": "Current Electricity & Magnetism",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 1021,
        "chapterId": 102,
        "type": "VIDEO",
        "title": "Kirchhoff's Laws & Infinite Ladder Nodal Analysis",
        "vimeoVideoId": "76979871",
        "durationMinutes": 52,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/kinematics-shortcuts.pdf"
      },
      {
        "id": 1022,
        "chapterId": 102,
        "type": "VIDEO",
        "title": "Magnetic Force, Biot-Savart Law & Ampere Law Shortcuts",
        "vimeoVideoId": "76979871",
        "durationMinutes": 55,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/kinematics-shortcuts.pdf"
      }
    ],
    "documents": [
      {
        "id": 1023,
        "chapterId": 102,
        "title": "Current Electricity & Magnetism Formula Summary",
        "pdfUrl": "/site/assets/docs/kinematics-shortcuts.pdf",
        "fileSizeBytes": "1.9 MB",
        "pageCount": 10,
        "description": "Color-coded circuit diagrams, galvanometer conversions, and Biot-Savart formulas."
      }
    ],
    "testPapers": [
      {
        "id": 1024,
        "chapterId": 102,
        "testPaperId": 2,
        "title": "Current Electricity & Circuits Mastery Test",
        "durationMinutes": 40,
        "totalQuestions": 20,
        "totalMarks": 60,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 103,
    "subjectId": 1,
    "subjectName": "Physics",
    "title": "Oscillations, SHM & Waves",
    "sequenceOrder": 3,
    "lessons": [
      {
        "id": 1031,
        "chapterId": 103,
        "type": "VIDEO",
        "title": "Simple Harmonic Motion Phase & Time Period Shortcuts",
        "vimeoVideoId": "76979871",
        "durationMinutes": 45,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/rotation-notes.pdf"
      },
      {
        "id": 1032,
        "chapterId": 103,
        "type": "VIDEO",
        "title": "Doppler Effect & Standing Wave Resonances in 30 Seconds",
        "vimeoVideoId": "76979871",
        "durationMinutes": 40,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/rotation-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 1033,
        "chapterId": 103,
        "title": "SHM & Wave Optics High-Yield Revision Cheatsheet",
        "pdfUrl": "/site/assets/docs/rotation-notes.pdf",
        "fileSizeBytes": "1.5 MB",
        "pageCount": 9,
        "description": "Phase circle method, resonance tube formulas, and Doppler shift tables."
      }
    ],
    "testPapers": [
      {
        "id": 1034,
        "chapterId": 103,
        "testPaperId": 4,
        "title": "Legacy Oscillations & Comprehensive Science Exam (37 Qs)",
        "durationMinutes": 60,
        "totalQuestions": 37,
        "totalMarks": 111,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 201,
    "subjectId": 2,
    "subjectName": "Chemistry",
    "title": "Chemical Kinetics & Ionic Equilibrium",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 2011,
        "chapterId": 201,
        "type": "VIDEO",
        "title": "First-Order Reaction Half-Life & Rate Law Hacks",
        "vimeoVideoId": "76979871",
        "durationMinutes": 48,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      },
      {
        "id": 2012,
        "chapterId": 201,
        "type": "VIDEO",
        "title": "Buffer Solutions, Henderson-Hasselbalch & Solubility Product",
        "vimeoVideoId": "76979871",
        "durationMinutes": 42,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 2013,
        "chapterId": 201,
        "title": "Chemical Kinetics & Ionic Equilibrium Cheat Sheet",
        "pdfUrl": "/site/assets/docs/calculus-notes.pdf",
        "fileSizeBytes": "1.6 MB",
        "pageCount": 8,
        "description": "Key pH formulas, buffer systems of human blood, and Arrhenius plots."
      }
    ],
    "testPapers": [
      {
        "id": 2014,
        "chapterId": 201,
        "testPaperId": 3,
        "title": "Chemical Kinetics & Equilibrium Chapter Mock",
        "durationMinutes": 35,
        "totalQuestions": 20,
        "totalMarks": 60,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 202,
    "subjectId": 2,
    "subjectName": "Chemistry",
    "title": "Metallurgy & Inorganic Extraction",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 2021,
        "chapterId": 202,
        "type": "VIDEO",
        "title": "Ellingham Diagrams, Smelting & Roasting Fundamentals",
        "vimeoVideoId": "76979871",
        "durationMinutes": 46,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 2022,
        "chapterId": 202,
        "title": "Ores, Minerals & Extraction Flowcharts (PDF)",
        "pdfUrl": "/site/assets/docs/conics-notes.pdf",
        "fileSizeBytes": "2.8 MB",
        "pageCount": 14,
        "description": "Complete Indian mineral distributions (Monazite, Bauxite) and smelting reactions."
      }
    ],
    "testPapers": [
      {
        "id": 2023,
        "chapterId": 202,
        "testPaperId": 1,
        "title": "Inorganic Chemistry & Metallurgy Practice Test",
        "durationMinutes": 30,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 301,
    "subjectId": 3,
    "subjectName": "Mathematics",
    "title": "Speed Calculus & Definite Integration",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 3011,
        "chapterId": 301,
        "type": "VIDEO",
        "title": "King's Property & Symmetric Definite Integrals in 20s",
        "vimeoVideoId": "76979871",
        "durationMinutes": 55,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      },
      {
        "id": 3012,
        "chapterId": 301,
        "type": "VIDEO",
        "title": "Area Under Curve & Differential Equations Direct Patterns",
        "vimeoVideoId": "76979871",
        "durationMinutes": 50,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 3013,
        "chapterId": 301,
        "title": "Calculus 100 Speed Formulas & Quick Graph Reference",
        "pdfUrl": "/site/assets/docs/calculus-notes.pdf",
        "fileSizeBytes": "3.2 MB",
        "pageCount": 16,
        "description": "Standard integral shortcuts, reduction formulas, and Leibniz rule."
      }
    ],
    "testPapers": [
      {
        "id": 3014,
        "chapterId": 301,
        "testPaperId": 1,
        "title": "Calculus High-Speed Diagnostic Test",
        "durationMinutes": 45,
        "totalQuestions": 30,
        "totalMarks": 90,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 302,
    "subjectId": 3,
    "subjectName": "Mathematics",
    "title": "Vectors & 3D Coordinate Geometry",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 3021,
        "chapterId": 302,
        "type": "VIDEO",
        "title": "Vector Triple Products & Plane Projection Shortcuts",
        "vimeoVideoId": "76979871",
        "durationMinutes": 48,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
      },
      {
        "id": 3022,
        "chapterId": 302,
        "type": "VIDEO",
        "title": "Shortest Distance Between Skew Lines in 30 Seconds",
        "vimeoVideoId": "76979871",
        "durationMinutes": 45,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 3023,
        "chapterId": 302,
        "title": "3D Geometry & Vector Algebra Cheatsheet",
        "pdfUrl": "/site/assets/docs/conics-notes.pdf",
        "fileSizeBytes": "2.1 MB",
        "pageCount": 11,
        "description": "Coplanarity conditions, angle between planes, and image of points."
      }
    ],
    "testPapers": [
      {
        "id": 3024,
        "chapterId": 302,
        "testPaperId": 2,
        "title": "Vectors & 3D Geometry Speed Mock",
        "durationMinutes": 35,
        "totalQuestions": 20,
        "totalMarks": 60,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 401,
    "subjectId": 4,
    "subjectName": "English & Logical Reasoning",
    "title": "English Proficiency (Grammar & Vocabulary)",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 4011,
        "chapterId": 401,
        "type": "VIDEO",
        "title": "High-Frequency Vocabulary, Root Words & Spotting Errors",
        "vimeoVideoId": "76979871",
        "durationMinutes": 40,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/english-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 4012,
        "chapterId": 401,
        "title": "BITSAT 500 High-Frequency English Words & Idioms",
        "pdfUrl": "/site/assets/docs/english-notes.pdf",
        "fileSizeBytes": "3.5 MB",
        "pageCount": 20,
        "description": "Guaranteed vocabulary lists, common spelling traps, and grammar rules."
      }
    ],
    "testPapers": [
      {
        "id": 4013,
        "chapterId": 401,
        "testPaperId": 1,
        "title": "English Proficiency Rapid Fire Practice Test",
        "durationMinutes": 20,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 402,
    "subjectId": 4,
    "subjectName": "English & Logical Reasoning",
    "title": "Logical Reasoning & Pattern Analysis",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 4021,
        "chapterId": 402,
        "type": "VIDEO",
        "title": "Number Series, Syllogisms & Figure Matrix Rules",
        "vimeoVideoId": "76979871",
        "durationMinutes": 42,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/lr-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 4022,
        "chapterId": 402,
        "title": "Logical Reasoning Mental Shortcuts & Rulebook",
        "pdfUrl": "/site/assets/docs/lr-notes.pdf",
        "fileSizeBytes": "2.6 MB",
        "pageCount": 15,
        "description": "Direction tests, blood relations, and non-verbal reasoning techniques."
      }
    ],
    "testPapers": [
      {
        "id": 4023,
        "chapterId": 402,
        "testPaperId": 1,
        "title": "Logical Reasoning Speed Booster Test",
        "durationMinutes": 25,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  }
],
  },
  {
    id: 6,
    title: 'VITEEE 2026 Rank Booster Batch (Rank < 1000 Plan)',
    slug: 'viteee-rank-booster-batch-2026',
    shortDescription:
      'Target Vellore Campus CSE with subject video lectures, English & Aptitude booster modules, PDF notes, and 20 CBT mock tests.',
    description:
      'Master the specific pattern of VITEEE speed solving across PCM, English Aptitude, and rapid chapter drills.',
    discountPrice: 2499,
    originalPrice: 4999,
    examTag: 'VITEEE',
    category: 'CRASH_COURSE',
    rating: 4.9,
    reviewCount: 810,
    enrolledCount: 4600,
    thumbnailUrl: '/site/assets/images/course-viteee.jpg',
    isBestseller: false,
    isFeatured: true,
    features: [
      'Comprehensive PCM + English Aptitude Video Modules',
      '20 Full-Length VITEEE Mock Tests with Timer',
      'Formula Cheatsheets & Downloadable Study Notes (PDF)',
      'Vellore & Chennai Category Cutoff Guidance',
    ],
    subjects: MOCK_COURSE_SUBJECTS,
    chapters: [
  {
    "id": 101,
    "subjectId": 1,
    "subjectName": "Physics",
    "title": "Electrostatics & Capacitance",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 1011,
        "chapterId": 101,
        "type": "VIDEO",
        "title": "Coulomb's Law, Electric Fields & Superposition Tricks",
        "vimeoVideoId": "76979871",
        "durationMinutes": 45,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
      },
      {
        "id": 1012,
        "chapterId": 101,
        "type": "VIDEO",
        "title": "Gauss Law, Electric Flux & Symmetric Charge Distributions",
        "vimeoVideoId": "76979871",
        "durationMinutes": 50,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
      },
      {
        "id": 1013,
        "chapterId": 101,
        "type": "VIDEO",
        "title": "Capacitor Networks, Dielectric Insertion & Energy Tricks",
        "vimeoVideoId": "76979871",
        "durationMinutes": 48,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf"
      }
    ],
    "documents": [
      {
        "id": 1014,
        "chapterId": 101,
        "title": "Electrostatics Complete Formula Book & Cheatsheet",
        "pdfUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf",
        "fileSizeBytes": "2.4 MB",
        "pageCount": 12,
        "description": "Quick memory formulas, charge distribution tables, and Gauss law shortcuts."
      },
      {
        "id": 1015,
        "chapterId": 101,
        "title": "Capacitance 50 High-Yield DPP Practice Sheet",
        "pdfUrl": "/site/assets/docs/electrostatics-cheatsheet.pdf",
        "fileSizeBytes": "1.8 MB",
        "pageCount": 8,
        "description": "Daily practice problem set with step-by-step verified solutions."
      }
    ],
    "testPapers": [
      {
        "id": 1016,
        "chapterId": 101,
        "testPaperId": 1,
        "title": "Electrostatics & Capacitance Chapter Speed Test",
        "durationMinutes": 45,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 102,
    "subjectId": 1,
    "subjectName": "Physics",
    "title": "Current Electricity & Magnetism",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 1021,
        "chapterId": 102,
        "type": "VIDEO",
        "title": "Kirchhoff's Laws & Infinite Ladder Nodal Analysis",
        "vimeoVideoId": "76979871",
        "durationMinutes": 52,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/kinematics-shortcuts.pdf"
      },
      {
        "id": 1022,
        "chapterId": 102,
        "type": "VIDEO",
        "title": "Magnetic Force, Biot-Savart Law & Ampere Law Shortcuts",
        "vimeoVideoId": "76979871",
        "durationMinutes": 55,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/kinematics-shortcuts.pdf"
      }
    ],
    "documents": [
      {
        "id": 1023,
        "chapterId": 102,
        "title": "Current Electricity & Magnetism Formula Summary",
        "pdfUrl": "/site/assets/docs/kinematics-shortcuts.pdf",
        "fileSizeBytes": "1.9 MB",
        "pageCount": 10,
        "description": "Color-coded circuit diagrams, galvanometer conversions, and Biot-Savart formulas."
      }
    ],
    "testPapers": [
      {
        "id": 1024,
        "chapterId": 102,
        "testPaperId": 2,
        "title": "Current Electricity & Circuits Mastery Test",
        "durationMinutes": 40,
        "totalQuestions": 20,
        "totalMarks": 60,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 103,
    "subjectId": 1,
    "subjectName": "Physics",
    "title": "Oscillations, SHM & Waves",
    "sequenceOrder": 3,
    "lessons": [
      {
        "id": 1031,
        "chapterId": 103,
        "type": "VIDEO",
        "title": "Simple Harmonic Motion Phase & Time Period Shortcuts",
        "vimeoVideoId": "76979871",
        "durationMinutes": 45,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/rotation-notes.pdf"
      },
      {
        "id": 1032,
        "chapterId": 103,
        "type": "VIDEO",
        "title": "Doppler Effect & Standing Wave Resonances in 30 Seconds",
        "vimeoVideoId": "76979871",
        "durationMinutes": 40,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/rotation-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 1033,
        "chapterId": 103,
        "title": "SHM & Wave Optics High-Yield Revision Cheatsheet",
        "pdfUrl": "/site/assets/docs/rotation-notes.pdf",
        "fileSizeBytes": "1.5 MB",
        "pageCount": 9,
        "description": "Phase circle method, resonance tube formulas, and Doppler shift tables."
      }
    ],
    "testPapers": [
      {
        "id": 1034,
        "chapterId": 103,
        "testPaperId": 4,
        "title": "Legacy Oscillations & Comprehensive Science Exam (37 Qs)",
        "durationMinutes": 60,
        "totalQuestions": 37,
        "totalMarks": 111,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 201,
    "subjectId": 2,
    "subjectName": "Chemistry",
    "title": "Chemical Kinetics & Ionic Equilibrium",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 2011,
        "chapterId": 201,
        "type": "VIDEO",
        "title": "First-Order Reaction Half-Life & Rate Law Hacks",
        "vimeoVideoId": "76979871",
        "durationMinutes": 48,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      },
      {
        "id": 2012,
        "chapterId": 201,
        "type": "VIDEO",
        "title": "Buffer Solutions, Henderson-Hasselbalch & Solubility Product",
        "vimeoVideoId": "76979871",
        "durationMinutes": 42,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 2013,
        "chapterId": 201,
        "title": "Chemical Kinetics & Ionic Equilibrium Cheat Sheet",
        "pdfUrl": "/site/assets/docs/calculus-notes.pdf",
        "fileSizeBytes": "1.6 MB",
        "pageCount": 8,
        "description": "Key pH formulas, buffer systems of human blood, and Arrhenius plots."
      }
    ],
    "testPapers": [
      {
        "id": 2014,
        "chapterId": 201,
        "testPaperId": 3,
        "title": "Chemical Kinetics & Equilibrium Chapter Mock",
        "durationMinutes": 35,
        "totalQuestions": 20,
        "totalMarks": 60,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 202,
    "subjectId": 2,
    "subjectName": "Chemistry",
    "title": "Metallurgy & Inorganic Extraction",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 2021,
        "chapterId": 202,
        "type": "VIDEO",
        "title": "Ellingham Diagrams, Smelting & Roasting Fundamentals",
        "vimeoVideoId": "76979871",
        "durationMinutes": 46,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 2022,
        "chapterId": 202,
        "title": "Ores, Minerals & Extraction Flowcharts (PDF)",
        "pdfUrl": "/site/assets/docs/conics-notes.pdf",
        "fileSizeBytes": "2.8 MB",
        "pageCount": 14,
        "description": "Complete Indian mineral distributions (Monazite, Bauxite) and smelting reactions."
      }
    ],
    "testPapers": [
      {
        "id": 2023,
        "chapterId": 202,
        "testPaperId": 1,
        "title": "Inorganic Chemistry & Metallurgy Practice Test",
        "durationMinutes": 30,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 301,
    "subjectId": 3,
    "subjectName": "Mathematics",
    "title": "Speed Calculus & Definite Integration",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 3011,
        "chapterId": 301,
        "type": "VIDEO",
        "title": "King's Property & Symmetric Definite Integrals in 20s",
        "vimeoVideoId": "76979871",
        "durationMinutes": 55,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      },
      {
        "id": 3012,
        "chapterId": 301,
        "type": "VIDEO",
        "title": "Area Under Curve & Differential Equations Direct Patterns",
        "vimeoVideoId": "76979871",
        "durationMinutes": 50,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/calculus-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 3013,
        "chapterId": 301,
        "title": "Calculus 100 Speed Formulas & Quick Graph Reference",
        "pdfUrl": "/site/assets/docs/calculus-notes.pdf",
        "fileSizeBytes": "3.2 MB",
        "pageCount": 16,
        "description": "Standard integral shortcuts, reduction formulas, and Leibniz rule."
      }
    ],
    "testPapers": [
      {
        "id": 3014,
        "chapterId": 301,
        "testPaperId": 1,
        "title": "Calculus High-Speed Diagnostic Test",
        "durationMinutes": 45,
        "totalQuestions": 30,
        "totalMarks": 90,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 302,
    "subjectId": 3,
    "subjectName": "Mathematics",
    "title": "Vectors & 3D Coordinate Geometry",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 3021,
        "chapterId": 302,
        "type": "VIDEO",
        "title": "Vector Triple Products & Plane Projection Shortcuts",
        "vimeoVideoId": "76979871",
        "durationMinutes": 48,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
      },
      {
        "id": 3022,
        "chapterId": 302,
        "type": "VIDEO",
        "title": "Shortest Distance Between Skew Lines in 30 Seconds",
        "vimeoVideoId": "76979871",
        "durationMinutes": 45,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/conics-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 3023,
        "chapterId": 302,
        "title": "3D Geometry & Vector Algebra Cheatsheet",
        "pdfUrl": "/site/assets/docs/conics-notes.pdf",
        "fileSizeBytes": "2.1 MB",
        "pageCount": 11,
        "description": "Coplanarity conditions, angle between planes, and image of points."
      }
    ],
    "testPapers": [
      {
        "id": 3024,
        "chapterId": 302,
        "testPaperId": 2,
        "title": "Vectors & 3D Geometry Speed Mock",
        "durationMinutes": 35,
        "totalQuestions": 20,
        "totalMarks": 60,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 401,
    "subjectId": 4,
    "subjectName": "English & Logical Reasoning",
    "title": "English Proficiency (Grammar & Vocabulary)",
    "sequenceOrder": 1,
    "lessons": [
      {
        "id": 4011,
        "chapterId": 401,
        "type": "VIDEO",
        "title": "High-Frequency Vocabulary, Root Words & Spotting Errors",
        "vimeoVideoId": "76979871",
        "durationMinutes": 40,
        "isFreePreview": true,
        "pdfNotesUrl": "/site/assets/docs/english-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 4012,
        "chapterId": 401,
        "title": "BITSAT 500 High-Frequency English Words & Idioms",
        "pdfUrl": "/site/assets/docs/english-notes.pdf",
        "fileSizeBytes": "3.5 MB",
        "pageCount": 20,
        "description": "Guaranteed vocabulary lists, common spelling traps, and grammar rules."
      }
    ],
    "testPapers": [
      {
        "id": 4013,
        "chapterId": 401,
        "testPaperId": 1,
        "title": "English Proficiency Rapid Fire Practice Test",
        "durationMinutes": 20,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  },
  {
    "id": 402,
    "subjectId": 4,
    "subjectName": "English & Logical Reasoning",
    "title": "Logical Reasoning & Pattern Analysis",
    "sequenceOrder": 2,
    "lessons": [
      {
        "id": 4021,
        "chapterId": 402,
        "type": "VIDEO",
        "title": "Number Series, Syllogisms & Figure Matrix Rules",
        "vimeoVideoId": "76979871",
        "durationMinutes": 42,
        "isFreePreview": false,
        "pdfNotesUrl": "/site/assets/docs/lr-notes.pdf"
      }
    ],
    "documents": [
      {
        "id": 4022,
        "chapterId": 402,
        "title": "Logical Reasoning Mental Shortcuts & Rulebook",
        "pdfUrl": "/site/assets/docs/lr-notes.pdf",
        "fileSizeBytes": "2.6 MB",
        "pageCount": 15,
        "description": "Direction tests, blood relations, and non-verbal reasoning techniques."
      }
    ],
    "testPapers": [
      {
        "id": 4023,
        "chapterId": 402,
        "testPaperId": 1,
        "title": "Logical Reasoning Speed Booster Test",
        "durationMinutes": 25,
        "totalQuestions": 25,
        "totalMarks": 75,
        "examTag": "BITSAT"
      }
    ]
  }
],
  },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    studentName: 'Siddharth Nair',
    college: 'BITS Pilani (Pilani Campus) - Computer Science',
    exam: 'BITSAT 2024',
    score: '352 / 390',
    rating: 5,
    content:
      '10Q Challenge was the game-changer for my preparation. The speed-solving hacks and authentic CBT test series helped me unlock the 12 bonus questions on exam day with 20 minutes to spare!',
  },
  {
    id: 2,
    studentName: 'Pooja Agarwal',
    college: 'BITS Pilani (Goa Campus) - Electronics & Instrumentation',
    exam: 'BITSAT 2024',
    score: '324 / 390',
    rating: 5,
    content:
      'The English Proficiency and Logical Reasoning module alone gave me an extra 40 marks that other coachings never focused on. The faculty doubt resolution was lightning fast.',
  },
  {
    id: 3,
    studentName: 'Aditya Kulkarni',
    college: 'BITS Pilani (Hyderabad Campus) - Computer Science',
    exam: 'BITSAT 2024',
    score: '338 / 390',
    rating: 5,
    content:
      'Having a personal BITS Pilani mentor keep me accountable through weekly calls kept my panic away. I recommend 10Q Challenge to every serious engineering aspirant.',
  },
];

export const MOCK_BLOGS: Blog[] = [
  {
    id: 1,
    title: 'BITSAT 2025: How to Score 340+ Marks in 60 Days (Comprehensive Blueprint)',
    slug: 'bitsat-2025-score-340-plus-strategy',
    category: 'BITSAT Strategy',
    summary:
      'A step-by-step master plan for BITSAT: Time allocation per subject, speed shortcuts, and the secret technique to unlock 12 bonus questions without negative marks.',
    contentHtml: `
      <h2>The Reality of BITSAT vs JEE</h2>
      <p>While JEE Main tests depth and calculation persistence, <strong>BITSAT tests pure speed, accuracy, and mental agility</strong>. You have 180 minutes to solve 130 questions, meaning you have only 83 seconds per question.</p>
      
      <h2>1. The Ideal Section Time Allocation</h2>
      <ul>
        <li><strong>Physics (30 Questions):</strong> 40 Minutes</li>
        <li><strong>Chemistry (30 Questions):</strong> 30 Minutes</li>
        <li><strong>Mathematics (40 Questions):</strong> 55 Minutes</li>
        <li><strong>English Proficiency (10 Questions):</strong> 10 Minutes</li>
        <li><strong>Logical Reasoning (20 Questions):</strong> 20 Minutes</li>
        <li><strong>Buffer & Bonus Questions (12 Questions):</strong> 25 Minutes</li>
      </ul>

      <h2>2. The 12 Bonus Questions Strategy</h2>
      <p>Never unlock bonus questions unless you have attempted all 130 standard questions with at least 85% confidence. Once unlocked, you cannot return to edit previous answers.</p>

      <h2>3. Why English & Logical Reasoning Is Your Goldmine</h2>
      <p>30 questions (90 marks) come from English and LR. Most aspirants focus solely on PCM and neglect this section, costing them a seat at BITS Pilani CS.</p>
    `,
    featuredImage: '/site/assets/images/banner1.jpg',
    authorName: 'Ritesh Sharma',
    authorRole: 'BITS Pilani Alum & Founder',
    readTimeMinutes: 7,
    publishedAt: '2025-01-15T10:00:00Z',
    isPublished: true,
    tags: ['BITSAT 2025', 'Speed Strategy', 'Bonus Questions', 'BITS Pilani'],
  },
  {
    id: 2,
    title: 'BITSAT 2025 Chapter-Wise Weightage & High-Yield Analysis',
    slug: 'bitsat-chapter-wise-weightage',
    category: 'Exam Updates',
    summary:
      'Detailed statistical breakdown of the highest-weightage topics in Physics, Chemistry, and Mathematics based on 10 years of BITSAT trends.',
    contentHtml: `
      <h2>Physics High Weightage Chapters</h2>
      <p>Mechanics, Current Electricity, Optics, Modern Physics, and Thermodynamics account for over 65% of the Physics section.</p>
      
      <h2>Mathematics High Weightage Chapters</h2>
      <p>Calculus (Differential & Integral), Vectors & 3D Geometry, Probability, and Coordinate Geometry make up nearly 70% of questions.</p>
    `,
    featuredImage: '/site/assets/images/banner2.jpg',
    authorName: 'Dr. Vivek Agrawal',
    authorRole: 'Senior Physics Faculty',
    readTimeMinutes: 5,
    publishedAt: '2025-02-01T12:30:00Z',
    isPublished: true,
    tags: ['Syllabus', 'Weightage', 'BITSAT Physics', 'Maths'],
  },
  {
    id: 3,
    title: 'How to Eliminate Negative Marking in Computer Based Tests',
    slug: 'eliminate-negative-marking-cbt',
    category: 'Study Habits',
    summary:
      'Master the 50-50 elimination rule, dimensional checking, and intelligent option substitution to turn negative scores into +3 marks.',
    contentHtml: `
      <h2>The Danger of Blind Guessing</h2>
      <p>In BITSAT, every wrong answer costs you 1 mark ($-\\frac{1}{3}$ of a correct question). Blind guessing four questions results in a net penalty of -4 marks.</p>
      
      <h2>Dimensional Analysis Elimination</h2>
      <p>For complicated physics numericals, always verify if the units of options match the requested quantity before attempting lengthy integrations.</p>
    `,
    featuredImage: '/site/assets/images/course-bitsat-test.jpg',
    authorName: 'Prof. Neha Singhal',
    authorRole: 'Master Faculty',
    readTimeMinutes: 6,
    publishedAt: '2025-02-20T08:00:00Z',
    isPublished: true,
    tags: ['Negative Marking', 'CBT Hacks', 'Mock Tests'],
  },
];

export const MOCK_QUESTIONS: Question[] = [
  {
    "id": 101,
    "subject": "Physics",
    "chapter": "Oscillations & SHM",
    "type": "MCQ",
    "questionText": "A particle executes simple harmonic motion with amplitude $A$ and time period $T$. What is the minimum time taken by the particle to travel from the mean position to $x = \\frac{A}{\\sqrt{2}}$?",
    "options": [
      {
        "key": "A",
        "text": "$\\frac{T}{4}$"
      },
      {
        "key": "B",
        "text": "$\\frac{T}{8}$"
      },
      {
        "key": "C",
        "text": "$\\frac{T}{6}$"
      },
      {
        "key": "D",
        "text": "$\\frac{T}{12}$"
      }
    ],
    "correctOption": "B",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Displacement equation: $x = A\\sin(\\omega t)$. At $x = \\frac{A}{\\sqrt{2}}$, $\\sin(\\omega t) = \\frac{1}{\\sqrt{2}} \\implies \\omega t = \\frac{\\pi}{4}$. Since $\\omega = \\frac{2\\pi}{T}$, we get $\\frac{2\\pi}{T} t = \\frac{\\pi}{4} \\implies t = \\frac{T}{8}$."
  },
  {
    "id": 102,
    "subject": "Mathematics",
    "chapter": "Definite Integration",
    "type": "MCQ",
    "questionText": "Evaluate the definite integral: $I = \\int_{0}^{\\pi/2} \\frac{\\sin^3 x}{\\sin^3 x + \\cos^3 x} dx$.",
    "options": [
      {
        "key": "A",
        "text": "$\\pi$"
      },
      {
        "key": "B",
        "text": "$\\frac{\\pi}{2}$"
      },
      {
        "key": "C",
        "text": "$\\frac{\\pi}{4}$"
      },
      {
        "key": "D",
        "text": "$0$"
      }
    ],
    "correctOption": "C",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Using Kings Property: $I = \\int_{0}^{\\pi/2} \\frac{\\cos^3 x}{\\cos^3 x + \\sin^3 x} dx$. Adding both equations: $2I = \\int_{0}^{\\pi/2} 1 dx = \\frac{\\pi}{2} \\implies I = \\frac{\\pi}{4}$."
  },
  {
    "id": 103,
    "subject": "Chemistry",
    "chapter": "Chemical Kinetics",
    "type": "MCQ",
    "questionText": "For a first order reaction, the time required for 99.9% completion is approximately how many times the half-life period ($t_{1/2}$)?",
    "options": [
      {
        "key": "A",
        "text": "5 times"
      },
      {
        "key": "B",
        "text": "10 times"
      },
      {
        "key": "C",
        "text": "3 times"
      },
      {
        "key": "D",
        "text": "7 times"
      }
    ],
    "correctOption": "B",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "For 99.9% completion, remaining concentration is 0.1% = $10^{-3} [A]_0$. $t_{99.9\\%} = \\frac{2.303}{k} \\log(10^3) = \\frac{3 \\times 2.303}{k}$. Since $t_{1/2} = \\frac{0.693}{k} = \\frac{2.303 \\times 0.3010}{k}$, we get $t_{99.9\\%} \\approx 10 \\times t_{1/2}$."
  },
  {
    "id": 104,
    "subject": "Physics",
    "chapter": "Current Electricity",
    "type": "NUMERICAL",
    "questionText": "Two resistors of resistances $R_1 = 6\\,\\Omega$ and $R_2 = 12\\,\\Omega$ are connected in parallel across a $24\\,\\text{V}$ battery. Calculate the total current (in Amperes) drawn from the battery.",
    "options": [],
    "correctOption": "6",
    "marksPositive": 3,
    "marksNegative": 0,
    "explanation": "Equivalent resistance $R_{eq} = \\frac{R_1 R_2}{R_1 + R_2} = \\frac{6 \\times 12}{6 + 12} = 4\\,\\Omega$. Current $I = \\frac{V}{R_{eq}} = \\frac{24}{4} = 6\\,\\text{A}$."
  },
  {
    "id": 105,
    "subject": "Logical Reasoning",
    "chapter": "Number Series",
    "type": "MCQ",
    "questionText": "Find the next number in the given series: $3, 7, 15, 31, 63, \\,?$",
    "options": [
      {
        "key": "A",
        "text": "127"
      },
      {
        "key": "B",
        "text": "125"
      },
      {
        "key": "C",
        "text": "120"
      },
      {
        "key": "D",
        "text": "131"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Pattern: $x_{n} = 2x_{n-1} + 1$. Next term = $2(63) + 1 = 127$."
  },
  {
    "id": 106,
    "subject": "Physics",
    "chapter": "Electrostatics",
    "type": "MCQ",
    "questionText": "Two point charges $+q$ and $-q$ are placed at distance $d$ apart. What is the electric field magnitude at the midpoint between them?",
    "options": [
      {
        "key": "A",
        "text": "Zero"
      },
      {
        "key": "B",
        "text": "$\\frac{8kq}{d^2}$"
      },
      {
        "key": "C",
        "text": "$\\frac{4kq}{d^2}$"
      },
      {
        "key": "D",
        "text": "$\\frac{2kq}{d^2}$"
      }
    ],
    "correctOption": "B",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "At the midpoint $r = d/2$. Fields due to $+q$ and $-q$ point in the same direction: $E = \\frac{kq}{(d/2)^2} + \\frac{kq}{(d/2)^2} = \\frac{4kq}{d^2} + \\frac{4kq}{d^2} = \\frac{8kq}{d^2}$."
  },
  {
    "id": 107,
    "subject": "Physics",
    "chapter": "Capacitance",
    "type": "MCQ",
    "questionText": "A parallel plate capacitor of capacitance $C$ is charged to potential $V$. If a dielectric slab of dielectric constant $K=4$ is inserted while disconnected from the battery, the new stored energy is:",
    "options": [
      {
        "key": "A",
        "text": "$4U$"
      },
      {
        "key": "B",
        "text": "$\\frac{U}{4}$"
      },
      {
        "key": "C",
        "text": "$2U$"
      },
      {
        "key": "D",
        "text": "$U$"
      }
    ],
    "correctOption": "B",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "When disconnected from battery, charge $Q$ remains conserved. $U = \\frac{Q^2}{2C}$. With dielectric, $C' = KC = 4C$, so $U' = \\frac{Q^2}{2(4C)} = \\frac{U}{4}$."
  },
  {
    "id": 108,
    "subject": "Physics",
    "chapter": "Current Electricity",
    "type": "NUMERICAL",
    "questionText": "Calculate the equivalent resistance (in $\\Omega$) between terminals A and B of an infinite ladder network of $1\\,\\Omega$ resistors.",
    "options": [],
    "correctOption": "1.618",
    "marksPositive": 3,
    "marksNegative": 0,
    "explanation": "Let equivalent resistance be $R$. Then $R = 1 + \\frac{1 \\cdot R}{1 + R} \\implies R^2 - R - 1 = 0 \\implies R = \\frac{1+\\sqrt{5}}{2} \\approx 1.618\\,\\Omega$."
  },
  {
    "id": 1,
    "subject": "Chemistry",
    "chapter": "Metallurgy & Extraction",
    "type": "MCQ",
    "questionText": "The metallurgical process in which a metal is obtained in a fused (molten) state is called:",
    "options": [
      {
        "key": "A",
        "text": "Smelting"
      },
      {
        "key": "B",
        "text": "Roasting"
      },
      {
        "key": "C",
        "text": "Calcination"
      },
      {
        "key": "D",
        "text": "Froth Floatation"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Smelting is a metallurgical thermal reduction process where roasted or calcined ore is heated above the melting point of the metal with a suitable reducing agent and flux."
  },
  {
    "id": 2,
    "subject": "General Science",
    "chapter": "Genetics & Molecular Biology",
    "type": "MCQ",
    "questionText": "The inherited traits of an organism are primarily encoded and controlled by:",
    "options": [
      {
        "key": "A",
        "text": "DNA molecules (Genes)"
      },
      {
        "key": "B",
        "text": "RNA molecules"
      },
      {
        "key": "C",
        "text": "Free Nucleotides"
      },
      {
        "key": "D",
        "text": "Enzymes"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Inherited genetic traits are coded in the precise sequence of nucleotide base pairs within deoxyribonucleic acid (DNA) genes."
  },
  {
    "id": 3,
    "subject": "Chemistry",
    "chapter": "Mole Concept & Stoichiometry",
    "type": "MCQ",
    "questionText": "What are the number of moles of $\\text{CO}_2$ which contains $16\\,\\text{g}$ of oxygen?",
    "options": [
      {
        "key": "A",
        "text": "$0.5\\text{ mole}$"
      },
      {
        "key": "B",
        "text": "$0.25\\text{ mole}$"
      },
      {
        "key": "C",
        "text": "$1.0\\text{ mole}$"
      },
      {
        "key": "D",
        "text": "$2.0\\text{ moles}$"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "$1\\text{ mole of }\\text{CO}_2$ contains $32\\,\\text{g}$ of oxygen. Hence, $16\\,\\text{g}$ of oxygen corresponds to $\\frac{16}{32} = 0.5\\text{ mole of }\\text{CO}_2$."
  },
  {
    "id": 4,
    "subject": "General Knowledge",
    "chapter": "Indian Polity & Geography",
    "type": "MCQ",
    "questionText": "What is the national capital of the Republic of India?",
    "options": [
      {
        "key": "A",
        "text": "New Delhi"
      },
      {
        "key": "B",
        "text": "Mumbai"
      },
      {
        "key": "C",
        "text": "Kolkata"
      },
      {
        "key": "D",
        "text": "Bengaluru"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "New Delhi is the official national capital and seat of the Government of India."
  },
  {
    "id": 5,
    "subject": "Chemistry",
    "chapter": "Thermodynamics & Bioenergetics",
    "type": "MCQ",
    "questionText": "The heat energy produced when the human body metabolizes $1\\,\\text{gram}$ of fat is approximately:",
    "options": [
      {
        "key": "A",
        "text": "$37\\text{ kJ to }39\\text{ kJ}$ ($9\\text{ kcal}$)"
      },
      {
        "key": "B",
        "text": "$17\\text{ kJ}$ ($4\\text{ kcal}$)"
      },
      {
        "key": "C",
        "text": "$1\\text{ kJ}$"
      },
      {
        "key": "D",
        "text": "$4.2\\text{ kJ}$"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Complete physiological oxidation of $1\\,\\text{g}$ of lipid/fat yields roughly $37-39\\,\\text{kJ}$ ($9\\,\\text{kcal}$) of energy, more than double that of carbohydrates or proteins ($17\\,\\text{kJ/g}$)."
  },
  {
    "id": 6,
    "subject": "Physics",
    "chapter": "Atomic Structure",
    "type": "MCQ",
    "questionText": "The nucleus of a neutral hydrogen atom ($^1\\text{H}$, Protium) consists of:",
    "options": [
      {
        "key": "A",
        "text": "1 proton only"
      },
      {
        "key": "B",
        "text": "1 proton and 1 neutron"
      },
      {
        "key": "C",
        "text": "1 neutron only"
      },
      {
        "key": "D",
        "text": "1 electron only"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "The predominant isotope of hydrogen, protium ($^1_1\\text{H}$), has an atomic number of 1 and mass number of 1, meaning its nucleus contains 1 single proton and zero neutrons."
  },
  {
    "id": 7,
    "subject": "Chemistry",
    "chapter": "Periodic Properties",
    "type": "MCQ",
    "questionText": "The most electronegative element in the periodic table is:",
    "options": [
      {
        "key": "A",
        "text": "Fluorine (F)"
      },
      {
        "key": "B",
        "text": "Chlorine (Cl)"
      },
      {
        "key": "C",
        "text": "Oxygen (O)"
      },
      {
        "key": "D",
        "text": "Nitrogen (N)"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Fluorine has the highest Pauling electronegativity value of $3.98$, owing to its small atomic radius and high effective nuclear charge."
  },
  {
    "id": 8,
    "subject": "Physics",
    "chapter": "Kinetic Theory of Gases",
    "type": "MCQ",
    "questionText": "At a given absolute temperature $T$, the molecules of which of the following gases possess the highest root-mean-square speed ($v_{rms}$)?",
    "options": [
      {
        "key": "A",
        "text": "$\\text{H}_2$ (Hydrogen, $M=2$)"
      },
      {
        "key": "B",
        "text": "$\\text{CH}_4$ (Methane, $M=16$)"
      },
      {
        "key": "C",
        "text": "$\\text{N}_2$ (Nitrogen, $M=28$)"
      },
      {
        "key": "D",
        "text": "$\\text{O}_2$ (Oxygen, $M=32$)"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "$v_{rms} = \\sqrt{\\frac{3RT}{M}}$. Since rms speed is inversely proportional to the square root of molar mass $\\sqrt{M}$, Hydrogen ($M = 2\\,\\text{g/mol}$) has the highest speed."
  },
  {
    "id": 9,
    "subject": "Physics",
    "chapter": "Nuclear Physics",
    "type": "MCQ",
    "questionText": "The subatomic exchange particles responsible for holding protons and neutrons together in the nucleus are:",
    "options": [
      {
        "key": "A",
        "text": "Pi-Mesons (Pions)"
      },
      {
        "key": "B",
        "text": "Positrons"
      },
      {
        "key": "C",
        "text": "Photons"
      },
      {
        "key": "D",
        "text": "Gravitons"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "According to Yukawa theory of strong nuclear interaction, the exchange of virtual pi-mesons ($\\pi$-mesons) mediates the short-range attractive nuclear force between nucleons."
  },
  {
    "id": 10,
    "subject": "Chemistry",
    "chapter": "Electrochemistry",
    "type": "MCQ",
    "questionText": "Which metal can be economically used to recover metallic copper from an aqueous solution of copper sulphate ($\\text{CuSO}_4$)?",
    "options": [
      {
        "key": "A",
        "text": "Iron (Fe)"
      },
      {
        "key": "B",
        "text": "Silver (Ag)"
      },
      {
        "key": "C",
        "text": "Gold (Au)"
      },
      {
        "key": "D",
        "text": "Mercury (Hg)"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Iron has a lower standard reduction potential ($E^\\circ = -0.44\\,\\text{V}$) than Copper ($E^\\circ = +0.34\\,\\text{V}$) and spontaneously displaces copper: $\\text{Fe} + \\text{CuSO}_4 \\rightarrow \\text{FeSO}_4 + \\text{Cu}\\downarrow$."
  },
  {
    "id": 11,
    "subject": "Chemistry",
    "chapter": "Solutions & Colligative Properties",
    "type": "MCQ",
    "questionText": "The number of moles of solute dissolved per kilogram ($1000\\,\\text{g}$) of solvent is defined as:",
    "options": [
      {
        "key": "A",
        "text": "Molality ($m$)"
      },
      {
        "key": "B",
        "text": "Molarity ($M$)"
      },
      {
        "key": "C",
        "text": "Normality ($N$)"
      },
      {
        "key": "D",
        "text": "Formality"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Molality ($m$) is mass-based and hence independent of temperature changes."
  },
  {
    "id": 12,
    "subject": "Chemistry",
    "chapter": "Surface Chemistry & Catalysis",
    "type": "MCQ",
    "questionText": "The transition metal widely used as a heterogeneous catalyst in the industrial hydrogenation of vegetable oils is:",
    "options": [
      {
        "key": "A",
        "text": "Finely divided Nickel (Ni)"
      },
      {
        "key": "B",
        "text": "Lead (Pb)"
      },
      {
        "key": "C",
        "text": "Tin (Sn)"
      },
      {
        "key": "D",
        "text": "Zinc (Zn)"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Finely divided Nickel catalyst (Sabatier-Senderens reaction) facilitates the addition of hydrogen across unsaturated $C=C$ bonds at $473\\,\\text{K}$."
  },
  {
    "id": 13,
    "subject": "Chemistry",
    "chapter": "Ionic Equilibrium & Buffers",
    "type": "MCQ",
    "questionText": "The primary physiological buffer system regulating the pH of human blood plasma is:",
    "options": [
      {
        "key": "A",
        "text": "$\\text{H}_2\\text{CO}_3 - \\text{HCO}_3^-$ (Carbonic acid - Bicarbonate)"
      },
      {
        "key": "B",
        "text": "$\\text{NaH}_2\\text{PO}_4 - \\text{Na}_2\\text{HPO}_4$"
      },
      {
        "key": "C",
        "text": "$\\text{CH}_3\\text{COOH} - \\text{CH}_3\\text{COONa}$"
      },
      {
        "key": "D",
        "text": "$\\text{HCl} - \\text{NaCl}$"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "The bicarbonate buffer system maintaining $\\text{pH} \\approx 7.40$ is governed by $\\text{CO}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_2\\text{CO}_3 \\rightleftharpoons \\text{H}^+ + \\text{HCO}_3^-$."
  },
  {
    "id": 14,
    "subject": "Chemistry",
    "chapter": "Hydrocarbons",
    "type": "MCQ",
    "questionText": "An octane rating of zero ($0$) is standardly assigned to which hydrocarbon?",
    "options": [
      {
        "key": "A",
        "text": "$n$-heptane"
      },
      {
        "key": "B",
        "text": "Iso-octane ($2,2,4$-trimethylpentane)"
      },
      {
        "key": "C",
        "text": "Neopentane"
      },
      {
        "key": "D",
        "text": "Toluene"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "In anti-knock rating standards, straight-chain $n$-heptane knocks severely and is assigned Octane Number $= 0$, whereas highly branched $2,2,4$-trimethylpentane is assigned $100$."
  },
  {
    "id": 15,
    "subject": "Chemistry",
    "chapter": "p-Block Elements",
    "type": "MCQ",
    "questionText": "The most commonly used commercial bleaching and water disinfecting agent is:",
    "options": [
      {
        "key": "A",
        "text": "Chlorine ($\\text{Cl}_2$)"
      },
      {
        "key": "B",
        "text": "Carbon Dioxide ($\\text{CO}_2$)"
      },
      {
        "key": "C",
        "text": "Nitrogen Dioxide ($\\text{NO}_2$)"
      },
      {
        "key": "D",
        "text": "Argon ($\\text{Ar}$)"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Chlorine hydrolyzes in water to form nascent oxygen and hypochlorous acid ($\\text{HOCl}$), which bleaches organic dyes and disinfects microbial pathogens."
  },
  {
    "id": 16,
    "subject": "Chemistry",
    "chapter": "Noble Gases",
    "type": "MCQ",
    "questionText": "The most abundant noble (rare) gas present in the Earth atmosphere by volume is:",
    "options": [
      {
        "key": "A",
        "text": "Argon (Ar)"
      },
      {
        "key": "B",
        "text": "Helium (He)"
      },
      {
        "key": "C",
        "text": "Neon (Ne)"
      },
      {
        "key": "D",
        "text": "Krypton (Kr)"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Argon makes up approximately $0.934\\%$ of the Earths atmosphere by volume, far surpassing helium and neon."
  },
  {
    "id": 17,
    "subject": "Physics",
    "chapter": "Nuclear Physics",
    "type": "MCQ",
    "questionText": "The atomic nucleus of all multi-electron elements consists of:",
    "options": [
      {
        "key": "A",
        "text": "Protons and Neutrons (Nucleons)"
      },
      {
        "key": "B",
        "text": "Protons and Electrons"
      },
      {
        "key": "C",
        "text": "Neutrons and Electrons"
      },
      {
        "key": "D",
        "text": "Positrons and Neutrinos"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "The atomic nucleus consists of positively charged protons and electrically neutral neutrons, collectively called nucleons."
  },
  {
    "id": 18,
    "subject": "Chemistry",
    "chapter": "Mineral Resources of India",
    "type": "MCQ",
    "questionText": "The thorium-bearing mineral ore found in rich abundance along the coastal beach sands of Kerala and Odisha is:",
    "options": [
      {
        "key": "A",
        "text": "Monazite sand"
      },
      {
        "key": "B",
        "text": "Bauxite"
      },
      {
        "key": "C",
        "text": "Hematite"
      },
      {
        "key": "D",
        "text": "Pitchblende"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Monazite is a reddish-brown phosphate mineral containing thorium, lanthanum, and cerium, abundant on Indias southwestern coastline."
  },
  {
    "id": 19,
    "subject": "Physics",
    "chapter": "Thermal Physics & Calorimetry",
    "type": "MCQ",
    "questionText": "The amount of heat required to raise the temperature of an entire body of mass $m$ by $1\\,\\text{K}$ is termed its:",
    "options": [
      {
        "key": "A",
        "text": "Heat Capacity (Thermal Capacity)"
      },
      {
        "key": "B",
        "text": "Specific Heat Capacity"
      },
      {
        "key": "C",
        "text": "Water Equivalent"
      },
      {
        "key": "D",
        "text": "Latent Heat of Fusion"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Heat capacity $C = ms = \\frac{\\Delta Q}{\\Delta T}$ is the heat required for the whole body per Kelvin, whereas specific heat capacity is per unit mass ($1\\,\\text{kg}$)."
  },
  {
    "id": 20,
    "subject": "Chemistry",
    "chapter": "Polymers",
    "type": "MCQ",
    "questionText": "The repeating monomer unit of Polyethylene (Polythene) is:",
    "options": [
      {
        "key": "A",
        "text": "Ethene (Ethylene, $\\text{CH}_2=\\text{CH}_2$)"
      },
      {
        "key": "B",
        "text": "Propene"
      },
      {
        "key": "C",
        "text": "Vinyl chloride"
      },
      {
        "key": "D",
        "text": "Tetrafluoroethene"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Addition polymerization of ethene monomers under high pressure/Ziegler-Natta catalyst forms polyethylene: $n(\\text{CH}_2=\\text{CH}_2) \\rightarrow (-\\text{CH}_2-\\text{CH}_2-)_n$."
  },
  {
    "id": 21,
    "subject": "Physics",
    "chapter": "Astronomy & Gravitation",
    "type": "MCQ",
    "questionText": "Stars appear to rise in the east and set in the west because:",
    "options": [
      {
        "key": "A",
        "text": "The Earth rotates on its axis from West to East"
      },
      {
        "key": "B",
        "text": "The Earth rotates on its axis from East to West"
      },
      {
        "key": "C",
        "text": "The entire celestial sphere rotates westward"
      },
      {
        "key": "D",
        "text": "The Sun exerts a westward gravitational torque"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Because Earth completes a counterclockwise axial rotation from West to East every 24 hours, celestial bodies appear to move East to West in the observer reference frame."
  },
  {
    "id": 22,
    "subject": "Physics",
    "chapter": "Fluid Mechanics & Surface Tension",
    "type": "MCQ",
    "questionText": "The absorption of liquid ink into blotting paper is primarily governed by:",
    "options": [
      {
        "key": "A",
        "text": "Capillary Action"
      },
      {
        "key": "B",
        "text": "Viscous Shear Flow"
      },
      {
        "key": "C",
        "text": "Diffusion of Vapor"
      },
      {
        "key": "D",
        "text": "Centrifugal Force"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Pores in cellulose fibers act as micro-capillaries. Surface tension and adhesion draw the liquid upward against gravity ($h = \\frac{2T\\cos\\theta}{\\rho g r}$)."
  },
  {
    "id": 23,
    "subject": "General Science",
    "chapter": "Terminology & Concepts",
    "type": "MCQ",
    "questionText": "Which of the following terms does NOT belong to the discipline of Physics?",
    "options": [
      {
        "key": "A",
        "text": "Stock Dividend"
      },
      {
        "key": "B",
        "text": "Latent Heat"
      },
      {
        "key": "C",
        "text": "Refractive Index"
      },
      {
        "key": "D",
        "text": "Nuclear Fission"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Stock Dividend is a corporate finance/equity term, whereas Latent Heat, Refractive Index, and Nuclear Fission are foundational physics concepts."
  },
  {
    "id": 24,
    "subject": "Physics",
    "chapter": "Electromagnetic Induction & AC",
    "type": "MCQ",
    "questionText": "Large step-up and step-down electrical transformers heat up during continuous duty due to:",
    "options": [
      {
        "key": "A",
        "text": "Joule heating ($I^2R$) and Eddy current hysteresis in iron cores"
      },
      {
        "key": "B",
        "text": "Dielectric breakdown of air"
      },
      {
        "key": "C",
        "text": "Nuclear decay of copper windings"
      },
      {
        "key": "D",
        "text": "Mechanical friction of iron laminations"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Transformer losses arise from resistive winding heating ($I^2R$) and continuous magnetic domain reversal (hysteresis + eddy currents) inside the core."
  },
  {
    "id": 25,
    "subject": "Physics",
    "chapter": "Current Electricity & Solid State",
    "type": "MCQ",
    "questionText": "Metallic elements are excellent conductors of electricity because:",
    "options": [
      {
        "key": "A",
        "text": "They possess a high density of free conduction electrons"
      },
      {
        "key": "B",
        "text": "Their nuclei are lightly packed"
      },
      {
        "key": "C",
        "text": "They have low melting temperatures"
      },
      {
        "key": "D",
        "text": "Their atoms carry positive net charges"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Metals have overlapping valence and conduction bands, providing high density of delocalized free electrons that drift under an applied electric field."
  },
  {
    "id": 26,
    "subject": "Physics",
    "chapter": "Units & Measurements",
    "type": "MCQ",
    "questionText": "A Light Year is a fundamental unit of:",
    "options": [
      {
        "key": "A",
        "text": "Astronomical Distance"
      },
      {
        "key": "B",
        "text": "Time Duration"
      },
      {
        "key": "C",
        "text": "Luminous Intensity"
      },
      {
        "key": "D",
        "text": "Light Speed"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "One Light Year ($1\\,\\text{ly}$) is the distance traversed by a photon in vacuum in 1 Julian year: $d = c \\times t \\approx 9.46 \\times 10^{15}\\,\\text{m}$."
  },
  {
    "id": 27,
    "subject": "Physics",
    "chapter": "Nuclear Physics",
    "type": "MCQ",
    "questionText": "Nuclear radii and subatomic distances are conventionally measured in:",
    "options": [
      {
        "key": "A",
        "text": "Fermi (Femtometer, $1\\,\\text{fm} = 10^{-15}\\,\\text{m}$)"
      },
      {
        "key": "B",
        "text": "Angstrom ($1\\,\\text{\\AA} = 10^{-10}\\,\\text{m}$)"
      },
      {
        "key": "C",
        "text": "Nanometer ($10^{-9}\\,\\text{m}$)"
      },
      {
        "key": "D",
        "text": "Micrometer ($10^{-6}\\,\\text{m}$)"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Nuclear radii follow $R = R_0 A^{1/3}$ where $R_0 \\approx 1.2\\,\\text{fm}$ ($10^{-15}\\,\\text{m}$)."
  },
  {
    "id": 28,
    "subject": "Physics",
    "chapter": "Semiconductor Electronics",
    "type": "MCQ",
    "questionText": "In electronics, a rectifier circuit composed of p-n junction diodes is used to convert:",
    "options": [
      {
        "key": "A",
        "text": "Alternating Current (AC) to Direct Current (DC)"
      },
      {
        "key": "B",
        "text": "Direct Current (DC) to Alternating Current (AC)"
      },
      {
        "key": "C",
        "text": "Low AC voltage to High AC voltage"
      },
      {
        "key": "D",
        "text": "Analog signal to Digital signal"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Diodes conduct in only one direction (forward bias), converting bidirectional AC waveforms into unidirectional pulsating DC."
  },
  {
    "id": 29,
    "subject": "Physics",
    "chapter": "Work, Energy & Power",
    "type": "MCQ",
    "questionText": "It requires less applied force to roll a heavy stone up an inclined sloping ramp than to lift it vertically because:",
    "options": [
      {
        "key": "A",
        "text": "Force is exerted against only a component of weight ($mg\\sin\\theta$)"
      },
      {
        "key": "B",
        "text": "The gravitational acceleration $g$ decreases on slopes"
      },
      {
        "key": "C",
        "text": "Rolling friction exceeds gravitational force"
      },
      {
        "key": "D",
        "text": "The net work done becomes zero"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "On a frictionless inclined plane of angle $\\theta$, the component of gravity parallel to the incline is $mg\\sin\\theta < mg$."
  },
  {
    "id": 30,
    "subject": "Physics",
    "chapter": "Nuclear Physics & Radioactivity",
    "type": "MCQ",
    "questionText": "Radiocarbon ($^{14}\\text{C}$) used in carbon dating is continuously generated in the Earth upper atmosphere by:",
    "options": [
      {
        "key": "A",
        "text": "Cosmic-ray neutron bombardment of atmospheric nitrogen ($^{14}\\text{N}$)"
      },
      {
        "key": "B",
        "text": "Solar proton capture by oxygen"
      },
      {
        "key": "C",
        "text": "Radioactive radon gas emission from rocks"
      },
      {
        "key": "D",
        "text": "Lightning ionization of carbon dioxide"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Thermal cosmic neutrons collide with stable nitrogen: $^1_0\\text{n} + ^{14}_7\\text{N} \\rightarrow ^{14}_6\\text{C} + ^1_1\\text{p}$."
  },
  {
    "id": 31,
    "subject": "Physics",
    "chapter": "Fluid Dynamics",
    "type": "MCQ",
    "questionText": "A liquid siphon will completely fail to operate if:",
    "options": [
      {
        "key": "A",
        "text": "The apparatus is placed in a vacuum or crest height exceeds the barometric height"
      },
      {
        "key": "B",
        "text": "The two tube limbs are of unequal length"
      },
      {
        "key": "C",
        "text": "The siphon tube is curved"
      },
      {
        "key": "D",
        "text": "The liquid has high surface tension"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Siphoning relies on ambient atmospheric pressure to push liquid over the crest. In a vacuum, or if height exceeds barometric height, liquid vaporizes and flow ceases."
  },
  {
    "id": 32,
    "subject": "Physics",
    "chapter": "Vectors & Kinematics",
    "type": "MCQ",
    "questionText": "Identify the SCALAR quantity among the following physical quantities:",
    "options": [
      {
        "key": "A",
        "text": "Pressure (Hydrostatic)"
      },
      {
        "key": "B",
        "text": "Velocity"
      },
      {
        "key": "C",
        "text": "Acceleration"
      },
      {
        "key": "D",
        "text": "Force Vector"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Hydrostatic pressure transmits isotropically in all directions at a given depth and is characterized completely by a single scalar magnitude."
  },
  {
    "id": 33,
    "subject": "Physics",
    "chapter": "Ray Optics & Refraction",
    "type": "MCQ",
    "questionText": "Planets do NOT twinkle in the night sky like distant stars because:",
    "options": [
      {
        "key": "A",
        "text": "They are closer to Earth and act as extended sources of light averaging out atmospheric fluctuation"
      },
      {
        "key": "B",
        "text": "Planets emit constant coherent light"
      },
      {
        "key": "C",
        "text": "Light from planets does not pass through the atmosphere"
      },
      {
        "key": "D",
        "text": "Planets are strictly stationary relative to Earth"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Stars are point sources whose apparent position easily shifts due to atmospheric turbulence. Planets are extended disks consisting of countless points whose intensity variations cancel out on average."
  },
  {
    "id": 34,
    "subject": "Physics",
    "chapter": "Units & Measurements",
    "type": "MCQ",
    "questionText": "Pascal ($\\text{Pa}$) is the standard SI derived unit of:",
    "options": [
      {
        "key": "A",
        "text": "Pressure and Mechanical Stress ($\\text{N/m}^2$)"
      },
      {
        "key": "B",
        "text": "Work and Energy"
      },
      {
        "key": "C",
        "text": "Power"
      },
      {
        "key": "D",
        "text": "Viscosity"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "$1\\,\\text{Pascal} = 1\\,\\text{Newton per square meter} = 1\\,\\text{N}\\cdot\\text{m}^{-2}$."
  },
  {
    "id": 35,
    "subject": "Physics",
    "chapter": "Ray Optics",
    "type": "MCQ",
    "questionText": "The optical mirage observed over hot desert sands and paved highways is primarily caused by:",
    "options": [
      {
        "key": "A",
        "text": "Total Internal Reflection (TIR) in heated air layers of varying refractive index"
      },
      {
        "key": "B",
        "text": "Specular reflection from ground minerals"
      },
      {
        "key": "C",
        "text": "Light diffraction around particulate dust"
      },
      {
        "key": "D",
        "text": "Atmospheric polarization"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "Air closest to the sun-baked ground is hot and less dense ($n$ lower). Light rays from the sky bending away from the normal undergo Total Internal Reflection when the angle of incidence exceeds the critical angle."
  },
  {
    "id": 36,
    "subject": "Computer Science & Logic",
    "chapter": "Binary & Boolean Algebra",
    "type": "MCQ",
    "questionText": "In the base-2 binary numbering system, the decimal integer value $4_{10}$ is represented as:",
    "options": [
      {
        "key": "A",
        "text": "$100_2$"
      },
      {
        "key": "B",
        "text": "$101_2$"
      },
      {
        "key": "C",
        "text": "$110_2$"
      },
      {
        "key": "D",
        "text": "$011_2$"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "$4_{10} = 1\\times 2^2 + 0\\times 2^1 + 0\\times 2^0 = 100_2$."
  },
  {
    "id": 37,
    "subject": "Physics",
    "chapter": "Astronomy & Light",
    "type": "MCQ",
    "questionText": "Light emitted from the surface of the Sun takes approximately how long to reach the Earth surface?",
    "options": [
      {
        "key": "A",
        "text": "8 minutes 20 seconds ($\\approx 500\\text{ seconds}$)"
      },
      {
        "key": "B",
        "text": "2 minutes 10 seconds"
      },
      {
        "key": "C",
        "text": "15 minutes"
      },
      {
        "key": "D",
        "text": "1 second"
      }
    ],
    "correctOption": "A",
    "marksPositive": 3,
    "marksNegative": 1,
    "explanation": "With average distance $d = 1.496 \\times 10^{11}\\,\\text{m}$ and light speed $c = 3 \\times 10^8\\,\\text{m/s}$, $t = \\frac{d}{c} \\approx 499\\,\\text{s} \\approx 8\\,\\text{min } 19\\,\\text{s}$."
  }
];

export const MOCK_TEST_PAPERS: TestPaper[] = [
  {
    id: 1,
    title: 'BITSAT 2026 Full-Length Mock Test 01 (Official CBT Simulator)',
    examTag: 'BITSAT',
    durationMinutes: 180,
    totalMarks: 390,
    totalQuestions: 45,
    questions: MOCK_QUESTIONS,
  },
  {
    id: 2,
    title: 'BITSAT 2026 Speed & Accuracy Diagnostic Test 02',
    examTag: 'BITSAT',
    durationMinutes: 180,
    totalMarks: 390,
    totalQuestions: 45,
    questions: MOCK_QUESTIONS,
  },
  {
    id: 3,
    title: 'JEE Main 2026 High-Yield Mock Exam 01',
    examTag: 'JEE Main',
    durationMinutes: 180,
    totalMarks: 300,
    totalQuestions: 45,
    questions: MOCK_QUESTIONS,
  },
  {
    id: 4,
    title: 'Legacy Oscillations & Comprehensive Science Exam (Original 37 Qs)',
    examTag: 'BITSAT',
    durationMinutes: 60,
    totalMarks: 111,
    totalQuestions: 37,
    questions: MOCK_QUESTIONS.filter((q) => q.id <= 37),
  },
];

export const MOCK_DOUBTS: Doubt[] = [
  {
    id: 1,
    studentId: 101,
    studentName: 'Aarav Sharma',
    courseId: 1,
    courseTitle: 'BITSAT 2025: Master Crash Course',
    lessonId: 101,
    lessonTitle: 'Kinematics & Projectile Speed Hacks',
    queryText:
      'In lecture 1 at 18:45, why did we take the horizontal projectile range as $R = \\frac{u^2 \\sin(2\\theta)}{g}$ without considering air resistance? Does BITSAT ever test non-zero drag coefficient equations?',
    timestampMinutes: '18:45',
    status: 'RESOLVED',
    facultyName: 'Ritesh Sharma (BITS Pilani)',
    solutionText:
      'Great question Aarav! For BITSAT, air resistance is strictly neglected unless explicitly specified with a drag force function $F_d = -kv$. You should always default to ideal projectile kinematics to save calculation time.',
    createdAt: '2025-02-10T14:20:00Z',
    solvedAt: '2025-02-10T15:05:00Z',
  },
  {
    id: 2,
    studentId: 101,
    studentName: 'Aarav Sharma',
    courseId: 1,
    courseTitle: 'BITSAT 2025: Master Crash Course',
    lessonId: 201,
    lessonTitle: 'Definite Integration Properties',
    queryText:
      'Can we apply Kings property $\\int_a^b f(x) dx = \\int_a^b f(a+b-x) dx$ directly when piecewise modulus functions are present?',
    timestampMinutes: '24:10',
    status: 'RESOLVED',
    facultyName: 'Ritesh Sharma (BITS Pilani)',
    solutionText:
      'Yes, Kings property holds for all continuous or piecewise continuous integrable functions. However, for modulus functions $|x - c|$, it is safer to split the integral at the critical point $x = c$ first.',
    createdAt: '2025-02-12T09:15:00Z',
    solvedAt: '2025-02-12T10:00:00Z',
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 1,
    orderNumber: 'ORD-89421',
    studentId: 101,
    studentName: 'Aarav Sharma',
    studentEmail: 'student@10qchallenge.in',
    studentPhone: '+91 98765 43210',
    items: [
      {
        courseId: 1,
        courseTitle: 'BITSAT 2025: Master Crash Course & Speed Blueprint',
        price: 4999,
      },
    ],
    subtotalAmount: 4999,
    discountAmount: 500,
    totalAmount: 4499,
    couponCode: 'BITSAT500',
    paymentGateway: 'PayU',
    gatewayTxnId: '10Q_PAYU_984210',
    paymentStatus: 'SUCCESS',
    createdAt: '2025-02-01T11:30:00Z',
  },
];

export const MOCK_COUPONS: Coupon[] = [
  {
    id: 1,
    code: 'BITSAT500',
    discountType: 'FLAT',
    discountValue: 500,
    minOrderAmount: 1999,
    description: 'Flat ₹500 discount on all BITSAT prep courses',
    isActive: true,
  },
  {
    id: 2,
    code: 'CRACK10Q',
    discountType: 'PERCENTAGE',
    discountValue: 15,
    minOrderAmount: 999,
    description: '15% instant discount for early bird rankers',
    isActive: true,
  },
  {
    id: 3,
    code: 'FIRST100',
    discountType: 'FLAT',
    discountValue: 1000,
    minOrderAmount: 4999,
    description: 'Flat ₹1,000 off on 1-on-1 Mentorship programs',
    isActive: true,
  },
];

// Alias exports to ensure compatibility with legacy or alternate import conventions
export const INITIAL_COURSES = MOCK_COURSES;
export const INITIAL_BLOGS = MOCK_BLOGS;
export const INITIAL_EXAMS = MOCK_EXAMS;
export const INITIAL_QUESTIONS = MOCK_QUESTIONS;
export const INITIAL_TEST_PAPER = MOCK_TEST_PAPERS[0];
export const INITIAL_TEST_PAPERS = MOCK_TEST_PAPERS;
export const INITIAL_DOUBTS = MOCK_DOUBTS;
export const INITIAL_ORDERS = MOCK_ORDERS;
export const INITIAL_COUPONS = MOCK_COUPONS;
export const INITIAL_FACULTY = MOCK_FACULTY;
export const INITIAL_TESTIMONIALS = MOCK_TESTIMONIALS;
