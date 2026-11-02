import {
  VideoMasterItem,
  DocumentMasterItem,
  TestSeriesMasterItem,
  LiveSessionMasterItem,
  CourseContentAssignment,
} from '@/types';

// ============================================================================
// 1. VIDEO MASTER REPOSITORY (FRESH / EMPTY)
// ============================================================================
export const INITIAL_VIDEO_MASTER: VideoMasterItem[] = [];

// ============================================================================
// 2. DOCUMENT MASTER REPOSITORY (FRESH / EMPTY)
// ============================================================================
export const INITIAL_DOCUMENT_MASTER: DocumentMasterItem[] = [];

// ============================================================================
// 3. TEST SERIES MASTER REPOSITORY (FRESH / EMPTY)
// ============================================================================
export const INITIAL_TEST_SERIES_MASTER: TestSeriesMasterItem[] = [];

// ============================================================================
// 4. LIVE SESSION MASTER REPOSITORY (FRESH / EMPTY)
// ============================================================================
export const INITIAL_LIVE_SESSIONS_MASTER: LiveSessionMasterItem[] = [];

// ============================================================================
// 5. COURSE CONTENT ASSIGNMENTS (FRESH / EMPTY)
// ============================================================================
export const INITIAL_COURSE_ASSIGNMENTS: Record<number, CourseContentAssignment> = {};
