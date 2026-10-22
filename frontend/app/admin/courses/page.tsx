'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  BookOpen,
  Layers,
  X,
  Sparkles,
  Play,
  FileText,
  FileQuestion,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  PlusCircle,
  Video,
  Clock,
  Download,
  Award,
} from 'lucide-react';
import {
  Course,
  CourseSubject,
  Chapter,
  Lesson,
  CourseDocument,
  ChapterTestPaper,
} from '@/types';
import { api } from '@/lib/api';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // New Course Form State
  const [newCourse, setNewCourse] = useState({
    title: '',
    slug: '',
    examTag: 'BITSAT',
    category: 'CRASH_COURSE',
    discountPrice: 4999,
    originalPrice: 9999,
    shortDescription: '',
    description: '',
  });

  // Curriculum Builder Modal State
  const [curriculumCourse, setCurriculumCourse] = useState<Course | null>(null);
  const [selectedSubIndex, setSelectedSubIndex] = useState<number>(0);
  const [selectedChapId, setSelectedChapId] = useState<number | null>(null);

  // Sub-modals for adding items inside curriculum builder
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');

  const [isAddChapterOpen, setIsAddChapterOpen] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState('');

  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    vimeoVideoId: '76979871',
    durationMinutes: 45,
    isFreePreview: false,
    pdfNotesUrl: '/site/assets/docs/formula-cheatsheet.pdf',
  });

  const [isAddDocOpen, setIsAddDocOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({
    title: '',
    pdfUrl: '/site/assets/docs/formula-cheatsheet.pdf',
    fileSizeBytes: '2.5 MB',
    pageCount: 12,
    description: 'Lecture notes and formula summary PDF.',
  });

  const [isAddTestOpen, setIsAddTestOpen] = useState(false);
  const [newTest, setNewTest] = useState({
    title: '',
    durationMinutes: 45,
    totalQuestions: 25,
    totalMarks: 75,
    testPaperId: 1,
  });

  useEffect(() => {
    async function load() {
      const data = await api.getCourses();
      setCourses(data);
    }
    load();
  }, []);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    const created: Course = {
      id: Date.now(),
      title: newCourse.title,
      slug: newCourse.slug || newCourse.title.toLowerCase().replace(/\s+/g, '-'),
      examTag: newCourse.examTag,
      category: newCourse.category as any,
      discountPrice: Number(newCourse.discountPrice),
      originalPrice: Number(newCourse.originalPrice),
      shortDescription: newCourse.shortDescription,
      description: newCourse.description,
      thumbnailUrl: '/site/assets/images/course-default.jpg',
      rating: 4.9,
      reviewCount: 1,
      enrolledCount: 1,
      isBestseller: true,
      features: ['Live Demo Access', 'Formula PDF Notes', '24/7 Doubt Resolution'],
      subjects: [
        {
          id: 1,
          name: 'Physics',
          code: 'PHY',
          icon: '⚛️',
          chapters: [],
        },
        {
          id: 2,
          name: 'Chemistry',
          code: 'CHEM',
          icon: '🧪',
          chapters: [],
        },
        {
          id: 3,
          name: 'Mathematics',
          code: 'MATH',
          icon: '📐',
          chapters: [],
        },
      ],
      chapters: [],
    };

    await api.createCourse(created);
    setCourses([created, ...courses]);
    setIsCreateModalOpen(false);
    alert('Course created successfully!');
  };

  const openCurriculumBuilder = (course: Course) => {
    // Ensure course has subjects structure
    const subjects =
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

    const courseWithSubjects: Course = {
      ...course,
      subjects,
    };

    setCurriculumCourse(courseWithSubjects);
    setSelectedSubIndex(0);
    if (subjects[0]?.chapters?.length > 0) {
      setSelectedChapId(subjects[0].chapters[0].id);
    } else {
      setSelectedChapId(null);
    }
  };

  // Add Subject
  const handleAddSubject = () => {
    if (!curriculumCourse || !newSubjectName.trim()) return;
    const newSub: CourseSubject = {
      id: Date.now(),
      name: newSubjectName.trim(),
      code: newSubjectName.substring(0, 4).toUpperCase(),
      icon: '📖',
      chapters: [],
    };
    const updatedSubs = [...(curriculumCourse.subjects || []), newSub];
    const updated = { ...curriculumCourse, subjects: updatedSubs };
    setCurriculumCourse(updated);
    setSelectedSubIndex(updatedSubs.length - 1);
    setNewSubjectName('');
    setIsAddSubjectOpen(false);
  };

  // Add Chapter to currently selected subject
  const handleAddChapter = () => {
    if (!curriculumCourse || !newChapterTitle.trim()) return;
    const currentSub = curriculumCourse.subjects?.[selectedSubIndex];
    if (!currentSub) return;

    const newChap: Chapter = {
      id: Date.now(),
      subjectId: currentSub.id,
      subjectName: currentSub.name,
      title: newChapterTitle.trim(),
      sequenceOrder: (currentSub.chapters?.length || 0) + 1,
      lessons: [],
      documents: [],
      testPapers: [],
    };

    const updatedChapters = [...(currentSub.chapters || []), newChap];
    const updatedSubjects = [...curriculumCourse.subjects!];
    updatedSubjects[selectedSubIndex] = {
      ...currentSub,
      chapters: updatedChapters,
    };

    const updatedCourse: Course = {
      ...curriculumCourse,
      subjects: updatedSubjects,
      chapters: updatedSubjects.flatMap((s) => s.chapters),
    };

    setCurriculumCourse(updatedCourse);
    setSelectedChapId(newChap.id);
    setNewChapterTitle('');
    setIsAddChapterOpen(false);
  };

  // Add Video to current chapter
  const handleAddVideo = () => {
    if (!curriculumCourse || !selectedChapId || !newVideo.title.trim()) return;
    const currentSub = curriculumCourse.subjects?.[selectedSubIndex];
    if (!currentSub) return;

    const chapIndex = currentSub.chapters.findIndex((c) => c.id === selectedChapId);
    if (chapIndex === -1) return;

    const currentChap = currentSub.chapters[chapIndex];
    const newLesson: Lesson = {
      id: Date.now(),
      chapterId: selectedChapId,
      type: 'VIDEO',
      title: newVideo.title.trim(),
      vimeoVideoId: newVideo.vimeoVideoId.trim(),
      durationMinutes: Number(newVideo.durationMinutes) || 45,
      isFreePreview: newVideo.isFreePreview,
      pdfNotesUrl: newVideo.pdfNotesUrl.trim() || undefined,
    };

    const updatedLessons = [...(currentChap.lessons || []), newLesson];
    const updatedChap = { ...currentChap, lessons: updatedLessons };
    const updatedChaps = [...currentSub.chapters];
    updatedChaps[chapIndex] = updatedChap;

    const updatedSubs = [...curriculumCourse.subjects!];
    updatedSubs[selectedSubIndex] = { ...currentSub, chapters: updatedChaps };

    const updatedCourse: Course = {
      ...curriculumCourse,
      subjects: updatedSubs,
      chapters: updatedSubs.flatMap((s) => s.chapters),
    };

    setCurriculumCourse(updatedCourse);
    setNewVideo({
      title: '',
      vimeoVideoId: '76979871',
      durationMinutes: 45,
      isFreePreview: false,
      pdfNotesUrl: '/site/assets/docs/formula-cheatsheet.pdf',
    });
    setIsAddVideoOpen(false);
  };

  // Add Document to current chapter
  const handleAddDocument = () => {
    if (!curriculumCourse || !selectedChapId || !newDoc.title.trim()) return;
    const currentSub = curriculumCourse.subjects?.[selectedSubIndex];
    if (!currentSub) return;

    const chapIndex = currentSub.chapters.findIndex((c) => c.id === selectedChapId);
    if (chapIndex === -1) return;

    const currentChap = currentSub.chapters[chapIndex];
    const newDocItem: CourseDocument = {
      id: Date.now(),
      chapterId: selectedChapId,
      title: newDoc.title.trim(),
      pdfUrl: newDoc.pdfUrl.trim(),
      fileSizeBytes: newDoc.fileSizeBytes.trim(),
      pageCount: Number(newDoc.pageCount) || 10,
      description: newDoc.description.trim(),
    };

    const updatedDocs = [...(currentChap.documents || []), newDocItem];
    const updatedChap = { ...currentChap, documents: updatedDocs };
    const updatedChaps = [...currentSub.chapters];
    updatedChaps[chapIndex] = updatedChap;

    const updatedSubs = [...curriculumCourse.subjects!];
    updatedSubs[selectedSubIndex] = { ...currentSub, chapters: updatedChaps };

    const updatedCourse: Course = {
      ...curriculumCourse,
      subjects: updatedSubs,
      chapters: updatedSubs.flatMap((s) => s.chapters),
    };

    setCurriculumCourse(updatedCourse);
    setNewDoc({
      title: '',
      pdfUrl: '/site/assets/docs/formula-cheatsheet.pdf',
      fileSizeBytes: '2.5 MB',
      pageCount: 12,
      description: 'Lecture notes and formula summary PDF.',
    });
    setIsAddDocOpen(false);
  };

  // Add Test Paper to current chapter
  const handleAddTestPaper = () => {
    if (!curriculumCourse || !selectedChapId || !newTest.title.trim()) return;
    const currentSub = curriculumCourse.subjects?.[selectedSubIndex];
    if (!currentSub) return;

    const chapIndex = currentSub.chapters.findIndex((c) => c.id === selectedChapId);
    if (chapIndex === -1) return;

    const currentChap = currentSub.chapters[chapIndex];
    const newTestItem: ChapterTestPaper = {
      id: Date.now(),
      chapterId: selectedChapId,
      testPaperId: Number(newTest.testPaperId) || 1,
      title: newTest.title.trim(),
      durationMinutes: Number(newTest.durationMinutes) || 45,
      totalQuestions: Number(newTest.totalQuestions) || 25,
      totalMarks: Number(newTest.totalMarks) || 75,
      examTag: curriculumCourse.examTag,
    };

    const updatedTests = [...(currentChap.testPapers || []), newTestItem];
    const updatedChap = { ...currentChap, testPapers: updatedTests };
    const updatedChaps = [...currentSub.chapters];
    updatedChaps[chapIndex] = updatedChap;

    const updatedSubs = [...curriculumCourse.subjects!];
    updatedSubs[selectedSubIndex] = { ...currentSub, chapters: updatedChaps };

    const updatedCourse: Course = {
      ...curriculumCourse,
      subjects: updatedSubs,
      chapters: updatedSubs.flatMap((s) => s.chapters),
    };

    setCurriculumCourse(updatedCourse);
    setNewTest({
      title: '',
      durationMinutes: 45,
      totalQuestions: 25,
      totalMarks: 75,
      testPaperId: 1,
    });
    setIsAddTestOpen(false);
  };

  // Save changes to database / API
  const saveCurriculumChanges = async () => {
    if (!curriculumCourse) return;
    await api.updateCourse(curriculumCourse);
    const updatedCourses = courses.map((c) =>
      c.id === curriculumCourse.id ? curriculumCourse : c
    );
    setCourses(updatedCourses);
    setCurriculumCourse(null);
    alert('Curriculum changes saved successfully to course database!');
  };

  // Currently active subject and chapter inside modal
  const activeSubject = curriculumCourse?.subjects?.[selectedSubIndex];
  const activeChapter = activeSubject?.chapters?.find((c) => c.id === selectedChapId);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17152A]">
            Course &amp; Curriculum Builder
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6990] mt-1">
            Manage subject-wise chapters, Vimeo video lectures, PDF formula notes, and CBT question papers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/assignments"
            className="px-5 py-2.5 rounded-xl bg-[#20D66B] hover:bg-[#18B85A] text-slate-900 font-extrabold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Layers size={16} />
            <span>Course Content Assignment</span>
          </Link>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#3F328A] hover:bg-[#2D246B] text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={16} />
            <span>Add New Course</span>
          </button>
        </div>
      </div>

      {/* Course List Table */}
      <div className="bg-white rounded-3xl border border-[#E7E3F5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F4FF] text-[#6E6990] font-bold">
              <tr>
                <th className="p-4">Course Name</th>
                <th className="p-4">Exam Tag</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Subjects &amp; Chapters</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1EFFB]">
              {courses.map((c) => {
                const subCount = c.subjects?.length || 4;
                const chapCount = c.chapters?.length || 0;
                return (
                  <tr key={c.id} className="hover:bg-[#FAFAFD]">
                    <td className="p-4">
                      <div className="font-bold text-[#17152A] line-clamp-1">{c.title}</div>
                      <span className="text-[10px] text-[#6E6990]">Slug: /{c.slug}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-md font-bold bg-[#3F328A] text-white text-[10px]">
                        {c.examTag}
                      </span>
                    </td>
                    <td className="p-4 uppercase text-[#6E6990]">
                      {c.category?.replace('_', ' ') || 'COURSE'}
                    </td>
                    <td className="p-4 font-bold text-[#17152A]">
                      ₹{(c.discountPrice || c.price || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 text-[#6E6990] font-medium">
                      <span className="text-[#3F328A] font-bold">{subCount} Subjects</span> •{' '}
                      <span>{chapCount} Chapters</span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/assignments`}
                          className="px-3 py-1.5 rounded-xl bg-[#3F328A] hover:bg-[#2D246B] text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-2xs"
                        >
                          <Layers size={13} />
                          <span>Assign Content</span>
                        </Link>

                        <button
                          onClick={() => openCurriculumBuilder(c)}
                          className="px-3 py-1.5 rounded-xl bg-[#F0EDFD] hover:bg-[#3F328A] text-[#3F328A] hover:text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-2xs"
                        >
                          <Layers size={13} />
                          <span>Curriculum</span>
                        </button>

                        <Link
                          href={`/student/courses/${c.id}`}
                          target="_blank"
                          className="px-3 py-1.5 rounded-xl bg-[#FAFAFD] border border-[#E7E3F5] text-[#6E6990] hover:text-[#17152A] font-bold text-xs transition-colors flex items-center gap-1"
                        >
                          <ExternalLink size={12} />
                          <span>Classroom</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CURRICULUM BUILDER MODAL */}
      {curriculumCourse && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl border border-[#E7E3F5] space-y-6 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E3F5]">
              <div>
                <span className="text-[10px] font-bold text-[#3F328A] uppercase tracking-wider">
                  Curriculum Architecture &amp; Hierarchy
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#17152A]">
                  {curriculumCourse.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={saveCurriculumChanges}
                  className="px-5 py-2.5 rounded-xl bg-[#20D66B] hover:bg-[#16A34A] text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <Check size={16} />
                  <span>Save Curriculum</span>
                </button>
                <button
                  onClick={() => setCurriculumCourse(null)}
                  className="p-2 rounded-xl text-[#6E6990] hover:bg-[#F6F4FF]"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* 1. SUBJECTS TABS BAR */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-[#17152A] uppercase tracking-wider text-[11px]">
                  Step 1: Select or Add Course Subject
                </span>
                <button
                  onClick={() => setIsAddSubjectOpen(true)}
                  className="text-[#3F328A] hover:underline font-bold flex items-center gap-1"
                >
                  <Plus size={14} /> Add New Subject
                </button>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {curriculumCourse.subjects?.map((sub, idx) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubIndex(idx);
                      if (sub.chapters.length > 0) {
                        setSelectedChapId(sub.chapters[0].id);
                      } else {
                        setSelectedChapId(null);
                      }
                    }}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                      selectedSubIndex === idx
                        ? 'bg-[#3F328A] text-white shadow-sm'
                        : 'bg-[#F6F4FF] text-[#6E6990] hover:text-[#17152A]'
                    }`}
                  >
                    <span>{sub.icon || '📚'}</span>
                    <span>{sub.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        selectedSubIndex === idx
                          ? 'bg-white/20 text-white'
                          : 'bg-white text-[#6E6990]'
                      }`}
                    >
                      {sub.chapters?.length || 0} Chaps
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. CHAPTERS & MULTIMEDIA WORKBENCH */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* LEFT: Chapters List for Selected Subject */}
              <div className="md:col-span-4 bg-[#FAFAFD] p-4 rounded-3xl border border-[#E7E3F5] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-[#17152A]">
                    {activeSubject?.name || 'Subject'} Chapters
                  </span>
                  <button
                    onClick={() => setIsAddChapterOpen(true)}
                    className="p-1.5 rounded-lg bg-[#3F328A] text-white hover:bg-[#2D246B] text-[11px] font-bold flex items-center gap-1"
                  >
                    <Plus size={13} />
                    <span>Add Chap</span>
                  </button>
                </div>

                <div className="space-y-1.5 max-h-96 overflow-y-auto">
                  {activeSubject?.chapters && activeSubject.chapters.length > 0 ? (
                    activeSubject.chapters.map((chap, cIdx) => {
                      const isSelected = selectedChapId === chap.id;
                      const vCount = chap.lessons?.length || 0;
                      const dCount = chap.documents?.length || 0;
                      const tCount = chap.testPapers?.length || 0;

                      return (
                        <div
                          key={chap.id}
                          onClick={() => setSelectedChapId(chap.id)}
                          className={`p-3 rounded-2xl cursor-pointer transition-all border text-xs ${
                            isSelected
                              ? 'bg-white border-[#3F328A] shadow-sm'
                              : 'bg-white/60 hover:bg-white border-[#E7E3F5]'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold text-[#17152A]">
                            <span className="truncate">
                              {cIdx + 1}. {chap.title}
                            </span>
                            {isSelected && <ChevronRight size={14} className="text-[#3F328A]" />}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-[#6E6990] mt-1.5">
                            <span>🎥 {vCount} Vids</span>
                            <span>•</span>
                            <span>📄 {dCount} PDFs</span>
                            <span>•</span>
                            <span>📝 {tCount} Tests</span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-8 text-center text-xs text-[#6E6990]">
                      No chapters in this subject yet. Click &quot;Add Chap&quot; above.
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT: Chapter Content Editor (Videos, Documents, Question Papers) */}
              <div className="md:col-span-8 bg-white p-5 sm:p-6 rounded-3xl border border-[#E7E3F5] space-y-6">
                {activeChapter ? (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1EFFB]">
                      <div>
                        <span className="text-[10px] font-bold text-[#3F328A] uppercase tracking-wider">
                          Active Chapter Content
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-[#17152A]">
                          {activeChapter.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsAddVideoOpen(true)}
                          className="px-3 py-1.5 rounded-xl bg-[#F0EDFD] hover:bg-[#3F328A] text-[#3F328A] hover:text-white font-bold text-xs transition-colors flex items-center gap-1"
                        >
                          <Video size={13} />
                          <span>+ Video</span>
                        </button>

                        <button
                          onClick={() => setIsAddDocOpen(true)}
                          className="px-3 py-1.5 rounded-xl bg-[#E8FAF0] hover:bg-[#16A34A] text-[#16A34A] hover:text-white font-bold text-xs transition-colors flex items-center gap-1 border border-[#C5F3D8]"
                        >
                          <FileText size={13} />
                          <span>+ PDF Doc</span>
                        </button>

                        <button
                          onClick={() => setIsAddTestOpen(true)}
                          className="px-3 py-1.5 rounded-xl bg-[#FFE8ED] hover:bg-[#FF3F68] text-[#FF3F68] hover:text-white font-bold text-xs transition-colors flex items-center gap-1 border border-[#FFCCD6]"
                        >
                          <FileQuestion size={13} />
                          <span>+ Test Paper</span>
                        </button>
                      </div>
                    </div>

                    {/* 1. Video Lectures in this chapter */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-[#17152A]">
                        <span className="flex items-center gap-1.5">
                          <Play size={13} className="text-[#3F328A]" />
                          <span>Video Lectures ({activeChapter.lessons?.length || 0})</span>
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {activeChapter.lessons && activeChapter.lessons.length > 0 ? (
                          activeChapter.lessons.map((v, vIdx) => (
                            <div
                              key={v.id}
                              className="p-3 rounded-2xl bg-[#FAFAFD] border border-[#E7E3F5] flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                <div className="w-6 h-6 rounded-lg bg-[#3F328A] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                                  {vIdx + 1}
                                </div>
                                <div className="truncate">
                                  <div className="font-bold text-[#17152A] truncate">
                                    {v.title}
                                  </div>
                                  <div className="text-[10px] text-[#6E6990] flex items-center gap-2 mt-0.5">
                                    <span>Vimeo ID: {v.vimeoVideoId || '76979871'}</span>
                                    <span>•</span>
                                    <span>{v.durationMinutes || 45} mins</span>
                                    {v.isFreePreview && (
                                      <span className="text-amber-700 font-bold">• Free Preview</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-[#6E6990] italic py-2">
                            No videos added to this chapter. Click &quot;+ Video&quot; above.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 2. Documents (PDFs) in this chapter */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-[#17152A]">
                        <span className="flex items-center gap-1.5">
                          <FileText size={13} className="text-[#16A34A]" />
                          <span>
                            Study Documents &amp; Formula Notes (
                            {activeChapter.documents?.length || 0})
                          </span>
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {activeChapter.documents && activeChapter.documents.length > 0 ? (
                          activeChapter.documents.map((d) => (
                            <div
                              key={d.id}
                              className="p-3 rounded-2xl bg-[#FAFAFD] border border-[#E7E3F5] flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                <div className="w-6 h-6 rounded-lg bg-[#16A34A] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                                  PDF
                                </div>
                                <div className="truncate">
                                  <div className="font-bold text-[#17152A] truncate">
                                    {d.title}
                                  </div>
                                  <div className="text-[10px] text-[#6E6990] flex items-center gap-2 mt-0.5">
                                    <span>{d.pageCount || 10} Pages</span>
                                    <span>•</span>
                                    <span>{d.fileSizeBytes || '2.0 MB'}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-[#6E6990] italic py-2">
                            No PDF documents attached. Click &quot;+ PDF Doc&quot; above.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 3. Question Papers & Tests in this chapter */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-[#17152A]">
                        <span className="flex items-center gap-1.5">
                          <FileQuestion size={13} className="text-[#FF3F68]" />
                          <span>
                            Chapter Question Papers &amp; CBT Tests (
                            {activeChapter.testPapers?.length || 0})
                          </span>
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {activeChapter.testPapers && activeChapter.testPapers.length > 0 ? (
                          activeChapter.testPapers.map((t) => (
                            <div
                              key={t.id}
                              className="p-3 rounded-2xl bg-[#FFE8ED]/40 border border-[#FFCCD6] flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                <div className="w-6 h-6 rounded-lg bg-[#FF3F68] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                                  CBT
                                </div>
                                <div className="truncate">
                                  <div className="font-bold text-[#17152A] truncate">
                                    {t.title}
                                  </div>
                                  <div className="text-[10px] text-[#6E6990] flex items-center gap-2 mt-0.5">
                                    <span>{t.totalQuestions} Questions</span>
                                    <span>•</span>
                                    <span>{t.durationMinutes} Minutes</span>
                                    <span>•</span>
                                    <span>{t.totalMarks || 75} Marks</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-[#6E6990] italic py-2">
                            No test paper attached. Click &quot;+ Test Paper&quot; above.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-16 text-center text-xs text-[#6E6990]">
                    Select a chapter from the left or add a new chapter to manage its videos, PDFs, and tests.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POPUP: ADD SUBJECT */}
      {isAddSubjectOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-[#E7E3F5]">
            <h4 className="font-extrabold text-sm text-[#17152A]">Add New Course Subject</h4>
            <div>
              <label className="block text-xs font-bold text-[#6E6990] mb-1">
                Subject Name
              </label>
              <input
                type="text"
                placeholder="e.g. Physics, Chemistry, Mathematics"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs focus:outline-none focus:border-[#3F328A]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsAddSubjectOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#6E6990]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubject}
                className="px-4 py-1.5 rounded-lg bg-[#3F328A] text-white text-xs font-bold"
              >
                Add Subject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP: ADD CHAPTER */}
      {isAddChapterOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-[#E7E3F5]">
            <h4 className="font-extrabold text-sm text-[#17152A]">
              Add Chapter to {activeSubject?.name}
            </h4>
            <div>
              <label className="block text-xs font-bold text-[#6E6990] mb-1">
                Chapter Title
              </label>
              <input
                type="text"
                placeholder="e.g. Electrostatics & Capacitance"
                value={newChapterTitle}
                onChange={(e) => setNewChapterTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-xs focus:outline-none focus:border-[#3F328A]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsAddChapterOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#6E6990]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddChapter}
                className="px-4 py-1.5 rounded-lg bg-[#3F328A] text-white text-xs font-bold"
              >
                Add Chapter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP: ADD VIDEO LESSON */}
      {isAddVideoOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-xl border border-[#E7E3F5]">
            <h4 className="font-extrabold text-sm text-[#17152A]">
              Add Video Lesson to {activeChapter?.title}
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#6E6990] mb-1">Video Title</label>
                <input
                  type="text"
                  placeholder="e.g. Coulomb Law & Superposition Principle"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-[#3F328A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#6E6990] mb-1">Vimeo ID</label>
                  <input
                    type="text"
                    placeholder="76979871"
                    value={newVideo.vimeoVideoId}
                    onChange={(e) =>
                      setNewVideo({ ...newVideo, vimeoVideoId: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-[#3F328A]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#6E6990] mb-1">
                    Duration (mins)
                  </label>
                  <input
                    type="number"
                    value={newVideo.durationMinutes}
                    onChange={(e) =>
                      setNewVideo({
                        ...newVideo,
                        durationMinutes: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-[#3F328A]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#6E6990] mb-1">
                  Attached PDF Notes URL (Optional)
                </label>
                <input
                  type="text"
                  value={newVideo.pdfNotesUrl}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, pdfNotesUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-[#3F328A]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isFreePreview"
                  checked={newVideo.isFreePreview}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, isFreePreview: e.target.checked })
                  }
                  className="rounded"
                />
                <label htmlFor="isFreePreview" className="font-bold text-[#17152A]">
                  Enable as Free Preview Video
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsAddVideoOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#6E6990]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVideo}
                className="px-4 py-1.5 rounded-lg bg-[#3F328A] text-white text-xs font-bold"
              >
                Add Video Lesson
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP: ADD PDF DOCUMENT */}
      {isAddDocOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-xl border border-[#E7E3F5]">
            <h4 className="font-extrabold text-sm text-[#17152A]">
              Add PDF Document to {activeChapter?.title}
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#6E6990] mb-1">Document Title</label>
                <input
                  type="text"
                  placeholder="e.g. Electrostatics Complete Formula Cheatsheet"
                  value={newDoc.title}
                  onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-[#3F328A]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#6E6990] mb-1">PDF File URL</label>
                <input
                  type="text"
                  value={newDoc.pdfUrl}
                  onChange={(e) => setNewDoc({ ...newDoc, pdfUrl: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-[#3F328A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#6E6990] mb-1">File Size</label>
                  <input
                    type="text"
                    value={newDoc.fileSizeBytes}
                    onChange={(e) =>
                      setNewDoc({ ...newDoc, fileSizeBytes: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-[#3F328A]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#6E6990] mb-1">Page Count</label>
                  <input
                    type="number"
                    value={newDoc.pageCount}
                    onChange={(e) =>
                      setNewDoc({ ...newDoc, pageCount: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-[#3F328A]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#6E6990] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDoc.description}
                  onChange={(e) => setNewDoc({ ...newDoc, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-[#3F328A]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsAddDocOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#6E6990]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDocument}
                className="px-4 py-1.5 rounded-lg bg-[#16A34A] text-white text-xs font-bold"
              >
                Add Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP: ADD QUESTION PAPER */}
      {isAddTestOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-xl border border-[#E7E3F5]">
            <h4 className="font-extrabold text-sm text-[#17152A]">
              Add Question Paper / Test to {activeChapter?.title}
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#6E6990] mb-1">
                  Test Paper Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Electrostatics & Capacitance Chapter Speed Test"
                  value={newTest.title}
                  onChange={(e) => setNewTest({ ...newTest, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-[#3F328A]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#6E6990] mb-1">Duration (m)</label>
                  <input
                    type="number"
                    value={newTest.durationMinutes}
                    onChange={(e) =>
                      setNewTest({
                        ...newTest,
                        durationMinutes: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-[#3F328A]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#6E6990] mb-1">Questions</label>
                  <input
                    type="number"
                    value={newTest.totalQuestions}
                    onChange={(e) =>
                      setNewTest({
                        ...newTest,
                        totalQuestions: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-[#3F328A]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#6E6990] mb-1">Marks</label>
                  <input
                    type="number"
                    value={newTest.totalMarks}
                    onChange={(e) =>
                      setNewTest({
                        ...newTest,
                        totalMarks: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-[#3F328A]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#6E6990] mb-1">
                  Linked CBT Test Paper ID
                </label>
                <select
                  value={newTest.testPaperId}
                  onChange={(e) =>
                    setNewTest({ ...newTest, testPaperId: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-[#3F328A]"
                >
                  <option value={1}>BITSAT Full-Length Mock 01 (Official CBT Simulator)</option>
                  <option value={2}>BITSAT Speed &amp; Accuracy Diagnostic 02</option>
                  <option value={3}>JEE Main 2026 High-Yield Mock 01</option>
                  <option value={4}>Legacy Oscillations &amp; Comprehensive Science (37 Qs)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsAddTestOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#6E6990]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTestPaper}
                className="px-4 py-1.5 rounded-lg bg-[#FF3F68] text-white text-xs font-bold"
              >
                Attach Question Paper
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE COURSE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E7E3F5] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E3F5]">
              <h3 className="text-lg font-bold text-[#17152A]">Create New Prep Course</h3>
              <button onClick={() => setIsCreateModalOpen(false)}>
                <X size={18} className="text-[#6E6990]" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BITSAT 2026 Master Crash Course"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5] focus:outline-none focus:border-[#3F328A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Target Exam</label>
                  <select
                    value={newCourse.examTag}
                    onChange={(e) => setNewCourse({ ...newCourse, examTag: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5] focus:outline-none focus:border-[#3F328A]"
                  >
                    <option value="BITSAT">BITSAT</option>
                    <option value="JEE Main">JEE Main</option>
                    <option value="COMEDK">COMEDK</option>
                    <option value="MET">MET</option>
                    <option value="VITEEE">VITEEE</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Category</label>
                  <select
                    value={newCourse.category}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, category: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5] focus:outline-none focus:border-[#3F328A]"
                  >
                    <option value="CRASH_COURSE">Crash Course</option>
                    <option value="TEST_SERIES">Test Series</option>
                    <option value="MENTORSHIP">Mentorship</option>
                    <option value="FULL_COURSE">Full Course</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Discount Price (₹)</label>
                  <input
                    type="number"
                    value={newCourse.discountPrice}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        discountPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5] focus:outline-none focus:border-[#3F328A]"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={newCourse.originalPrice}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        originalPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5] focus:outline-none focus:border-[#3F328A]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Short Summary</label>
                <input
                  type="text"
                  placeholder="Crisp 1-line description"
                  value={newCourse.shortDescription}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, shortDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#E7E3F5] focus:outline-none focus:border-[#3F328A]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#6E6990]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#3F328A] text-white font-bold text-xs"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
