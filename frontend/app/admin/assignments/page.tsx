'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Layers } from 'lucide-react';
import CourseContentAssignmentView from '@/components/admin/CourseContentAssignment';

export default function AdminAssignmentsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-[#E7E3F5]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/courses"
            className="p-2 rounded-xl bg-white border border-[#E7E3F5] text-[#3F328A] hover:bg-[#F6F4FF] transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <span className="text-[11px] font-bold text-[#3F328A] uppercase tracking-wider">
              10Q Challenge Administration
            </span>
            <h2 className="text-xl font-extrabold text-[#17152A]">
              Course Content Assignment
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/courses"
            className="px-4 py-2 rounded-xl bg-white border border-[#E7E3F5] text-xs font-bold text-[#17152A] hover:bg-[#F6F4FF] transition-colors flex items-center gap-1.5"
          >
            <BookOpen size={14} />
            <span>Go to Course Master</span>
          </Link>
        </div>
      </div>

      <CourseContentAssignmentView />
    </div>
  );
}
