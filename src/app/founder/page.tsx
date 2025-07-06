'use client';
import SEO from '@/components/SEO';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const timelineVariants = {
  hidden: { opacity: 0, x: -30 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

export default function FounderPage() {
  <SEO
        title="Meet Our Founder - Lebanese Association for Respiratory Care"
        description="Learn about Moustapha Youssef Khaywa, Founder and President of the Lebanese Association for Respiratory Care."
        canonical="https://lebanesearc.org/founder"
        ogImage="https://lebanesearc.org/images/og-founder.png" // Optional
      />
  return (
    <>
      <Head>
        <title>Meet Our Founder – LARC</title>
        <meta
          name="description"
          content="Learn more about Moustapha Youssef Khaywa, Founder and President of the Lebanese Association of Respiratory Care (LARC)."
        />
      </Head>

      <main className="min-h-screen bg-white text-blue-900">
        {/* Hero Section */}
        <section className="relative z-10 bg-gradient-to-br from-blue-900 to-blue-700 text-white px-6 py-28">
          <motion.h1
            className="mx-auto mb-4 max-w-3xl text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-center"
            initial="hidden"
            animate="show"
            variants={fadeIn}
          >
            Meet Our Founder & President
          </motion.h1>
        </section>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-24">
          {/* Portrait */}
          <motion.section
            className="flex flex-col md:flex-row items-center gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-blue-900 shadow-xl flex-shrink-0">
              <Image
                src="/images/founder.webp" // ✅ Use modern webp for smaller size
                alt="Portrait of Moustapha Youssef Khaywa, Founder and President of LARC"
                width={224} // md:w-56 = 14rem = 224px
                height={224}
                className="rounded-full object-cover"
                priority // ✅ Preload for faster LCP
              />
            </div>

            <div className="text-center md:text-left max-w-md">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">
                Moustapha Youssef Khaywa
              </h2>
              <p className="italic font-medium text-blue-700">
                President & Founder – Lebanese Association of Respiratory Care (LARC)
              </p>
              <hr className="border-blue-900 border-t-2 w-24 my-4 mx-auto md:mx-0" />
            </div>
          </motion.section>

          {/* Info Sections */}
          {[
            {
              title: 'About the Founder',
              text: `Moustapha Khaywa is a pioneering Lebanese respiratory therapy leader, educator, and advocate. As the founder and current president of LARC, he has been at the forefront of formalizing respiratory care in Lebanon—transforming it from an overlooked specialty into a nationally recognized field of critical importance.`,
            },
            {
              title: 'Professional Roles',
              text: `Mr. Khaywa currently serves as Respiratory Therapy Manager at Clemenceau Medical Center, Beirut. He was elected as Lebanon’s Governor at the International Council for Respiratory Care (ICRC), and holds the position of Vice President for the Middle East with the International Association of Non-Invasive Ventilation (ARCA). In 2025, he was awarded the title of International Fellow in Non-Invasive Mechanical Ventilation (FNIV) in recognition of his scientific and clinical contributions.`,
            },
            {
              title: 'Achievements',
              text: `In 2023, Moustapha founded Lebanon’s first internationally endorsed Respiratory Therapy Certificate Program at Makassed University, supported by the ICRC and AARC. His vision continues through LARC, whose mission is to advocate, educate, and empower RT professionals, and to position respiratory care as a vital component of Lebanon’s healthcare system.`,
            },
            {
              title: 'Vision & Leadership',
              text: `Moustapha combines clinical expertise with a deep commitment to healthcare equity, interprofessional collaboration, and sustainable policy reform. Under his leadership, LARC is building national alliances and international bridges to elevate respiratory care standards for all.`,
            },
          ].map((section, i) => (
            <motion.section
              key={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h3 className="text-2xl sm:text-3xl font-semibold mb-4 tracking-wide">
                {section.title}
              </h3>
              <p className="text-lg sm:text-xl leading-relaxed text-blue-800">
                {section.text}
              </p>
            </motion.section>
          ))}

          {/* Timeline */}
          <section className="mt-16">
            <h3 className="text-3xl font-bold mb-12 text-center">Key Milestones</h3>
            <div className="relative border-l-4 border-blue-900 ml-4 sm:ml-6 pl-6 space-y-12">
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-blue-900 to-blue-400 rounded-full ml-[2px] opacity-20 z-0"></div>

              {[
                {
                  year: '2023',
                  title: 'Founded Lebanon’s first internationally endorsed Respiratory Therapy Certificate Program',
                  description: 'At Makassed University, supported by the ICRC and AARC.',
                },
                {
                  year: '2025',
                  title: 'Awarded International Fellow in Non-Invasive Mechanical Ventilation (FNIV)',
                  description: 'Recognized for scientific and clinical contributions to respiratory therapy.',
                },
                {
                  year: 'Ongoing',
                  title: 'Leading LARC’s mission to advocate, educate, and empower respiratory therapy professionals in Lebanon',
                  description: 'Building national alliances and international collaborations to elevate respiratory care standards.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="relative z-10 group"
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={timelineVariants}
                >
                  <span className="absolute -left-8 top-1.5 w-6 h-6 rounded-full bg-blue-900 border-4 border-white shadow-md group-hover:scale-110 transition duration-300"></span>
                  <p className="text-blue-700 font-semibold mb-1">{item.year}</p>
                  <h4 className="text-xl font-semibold text-blue-900">{item.title}</h4>
                  <p className="text-blue-700 mt-1">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <motion.section
            className="text-center pb-20 pt-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Link
              href="/"
              className="inline-block bg-blue-900 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition duration-300 shadow-md hover:shadow-lg"
            >
              ← Back to Home
            </Link>
          </motion.section>
        </div>
      </main>
    </>
  );
}
