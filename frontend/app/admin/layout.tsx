'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // If not authenticated or not admin, guard admin area
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('10q_auth_user_fresh_v1') || localStorage.getItem('10q_user');
      if (!stored) {
        router.push('/login');
        return;
      }
      try {
        const parsed = JSON.parse(stored);
        if (parsed.role !== 'ADMIN' && !parsed.email?.toLowerCase().includes('admin')) {
          setIsChecking(false);
          return;
        }
      } catch (e) {
        router.push('/login');
        return;
      }
      setIsChecking(false);
    }
  }, [isAuthenticated, isAdmin, router]);

  const storedUser = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('10q_auth_user_fresh_v1') || localStorage.getItem('10q_user') || 'null')
    : null;

  const userIsAdmin = isAdmin || (storedUser && (storedUser.role === 'ADMIN' || storedUser.email?.toLowerCase().includes('admin')));

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p className="text-sm font-semibold animate-pulse text-amber-400">Verifying administrative access...</p>
      </div>
    );
  }

  if (!userIsAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-6">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl flex items-center justify-center mx-auto">
            <ShieldAlert size={28} />
          </div>
          <h2 className="text-xl font-black text-white">Access Denied</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            This area is restricted to administrators. As a registered student, please access your Student LMS panel.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/student/dashboard"
              className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              Go to Student Panel
            </Link>
            <Link
              href="/"
              className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={14} /> Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {children}
    </div>
  );
}
