'use client';

import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function AboutPage() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>About Us – LARC</title>
        <meta name="description" content="Learn about the mission, history, and values of the Lebanese Association for Respiratory Care." />
      </Head>

      <main className="font-sans text-gray-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-28 px-6 relative z-10">
            <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern-wave.svg')] bg-cover z-0" />
            <div className="max-w-5xl mx-auto text-center relative z-10 animate-fade-in">
              <div className="flex justify-center mb-6">
                <div className="bg-white rounded-full p-2 shadow-lg h-28 w-28 md:h-32 md:w-32 flex items-center justify-center overflow-hidden">
                  <Image src="/images/logonob.png" alt="LARC Logo" width={200} height={200} className="object-contain h-full w-full" priority />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Who We Are</h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 mb-8">
                At LARC, we’re committed to enhancing respiratory care in Lebanon through advocacy, professional development, and public awareness.
              </p>
              <Link href="/membership" className="inline-block bg-white hover:bg-gray-100 text-blue-900 font-semibold px-6 py-3 rounded-full shadow-md transform hover:scale-105 transition-all duration-300">
                Join Us
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-0" style={{ height: '100px' }}>
            <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
              <path fill="#ffffff" d="M0,64L80,74.7C160,85,320,107,480,112C640,117,800,107,960,101.3C1120,96,1280,96,1360,96L1440,96L1440,100L0,100Z" />
            </svg>
          </div>
        </section>

        {/* Summary Sections */}
        {[
          {
            title: 'Our Story',
            content: `The Lebanese Association of Respiratory Care (LARC) is a non-profit, non-political, and non-sectarian organization founded in 2024 by respiratory therapy professionals, educators, and health advocates. LARC was born from the urgent need to recognize and institutionalize the role of respiratory care in Lebanon’s fragile healthcare system.\n\nBefore LARC, Lebanon had no official recognition for respiratory therapists. There were no academic programs, no licensure, and no unified voice to support this life-saving profession. Today, LARC is leading the way to change that through education, national advocacy, and direct patient support.`
          },
          {
            title: 'Our Vision',
            content: `To establish respiratory care as a recognized, respected, and regulated profession in Lebanon with accessible services, protected rights, and a national system that ensures quality care for every breath.`
          }
        ].map(({ title, content }, i) => (
          <section key={i} className={`py-16 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} px-6`}>
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
              {content.split('\n').map((para, j) => (
                <p key={j} className="text-gray-700 leading-relaxed mb-6">{para}</p>
              ))}
            </div>
          </section>
        ))}

        {/* Timeline */}
        <section className="py-16 bg-white px-6 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our History</h2>
            <div className="relative border-l-4 border-blue-600 ml-4">
              {[
                {
                  year: '2023',
                  title: 'Founder Elected to ICRC',
                  desc: 'Moustapha Khaywa was elected as Lebanon’s representative to the International Council for Respiratory Care (ICRC).'
                },
                {
                  year: '2023',
                  title: 'First Academic Program Launched',
                  desc: 'Moustapha launched the first academic respiratory therapy program at Makassed University of Beirut, in partnership with ICRC and AARC.'
                },
                {
                  year: '2024',
                  title: 'LARC Was Founded',
                  desc: 'Recognizing the broader national gap, Moustapha and a team of pioneers founded LARC.'
                }
              ].map((item, i) => (
                <div key={i} className="mb-10 ml-4 md:ml-8 relative">
                  <div className="absolute w-4 h-4 bg-blue-600 rounded-full mt-1 -left-6 border-2 border-white shadow-md"></div>
                  <time className="text-sm font-semibold text-blue-600 uppercase tracking-wide">{item.year}</time>
                  <h3 className="text-xl font-bold text-gray-800 mt-1">{item.title}</h3>
                  <p className="mt-2 text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        {[
          {
            title: 'Our Mission',
            bg: 'bg-gray-50',
            items: [
              'Empower and certify respiratory therapy professionals',
              'Advocate for national legislation and professional syndication',
              'Improve public awareness about respiratory diseases',
              'Provide charitable support to patients in need',
              'Create partnerships with universities, hospitals, and international health bodies',
              'Build national registries and research capacity in respiratory health'
            ]
          },
          {
            title: 'Our Values',
            bg: 'bg-white',
            items: [
              'Integrity: We act transparently and ethically',
              'Equity: We serve all communities regardless of background',
              'Excellence: We set and promote the highest clinical standards',
              'Solidarity: We support one another and our patients',
              'Empowerment: We train, elevate, and advocate'
            ]
          }
        ].map((section, i) => (
          <section key={i} className={`py-16 px-6 ${section.bg} animate-fade-in`}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{section.title}</h2>
              <ul className="list-disc list-inside ml-5 space-y-3 text-gray-700">
                {section.items.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          </section>
        ))}

        {/* Leadership & Advisors */}
        <section className="py-20 bg-gray-50 px-6 animate-fade-in">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Leadership & Advisors</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mb-16">
              {[
                ['President', 'Moustapha Khaywa'],
                ['Vice President', 'Lama Hariri'],
                ['Secretary', 'Noura Fakhreddine'],
                ['Treasurer', 'Mahmoud Hariri'],
                ['Accounting', 'Ibrahim Mneimneh']
              ].map(([role, name], i) => (
                <div key={i} className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition duration-300">
                  <p className="text-blue-700 font-bold text-sm uppercase mb-1">{role}</p>
                  <p className="text-lg font-semibold text-gray-800">{name}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Medical Advisors</h3>
            <ul className="space-y-4 text-gray-700 mb-16">
              <li><strong>Dr. Wael Jarouche</strong> — Pulmonary, ICU Head, Medical Director at Makassed General Hospital</li>
              <li><strong>Dr. Clara Chamoun</strong> — Pulmonary Allergy & Sleep Medicine, Head of ICU</li>
              <li><strong>Dr. Mahmoud Harb</strong> — Head of Surgical Intensive Unit</li>
              <li><strong>Dr. Joumana Alameh</strong> — Head of Neonatal Intensive Care Unit</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Coordinators</h3>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Education, Awareness, Research:</strong> Hala Jawhary, Fatimah Abou Zeid, Mohammad Daibes</li>
              <li><strong>Charity Coordinator:</strong> Israa Kharoub</li>
            </ul>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-blue-700 text-white text-center px-6 animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
            <p className="text-lg mb-8 max-w-xl mx-auto">
              Join us in building a healthier Lebanon — Together, we give breath and hope to thousands through education, advocacy, and care.
            </p>
            <Link href="/membership" className="inline-block bg-white text-blue-700 hover:bg-blue-50 font-semibold px-6 py-3 rounded-full shadow-md transform hover:scale-105 transition-all duration-300">
              Join Us
            </Link>
          </div>
        </section>

        {/* Scroll to Top */}
        {showScrollIndicator && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-8 right-8 w-12 h-12 bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-800 hover:scale-110 transition-transform duration-300 z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5m0 0l-7 7m7-7l7 7" />
            </svg>
          </button>
        )}
      </main>
    </>
  );
}
