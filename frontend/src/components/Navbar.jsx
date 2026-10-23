'use client';

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '@/src/compat/router';
import {
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  User,
  UserPlus,
  LogOut,
  BookOpen,
  GraduationCap,
  Sparkles,
  Phone,
  FileCheck,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

export default function Navbar({ cartCount: externalCartCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const auth = useAuth();
  const user = auth?.user || null;
  const isAuthenticated = auth?.isAuthenticated || false;
  const isAdmin = auth?.isAdmin || false;
  const logout = auth?.logout || (() => {});

  const cartContext = useCart();
  const cartItemsCount = cartContext?.totalItems ?? externalCartCount;

  // Track window scroll for transparent/solid navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const examOptions = [
    { label: 'BITSAT', path: '/exam/BITSAT', tag: 'Top Choice' },
    { label: 'Comedk', path: '/exam/Comedk', tag: 'Engineering' },
    { label: 'JEE Main & Adv', path: '/exam/JEE', tag: 'National' },
    { label: 'Manipal (MET)', path: '/exam/MET', tag: 'Private' },
    { label: 'VITEEE', path: '/exam/VITEEE', tag: 'Vellore' },
  ];

  const mentorshipOptions = [
    { label: 'BITSAT 1-on-1 Mentorship', path: '/mentorship/BITSAT' },
    { label: 'JEE Personal Mentorship', path: '/mentorship/JEE' },
    { label: 'VITEEE Mentorship', path: '/mentorship/VITEEE' },
  ];

  const toggleMobileDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      {/* GLOBAL NAVBAR HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#181038]/95 backdrop-blur-md shadow-xl py-3 border-b border-purple-900/40'
            : 'bg-[#1b143c] py-4 border-b border-purple-900/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-3 group shrink-0">
              <img
                src="/site/assets/logo_yellow.png"
                alt="10Q Challenge Logo"
                className="h-10 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-2">
              <Link
                to="/"
                className={`font-semibold text-sm px-3.5 py-1.5 rounded-xl transition-all ${
                  location.pathname === '/'
                    ? 'text-[#f43f5e] bg-[#3d2c8d]/60 font-bold'
                    : 'text-slate-200 hover:text-white hover:bg-[#3d2c8d]/40'
                }`}
              >
                Home
              </Link>

              {/* Courses Link */}
              <Link
                to="/course-all"
                className={`font-semibold text-sm px-3.5 py-1.5 rounded-xl transition-all ${
                  location.pathname === '/course-all' || location.pathname === '/courses'
                    ? 'text-[#f43f5e] bg-[#3d2c8d]/60 font-bold'
                    : 'text-slate-200 hover:text-white hover:bg-[#3d2c8d]/40'
                }`}
              >
                Courses
              </Link>

              {/* Test Series Link */}
              <Link
                to="/testseries"
                className={`font-semibold text-sm px-3.5 py-1.5 rounded-xl transition-all ${
                  location.pathname?.startsWith('/testseries')
                    ? 'text-[#f43f5e] bg-[#3d2c8d]/60 font-bold'
                    : 'text-slate-200 hover:text-white hover:bg-[#3d2c8d]/40'
                }`}
              >
                Test Series
              </Link>

              {/* Exam Dropdown */}
              <div className="relative group">
                <button
                  type="button"
                  className="flex items-center space-x-1.5 font-semibold text-sm text-slate-200 hover:text-white px-3.5 py-1.5 rounded-xl hover:bg-[#3d2c8d]/70 group-hover:bg-[#3d2c8d] group-hover:text-white transition-all cursor-pointer"
                >
                  <span>Exam</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#f43f5e] transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 w-56 bg-[#1f1747] border border-purple-800/50 rounded-2xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                  {examOptions.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-200 hover:bg-[#3d2c8d] hover:text-white transition-all"
                    >
                      <span>{item.label}</span>
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-purple-900/60 text-amber-400">
                        {item.tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mentorship Dropdown */}
              <div className="relative group">
                <button
                  type="button"
                  className="flex items-center space-x-1.5 font-semibold text-sm text-slate-200 hover:text-white px-3.5 py-1.5 rounded-xl hover:bg-[#3d2c8d]/70 group-hover:bg-[#3d2c8d] group-hover:text-white transition-all cursor-pointer"
                >
                  <span>Mentorship</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#f43f5e] transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 w-64 bg-[#1f1747] border border-purple-800/50 rounded-2xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                  {mentorshipOptions.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-200 hover:bg-[#3d2c8d] hover:text-white transition-all"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/about"
                className={`font-semibold text-sm px-3.5 py-1.5 rounded-xl transition-all ${
                  location.pathname === '/about'
                    ? 'text-[#f43f5e] bg-[#3d2c8d]/60 font-bold'
                    : 'text-slate-200 hover:text-white hover:bg-[#3d2c8d]/40'
                }`}
              >
                About us
              </Link>

              <Link
                to="/blog"
                className={`font-semibold text-sm px-3.5 py-1.5 rounded-xl transition-all ${
                  location.pathname?.startsWith('/blog')
                    ? 'text-[#f43f5e] bg-[#3d2c8d]/60 font-bold'
                    : 'text-slate-200 hover:text-white hover:bg-[#3d2c8d]/40'
                }`}
              >
                Blogs
              </Link>

              <Link
                to="/contact"
                className={`font-semibold text-sm px-3.5 py-1.5 rounded-xl transition-all ${
                  location.pathname === '/contact'
                    ? 'text-[#f43f5e] bg-[#3d2c8d]/60 font-bold'
                    : 'text-slate-200 hover:text-white hover:bg-[#3d2c8d]/40'
                }`}
              >
                Contact us
              </Link>
            </nav>

            {/* Desktop Right Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3.5">
              {/* Cart Icon */}
              <Link
                to="/cart"
                className="relative p-2.5 rounded-xl text-slate-200 hover:text-[#f43f5e] hover:bg-[#3d2c8d]/40 transition-colors"
                aria-label="View Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#20D66B] text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-[#1b143c] shadow-sm animate-in zoom-in">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* Logged In User Pill OR Sign In / Register Buttons */}
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-2">
                  <Link
                    to={isAdmin ? '/admin/dashboard' : '/student/dashboard'}
                    className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#36277b] hover:bg-[#433296] border border-purple-700/50 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-[10px]">
                      {user.fullName?.charAt(0) || 'U'}
                    </div>
                    <span className="truncate max-w-[100px]">{user.fullName}</span>
                  </Link>

                  <button
                    onClick={logout}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-[#3d2c8d]/40 rounded-xl transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-xs font-bold text-slate-200 hover:text-white bg-[#36277b] hover:bg-[#423194] rounded-full border border-purple-800/40 transition-all flex items-center space-x-1.5"
                  >
                    <span>Sign In</span>
                  </Link>

                  <Link
                    to="/register"
                    className="px-5 py-2 text-xs font-bold text-white bg-[#f43f5e] hover:bg-[#e11d48] rounded-full shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Actions: Cart & Hamburger Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <Link
                to="/cart"
                className="relative p-2.5 rounded-xl text-slate-200 hover:text-[#f43f5e] transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#20D66B] text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-[#1b143c]">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-[#2e2163] hover:bg-[#3c2b80] text-slate-100 hover:text-amber-400 focus:outline-none transition-colors border border-purple-800/40"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN OFF-CANVAS DRAWER (RENDERED OUTSIDE HEADER TO PREVENT BACKDROP-FILTER CLIPPING) */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
          onClick={closeMenu}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="w-[85%] max-w-sm bg-[#160d33] text-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-purple-900/60 animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Top Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-purple-900/40 bg-[#120a2b] sticky top-0 z-10">
                <Link to="/" onClick={closeMenu} className="flex items-center space-x-2.5">
                  <img
                    src="/site/assets/logo_yellow.png"
                    alt="10Q Challenge"
                    className="h-9 w-auto object-contain"
                  />
                  <div>
                    <span className="font-extrabold text-base text-white tracking-tight block leading-tight">
                      10Q <span className="text-amber-400">CHALLENGE</span>
                    </span>
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest block">
                      Target 2026 Batch
                    </span>
                  </div>
                </Link>

                <button
                  onClick={closeMenu}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Session Info (if authenticated) */}
              {isAuthenticated && user && (
                <div className="p-4 mx-4 mt-4 rounded-2xl bg-[#22164d] border border-purple-800/40 flex items-center justify-between">
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 text-slate-950 font-black flex items-center justify-center text-sm shrink-0">
                      {user.fullName?.charAt(0) || 'U'}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-xs text-white truncate">{user.fullName}</h4>
                      <p className="text-[11px] text-purple-200/70 truncate">{user.email}</p>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[9px] font-bold bg-[#3b2a7e] text-amber-300">
                        {user.targetExam || 'Aspirant'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Navigation Links */}
              <div className="px-4 py-5 space-y-1.5 text-sm font-semibold">
                <Link
                  to="/"
                  onClick={closeMenu}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    location.pathname === '/'
                      ? 'bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30'
                      : 'text-slate-200 hover:bg-[#281a5e] hover:text-white'
                  }`}
                >
                  <span>Home</span>
                </Link>

                <Link
                  to="/course-all"
                  onClick={closeMenu}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    location.pathname === '/course-all' || location.pathname === '/courses'
                      ? 'bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30'
                      : 'text-slate-200 hover:bg-[#281a5e] hover:text-white'
                  }`}
                >
                  <span>All Courses</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                    Live
                  </span>
                </Link>

                <Link
                  to="/testseries"
                  onClick={closeMenu}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    location.pathname?.startsWith('/testseries')
                      ? 'bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30'
                      : 'text-slate-200 hover:bg-[#281a5e] hover:text-white'
                  }`}
                >
                  <span>Test Series &amp; Mocks</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-slate-950">
                    CBT
                  </span>
                </Link>

                {/* Mobile Exam Accordion */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => toggleMobileDropdown('exam')}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                      activeDropdown === 'exam'
                        ? 'bg-[#281a5e] text-amber-400'
                        : 'text-slate-200 hover:bg-[#281a5e] hover:text-white'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4 text-purple-400" />
                      <span>Exams Supported</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === 'exam' ? 'rotate-180 text-amber-400' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {activeDropdown === 'exam' && (
                    <div className="mt-1 ml-3 pl-3 border-l-2 border-purple-800 space-y-1 py-1">
                      {examOptions.map((item) => (
                        <Link
                          key={item.label}
                          to={item.path}
                          onClick={closeMenu}
                          className="flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-amber-400 hover:bg-[#22164d] transition-colors"
                        >
                          <span>{item.label}</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-900/60 text-amber-300">
                            {item.tag}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Mentorship Accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleMobileDropdown('mentorship')}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                      activeDropdown === 'mentorship'
                        ? 'bg-[#281a5e] text-amber-400'
                        : 'text-slate-200 hover:bg-[#281a5e] hover:text-white'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-rose-400" />
                      <span>1-on-1 Mentorship</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === 'mentorship'
                          ? 'rotate-180 text-amber-400'
                          : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {activeDropdown === 'mentorship' && (
                    <div className="mt-1 ml-3 pl-3 border-l-2 border-purple-800 space-y-1 py-1">
                      {mentorshipOptions.map((item) => (
                        <Link
                          key={item.label}
                          to={item.path}
                          onClick={closeMenu}
                          className="block py-2 px-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-amber-400 hover:bg-[#22164d] transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/about"
                  onClick={closeMenu}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    location.pathname === '/about'
                      ? 'bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30'
                      : 'text-slate-200 hover:bg-[#281a5e] hover:text-white'
                  }`}
                >
                  <span>About Us</span>
                </Link>

                <Link
                  to="/blog"
                  onClick={closeMenu}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    location.pathname?.startsWith('/blog')
                      ? 'bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30'
                      : 'text-slate-200 hover:bg-[#281a5e] hover:text-white'
                  }`}
                >
                  <span>Blog &amp; Study Tips</span>
                </Link>

                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    location.pathname === '/contact'
                      ? 'bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30'
                      : 'text-slate-200 hover:bg-[#281a5e] hover:text-white'
                  }`}
                >
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>

            {/* Bottom Actions & Support */}
            <div className="p-4 border-t border-purple-900/40 bg-[#120a2b] space-y-3">
              {isAuthenticated && user ? (
                <>
                  <Link
                    to={isAdmin ? '/admin/dashboard' : '/student/dashboard'}
                    onClick={closeMenu}
                    className="w-full py-3 px-4 text-center text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl block shadow-lg transition-transform active:scale-95"
                  >
                    Open Student Portal Dashboard &rarr;
                  </Link>

                  <Link
                    to="/student/courses"
                    onClick={closeMenu}
                    className="w-full py-2.5 px-4 text-center text-xs font-bold text-slate-200 bg-[#281a5e] hover:bg-[#342379] rounded-xl block border border-purple-700/50"
                  >
                    My Enrolled Courses
                  </Link>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="py-2.5 px-3 text-center text-xs font-bold text-slate-200 bg-[#2b1c66] hover:bg-[#362480] rounded-xl block border border-purple-700/50"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="py-2.5 px-3 text-center text-xs font-black text-white bg-[#f43f5e] hover:bg-[#e11d48] rounded-xl block shadow-md text-center"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Direct Support Contact */}
              <div className="pt-2 flex items-center justify-center space-x-2 text-[11px] text-purple-300/80">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Mentorship Helpline: </span>
                <a href="tel:+918239327855" className="font-bold text-amber-400 hover:underline">
                  +91 82393 27855
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
