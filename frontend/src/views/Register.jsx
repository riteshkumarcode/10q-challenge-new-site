'use client';
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from '@/src/compat/router';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, Sparkles, GraduationCap, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { apiRegisterUser } from '../services/api';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [targetExam, setTargetExam] = useState('BITSAT');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const fromEnroll = location.state?.fromEnroll;
  const courseTitle = location.state?.courseTitle;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName || !email || !phone || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    const userObj = {
      fullName,
      email,
      phone,
      role: 'STUDENT',
      targetExam
    };

    try {
      const res = await apiRegisterUser({ fullName, email, phone, password, targetExam });
      setIsLoading(false);
      const studentData = (res && res.user) ? { ...res.user, role: 'STUDENT', targetExam } : userObj;
      localStorage.setItem('10q_user', JSON.stringify(studentData));
      localStorage.setItem('10q_auth_user_fresh_v1', JSON.stringify(studentData));
      navigate(fromEnroll ? '/cart' : '/student/dashboard');
    } catch (err) {
      setIsLoading(false);
      localStorage.setItem('10q_user', JSON.stringify(userObj));
      localStorage.setItem('10q_auth_user_fresh_v1', JSON.stringify(userObj));
      navigate(fromEnroll ? '/cart' : '/student/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0C20] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-[-15%] right-[-10%] w-[550px] h-[550px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[550px] h-[550px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden relative z-10">
        
        {/* Left Column: Brand & Benefits Banner */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#1C143F] via-[#2A1D5E] to-[#120B2E] text-white p-10 flex-col justify-between relative overflow-hidden border-r border-purple-900/30">
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />

          {/* Top Logo */}
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg group-hover:scale-105 transition-transform">
                10Q
              </div>
              <div>
                <span className="font-black text-lg tracking-tight text-white block leading-none">
                  10Q <span className="text-amber-400">CHALLENGE</span>
                </span>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  Student Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Middle Pitch */}
          <div className="space-y-4 my-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free Student Registration</span>
            </div>

            <h2 className="text-2xl xl:text-3xl font-black text-white leading-tight">
              Start Your Ranker <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-300 to-amber-200">
                Prep Today
              </span>
            </h2>

            <p className="text-slate-300 text-xs leading-relaxed">
              Create your student account to unlock curated syllabus roadmaps, full mock tests, high-yield video lectures, and live mentorship updates.
            </p>

            <div className="space-y-2.5 pt-3">
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Access to Free Preview Lectures</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Personal Performance &amp; Accuracy Dashboard</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct Access to BITSian Mentors</span>
              </div>
            </div>
          </div>

          {/* Bottom Trust Badge */}
          <div className="pt-6 border-t border-white/10 relative z-10 flex items-center justify-between text-[11px] text-slate-400">
            <span>Fast 30-Second Setup</span>
            <span className="text-amber-400 font-bold">100% Free Account</span>
          </div>
        </div>

        {/* Right Column: Clean Student Registration Box */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-100">
              <div className="lg:hidden flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-slate-950 font-black text-sm">
                  10Q
                </div>
                <span className="font-extrabold text-slate-900 text-sm">
                  10Q <span className="text-amber-600">CHALLENGE</span>
                </span>
              </div>

              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-amber-600 transition-colors ml-auto group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back to Home</span>
              </Link>
            </div>

            {/* From Enroll Notice Banner */}
            {fromEnroll && (
              <div className="mt-4 p-3.5 bg-amber-50 border border-amber-300 text-amber-950 text-xs font-semibold rounded-2xl flex items-start gap-2.5 shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="font-extrabold text-slate-900">Create Account to Complete Enrollment</div>
                  <p className="text-slate-700 leading-relaxed font-normal">
                    Register below to enroll in <span className="font-bold text-slate-900">{courseTitle || 'Course'}</span>.
                  </p>
                </div>
              </div>
            )}

            {/* Heading */}
            <div className="mt-5 mb-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 text-[11px] font-bold mb-2">
                <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                <span>Student Registration</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Create Your Account
              </h1>
              <p className="text-slate-500 text-xs mt-1">
                Enter your details to register as a student and start learning.
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold rounded-xl">
                {errorMessage}
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Advik Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Email & Mobile Number 2-Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Target Exam Select & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Target Exam
                  </label>
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all"
                  >
                    <option value="BITSAT">BITSAT 2026</option>
                    <option value="JEE Main">JEE Main 2026</option>
                    <option value="JEE Advanced">JEE Advanced 2026</option>
                    <option value="VITEEE">VITEEE 2026</option>
                    <option value="MET">Manipal MET 2026</option>
                    <option value="COMEDK">COMEDK 2026</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-3 py-3.5 px-6 bg-gradient-to-r from-slate-900 to-slate-950 hover:from-amber-600 hover:to-amber-500 text-white hover:text-slate-950 font-extrabold text-sm rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Free Student Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Footer Login Prompt */}
          <div className="pt-5 mt-5 border-t border-slate-100 text-center text-xs text-slate-600">
            Already have a student account?{' '}
            <Link
              to="/login"
              state={location.state}
              className="font-extrabold text-amber-600 hover:text-amber-700 ml-1 underline decoration-2 underline-offset-2"
            >
              Sign In
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
