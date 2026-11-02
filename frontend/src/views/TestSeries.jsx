'use client';
import React from 'react';
import { useParams, Link } from '@/src/compat/router';
import { CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { coursesData } from '../data/courses';

export default function TestSeries() {
  const params = useParams();
  const rawExam = params.examName || params.slug || 'All';
  const targetExam = rawExam === 'All' ? 'All' : rawExam.toUpperCase();

  const testPackages = coursesData.filter((c) => {
    const isTestSeries =
      c.category === 'TEST_SERIES' ||
      c.isShowInTestSeries ||
      (c.title && c.title.toLowerCase().includes('test'));
    if (!isTestSeries) return false;
    if (targetExam === 'All') return true;
    return c.exam && c.exam.toUpperCase() === targetExam;
  });

  return (
    <main className="min-h-screen bg-white text-slate-900 pt-24 pb-16">
      {/* Hero Header */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-amber-700 font-extrabold text-xs uppercase tracking-widest px-3.5 py-1 bg-amber-100 rounded-full inline-block mb-3 border border-amber-200">
            AI Test Engine
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {targetExam === 'All' ? 'Online CBT' : targetExam} Mock Test Series
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3 font-normal">
            Stop guessing your performance — measure it with India&apos;s most realistic test series designed by BITSians &amp; IITians.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {testPackages.length === 0 ? (
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-xs space-y-4">
              <FileText className="w-12 h-12 text-amber-500 mx-auto" />
              <h3 className="text-xl font-extrabold text-slate-900">No Test Series Published Yet</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Mock test series packages will appear here once created and published from the Admin Panel.
              </p>
              <Link
                to="/course-all"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-sm transition-all"
              >
                <span>View All Courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-amber-400 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full border border-amber-200 inline-block">
                      {pkg.tests || 'CBT TEST SERIES'}
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900 leading-snug">{pkg.title}</h3>

                    <div className="flex items-baseline space-x-2 pt-2">
                      <span className="text-3xl font-black text-slate-900">₹{pkg.price}</span>
                      {pkg.originalPrice && (
                        <span className="text-sm text-slate-400 line-through">₹{pkg.originalPrice}</span>
                      )}
                    </div>

                    {pkg.features && pkg.features.length > 0 && (
                      <ul className="space-y-3 pt-4 border-t border-slate-100">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start space-x-3 text-sm text-slate-600">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <Link
                      to="/cart"
                      className="py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-center rounded-xl transition-all shadow-md block cursor-pointer text-sm"
                    >
                      Buy Test Series Now
                    </Link>
                    <Link
                      to={`/course-detail/${pkg.slug || pkg.id}`}
                      className="py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-center rounded-xl transition-all shadow-sm block cursor-pointer text-sm"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
