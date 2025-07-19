'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function FounderPage() {
  const [showImage, setShowImage] = useState(true);

  return (
    <main className="min-h-screen bg-white text-blue-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* Section 1: Intro Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Meet Our Founder & President
          </h1>
          <p className="text-lg sm:text-xl text-blue-700 max-w-2xl mx-auto">
            A leader redefining respiratory care in Lebanon through innovation, education, and dedication.
          </p>
        </header>

        {/* Section 2: Founder Image + Info */}
        <article
          className={`flex flex-col ${
            showImage ? 'md:flex-row' : 'md:items-center'
          } items-center gap-6 text-center md:text-left`}
        >
          {showImage && (
            <figure className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-blue-900 shadow-lg flex-shrink-0">
              <Image
                src="/images/founder.webp"
                alt="Moustapha Youssef Khaywa - Founder"
                fill
                priority
                sizes="(max-width: 768px) 192px, 224px"
                className="object-cover"
                onError={() => setShowImage(false)}
              />
            </figure>
          )}

          <div className={`${showImage ? '' : 'max-w-xl mx-auto text-center'}`}>
            <h2 className="text-3xl font-bold mb-1">Moustapha Youssef Khaywa</h2>
            <p className="text-blue-700 italic font-medium">
              President & Founder – Lebanese Association of Respiratory Care (LARC)
            </p>
            <div className="w-20 h-1 bg-blue-900 mt-3 mx-auto md:mx-0" />
          </div>
        </article>

        {/* Section Blocks */}
        <SectionBlock title="About the Founder">
          Moustapha Khaywa is a pioneering Lebanese respiratory therapy leader, educator, and advocate.
          As the founder and current president of LARC, he has been at the forefront of formalizing
          respiratory care in Lebanon—transforming it from an overlooked specialty into a nationally
          recognized field of critical importance.
        </SectionBlock>

        <SectionBlock title="Professional Roles">
          Mr. Khaywa was elected as Lebanon’s Governor at the International Council for Respiratory Care (ICRC),
          and holds the position of Vice President for the Middle East with the International Association
          of Non-Invasive Ventilation (ARCA). In 2025, he was awarded the title of International Fellow
          in Non-Invasive Mechanical Ventilation (FNIV) in recognition of his scientific and clinical contributions.
        </SectionBlock>

        <SectionBlock title="Achievements">
          In 2023, Moustapha founded Lebanon’s first internationally endorsed Respiratory Therapy Certificate Program
          at Makassed University, supported by the ICRC and AARC. His vision continues through LARC, whose mission
          is to advocate, educate, and empower RT professionals, and to position respiratory care as a vital component
          of Lebanon’s healthcare system.
        </SectionBlock>

        <SectionBlock title="Vision & Leadership">
          Moustapha combines clinical expertise with a deep commitment to healthcare equity, interprofessional collaboration,
          and sustainable policy reform. Under his leadership, LARC is building national alliances and international bridges
          to elevate respiratory care standards for all.
        </SectionBlock>

        {/* Timeline Section */}
        <section className="mt-10">
          <h3 className="text-3xl font-bold mb-8 text-center">Key Milestones</h3>
          <ul className="relative border-l-4 border-blue-900 pl-6 space-y-12">
            {timelineData.map(({ year, title, desc }, idx) => (
              <li key={idx} className="relative group">
                <span className="absolute -left-8 top-1.5 w-5 h-5 rounded-full bg-blue-900 border-4 border-white shadow-md group-hover:scale-110 transition-transform"></span>
                <p className="text-blue-700 font-semibold">{year}</p>
                <h4 className="text-xl font-semibold">{title}</h4>
                <p className="text-blue-700 mt-1">{desc}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Final CTA */}
        <footer className="text-center pt-10">
          <Link
            href="/"
            className="inline-block bg-blue-900 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition duration-300 shadow-md hover:shadow-lg"
          >
            ← Back to Home
          </Link>
        </footer>
      </div>
    </main>
  );
}

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h3 className="text-2xl sm:text-3xl font-semibold border-b border-blue-200 pb-2">{title}</h3>
      <p className="text-lg leading-relaxed text-blue-800">{children}</p>
    </section>
  );
}

const timelineData = [
  {
    year: '2023',
    title: 'Founded Lebanon’s first internationally endorsed Respiratory Therapy Certificate Program',
    desc: 'At Makassed University, supported by the ICRC and AARC.',
  },
  {
    year: '2025',
    title: 'Awarded International Fellow in Non-Invasive Mechanical Ventilation (FNIV)',
    desc: 'Recognized for scientific and clinical contributions to respiratory therapy.',
  },
  {
    year: 'Ongoing',
    title: 'Leading LARC’s mission to advocate, educate, and empower RT professionals',
    desc: 'Building national alliances and global partnerships to elevate standards.',
  },
];
