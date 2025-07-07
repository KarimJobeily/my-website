'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        setMaxHeight(menuRef.current.scrollHeight + 'px');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
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
          {/* Logo */}
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
            <Link
              href="/"
              className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/membership"
              className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Membership
            </Link>
            <Link
              href="/events"
              className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Events
            </Link>
            <Link
              href="/partners"
              className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Partners
            </Link>
            <a
              href="mailto:info@lebanesearc.org"
              className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Contact via email"
            >
              Contact
            </a>
          </nav>

          {/* CTA (Desktop) */}
          <div className="hidden md:block">
            <Link
              href="/membership"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition-colors"
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
            <Link
              href="/"
              className="block text-gray-800 hover:text-blue-600 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-gray-800 hover:text-blue-600 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/membership"
              className="block text-gray-800 hover:text-blue-600 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Membership
            </Link>
            <Link
              href="/events"
              className="block text-gray-800 hover:text-blue-600 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/partners"
              className="block text-gray-800 hover:text-blue-600 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Partners
            </Link>
            <a
              href="mailto:info@lebanesearc.org"
              className="block text-gray-800 hover:text-blue-600 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Contact via email"
            >
              Contact
            </a>
            <Link
              href="/membership"
              className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full text-center transition-colors mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Join Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
