'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Video,
  FileText,
  FileQuestion,
  Radio,
  Search,
  CheckSquare,
  Square,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  Save,
  Trash2,
  ExternalLink,
  Clock,
  Calendar,
  User,
  Filter,
  Check,
  RefreshCw,
  Plus,
  Play,
} from 'lucide-react';
import {
  Course,
  VideoMasterItem,
  DocumentMasterItem,
  TestSeriesMasterItem,
  LiveSessionMasterItem,
  CourseContentAssignment,
} from '@/types';
import { api } from '@/lib/api';

interface CourseContentAssignmentProps {
  initialCourseId?: number;
  onNavigateToCourseMaster?: () => void;
}

export default function CourseContentAssignmentView({
  initialCourseId,
  onNavigateToCourseMaster,
}: CourseContentAssignmentProps) {
  // Courses state
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(
    initialCourseId || null
  );
  const [courseSearch, setCourseSearch] = useState('');
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);

  // Active Tab: 'VIDEOS' | 'DOCUMENTS' | 'TEST_SERIES' | 'LIVE_SESSIONS'
  const [activeTab, setActiveTab] = useState<
    'VIDEOS' | 'DOCUMENTS' | 'TEST_SERIES' | 'LIVE_SESSIONS'
  >('VIDEOS');

  // Master Repositories state
  const [videos, setVideos] = useState<VideoMasterItem[]>([]);
  const [documents, setDocuments] = useState<DocumentMasterItem[]>([]);
  const [testSeries, setTestSeries] = useState<TestSeriesMasterItem[]>([]);
  const [liveSessions, setLiveSessions] = useState<LiveSessionMasterItem[]>([]);

  // Current Assignments
  const [currentAssignment, setCurrentAssignment] =
    useState<CourseContentAssignment | null>(null);
  const [allAssignments, setAllAssignments] = useState<
    Record<number, CourseContentAssignment>
  >({});

  // Local selection drafts (pending save)
  const [selectedVideoIds, setSelectedVideoIds] = useState<number[]>([]);
  const [selectedDocIds, setSelectedDocIds] = useState<number[]>([]);
  const [selectedTestIds, setSelectedTestIds] = useState<number[]>([]);
  const [selectedLiveIds, setSelectedLiveIds] = useState<number[]>([]);

  // Filters & Search inside tabs
  const [videoSearch, setVideoSearch] = useState('');
  const [videoSubjectFilter, setVideoSubjectFilter] = useState('ALL');
  const [videoChapterFilter, setVideoChapterFilter] = useState('ALL');

  const [docSearch, setDocSearch] = useState('');
  const [docSubjectFilter, setDocSubjectFilter] = useState('ALL');
  const [docChapterFilter, setDocChapterFilter] = useState('ALL');

  const [testSearch, setTestSearch] = useState('');
  const [testExamFilter, setTestExamFilter] = useState('ALL');

  const [liveSearch, setLiveSearch] = useState('');
  const [liveStatusFilter, setLiveStatusFilter] = useState('ALL');

  // Loading & Feedback
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // Load all master data and courses
  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      try {
        const [cList, vList, dList, tList, sList, assignMap] =
          await Promise.all([
            api.getCourses(),
            api.getVideos(),
            api.getDocuments(),
            api.getTestSeries(),
            api.getLiveSessions(),
            api.getAllAssignments(),
          ]);

        setCourses(cList);
        setVideos(vList);
        setDocuments(dList);
        setTestSeries(tList);
        setLiveSessions(sList);
        setAllAssignments(assignMap);

        // Auto select first course if none selected
        if (!selectedCourseId && cList.length > 0) {
          setSelectedCourseId(cList[0].id);
        }
      } catch (err) {
        console.error('Error loading assignment master data:', err);
        setNotification({
          type: 'error',
          message: 'Failed to load master repositories. Please refresh the page.',
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialData();
  }, []);

  // Sync assignment draft when selected course changes
  useEffect(() => {
    if (!selectedCourseId) return;

    async function syncCourseAssignments() {
      if (!selectedCourseId) return;
      try {
        const assignment = await api.getCourseAssignments(selectedCourseId);
        setCurrentAssignment(assignment);
        setSelectedVideoIds(assignment.assignedVideoIds || []);
        setSelectedDocIds(assignment.assignedDocumentIds || []);
        setSelectedTestIds(assignment.assignedTestSeriesIds || []);
        setSelectedLiveIds(assignment.assignedLiveSessionIds || []);
      } catch (err) {
        console.error('Error fetching course assignments:', err);
      }
    }
    syncCourseAssignments();
  }, [selectedCourseId]);

  // Selected course object
  const selectedCourse = useMemo(() => {
    return courses.find((c) => c.id === selectedCourseId) || null;
  }, [courses, selectedCourseId]);

  // Filtered Courses for Searchable Dropdown
  const filteredCourses = useMemo(() => {
    if (!courseSearch.trim()) return courses;
    const q = courseSearch.toLowerCase();
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.examTag?.toLowerCase().includes(q) ||
        c.category?.toLowerCase().includes(q)
    );
  }, [courses, courseSearch]);

  // Subject and Chapter filter options derived from master data
  const availableVideoSubjects = useMemo(() => {
    return Array.from(new Set(videos.map((v) => v.subject))).filter(Boolean);
  }, [videos]);

  const availableVideoChapters = useMemo(() => {
    const list =
      videoSubjectFilter === 'ALL'
        ? videos
        : videos.filter((v) => v.subject === videoSubjectFilter);
    return Array.from(new Set(list.map((v) => v.chapter))).filter(Boolean);
  }, [videos, videoSubjectFilter]);

  const availableDocSubjects = useMemo(() => {
    return Array.from(new Set(documents.map((d) => d.subject))).filter(Boolean);
  }, [documents]);

  const availableDocChapters = useMemo(() => {
    const list =
      docSubjectFilter === 'ALL'
        ? documents
        : documents.filter((d) => d.subject === docSubjectFilter);
    return Array.from(new Set(list.map((d) => d.chapter))).filter(Boolean);
  }, [documents, docSubjectFilter]);

  // Filtered Master Items for each Tab
  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      const matchSearch =
        !videoSearch.trim() ||
        v.title.toLowerCase().includes(videoSearch.toLowerCase()) ||
        v.vimeoVideoId.includes(videoSearch);
      const matchSub =
        videoSubjectFilter === 'ALL' || v.subject === videoSubjectFilter;
      const matchChap =
        videoChapterFilter === 'ALL' || v.chapter === videoChapterFilter;
      return matchSearch && matchSub && matchChap;
    });
  }, [videos, videoSearch, videoSubjectFilter, videoChapterFilter]);

  const filteredDocuments = useMemo(() => {
    return documents.filter((d) => {
      const matchSearch =
        !docSearch.trim() ||
        d.title.toLowerCase().includes(docSearch.toLowerCase());
      const matchSub =
        docSubjectFilter === 'ALL' || d.subject === docSubjectFilter;
      const matchChap =
        docChapterFilter === 'ALL' || d.chapter === docChapterFilter;
      return matchSearch && matchSub && matchChap;
    });
  }, [documents, docSearch, docSubjectFilter, docChapterFilter]);

  const filteredTestSeries = useMemo(() => {
    return testSeries.filter((t) => {
      const matchSearch =
        !testSearch.trim() ||
        t.title.toLowerCase().includes(testSearch.toLowerCase());
      const matchExam =
        testExamFilter === 'ALL' || t.examTag === testExamFilter;
      return matchSearch && matchExam;
    });
  }, [testSeries, testSearch, testExamFilter]);

  const filteredLiveSessions = useMemo(() => {
    return liveSessions.filter((s) => {
      const matchSearch =
        !liveSearch.trim() ||
        s.title.toLowerCase().includes(liveSearch.toLowerCase()) ||
        s.facultyName.toLowerCase().includes(liveSearch.toLowerCase());
      const matchStatus =
        liveStatusFilter === 'ALL' || s.status === liveStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [liveSessions, liveSearch, liveStatusFilter]);

  // Helper: Find which other courses use a master item (Many-to-Many visualization)
  const getOtherCoursesUsingItem = (
    itemType: 'video' | 'document' | 'testSeries' | 'liveSession',
    itemId: number
  ) => {
    return courses.filter((c) => {
      if (c.id === selectedCourseId) return false;
      const a = allAssignments[c.id];
      if (!a) return false;
      if (itemType === 'video') return a.assignedVideoIds?.includes(itemId);
      if (itemType === 'document') return a.assignedDocumentIds?.includes(itemId);
      if (itemType === 'testSeries')
        return a.assignedTestSeriesIds?.includes(itemId);
      if (itemType === 'liveSession')
        return a.assignedLiveSessionIds?.includes(itemId);
      return false;
    });
  };

  // Checkbox Toggle Handlers
  const toggleVideo = (id: number) => {
    setSelectedVideoIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleDoc = (id: number) => {
    setSelectedDocIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleTest = (id: number) => {
    setSelectedTestIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleLive = (id: number) => {
    setSelectedLiveIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Bulk Selection Helpers
  const selectAllFilteredVideos = () => {
    const ids = filteredVideos.map((v) => v.id);
    setSelectedVideoIds((prev) => Array.from(new Set([...prev, ...ids])));
  };

  const clearFilteredVideos = () => {
    const idsToRemove = new Set(filteredVideos.map((v) => v.id));
    setSelectedVideoIds((prev) => prev.filter((id) => !idsToRemove.has(id)));
  };

  const selectAllFilteredDocs = () => {
    const ids = filteredDocuments.map((d) => d.id);
    setSelectedDocIds((prev) => Array.from(new Set([...prev, ...ids])));
  };

  const clearFilteredDocs = () => {
    const idsToRemove = new Set(filteredDocuments.map((d) => d.id));
    setSelectedDocIds((prev) => prev.filter((id) => !idsToRemove.has(id)));
  };

  const selectAllFilteredTests = () => {
    const ids = filteredTestSeries.map((t) => t.id);
    setSelectedTestIds((prev) => Array.from(new Set([...prev, ...ids])));
  };

  const clearFilteredTests = () => {
    const idsToRemove = new Set(filteredTestSeries.map((t) => t.id));
    setSelectedTestIds((prev) => prev.filter((id) => !idsToRemove.has(id)));
  };

  const selectAllFilteredLive = () => {
    const ids = filteredLiveSessions.map((s) => s.id);
    setSelectedLiveIds((prev) => Array.from(new Set([...prev, ...ids])));
  };

  const clearFilteredLive = () => {
    const idsToRemove = new Set(filteredLiveSessions.map((s) => s.id));
    setSelectedLiveIds((prev) => prev.filter((id) => !idsToRemove.has(id)));
  };

  // Save Assignments for current Tab or All Tabs
  const handleSaveAssignments = async () => {
    if (!selectedCourseId) {
      setNotification({
        type: 'error',
        message: 'Please select a course first before saving assignments.',
      });
      return;
    }

    setIsSaving(true);
    try {
      const updated = await api.saveCourseAssignments(selectedCourseId, {
        assignedVideoIds: selectedVideoIds,
        assignedDocumentIds: selectedDocIds,
        assignedTestSeriesIds: selectedTestIds,
        assignedLiveSessionIds: selectedLiveIds,
      });

      setCurrentAssignment(updated);
      setAllAssignments((prev) => ({ ...prev, [selectedCourseId]: updated }));

      setNotification({
        type: 'success',
        message: `Successfully saved content assignments for "${selectedCourse?.title}". Enrolled students now have instant access!`,
      });

      setTimeout(() => setNotification(null), 5000);
    } catch (err) {
      console.error('Error saving assignments:', err);
      setNotification({
        type: 'error',
        message: 'Failed to persist assignments. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Remove single item from course (Never deletes master record!)
  const handleRemoveSingleItem = async (
    itemType: 'video' | 'document' | 'testSeries' | 'liveSession',
    itemId: number,
    itemTitle: string
  ) => {
    if (!selectedCourseId) return;

    if (
      !window.confirm(
        `Remove "${itemTitle}" from this course?\n\nNOTE: The original master record will remain safely in the master repository and in any other courses using it.`
      )
    ) {
      return;
    }

    try {
      const updated = await api.removeAssignmentItem(
        selectedCourseId,
        itemType,
        itemId
      );
      setCurrentAssignment(updated);
      setAllAssignments((prev) => ({ ...prev, [selectedCourseId]: updated }));

      if (itemType === 'video') setSelectedVideoIds(updated.assignedVideoIds);
      if (itemType === 'document') setSelectedDocIds(updated.assignedDocumentIds);
      if (itemType === 'testSeries')
        setSelectedTestIds(updated.assignedTestSeriesIds);
      if (itemType === 'liveSession')
        setSelectedLiveIds(updated.assignedLiveSessionIds);

      setNotification({
        type: 'info',
        message: `Removed "${itemTitle}" from this course. Master record preserved!`,
      });
      setTimeout(() => setNotification(null), 4000);
    } catch (err) {
      console.error('Error removing assignment:', err);
    }
  };

  // Counts of current assignments
  const counts = {
    videos: selectedVideoIds.length,
    documents: selectedDocIds.length,
    testSeries: selectedTestIds.length,
    liveSessions: selectedLiveIds.length,
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-[#E7E3F5] shadow-xs">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3F328A] mx-auto mb-3" />
        <p className="text-xs font-bold text-[#6E6990]">
          Loading Course Content Assignment System...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-[#17152A] via-[#2A2356] to-[#3F328A] text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#facc15] uppercase tracking-wider mb-2">
              <Layers size={16} />
              <span>Multi-Course Content Assignment Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Course Content Assignment
            </h1>
            <p className="text-sm text-white/80 max-w-2xl mt-1.5 leading-relaxed">
              Link existing Vimeo videos, study documents, CBT mock tests, and live
              sessions to courses. A single master item can belong to multiple
              courses without duplicating master files.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleSaveAssignments}
              disabled={isSaving || !selectedCourseId}
              className="px-6 py-3 rounded-2xl bg-[#20D66B] hover:bg-[#18B85A] text-slate-900 font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Saving Assignments...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save All Assignments</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* NOTIFICATION BANNER */}
      {notification && (
        <div
          className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between gap-3 transition-all ${
            notification.type === 'success'
              ? 'bg-[#E8FAF0] text-[#16A34A] border-[#C5F3D8]'
              : notification.type === 'error'
              ? 'bg-[#FFE8ED] text-[#FF3F68] border-[#FFCCD6]'
              : 'bg-[#F0EDFD] text-[#3F328A] border-[#DCD5F9]'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <CheckCircle2 size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-xs opacity-70 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* STEP 1 & 2: SELECT COURSE DROPDOWN & CURRENT ASSIGNMENT COUNTERS */}
      <div className="bg-white p-6 rounded-3xl border border-[#E7E3F5] shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#F1EFFB]">
          {/* Searchable Course Dropdown */}
          <div className="w-full lg:max-w-md relative">
            <label className="block text-xs font-bold text-[#17152A] mb-2 uppercase tracking-wider">
              Select Target Course:
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCourseDropdownOpen((prev) => !prev)}
                className="w-full px-4 py-3 bg-[#F6F4FF] hover:bg-[#EAE6FD] border border-[#DCD5F9] rounded-2xl text-left font-bold text-sm text-[#17152A] flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2 overflow-hidden pr-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3F328A] shrink-0" />
                  <span className="truncate">
                    {selectedCourse
                      ? selectedCourse.title
                      : 'Choose Course to Assign Content...'}
                  </span>
                </div>
                <span className="text-xs px-2 py-1 rounded-lg bg-white text-[#3F328A] font-extrabold border border-[#DCD5F9] shrink-0">
                  {selectedCourse?.examTag || 'Select'}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isCourseDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-full bg-white border border-[#DCD5F9] rounded-2xl shadow-xl z-50 p-2 space-y-2 max-h-80 overflow-y-auto">
                  <div className="p-2 border-b border-[#F1EFFB]">
                    <div className="relative">
                      <Search
                        size={14}
                        className="absolute left-3 top-3 text-[#6E6990]"
                      />
                      <input
                        type="text"
                        placeholder="Search courses by name or exam tag..."
                        value={courseSearch}
                        onChange={(e) => setCourseSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-[#F6F4FF] border border-[#E7E3F5] rounded-xl text-xs font-bold text-[#17152A] focus:outline-hidden focus:border-[#3F328A]"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    {filteredCourses.map((c) => {
                      const isSelected = c.id === selectedCourseId;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            setSelectedCourseId(c.id);
                            setIsCourseDropdownOpen(false);
                            setCourseSearch('');
                          }}
                          className={`w-full p-2.5 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#3F328A] text-white shadow-xs'
                              : 'hover:bg-[#F6F4FF] text-[#17152A]'
                          }`}
                        >
                          <div className="overflow-hidden pr-2">
                            <p className="truncate">{c.title}</p>
                            <p
                              className={`text-[10px] ${
                                isSelected ? 'text-white/80' : 'text-[#6E6990]'
                              }`}
                            >
                              ₹{c.discountPrice || c.price || 4999} •{' '}
                              {c.examTag || 'Exam'}
                            </p>
                          </div>
                          {isSelected && <Check size={14} />}
                        </button>
                      );
                    })}

                    {filteredCourses.length === 0 && (
                      <p className="p-4 text-center text-xs text-[#6E6990]">
                        No matching courses found.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Active Course Details Badge */}
          {selectedCourse && (
            <div className="flex flex-wrap items-center gap-3 bg-[#FAFAFD] p-3 rounded-2xl border border-[#E7E3F5]">
              <div className="text-xs text-[#6E6990]">
                <span className="font-bold text-[#17152A]">Course ID:</span>{' '}
                {selectedCourse.id}
              </div>
              <span className="text-slate-300">•</span>
              <div className="text-xs text-[#6E6990]">
                <span className="font-bold text-[#17152A]">Price:</span> ₹
                {selectedCourse.discountPrice || selectedCourse.price}
              </div>
              <span className="text-slate-300">•</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#E8FAF0] text-[#16A34A] text-[11px] font-extrabold border border-[#C5F3D8]">
                Published &amp; Active
              </span>
            </div>
          )}
        </div>

        {/* ACTUAL ASSIGNMENT COUNTERS (Do not hardcode!) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            onClick={() => setActiveTab('VIDEOS')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              activeTab === 'VIDEOS'
                ? 'bg-[#F0EDFD] border-[#3F328A] shadow-xs'
                : 'bg-[#FAFAFD] border-[#E7E3F5] hover:bg-[#F6F4FF]'
            }`}
          >
            <div className="flex items-center justify-between text-[#3F328A] mb-1">
              <span className="text-[11px] font-extrabold uppercase">
                Video Materials
              </span>
              <Video size={16} />
            </div>
            <div className="text-2xl font-black text-[#17152A]">
              {counts.videos}{' '}
              <span className="text-xs font-normal text-[#6E6990]">assigned</span>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('DOCUMENTS')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              activeTab === 'DOCUMENTS'
                ? 'bg-[#F0EDFD] border-[#3F328A] shadow-xs'
                : 'bg-[#FAFAFD] border-[#E7E3F5] hover:bg-[#F6F4FF]'
            }`}
          >
            <div className="flex items-center justify-between text-[#3F328A] mb-1">
              <span className="text-[11px] font-extrabold uppercase">
                Document Materials
              </span>
              <FileText size={16} />
            </div>
            <div className="text-2xl font-black text-[#17152A]">
              {counts.documents}{' '}
              <span className="text-xs font-normal text-[#6E6990]">assigned</span>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('TEST_SERIES')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              activeTab === 'TEST_SERIES'
                ? 'bg-[#FFE8ED] border-[#FF3F68] shadow-xs'
                : 'bg-[#FAFAFD] border-[#E7E3F5] hover:bg-[#FFE8ED]/40'
            }`}
          >
            <div className="flex items-center justify-between text-[#FF3F68] mb-1">
              <span className="text-[11px] font-extrabold uppercase">
                Test Series
              </span>
              <FileQuestion size={16} />
            </div>
            <div className="text-2xl font-black text-[#17152A]">
              {counts.testSeries}{' '}
              <span className="text-xs font-normal text-[#6E6990]">assigned</span>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('LIVE_SESSIONS')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              activeTab === 'LIVE_SESSIONS'
                ? 'bg-[#E8FAF0] border-[#16A34A] shadow-xs'
                : 'bg-[#FAFAFD] border-[#E7E3F5] hover:bg-[#E8FAF0]/40'
            }`}
          >
            <div className="flex items-center justify-between text-[#16A34A] mb-1">
              <span className="text-[11px] font-extrabold uppercase">
                Live Sessions
              </span>
              <Radio size={16} />
            </div>
            <div className="text-2xl font-black text-[#17152A]">
              {counts.liveSessions}{' '}
              <span className="text-xs font-normal text-[#6E6990]">assigned</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 INTERACTIVE TABS */}
      <div className="bg-white rounded-3xl border border-[#E7E3F5] shadow-xs overflow-hidden">
        {/* TAB NAVIGATION BAR */}
        <div className="flex items-center border-b border-[#E7E3F5] bg-[#FAFAFD] px-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('VIDEOS')}
            className={`px-5 py-4 text-xs font-extrabold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'VIDEOS'
                ? 'border-[#3F328A] text-[#3F328A] bg-white'
                : 'border-transparent text-[#6E6990] hover:text-[#17152A]'
            }`}
          >
            <Video size={16} />
            <span>Video Materials ({videos.length})</span>
            <span className="px-2 py-0.5 rounded-full bg-[#F0EDFD] text-[#3F328A] text-[10px]">
              {counts.videos} Linked
            </span>
          </button>

          <button
            onClick={() => setActiveTab('DOCUMENTS')}
            className={`px-5 py-4 text-xs font-extrabold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'DOCUMENTS'
                ? 'border-[#3F328A] text-[#3F328A] bg-white'
                : 'border-transparent text-[#6E6990] hover:text-[#17152A]'
            }`}
          >
            <FileText size={16} />
            <span>Document Materials ({documents.length})</span>
            <span className="px-2 py-0.5 rounded-full bg-[#F0EDFD] text-[#3F328A] text-[10px]">
              {counts.documents} Linked
            </span>
          </button>

          <button
            onClick={() => setActiveTab('TEST_SERIES')}
            className={`px-5 py-4 text-xs font-extrabold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'TEST_SERIES'
                ? 'border-[#FF3F68] text-[#FF3F68] bg-white'
                : 'border-transparent text-[#6E6990] hover:text-[#17152A]'
            }`}
          >
            <FileQuestion size={16} />
            <span>Test Series ({testSeries.length})</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFE8ED] text-[#FF3F68] text-[10px]">
              {counts.testSeries} Linked
            </span>
          </button>

          <button
            onClick={() => setActiveTab('LIVE_SESSIONS')}
            className={`px-5 py-4 text-xs font-extrabold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'LIVE_SESSIONS'
                ? 'border-[#16A34A] text-[#16A34A] bg-white'
                : 'border-transparent text-[#6E6990] hover:text-[#17152A]'
            }`}
          >
            <Radio size={16} />
            <span>Live Sessions ({liveSessions.length})</span>
            <span className="px-2 py-0.5 rounded-full bg-[#E8FAF0] text-[#16A34A] text-[10px]">
              {counts.liveSessions} Linked
            </span>
          </button>
        </div>

        {/* TAB 1: VIDEO MATERIALS */}
        {activeTab === 'VIDEOS' && (
          <div className="p-6 space-y-5">
            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 grow">
                <div className="relative min-w-[240px] grow sm:grow-0">
                  <Search
                    size={14}
                    className="absolute left-3.5 top-3.5 text-[#6E6990]"
                  />
                  <input
                    type="text"
                    placeholder="Search by video title or Vimeo ID..."
                    value={videoSearch}
                    onChange={(e) => setVideoSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAFAFD] border border-[#E7E3F5] rounded-xl text-xs font-bold text-[#17152A] focus:outline-hidden focus:border-[#3F328A]"
                  />
                </div>

                <select
                  value={videoSubjectFilter}
                  onChange={(e) => {
                    setVideoSubjectFilter(e.target.value);
                    setVideoChapterFilter('ALL');
                  }}
                  className="px-3 py-2.5 bg-[#FAFAFD] border border-[#E7E3F5] rounded-xl text-xs font-bold text-[#17152A] focus:outline-hidden focus:border-[#3F328A]"
                >
                  <option value="ALL">All Subjects</option>
                  {availableVideoSubjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>

                <select
                  value={videoChapterFilter}
                  onChange={(e) => setVideoChapterFilter(e.target.value)}
                  className="px-3 py-2.5 bg-[#FAFAFD] border border-[#E7E3F5] rounded-xl text-xs font-bold text-[#17152A] focus:outline-hidden focus:border-[#3F328A]"
                >
                  <option value="ALL">All Chapters</option>
                  {availableVideoChapters.map((chap) => (
                    <option key={chap} value={chap}>
                      {chap}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bulk actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={selectAllFilteredVideos}
                  className="px-3 py-2 bg-[#F6F4FF] hover:bg-[#EAE6FD] text-[#3F328A] text-xs font-bold rounded-xl transition-colors"
                >
                  Select All Filtered
                </button>
                <button
                  type="button"
                  onClick={clearFilteredVideos}
                  className="px-3 py-2 bg-[#FAFAFD] hover:bg-slate-100 text-[#6E6990] text-xs font-bold rounded-xl transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Video List Table */}
            <div className="border border-[#E7E3F5] rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAFAFD] border-b border-[#E7E3F5] text-[#6E6990] font-extrabold uppercase text-[10px]">
                    <th className="p-4 w-12 text-center">Select</th>
                    <th className="p-4">Video Title &amp; Vimeo Details</th>
                    <th className="p-4">Subject &amp; Chapter</th>
                    <th className="p-4">Status &amp; Shared Courses</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1EFFB]">
                  {filteredVideos.map((video) => {
                    const isAssigned = selectedVideoIds.includes(video.id);
                    const otherCourses = getOtherCoursesUsingItem(
                      'video',
                      video.id
                    );

                    return (
                      <tr
                        key={video.id}
                        className={`transition-colors ${
                          isAssigned ? 'bg-[#F9F8FF]' : 'hover:bg-[#FAFAFD]'
                        }`}
                      >
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={isAssigned}
                            onChange={() => toggleVideo(video.id)}
                            className="w-4 h-4 rounded-md accent-[#3F328A] cursor-pointer"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2.5 rounded-xl bg-[#F0EDFD] text-[#3F328A] shrink-0 mt-0.5">
                              <Play size={14} className="fill-[#3F328A]" />
                            </div>
                            <div>
                              <p className="font-bold text-[#17152A] text-xs">
                                {video.title}
                              </p>
                              <div className="flex items-center gap-3 text-[11px] text-[#6E6990] mt-1 font-medium">
                                <span className="font-mono text-[#3F328A]">
                                  Vimeo ID: {video.vimeoVideoId}
                                </span>
                                <span>•</span>
                                <span>{video.durationMinutes} mins</span>
                                {video.isFreePreview && (
                                  <>
                                    <span>•</span>
                                    <span className="text-amber-700 font-bold">
                                      Free Preview
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-md bg-[#F0EDFD] text-[#3F328A] font-extrabold text-[10px]">
                            {video.subject}
                          </span>
                          <p className="text-[11px] text-[#6E6990] mt-1 font-semibold">
                            {video.chapter}
                          </p>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            {isAssigned ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E8FAF0] text-[#16A34A] text-[10px] font-extrabold border border-[#C5F3D8]">
                                <CheckCircle2 size={12} /> Assigned to Course
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-[#6E6990] text-[10px] font-bold">
                                Available to Link
                              </span>
                            )}

                            {otherCourses.length > 0 && (
                              <div className="text-[10px] text-[#6E6990]">
                                <span className="font-bold text-[#3F328A]">
                                  Also in:
                                </span>{' '}
                                {otherCourses.map((oc) => oc.title).join(', ')}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          {isAssigned ? (
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveSingleItem(
                                  'video',
                                  video.id,
                                  video.title
                                )
                              }
                              className="px-3 py-1.5 rounded-lg bg-[#FFE8ED] hover:bg-[#FFCCD6] text-[#FF3F68] font-bold text-[11px] transition-colors"
                              title="Unlink from this course (preserves master record)"
                            >
                              Remove Link
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => toggleVideo(video.id)}
                              className="px-3 py-1.5 rounded-lg bg-[#3F328A] hover:bg-[#2D246B] text-white font-bold text-[11px] transition-colors"
                            >
                              + Assign
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  {filteredVideos.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-[#6E6990]">
                        No video records matched your filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: DOCUMENT MATERIALS */}
        {activeTab === 'DOCUMENTS' && (
          <div className="p-6 space-y-5">
            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 grow">
                <div className="relative min-w-[240px] grow sm:grow-0">
                  <Search
                    size={14}
                    className="absolute left-3.5 top-3.5 text-[#6E6990]"
                  />
                  <input
                    type="text"
                    placeholder="Search documents by title..."
                    value={docSearch}
                    onChange={(e) => setDocSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAFAFD] border border-[#E7E3F5] rounded-xl text-xs font-bold text-[#17152A] focus:outline-hidden focus:border-[#3F328A]"
                  />
                </div>

                <select
                  value={docSubjectFilter}
                  onChange={(e) => {
                    setDocSubjectFilter(e.target.value);
                    setDocChapterFilter('ALL');
                  }}
                  className="px-3 py-2.5 bg-[#FAFAFD] border border-[#E7E3F5] rounded-xl text-xs font-bold text-[#17152A] focus:outline-hidden focus:border-[#3F328A]"
                >
                  <option value="ALL">All Subjects</option>
                  {availableDocSubjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>

                <select
                  value={docChapterFilter}
                  onChange={(e) => setDocChapterFilter(e.target.value)}
                  className="px-3 py-2.5 bg-[#FAFAFD] border border-[#E7E3F5] rounded-xl text-xs font-bold text-[#17152A] focus:outline-hidden focus:border-[#3F328A]"
                >
                  <option value="ALL">All Chapters</option>
                  {availableDocChapters.map((chap) => (
                    <option key={chap} value={chap}>
                      {chap}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={selectAllFilteredDocs}
                  className="px-3 py-2 bg-[#F6F4FF] hover:bg-[#EAE6FD] text-[#3F328A] text-xs font-bold rounded-xl transition-colors"
                >
                  Select All Filtered
                </button>
                <button
                  type="button"
                  onClick={clearFilteredDocs}
                  className="px-3 py-2 bg-[#FAFAFD] hover:bg-slate-100 text-[#6E6990] text-xs font-bold rounded-xl transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Document List Table */}
            <div className="border border-[#E7E3F5] rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAFAFD] border-b border-[#E7E3F5] text-[#6E6990] font-extrabold uppercase text-[10px]">
                    <th className="p-4 w-12 text-center">Select</th>
                    <th className="p-4">Document Title &amp; Details</th>
                    <th className="p-4">Subject &amp; Chapter</th>
                    <th className="p-4">Status &amp; Shared Courses</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1EFFB]">
                  {filteredDocuments.map((doc) => {
                    const isAssigned = selectedDocIds.includes(doc.id);
                    const otherCourses = getOtherCoursesUsingItem(
                      'document',
                      doc.id
                    );

                    return (
                      <tr
                        key={doc.id}
                        className={`transition-colors ${
                          isAssigned ? 'bg-[#F9F8FF]' : 'hover:bg-[#FAFAFD]'
                        }`}
                      >
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={isAssigned}
                            onChange={() => toggleDoc(doc.id)}
                            className="w-4 h-4 rounded-md accent-[#3F328A] cursor-pointer"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2.5 rounded-xl bg-[#F0EDFD] text-[#3F328A] shrink-0 mt-0.5">
                              <FileText size={14} />
                            </div>
                            <div>
                              <p className="font-bold text-[#17152A] text-xs">
                                {doc.title}
                              </p>
                              <div className="flex items-center gap-3 text-[11px] text-[#6E6990] mt-1 font-medium">
                                <span className="font-bold text-[#3F328A]">
                                  {doc.fileType}
                                </span>
                                <span>•</span>
                                <span>{doc.pageCount || 10} Pages</span>
                                <span>•</span>
                                <span>{doc.fileSizeBytes || '2.0 MB'}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-md bg-[#F0EDFD] text-[#3F328A] font-extrabold text-[10px]">
                            {doc.subject}
                          </span>
                          <p className="text-[11px] text-[#6E6990] mt-1 font-semibold">
                            {doc.chapter}
                          </p>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            {isAssigned ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E8FAF0] text-[#16A34A] text-[10px] font-extrabold border border-[#C5F3D8]">
                                <CheckCircle2 size={12} /> Assigned to Course
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-[#6E6990] text-[10px] font-bold">
                                Available to Link
                              </span>
                            )}

                            {otherCourses.length > 0 && (
                              <div className="text-[10px] text-[#6E6990]">
                                <span className="font-bold text-[#3F328A]">
                                  Also in:
                                </span>{' '}
                                {otherCourses.map((oc) => oc.title).join(', ')}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          {isAssigned ? (
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveSingleItem(
                                  'document',
                                  doc.id,
                                  doc.title
                                )
                              }
                              className="px-3 py-1.5 rounded-lg bg-[#FFE8ED] hover:bg-[#FFCCD6] text-[#FF3F68] font-bold text-[11px] transition-colors"
                            >
                              Remove Link
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => toggleDoc(doc.id)}
                              className="px-3 py-1.5 rounded-lg bg-[#3F328A] hover:bg-[#2D246B] text-white font-bold text-[11px] transition-colors"
                            >
                              + Assign
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredDocuments.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-[#6E6990]">
                        No document records found matching filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: TEST SERIES */}
        {activeTab === 'TEST_SERIES' && (
          <div className="p-6 space-y-5">
            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 grow">
                <div className="relative min-w-[240px] grow sm:grow-0">
                  <Search
                    size={14}
                    className="absolute left-3.5 top-3.5 text-[#6E6990]"
                  />
                  <input
                    type="text"
                    placeholder="Search test series by title..."
                    value={testSearch}
                    onChange={(e) => setTestSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAFAFD] border border-[#E7E3F5] rounded-xl text-xs font-bold text-[#17152A] focus:outline-hidden focus:border-[#FF3F68]"
                  />
                </div>

                <select
                  value={testExamFilter}
                  onChange={(e) => setTestExamFilter(e.target.value)}
                  className="px-3 py-2.5 bg-[#FAFAFD] border border-[#E7E3F5] rounded-xl text-xs font-bold text-[#17152A] focus:outline-hidden focus:border-[#FF3F68]"
                >
                  <option value="ALL">All Exams</option>
                  <option value="BITSAT">BITSAT</option>
                  <option value="JEE Main">JEE Main</option>
                  <option value="COMEDK">COMEDK</option>
                  <option value="MET">MET</option>
                  <option value="VITEEE">VITEEE</option>
                </select>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={selectAllFilteredTests}
                  className="px-3 py-2 bg-[#FFE8ED] hover:bg-[#FFCCD6] text-[#FF3F68] text-xs font-bold rounded-xl transition-colors"
                >
                  Select All Filtered
                </button>
                <button
                  type="button"
                  onClick={clearFilteredTests}
                  className="px-3 py-2 bg-[#FAFAFD] hover:bg-slate-100 text-[#6E6990] text-xs font-bold rounded-xl transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Test Series Table */}
            <div className="border border-[#E7E3F5] rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAFAFD] border-b border-[#E7E3F5] text-[#6E6990] font-extrabold uppercase text-[10px]">
                    <th className="p-4 w-12 text-center">Select</th>
                    <th className="p-4">Test Series Title &amp; Spec</th>
                    <th className="p-4">Exam &amp; Year</th>
                    <th className="p-4">Status &amp; Shared Courses</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1EFFB]">
                  {filteredTestSeries.map((test) => {
                    const isAssigned = selectedTestIds.includes(test.id);
                    const otherCourses = getOtherCoursesUsingItem(
                      'testSeries',
                      test.id
                    );

                    return (
                      <tr
                        key={test.id}
                        className={`transition-colors ${
                          isAssigned ? 'bg-[#FFF6F8]' : 'hover:bg-[#FAFAFD]'
                        }`}
                      >
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={isAssigned}
                            onChange={() => toggleTest(test.id)}
                            className="w-4 h-4 rounded-md accent-[#FF3F68] cursor-pointer"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2.5 rounded-xl bg-[#FFE8ED] text-[#FF3F68] shrink-0 mt-0.5">
                              <FileQuestion size={14} />
                            </div>
                            <div>
                              <p className="font-bold text-[#17152A] text-xs">
                                {test.title}
                              </p>
                              <div className="flex items-center gap-3 text-[11px] text-[#6E6990] mt-1 font-medium">
                                <span>⏱️ {test.durationMinutes} Mins</span>
                                <span>•</span>
                                <span>❓ {test.totalQuestions} Questions</span>
                                <span>•</span>
                                <span>🏆 {test.totalMarks} Marks</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-md bg-[#FFE8ED] text-[#FF3F68] font-extrabold text-[10px]">
                            {test.examTag}
                          </span>
                          <p className="text-[11px] text-[#6E6990] mt-1 font-semibold">
                            Target {test.targetYear}
                          </p>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            {isAssigned ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E8FAF0] text-[#16A34A] text-[10px] font-extrabold border border-[#C5F3D8]">
                                <CheckCircle2 size={12} /> Assigned to Course
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-[#6E6990] text-[10px] font-bold">
                                Available to Link
                              </span>
                            )}

                            {otherCourses.length > 0 && (
                              <div className="text-[10px] text-[#6E6990]">
                                <span className="font-bold text-[#3F328A]">
                                  Also in:
                                </span>{' '}
                                {otherCourses.map((oc) => oc.title).join(', ')}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          {isAssigned ? (
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveSingleItem(
                                  'testSeries',
                                  test.id,
                                  test.title
                                )
                              }
                              className="px-3 py-1.5 rounded-lg bg-[#FFE8ED] hover:bg-[#FFCCD6] text-[#FF3F68] font-bold text-[11px] transition-colors"
                            >
                              Remove Link
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => toggleTest(test.id)}
                              className="px-3 py-1.5 rounded-lg bg-[#FF3F68] hover:bg-[#E02852] text-white font-bold text-[11px] transition-colors"
                            >
                              + Assign
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredTestSeries.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-[#6E6990]">
                        No test series found matching filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: LIVE SESSIONS */}
        {activeTab === 'LIVE_SESSIONS' && (
          <div className="p-6 space-y-5">
            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 grow">
                <div className="relative min-w-[240px] grow sm:grow-0">
                  <Search
                    size={14}
                    className="absolute left-3.5 top-3.5 text-[#6E6990]"
                  />
                  <input
                    type="text"
                    placeholder="Search live sessions or faculty..."
                    value={liveSearch}
                    onChange={(e) => setLiveSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAFAFD] border border-[#E7E3F5] rounded-xl text-xs font-bold text-[#17152A] focus:outline-hidden focus:border-[#16A34A]"
                  />
                </div>

                <select
                  value={liveStatusFilter}
                  onChange={(e) => setLiveStatusFilter(e.target.value)}
                  className="px-3 py-2.5 bg-[#FAFAFD] border border-[#E7E3F5] rounded-xl text-xs font-bold text-[#17152A] focus:outline-hidden focus:border-[#16A34A]"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Live">Live</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={selectAllFilteredLive}
                  className="px-3 py-2 bg-[#E8FAF0] hover:bg-[#C5F3D8] text-[#16A34A] text-xs font-bold rounded-xl transition-colors"
                >
                  Select All Filtered
                </button>
                <button
                  type="button"
                  onClick={clearFilteredLive}
                  className="px-3 py-2 bg-[#FAFAFD] hover:bg-slate-100 text-[#6E6990] text-xs font-bold rounded-xl transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Live Sessions Table */}
            <div className="border border-[#E7E3F5] rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAFAFD] border-b border-[#E7E3F5] text-[#6E6990] font-extrabold uppercase text-[10px]">
                    <th className="p-4 w-12 text-center">Select</th>
                    <th className="p-4">Session Title &amp; Topic</th>
                    <th className="p-4">Date, Time &amp; Faculty</th>
                    <th className="p-4">Status &amp; Shared Courses</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1EFFB]">
                  {filteredLiveSessions.map((session) => {
                    const isAssigned = selectedLiveIds.includes(session.id);
                    const otherCourses = getOtherCoursesUsingItem(
                      'liveSession',
                      session.id
                    );

                    return (
                      <tr
                        key={session.id}
                        className={`transition-colors ${
                          isAssigned ? 'bg-[#F4FAF6]' : 'hover:bg-[#FAFAFD]'
                        }`}
                      >
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={isAssigned}
                            onChange={() => toggleLive(session.id)}
                            className="w-4 h-4 rounded-md accent-[#16A34A] cursor-pointer"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2.5 rounded-xl bg-[#E8FAF0] text-[#16A34A] shrink-0 mt-0.5">
                              <Radio size={14} />
                            </div>
                            <div>
                              <p className="font-bold text-[#17152A] text-xs">
                                {session.title}
                              </p>
                              <p className="text-[11px] text-[#6E6990] mt-1 line-clamp-1">
                                {session.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#17152A]">
                            <Calendar size={13} className="text-[#3F328A]" />
                            <span>{session.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-[#6E6990] mt-0.5">
                            <Clock size={12} />
                            <span>
                              {session.startTime} - {session.endTime} (
                              {session.timeZone})
                            </span>
                          </div>
                          <div className="text-[11px] font-semibold text-[#3F328A] mt-1">
                            👨‍🏫 {session.facultyName}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            {isAssigned ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E8FAF0] text-[#16A34A] text-[10px] font-extrabold border border-[#C5F3D8]">
                                <CheckCircle2 size={12} /> Assigned to Course
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-[#6E6990] text-[10px] font-bold">
                                Available to Link
                              </span>
                            )}

                            {otherCourses.length > 0 && (
                              <div className="text-[10px] text-[#6E6990]">
                                <span className="font-bold text-[#3F328A]">
                                  Also in:
                                </span>{' '}
                                {otherCourses.map((oc) => oc.title).join(', ')}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          {isAssigned ? (
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveSingleItem(
                                  'liveSession',
                                  session.id,
                                  session.title
                                )
                              }
                              className="px-3 py-1.5 rounded-lg bg-[#FFE8ED] hover:bg-[#FFCCD6] text-[#FF3F68] font-bold text-[11px] transition-colors"
                            >
                              Remove Link
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => toggleLive(session.id)}
                              className="px-3 py-1.5 rounded-lg bg-[#16A34A] hover:bg-[#11843B] text-white font-bold text-[11px] transition-colors"
                            >
                              + Assign
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredLiveSessions.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-[#6E6990]">
                        No live sessions found matching filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BOTTOM SAVE ACTIONS BAR */}
        <div className="p-5 bg-[#FAFAFD] border-t border-[#E7E3F5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#6E6990] flex items-center gap-2">
            <Sparkles size={14} className="text-[#3F328A]" />
            <span>
              Selected for <strong>{selectedCourse?.title}</strong>:{' '}
              <strong className="text-[#3F328A]">{counts.videos}</strong>{' '}
              Videos,{' '}
              <strong className="text-[#3F328A]">{counts.documents}</strong>{' '}
              Docs,{' '}
              <strong className="text-[#FF3F68]">{counts.testSeries}</strong>{' '}
              Tests,{' '}
              <strong className="text-[#16A34A]">{counts.liveSessions}</strong>{' '}
              Live Sessions
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveAssignments}
              disabled={isSaving || !selectedCourseId}
              className="px-6 py-2.5 rounded-xl bg-[#3F328A] hover:bg-[#2D246B] text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={14} />
                  <span>Save Course Assignments</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
