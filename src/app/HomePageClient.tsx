'use client';

import SEO from '@/components/SEO';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

interface SlideImage {
  id: number;
  link: string;
}

interface HomePageClientProps {
  images: SlideImage[];
}

export default function HomePageClient({ images }: HomePageClientProps) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [fullscreen, setFullscreen] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1 },
      slideChanged(s) {
        setCurrent(s.track.details.rel);
      },
      drag: true,
    },
    [
      (slider) => {
        if (images.length > 1) {
          let timeout: NodeJS.Timeout;
          const clearNextTimeout = () => clearTimeout(timeout);
          const nextTimeout = () => {
            clearNextTimeout();
            timeout = setTimeout(() => {
              slider.next();
            }, 4000);
          };
          slider.on('created', nextTimeout);
          slider.on('dragStarted', clearNextTimeout);
          slider.on('animationEnded', nextTimeout);
          slider.on('updated', nextTimeout);
        }
      },
    ]
  );

  useEffect(() => {
    const handleScroll = () => setShowScrollIndicator(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <SEO
        title="Lebanese Association for Respiratory Care (LARC)"
        description="Discover the Lebanese Association for Respiratory Care (LARC): Lebanon’s hub for respiratory education, lung health advocacy, and professional development."
        canonical="https://lebanesearc.org/"
        ogImage="https://lebanesearc.org/images/logo.jpg"
        additionalMeta={
          <>
            <meta
              name="keywords"
              content="Lebanese ARC, Lebanese respiratory care, LARC, lung health Lebanon, respiratory therapy Lebanon, Lebanese Association for Respiratory Care"
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Organization',
                  name: 'Lebanese Association for Respiratory Care',
                  alternateName: 'LARC',
                  url: 'https://lebanesearc.org',
                  logo: 'https://lebanesearc.org/images/logo.jpg',
                  sameAs: [
                    'https://www.facebook.com/profile.php?id=61577880610472',
                    'https://www.instagram.com/lebanesearc',
                    'https://www.linkedin.com/company/lebanese-association-of-respiratory-care/',
                  ],
                }),
              }}
            />
          </>
        }
      />

      {/* Hero Section */}
      <section role="region" aria-labelledby="hero-title" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20 z-0"></div>
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-28 px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fadeInUp">
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-full p-2 shadow-lg h-28 w-28 md:h-32 md:w-32 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logonob.png"
                  alt="Lebanese Association for Respiratory Care Logo"
                  width={128}
                  height={128}
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            <p className="text-base md:text-lg uppercase tracking-wider text-blue-200 mb-2">
              Lebanese Association for Respiratory Care
            </p>
            <h1 id="hero-title" className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Welcome to LARC
            </h1>
            <p className="text-lg md:text-xl mb-4 max-w-2xl mx-auto opacity-90 font-medium text-blue-100">
              Improving lung health through education, awareness, and research.
            </p>
            <p className="italic text-base text-blue-100 font-medium mb-6">
              &quot;Every breath counts — so does every action.&quot;
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
              <Link
                href="/membership"
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full shadow-md transform hover:scale-105 transition-all duration-300"
              >
                Join Us
              </Link>

              <a
                href="mailto:info@lebanesearc.org"
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full shadow-md transform hover:scale-105 transition-all duration-300"
              >
                Contact
              </a>

              <Link
                href="/founder"
                className="bg-white text-blue-700 hover:bg-gray-100 font-semibold px-6 py-3 rounded-full shadow-md transform hover:scale-105 transition-all duration-300 border border-blue-700"
              >
                Meet Our Founder
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: '100px' }}>
          <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            <path
              fill="#ffffff"
              d="M0,64L80,74.7C160,85,320,107,480,112C640,117,800,107,960,101.3C1120,96,1280,96,1360,96L1440,96L1440,100L0,100Z"
            />
          </svg>
        </div>
      </section>

      {/* Campaign Section */}
      <section className="bg-white px-4 sm:px-6 py-14 md:py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="animate-fadeInUp">
            <h2 className="text-blue-800 text-3xl md:text-4xl font-extrabold mb-5 flex items-center gap-3">
              <span role="img" aria-label="lungs" className="text-4xl animate-pulse-slow">🫁</span>
              <span>Breathe Better, Together</span>
            </h2>
            <p className="text-gray-800 text-lg leading-relaxed mb-7 max-w-xl font-medium">
              Respiratory therapy is the heart of healing for anyone facing breathing challenges — from premature babies to elderly
              patients with chronic lung disease.
              <br /><br />
              At LARC, we believe every person in Lebanon deserves expert respiratory support. We empower therapists through education,
              advocacy, and research.
            </p>
            <Link
              href="/about"
              className="inline-block px-7 py-3 text-base font-semibold text-white bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition"
            >
              Learn more →
            </Link>
          </div>
          <div className="animate-fadeInUp flex justify-center md:justify-end group">
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md max-w-sm w-full transition-transform duration-500 group-hover:scale-105 group-hover:shadow-xl">
              <Image
                src="/images/lungsphoto.jpg"
                alt="Healthy lungs illustration"
                width={400}
                height={300}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 400px"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">What We Do</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: '🎓 Training & Education', desc: 'CPD courses, student outreach, and healthcare workshops.' },
              { title: '🫁 Awareness & Advocacy', desc: 'Anti-smoking campaigns, air quality initiatives, public health days.' },
              { title: '🤝 Partnerships & Projects', desc: 'Collaborations with hospitals, universities, NGOs across Lebanon.' },
              { title: '🔬 Research & Development', desc: 'Scientific publications, grants, and international research collaborations.' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-xl border border-gray-100 group transition-shadow"
              >
                <h3 className="text-xl font-semibold text-blue-700 mb-2 group-hover:text-blue-800">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Slider */}
      {images.length > 0 && (
        <section className="py-10 bg-white px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div ref={sliderRef} className="keen-slider rounded-xl">
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  className="keen-slider__slide flex justify-center cursor-pointer"
                  onClick={() => setFullscreen(img.link)}
                >
                  <div
                    className="relative w-full flex items-center justify-center bg-white rounded-xl overflow-hidden border-2 border-blue-800 shadow-md transition-all duration-500 hover:scale-105 px-3 py-4"
                    style={{
                      minHeight: '320px',
                      maxHeight: '80vh',
                      backgroundColor: '#f9fafb',
                    }}
                  >
                    <Image
                      src={img.link}
                      alt={`Slide ${idx + 1}`}
                      width={1200}
                      height={800}
                      priority={idx === 0}
                      className="object-contain transition-opacity duration-500"
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        height: 'auto',
                        width: 'auto',
                        display: 'block',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {images.length > 1 && (
              <div className="flex justify-center mt-4 gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all ${current === idx ? 'bg-blue-800' : 'bg-gray-300'}`}
                    onClick={() => instanceRef.current?.moveToIdx(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          {fullscreen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
              onClick={() => setFullscreen(null)}
            >
              <div className="relative max-w-6xl w-full max-h-[90vh] aspect-video" onClick={(e) => e.stopPropagation()}>
                <Image src={fullscreen} alt="Fullscreen Slide" fill className="object-contain" />
                <button
                  onClick={() => setFullscreen(null)}
                  className="absolute top-4 right-4 text-white text-3xl font-bold"
                  aria-label="Close fullscreen"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Member Spotlight */}
      <section className="py-12 bg-white px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Member Spotlight</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                name: 'Dr. Wael Jarouche',
                role: 'Pulmonologist | Beirut',
                quote: 'LARC has been instrumental in advancing respiratory care standards in Lebanon.',
              },
              {
                name: 'Israa Kharoub',
                role: 'Volunteer',
                quote: 'Volunteering here gave me real-world experience and purpose.',
              },
              {
                name: 'Mohammad Daibs',
                role: 'Respiratory Therapist',
                quote: 'I believe in their mission. Every small contribution makes a big difference.',
              },
            ].map((person, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md border border-gray-100 transition-shadow flex flex-col justify-between"
                style={{ minHeight: '200px' }}
              >
                <p className="italic text-gray-700 mb-3 text-center flex-grow leading-snug">{person.quote}</p>
                <div className="text-center">
                  <h4 className="font-semibold text-blue-700 text-base">{person.name}</h4>
                  <p className="text-sm text-gray-500">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-700 text-white text-center px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Join us in building a healthier Lebanon. Together, we give breath and hope through education, advocacy, and care.
          </p>
          <Link
            href="/membership"
            className="inline-block bg-white text-blue-700 hover:bg-blue-50 font-semibold px-6 py-3 rounded-full shadow-md transform hover:scale-105 transition"
          >
            Join Us
          </Link>
        </div>
      </section>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className={`fixed bottom-8 right-8 w-12 h-12 bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition duration-300 z-50 ${
          showScrollIndicator ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M12 19V5m0 0l-7 7m7-7l7 7" />
        </svg>
      </button>

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          opacity: 0;
          animation-name: fadeInUp;
          animation-duration: 0.7s;
          animation-fill-mode: forwards;
        }

        @keyframes pulseSlow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.07);
          }
        }
        .animate-pulse-slow {
          animation: pulseSlow 2.5s infinite;
        }
      `}</style>
    </>
  );
}
