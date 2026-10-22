'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
  Play,
  CheckCircle2,
  FileText,
  HelpCircle,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Download,
  Clock,
  Sparkles,
  Award,
  BookOpen,
  FileQuestion,
  ExternalLink,
  Layers,
  Check,
  Eye,
  FileCheck,
  Video,
  Radio,
  Calendar,
  Users,
} from 'lucide-react';
import {
  Course,
  CourseSubject,
  Chapter,
  Lesson,
  CourseDocument,
  ChapterTestPaper,
  VideoMasterItem,
  DocumentMasterItem,
  TestSeriesMasterItem,
  LiveSessionMasterItem,
} from '@/types';
import { api } from '@/lib/api';
import { VimeoPlayer } from '@/components/student/VimeoPlayer';
import { DoubtModal } from '@/components/student/DoubtModal';

interface ClassroomPageProps {
  params: Promise<{ id: string }>;
}

export default function ClassroomPage({ params }: ClassroomPageProps) {
  const resolvedParams = use(params);
  const courseId = parseInt(resolvedParams.id, 10);

  const [course, setCourse] = useState<Course | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number>(1);
  const [expandedChapterId, setExpandedChapterId] = useState<number | null>(null);

  // Active viewing item
  const [contentType, setContentType] = useState<'VIDEO' | 'DOCUMENT' | 'TEST_PAPER'>('VIDEO');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeDocument, setActiveDocument] = useState<CourseDocument | null>(null);
  const [activeTestPaper, setActiveTestPaper] = useState<ChapterTestPaper | null>(null);

  const [currentVideoTime, setCurrentVideoTime] = useState<number>(0);
  const [isDoubtModalOpen, setIsDoubtModalOpen] = useState(false);
  const [completedItemIds, setCompletedItemIds] = useState<number[]>([1011, 1014]);
  const [assignedContent, setAssignedContent] = useState<{
    videos: VideoMasterItem[];
    documents: DocumentMasterItem[];
    testSeries: TestSeriesMasterItem[];
    liveSessions: LiveSessionMasterItem[];
  }>({
    videos: [],
    documents: [],
    testSeries: [],
    liveSessions: [],
  });

  useEffect(() => {
    async function loadCourse() {
      try {
        const [found, assigned] = await Promise.all([
          api.getCourseById(courseId),
          api.getCourseAssignedContent(courseId),
        ]);

        if (found) {
          let enrichedCourse: Course = { ...found };
          setAssignedContent(assigned);

          // Dynamically merge assigned videos & documents into curriculum tree if not present
          const existingSubjects: CourseSubject[] = enrichedCourse.subjects
            ? JSON.parse(JSON.stringify(enrichedCourse.subjects))
            : [];

          if (assigned.videos && assigned.videos.length > 0) {
            assigned.videos.forEach((vid) => {
              let sub = existingSubjects.find(
                (s) => s.name.toLowerCase() === vid.subject.toLowerCase()
              );
              if (!sub) {
                sub = {
                  id: 9000 + existingSubjects.length + 1,
                  name: vid.subject,
                  code: vid.subject.slice(0, 3).toUpperCase(),
                  icon: '⚡',
                  chapters: [],
                };
                existingSubjects.push(sub);
              }

              let chapIndex = sub.chapters.findIndex(
                (c) => c.title.toLowerCase() === vid.chapter.toLowerCase()
              );
              let chap: Chapter;
              if (chapIndex === -1) {
                chap = {
                  id: 8000 + sub.chapters.length + 1,
                  title: vid.chapter,
                  sequenceOrder: sub.chapters.length + 1,
                  lessons: [],
                  documents: [],
                  testPapers: [],
                };
                sub.chapters.push(chap);
              } else {
                chap = sub.chapters[chapIndex];
              }

              if (
                !chap.lessons.some(
                  (l) => l.vimeoVideoId === vid.vimeoVideoId || l.title === vid.title
                )
              ) {
                chap.lessons.push({
                  id: vid.id,
                  title: vid.title,
                  vimeoVideoId: vid.vimeoVideoId,
                  durationMinutes: vid.durationMinutes || 45,
                  isFreePreview: false,
                });
              }
            });
          }

          if (assigned.documents && assigned.documents.length > 0) {
            assigned.documents.forEach((doc) => {
              let sub = existingSubjects.find(
                (s) => s.name.toLowerCase() === doc.subject.toLowerCase()
              );
              if (!sub) {
                sub = {
                  id: 9000 + existingSubjects.length + 1,
                  name: doc.subject,
                  code: doc.subject.slice(0, 3).toUpperCase(),
                  icon: '📑',
                  chapters: [],
                };
                existingSubjects.push(sub);
              }

              let chapIndex = sub.chapters.findIndex(
                (c) => c.title.toLowerCase() === doc.chapter.toLowerCase()
              );
              let chap: Chapter;
              if (chapIndex === -1) {
                chap = {
                  id: 8000 + sub.chapters.length + 1,
                  title: doc.chapter,
                  sequenceOrder: sub.chapters.length + 1,
                  lessons: [],
                  documents: [],
                  testPapers: [],
                };
                sub.chapters.push(chap);
              } else {
                chap = sub.chapters[chapIndex];
              }

              if (!chap.documents) {
                chap.documents = [];
              }

              if (!chap.documents.some((d) => d.id === doc.id || d.title === doc.title)) {
                chap.documents.push({
                  id: doc.id,
                  title: doc.title,
                  pdfUrl: doc.fileUrl,
                  fileSizeBytes: doc.fileSizeBytes || '2.5 MB',
                  pageCount: doc.pageCount || 20,
                });
              }
            });
          }

          if (existingSubjects.length > 0) {
            enrichedCourse.subjects = existingSubjects;
          }

          setCourse(enrichedCourse);

          const firstSubject = enrichedCourse.subjects?.[0];
          if (firstSubject) {
            setSelectedSubjectId(firstSubject.id);
            const firstChapter = firstSubject.chapters?.[0];
            if (firstChapter) {
              setExpandedChapterId(firstChapter.id);
              if (firstChapter.lessons && firstChapter.lessons.length > 0) {
                setContentType('VIDEO');
                setActiveLesson(firstChapter.lessons[0]);
              } else if (firstChapter.documents && firstChapter.documents.length > 0) {
                setContentType('DOCUMENT');
                setActiveDocument(firstChapter.documents[0]);
              }
            }
          } else if (enrichedCourse.chapters && enrichedCourse.chapters.length > 0) {
            setExpandedChapterId(enrichedCourse.chapters[0].id);
            if (enrichedCourse.chapters[0].lessons?.length > 0) {
              setContentType('VIDEO');
              setActiveLesson(enrichedCourse.chapters[0].lessons[0]);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load course details:', err);
      }
    }
    loadCourse();
  }, [courseId]);

  if (!course) {
    return (
      <div className="py-24 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3F328A] mx-auto mb-3" />
        <p className="text-xs font-bold text-[#6E6990]">Loading 10Q Course Room...</p>
      </div>
    );
  }

  // Derive active subjects
  const subjects: CourseSubject[] =
    course.subjects && course.subjects.length > 0
      ? course.subjects
      : [
          {
            id: 1,
            name: 'Core Curriculum',
            code: 'ALL',
            icon: '📚',
            chapters: course.chapters || [],
          },
        ];

  const currentSubject =
    subjects.find((s) => s.id === selectedSubjectId) || subjects[0];

  const currentChapters = currentSubject.chapters || [];

  // Handlers for selection
  const handleSelectVideo = (lesson: Lesson, chapterId: number) => {
    setContentType('VIDEO');
    setActiveLesson(lesson);
    setActiveDocument(null);
    setActiveTestPaper(null);
    setExpandedChapterId(chapterId);
  };

  const handleSelectDocument = (doc: CourseDocument, chapterId: number) => {
    setContentType('DOCUMENT');
    setActiveDocument(doc);
    setActiveLesson(null);
    setActiveTestPaper(null);
    setExpandedChapterId(chapterId);
  };

  const handleSelectTestPaper = (test: ChapterTestPaper, chapterId: number) => {
    setContentType('TEST_PAPER');
    setActiveTestPaper(test);
    setActiveLesson(null);
    setActiveDocument(null);
    setExpandedChapterId(chapterId);
  };

  const toggleItemComplete = (id: number) => {
    setCompletedItemIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header / Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E7E3F5]">
        <div className="flex items-center gap-3">
          <Link
            href="/student/courses"
            className="p-2 rounded-xl bg-white border border-[#E7E3F5] text-[#3F328A] hover:bg-[#F6F4FF] transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <span className="text-[11px] font-bold text-[#3F328A] uppercase tracking-wider">
              {course.examTag} Classroom
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-[#17152A] line-clamp-1">
              {course.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#E8FAF0] text-[#16A34A] flex items-center gap-1.5 border border-[#C5F3D8]">
            <CheckCircle2 size={14} /> Enrolled &amp; Active
          </span>
        </div>
      </div>

      {/* SUBJECT SELECTOR BAR */}
      <div className="bg-white p-2 rounded-2xl border border-[#E7E3F5] shadow-xs flex items-center gap-2 overflow-x-auto">
        {subjects.map((sub) => {
          const isSelected = sub.id === currentSubject.id;
          const totalChapters = sub.chapters.length;
          const totalVideos = sub.chapters.reduce(
            (acc, c) => acc + (c.lessons?.length || 0),
            0
          );
          const totalDocs = sub.chapters.reduce(
            (acc, c) => acc + (c.documents?.length || 0),
            0
          );
          const totalTests = sub.chapters.reduce(
            (acc, c) => acc + (c.testPapers?.length || 0),
            0
          );

          return (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubjectId(sub.id);
                if (sub.chapters.length > 0) {
                  const firstChap = sub.chapters[0];
                  setExpandedChapterId(firstChap.id);
                  if (firstChap.lessons && firstChap.lessons.length > 0) {
                    handleSelectVideo(firstChap.lessons[0], firstChap.id);
                  } else if (firstChap.documents && firstChap.documents.length > 0) {
                    handleSelectDocument(firstChap.documents[0], firstChap.id);
                  }
                }
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                isSelected
                  ? 'bg-[#3F328A] text-white shadow-sm'
                  : 'bg-[#F6F4FF] text-[#6E6990] hover:text-[#17152A] hover:bg-[#E7E3F5]'
              }`}
            >
              <span>{sub.icon || '📚'}</span>
              <span>{sub.name}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#6E6990]'
                }`}
              >
                {totalChapters} Chap • {totalVideos} Vids • {totalDocs} PDFs
              </span>
            </button>
          );
        })}
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT VIEWPORT (Video Player / PDF Reader / CBT Chapter Test Launcher) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. VIDEO VIEWPORT */}
          {contentType === 'VIDEO' && activeLesson && (
            <div className="space-y-6">
              <VimeoPlayer
                key={activeLesson.id}
                videoId={activeLesson.vimeoVideoId || '76979871'}
                title={activeLesson.title}
                onProgress={(_, seconds) => setCurrentVideoTime(seconds)}
              />

              <div className="bg-white rounded-3xl p-6 border border-[#E7E3F5] shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-[#3F328A] uppercase tracking-wider mb-1">
                      <span>{currentSubject.name}</span>
                      <span>•</span>
                      <span>Chapter Lecture</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#17152A]">
                      {activeLesson.title}
                    </h2>
                    <div className="flex items-center gap-4 text-xs text-[#6E6990] mt-1.5">
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {activeLesson.durationMinutes || 45} Minutes
                      </span>
                      <span className="flex items-center gap-1 text-[#20D66B] font-semibold">
                        <CheckCircle2 size={14} /> Full HD 1080p Stream
                      </span>
                      {activeLesson.isFreePreview && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[10px]">
                          Free Preview
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsDoubtModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-[#FFE8ED] hover:bg-[#FFCCD6] text-[#FF3F68] font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <HelpCircle size={15} />
                      <span>Ask Faculty Doubt</span>
                    </button>

                    <button
                      onClick={() => toggleItemComplete(activeLesson.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                        completedItemIds.includes(activeLesson.id)
                          ? 'bg-[#E8FAF0] text-[#16A34A] border border-[#C5F3D8]'
                          : 'bg-[#F6F4FF] text-[#3F328A] hover:bg-[#E7E3F5]'
                      }`}
                    >
                      <CheckCircle2 size={15} />
                      <span>
                        {completedItemIds.includes(activeLesson.id)
                          ? 'Completed'
                          : 'Mark Complete'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Attached Lecture PDF Notes */}
                {activeLesson.pdfNotesUrl && (
                  <div className="pt-4 border-t border-[#F1EFFB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAFAFD] p-4 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-white text-[#3F328A] border border-[#E7E3F5]">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#17152A]">
                          Lecture Formula Notes &amp; Annotated Handout (PDF)
                        </h4>
                        <p className="text-[11px] text-[#6E6990]">
                          Includes high-speed solving cheatsheet and solved class examples.
                        </p>
                      </div>
                    </div>

                    <a
                      href={activeLesson.pdfNotesUrl}
                      target="_blank"
                      className="px-4 py-2 rounded-xl bg-[#3F328A] hover:bg-[#2D246B] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shrink-0"
                    >
                      <Download size={14} />
                      <span>Download PDF</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. DOCUMENT / PDF VIEWPORT */}
          {contentType === 'DOCUMENT' && activeDocument && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E3F5] shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F1EFFB]">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-[#F0EDFD] text-[#3F328A]">
                    <FileText size={28} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#3F328A] uppercase tracking-wider">
                      Study Document &amp; Formula Book
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#17152A] mt-0.5">
                      {activeDocument.title}
                    </h2>
                    <div className="flex items-center gap-3 text-xs text-[#6E6990] mt-1.5 font-medium">
                      <span>📄 {activeDocument.pageCount || 10} Pages</span>
                      <span>•</span>
                      <span>📦 {activeDocument.fileSizeBytes || '2.0 MB'}</span>
                      <span>•</span>
                      <span>🔒 Full Vector High-Res PDF</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activeDocument.pdfUrl}
                    target="_blank"
                    className="px-4 py-2.5 rounded-xl bg-[#3F328A] hover:bg-[#2D246B] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Download size={15} />
                    <span>Download PDF</span>
                  </a>

                  <button
                    onClick={() => toggleItemComplete(activeDocument.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      completedItemIds.includes(activeDocument.id)
                        ? 'bg-[#E8FAF0] text-[#16A34A] border border-[#C5F3D8]'
                        : 'bg-[#F6F4FF] text-[#3F328A] hover:bg-[#E7E3F5]'
                    }`}
                  >
                    <CheckCircle2 size={15} />
                    <span>
                      {completedItemIds.includes(activeDocument.id)
                        ? 'Studied'
                        : 'Mark Studied'}
                    </span>
                  </button>
                </div>
              </div>

              {/* PDF Inline Document Viewer / Preview */}
              <div className="border border-[#E7E3F5] rounded-2xl p-6 bg-[#FAFAFD] space-y-4">
                <div className="flex items-center justify-between text-xs text-[#6E6990]">
                  <span className="font-bold text-[#17152A]">Document Overview</span>
                  <span>Ready for offline print or revision</span>
                </div>
                <p className="text-xs text-[#6E6990] leading-relaxed">
                  {activeDocument.description ||
                    'Comprehensive curated chapter notes prepared by BITS Pilani alumni faculty. Includes essential formula tables, critical shortcuts, and high-frequency examination trends.'}
                </p>

                <div className="bg-white rounded-xl p-8 border border-[#E7E3F5] text-center space-y-3">
                  <FileText size={48} className="mx-auto text-[#3F328A] opacity-80" />
                  <h4 className="font-bold text-sm text-[#17152A]">
                    {activeDocument.title}
                  </h4>
                  <p className="text-xs text-[#6E6990] max-w-md mx-auto">
                    Click the button below to view or print this document in high resolution.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <a
                      href={activeDocument.pdfUrl}
                      target="_blank"
                      className="px-5 py-2.5 rounded-xl bg-[#3F328A] text-white font-bold text-xs hover:bg-[#2D246B] transition-colors inline-flex items-center gap-2"
                    >
                      <Eye size={15} />
                      <span>Open Document in Full Viewer</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. QUESTION PAPER / CHAPTER TEST VIEWPORT */}
          {contentType === 'TEST_PAPER' && activeTestPaper && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E3F5] shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F1EFFB]">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-[#FFE8ED] text-[#FF3F68]">
                    <FileQuestion size={28} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#FF3F68] uppercase tracking-wider">
                      Chapter Examination Paper
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#17152A] mt-0.5">
                      {activeTestPaper.title}
                    </h2>
                    <div className="flex items-center gap-3 text-xs text-[#6E6990] mt-1.5 font-medium">
                      <span>⏱️ {activeTestPaper.durationMinutes} Minutes</span>
                      <span>•</span>
                      <span>❓ {activeTestPaper.totalQuestions} Questions</span>
                      <span>•</span>
                      <span>🏆 {activeTestPaper.totalMarks || 75} Marks</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/student/tests/${activeTestPaper.testPaperId || 1}`}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF3F68] to-[#FF5E82] hover:opacity-95 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Play size={16} className="fill-white" />
                  <span>Start CBT Test Now</span>
                </Link>
              </div>

              {/* Test Guidelines & Scoring Rules */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAFAFD] border border-[#E7E3F5]">
                  <span className="text-[10px] font-bold text-[#6E6990] uppercase">
                    Scoring Rule
                  </span>
                  <div className="text-sm font-extrabold text-[#16A34A] mt-1">
                    +3 Marks Correct
                  </div>
                  <div className="text-xs text-[#FF3F68] font-semibold mt-0.5">
                    -1 Negative Mark
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAFAFD] border border-[#E7E3F5]">
                  <span className="text-[10px] font-bold text-[#6E6990] uppercase">
                    Interface
                  </span>
                  <div className="text-sm font-extrabold text-[#17152A] mt-1">
                    Official CBT Simulator
                  </div>
                  <div className="text-xs text-[#6E6990] mt-0.5">
                    Live timer &amp; question palette
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAFAFD] border border-[#E7E3F5]">
                  <span className="text-[10px] font-bold text-[#6E6990] uppercase">
                    Post-Test Review
                  </span>
                  <div className="text-sm font-extrabold text-[#3F328A] mt-1">
                    KaTeX Math Solutions
                  </div>
                  <div className="text-xs text-[#6E6990] mt-0.5">
                    Instant accuracy analytics
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F6F4FF] border border-[#E7E3F5] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles size={20} className="text-[#3F328A]" />
                  <span className="text-xs text-[#17152A] font-bold">
                    Unlockable Chapter Practice: Master speed and accuracy under exam timer pressure.
                  </span>
                </div>
                <Link
                  href={`/student/tests/${activeTestPaper.testPaperId || 1}`}
                  className="px-4 py-2 rounded-xl bg-[#3F328A] hover:bg-[#2D246B] text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <span>Launch Simulator</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR: Subject Chapter Playlist & Content Tree */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E7E3F5] shadow-sm overflow-hidden sticky top-24">
          <div className="p-5 border-b border-[#F1EFFB] bg-[#FAFAFD]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#3F328A] uppercase tracking-wider">
                {currentSubject.name} Chapters
              </span>
              <span className="text-xs font-bold text-[#6E6990]">
                {currentChapters.length} Modules
              </span>
            </div>
            <h3 className="font-extrabold text-base text-[#17152A] mt-1">
              Course Curriculum
            </h3>
          </div>

          <div className="divide-y divide-[#F1EFFB] max-h-[620px] overflow-y-auto">
            {currentChapters.map((chapter, chapIdx) => {
              const isExpanded = expandedChapterId === chapter.id;
              const chapVideos = chapter.lessons || [];
              const chapDocs = chapter.documents || [];
              const chapTests = chapter.testPapers || [];

              return (
                <div key={chapter.id}>
                  {/* Chapter Accordion Header */}
                  <button
                    onClick={() =>
                      setExpandedChapterId(isExpanded ? null : chapter.id)
                    }
                    className={`w-full p-4 text-left transition-colors flex items-center justify-between text-xs sm:text-sm font-extrabold ${
                      isExpanded
                        ? 'bg-[#F6F4FF] text-[#3F328A]'
                        : 'hover:bg-[#FAFAFD] text-[#17152A]'
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden pr-2">
                      <span className="w-5 h-5 rounded-full bg-[#E7E3F5] text-[#3F328A] text-[10px] flex items-center justify-center shrink-0 font-bold">
                        {chapIdx + 1}
                      </span>
                      <span className="truncate">{chapter.title}</span>
                    </div>

                    <ChevronDown
                      size={16}
                      className={`text-[#6E6990] transition-transform shrink-0 ${
                        isExpanded ? 'rotate-180 text-[#3F328A]' : ''
                      }`}
                    />
                  </button>

                  {/* Chapter Content Items (Videos, PDFs, Test Papers) */}
                  {isExpanded && (
                    <div className="bg-[#FAFAFD] p-3 space-y-2 border-t border-[#F1EFFB]">
                      {/* 1. VIDEOS GROUP */}
                      {chapVideos.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-[#6E6990] uppercase tracking-wider px-2 flex items-center gap-1">
                            <Play size={10} /> Video Lectures ({chapVideos.length})
                          </span>
                          {chapVideos.map((lesson) => {
                            const isCurrent =
                              contentType === 'VIDEO' &&
                              activeLesson?.id === lesson.id;
                            const isCompleted = completedItemIds.includes(
                              lesson.id
                            );

                            return (
                              <div
                                key={lesson.id}
                                onClick={() =>
                                  handleSelectVideo(lesson, chapter.id)
                                }
                                className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between text-xs ${
                                  isCurrent
                                    ? 'bg-[#3F328A] text-white shadow-sm font-bold'
                                    : 'bg-white hover:bg-[#F6F4FF] text-[#17152A] border border-[#E7E3F5]'
                                }`}
                              >
                                <div className="flex items-center gap-2 overflow-hidden">
                                  {isCompleted ? (
                                    <CheckCircle2
                                      size={14}
                                      className={
                                        isCurrent
                                          ? 'text-[#20D66B]'
                                          : 'text-[#20D66B]'
                                      }
                                    />
                                  ) : (
                                    <Play
                                      size={12}
                                      className={
                                        isCurrent
                                          ? 'fill-white'
                                          : 'text-[#6E6990]'
                                      }
                                    />
                                  )}
                                  <span className="truncate">
                                    {lesson.title}
                                  </span>
                                </div>
                                <span
                                  className={`text-[10px] shrink-0 ml-2 ${
                                    isCurrent
                                      ? 'text-white/80'
                                      : 'text-[#6E6990]'
                                  }`}
                                >
                                  {lesson.durationMinutes || 45}m
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* 2. DOCUMENTS (PDFs) GROUP */}
                      {chapDocs.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] font-bold text-[#6E6990] uppercase tracking-wider px-2 flex items-center gap-1">
                            <FileText size={10} /> Study Documents &amp; Notes ({chapDocs.length})
                          </span>
                          {chapDocs.map((doc) => {
                            const isCurrent =
                              contentType === 'DOCUMENT' &&
                              activeDocument?.id === doc.id;
                            const isCompleted = completedItemIds.includes(
                              doc.id
                            );

                            return (
                              <div
                                key={doc.id}
                                onClick={() =>
                                  handleSelectDocument(doc, chapter.id)
                                }
                                className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between text-xs ${
                                  isCurrent
                                    ? 'bg-[#3F328A] text-white shadow-sm font-bold'
                                    : 'bg-white hover:bg-[#F6F4FF] text-[#17152A] border border-[#E7E3F5]'
                                }`}
                              >
                                <div className="flex items-center gap-2 overflow-hidden">
                                  {isCompleted ? (
                                    <FileCheck
                                      size={14}
                                      className={
                                        isCurrent
                                          ? 'text-[#20D66B]'
                                          : 'text-[#20D66B]'
                                      }
                                    />
                                  ) : (
                                    <FileText
                                      size={13}
                                      className={
                                        isCurrent
                                          ? 'text-white'
                                          : 'text-[#3F328A]'
                                      }
                                    />
                                  )}
                                  <span className="truncate">{doc.title}</span>
                                </div>
                                <span
                                  className={`text-[10px] font-bold shrink-0 ml-2 px-1.5 py-0.5 rounded ${
                                    isCurrent
                                      ? 'bg-white/20 text-white'
                                      : 'bg-[#F0EDFD] text-[#3F328A]'
                                  }`}
                                >
                                  PDF
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* 3. QUESTION PAPERS / TESTS GROUP */}
                      {chapTests.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] font-bold text-[#FF3F68] uppercase tracking-wider px-2 flex items-center gap-1">
                            <FileQuestion size={10} /> Chapter Question Papers ({chapTests.length})
                          </span>
                          {chapTests.map((test) => {
                            const isCurrent =
                              contentType === 'TEST_PAPER' &&
                              activeTestPaper?.id === test.id;

                            return (
                              <div
                                key={test.id}
                                onClick={() =>
                                  handleSelectTestPaper(test, chapter.id)
                                }
                                className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between text-xs ${
                                  isCurrent
                                    ? 'bg-[#FF3F68] text-white shadow-sm font-bold'
                                    : 'bg-white hover:bg-[#FFE8ED] text-[#17152A] border border-[#FFCCD6]'
                                }`}
                              >
                                <div className="flex items-center gap-2 overflow-hidden">
                                  <FileQuestion
                                    size={14}
                                    className={
                                      isCurrent
                                        ? 'text-white'
                                        : 'text-[#FF3F68]'
                                    }
                                  />
                                  <span className="truncate">{test.title}</span>
                                </div>
                                <span
                                  className={`text-[10px] font-bold shrink-0 ml-2 px-1.5 py-0.5 rounded ${
                                    isCurrent
                                      ? 'bg-white/20 text-white'
                                      : 'bg-[#FFE8ED] text-[#FF3F68]'
                                  }`}
                                >
                                  {test.totalQuestions} Qs
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. ASSIGNED LIVE SESSIONS & INTERACTIVE MASTERCLASSES */}
      {assignedContent.liveSessions && assignedContent.liveSessions.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E3F5] shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1EFFB]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-[#17152A]">
                  Scheduled Live Masterclasses &amp; Doubt Sessions
                </h3>
                <p className="text-xs text-[#6E6990]">
                  Exclusive interactive sessions assigned directly to this course.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 w-fit">
              {assignedContent.liveSessions.length} Live Class{assignedContent.liveSessions.length > 1 ? 'es' : ''} Included
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignedContent.liveSessions.map((session) => (
              <div
                key={session.id}
                className="p-5 rounded-2xl border border-[#E7E3F5] bg-[#FAFAFD] hover:bg-white hover:border-[#3F328A]/40 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#F0EDFD] text-[#3F328A]">
                      {session.subject}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        session.status === 'Live'
                          ? 'bg-rose-500 text-white animate-pulse'
                          : session.status === 'Completed'
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {session.status === 'Live'
                        ? '● LIVE NOW'
                        : session.status === 'Completed'
                        ? 'Recorded'
                        : 'Scheduled'}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-[#17152A] line-clamp-2">
                    {session.title}
                  </h4>

                  <p className="text-xs text-[#6E6990] line-clamp-2">
                    {session.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#E7E3F5]">
                  <div className="flex items-center justify-between text-xs text-[#6E6990]">
                    <span className="flex items-center gap-1.5 font-semibold text-[#17152A]">
                      <Calendar className="w-3.5 h-3.5 text-[#3F328A]" />
                      {session.date}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[#3F328A]">
                      <Clock className="w-3.5 h-3.5" />
                      {session.startTime} - {session.endTime}
                    </span>
                  </div>

                  {session.facultyName && (
                    <div className="text-[11px] text-[#6E6990] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#3F328A]" />
                      <span>Mentor: <strong className="text-[#17152A]">{session.facultyName}</strong></span>
                    </div>
                  )}

                  {session.meetingUrl ? (
                    <a
                      href={session.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#3F328A] to-[#2D246B] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      <Radio className="w-3.5 h-3.5 text-rose-400" />
                      <span>Join Live Class (Private Access)</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  ) : (
                    <div className="w-full py-2 rounded-xl bg-slate-100 text-slate-500 font-bold text-xs text-center">
                      Joining link will open 10m before start
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. ASSIGNED TEST SERIES & FULL-LENGTH MOCKS */}
      {assignedContent.testSeries && assignedContent.testSeries.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E3F5] shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1EFFB]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <FileCheck className="w-5 h-5 text-[#3F328A]" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-[#17152A]">
                  Assigned CBT Test Series &amp; Full Mocks
                </h3>
                <p className="text-xs text-[#6E6990]">
                  Official examination simulator test papers included with your course package.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-indigo-50 text-[#3F328A] border border-indigo-200 w-fit">
              {assignedContent.testSeries.length} Test Series Assigned
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignedContent.testSeries.map((series) => (
              <div
                key={series.id}
                className="p-5 rounded-2xl border border-[#E7E3F5] bg-[#FAFAFD] hover:bg-white hover:border-[#FF3F68]/40 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#FFE8ED] text-[#FF3F68]">
                      {series.examTag} {series.targetYear}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {series.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-[#17152A] line-clamp-2">
                    {series.title}
                  </h4>

                  <p className="text-xs text-[#6E6990] line-clamp-2">
                    {series.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#E7E3F5]">
                  <div className="flex items-center justify-between text-xs text-[#6E6990]">
                    <span className="flex items-center gap-1 font-semibold text-[#17152A]">
                      <FileQuestion className="w-3.5 h-3.5 text-[#FF3F68]" />
                      {series.totalQuestions} Questions
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[#3F328A]">
                      <Clock className="w-3.5 h-3.5" />
                      {series.durationMinutes} Minutes
                    </span>
                  </div>

                  <Link
                    href={`/student/tests/${series.id || 1}`}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF3F68] to-[#FF5E82] hover:opacity-95 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Launch CBT Exam Simulation</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contextual Doubt Resolution Modal */}
      <DoubtModal
        isOpen={isDoubtModalOpen}
        onClose={() => setIsDoubtModalOpen(false)}
        courseId={course.id}
        courseTitle={course.title}
        lessonId={activeLesson?.id}
        lessonTitle={activeLesson?.title || activeDocument?.title || 'Chapter Topic'}
        videoTimestampSeconds={currentVideoTime}
      />
    </div>
  );
}
