'use client';
import SEO from '@/components/SEO';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MembershipPage() {
  <SEO
        title="Membership - Lebanese Association for Respiratory Care"
        description="Become a member of the Lebanese Association for Respiratory Care and enjoy exclusive benefits."
        canonical="https://lebanesearc.org/membership"
        ogImage="https://lebanesearc.org/images/og-membership.png" // Optional
      />
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const toggleBtn = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener('scroll', toggleBtn);
    return () => window.removeEventListener('scroll', toggleBtn);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const membershipFormURL = 'https://forms.gle/SZqMZ2mNDGFhAcFU6';

  return (
    <div className="font-sans text-gray-800 bg-white scroll-smooth">
      {/* Membership Hero Section */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-28 px-6 relative z-10 text-center">
          <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern-wave.svg')] bg-cover z-0"></div>

          <div className="max-w-3xl mx-auto relative z-10 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Join the Lebanese Association for Respiratory Care
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              Be part of a growing movement to advance respiratory care in Lebanon.
            </p>
            <Link
              href={membershipFormURL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-900 font-semibold px-6 py-3 rounded-full shadow-md transform hover:scale-105 hover:bg-gray-100 transition-all duration-300"
            >
              Join Now for $100/year
            </Link>
          </div>
        </div>

        {/* Curved Divider */}
        <div
          className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-0"
          style={{ height: '100px' }}
        >
          <svg
            viewBox="0 0 1440 100"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,64L80,74.7C160,85,320,107,480,112C640,117,800,107,960,101.3C1120,96,1280,96,1360,96L1440,96L1440,100L0,100Z"
            />
          </svg>
        </div>
      </section>

      {/* Member Journey Timeline */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Your Membership Journey</h2>
          <p className="mb-10 text-lg text-gray-700">
            Becoming a member is simple and rewarding.
          </p>
          <ol className="space-y-6 text-left sm:text-lg">
            <li><strong>1.</strong> Complete the online application</li>
            <li><strong>2.</strong> Submit your ID and credentials</li>
            <li><strong>3.</strong> Enjoy your membership benefits</li>
          </ol>
        </div>
      </section>

      {/* Membership Advantages */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Why Become a Member?
          </h2>
          <p className="text-center mb-10 text-lg text-gray-700">
            Your membership supports meaningful progress in respiratory care. Here’s what you gain:
          </p>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {[
              "Advocacy & Recognition",
              "Exclusive Training",
              "Global Networking",
              "Career Advancement",
              "Solidarity & Support",
              "Research & Resources"
            ].map((title, i) => (
              <div
                key={i}
                className="bg-gray-50 border-l-4 border-blue-600 p-5 rounded-xl shadow-sm hover:shadow-md transition duration-200"
              >
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  {title}
                </h3>
                <p className="text-gray-700 text-sm">
                  Learn, grow, and connect with professionals dedicated to advancing respiratory care in Lebanon and beyond.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="px-6 py-16 bg-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Open to Everyone in Respiratory Care</h2>
          <p className="mb-8 text-lg text-gray-700">
            Membership is open to both individuals and institutions.
          </p>
          <ul className="list-disc list-inside space-y-3 text-left text-gray-700 text-base sm:text-lg">
            <li>Respiratory Therapists (Practicing or Licensed)</li>
            <li>Students and Recent Graduates</li>
            <li>ICU Nurses, Pulmonologists, Allied Professionals</li>
            <li>Hospitals, Clinics, Universities</li>
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-700 text-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Join us in building a healthier Lebanon — together, we give breath and hope through education, advocacy, and care.
          </p>
          <Link
            href={membershipFormURL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-700 hover:bg-blue-50 font-semibold px-6 py-3 rounded-full shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Join Now for $100/year
          </Link>
        </div>
      </section>

      {/* Scroll to Top */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-5 right-5 z-50 bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition transform hover:-translate-y-1"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
