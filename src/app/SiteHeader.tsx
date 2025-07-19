'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MessageCircle,
  X,
  Home,
  Users,
  UserRound,
  CalendarDays,
  Handshake
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        setMaxHeight(menuRef.current.scrollHeight + 'px');
        document.body.style.overflow = 'hidden';
      } else {
        setMaxHeight('0px');
        document.body.style.overflow = '';
      }
    }
  }, [isMenuOpen]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-blue-700 flex items-center space-x-2">
            <img
              src="/images/logonob.png"
              alt="LARC Logo"
              className="h-12 w-auto object-contain"
              draggable={false}
            />
            <span>LARC</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Primary navigation">
            <Link href="/" className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600 transition-colors">
              <Home size={18} /> Home
            </Link>
            <Link href="/about" className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600 transition-colors">
              <UserRound size={18} /> About Us
            </Link>
            <Link href="/membership" className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600 transition-colors">
              <Users size={18} /> Membership
            </Link>
            <Link href="/events" className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600 transition-colors">
              <CalendarDays size={18} /> Events
            </Link>
            <Link href="/partners" className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600 transition-colors">
              <Handshake size={18} /> Partners
            </Link>
            <button
              onClick={() => setShowContactModal(true)}
              className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Mail size={18} /> Contact
            </button>
          </nav>

          {/* CTA (Desktop) */}
          <div className="hidden md:block">
            <Link
              href="/membership"
              className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform duration-300 text-white font-semibold py-2 px-4 rounded-full"
            >
              Join Us
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          id="mobile-menu"
          className="md:hidden overflow-hidden bg-white transition-all duration-400 ease-in-out border-t border-gray-200"
          style={{ maxHeight, opacity: isMenuOpen ? 1 : 0 }}
          aria-hidden={!isMenuOpen}
        >
          <nav className="px-4 pt-4 pb-6 space-y-4" aria-label="Mobile navigation">
            <Link href="/" className="flex items-center gap-2 text-gray-800 hover:text-blue-600 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              <Home size={18} /> Home
            </Link>
            <Link href="/about" className="flex items-center gap-2 text-gray-800 hover:text-blue-600 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              <UserRound size={18} /> About Us
            </Link>
            <Link href="/membership" className="flex items-center gap-2 text-gray-800 hover:text-blue-600 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              <Users size={18} /> Membership
            </Link>
            <Link href="/events" className="flex items-center gap-2 text-gray-800 hover:text-blue-600 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              <CalendarDays size={18} /> Events
            </Link>
            <Link href="/partners" className="flex items-center gap-2 text-gray-800 hover:text-blue-600 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              <Handshake size={18} /> Partners
            </Link>
            <button
              onClick={() => {
                setShowContactModal(true);
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-2 text-gray-800 hover:text-blue-600 text-base font-medium"
            >
              <Mail size={18} /> Contact
            </button>
            <Link href="/membership" className="block bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform duration-300 text-white font-semibold py-2 px-4 rounded-full text-center mt-2" onClick={() => setIsMenuOpen(false)}>
              Join Us
            </Link>
          </nav>
        </div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-6 w-full max-w-md text-center relative"
            >
              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Get in Touch</h2>
              <div className="space-y-4 text-sm">
                {/* Phone Button Always Visible with Hover Animation */}
                <a
                  href="tel:+96178751626"
                  className="group flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white py-2 px-4 rounded-full transition-all duration-300"
                >
                  <Phone size={20} className="group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300" />
                  Call Us
                </a>

                <a
                  href="https://wa.me/96178751626"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 hover:scale-105 text-white py-2 px-4 rounded-full transition-all duration-300"
                >
                  <MessageCircle size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  WhatsApp
                </a>

                <a
                  href="mailto:info@lebanesearc.org"
                  className="group flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 hover:scale-105 text-white py-2 px-4 rounded-full transition-all duration-300"
                >
                  <Mail size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  Email
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
