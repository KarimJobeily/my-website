'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Partner {
  id: number;
  slug?: string;
  name: string;
  type: string;
  logo_url: string;
  website_url?: string;
  description?: string;
  contact_person?: string;
  email?: string;
  phone?: string;
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/partners')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch partners');
        return res.json();
      })
      .then((data: Partner[]) => {
        setPartners(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Our Partners</h1>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed font-light">
          Collaborating with organizations committed to respiratory health.
        </p>
      </section>

      {/* Partners Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading partners...</p>
        ) : error ? (
          <p className="text-center text-red-600 text-lg font-semibold">{error}</p>
        ) : partners.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No partners available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {partners.map((partner) => {
              const hasWebsite = partner.website_url && partner.website_url.trim().length > 0;
              const websiteUrl =
                hasWebsite && partner.website_url!.startsWith('http')
                  ? partner.website_url!
                  : hasWebsite
                  ? `https://${partner.website_url!.trim()}`
                  : null;

              // Accessible label for links
              const ariaLabel = `Visit website of ${partner.name}`;

              return (
                <article
                  key={partner.id}
                  className="flex flex-col bg-white border border-gray-200 rounded-3xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                  {/* Logo - clickable if website present */}
                  {websiteUrl ? (
                    <a
                      href={websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={ariaLabel}
                      className="relative w-32 h-32 mx-auto mb-6 block focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg"
                      tabIndex={0}
                    >
                      <Image
                        src={partner.logo_url}
                        alt={`${partner.name} Logo`}
                        fill
                        className="object-contain rounded-lg"
                        sizes="(max-width: 640px) 80px, 128px"
                        priority
                      />
                    </a>
                  ) : (
                    <div className="relative w-32 h-32 mx-auto mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={partner.logo_url}
                        alt={`${partner.name} Logo`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 80px, 128px"
                        priority
                      />
                    </div>
                  )}

                  {/* Partner Name - clickable if website */}
                  {websiteUrl ? (
                    <a
                      href={websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={ariaLabel}
                      className="text-center text-2xl font-semibold text-blue-900 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-colors duration-200"
                      tabIndex={0}
                    >
                      {partner.name}
                    </a>
                  ) : (
                    <h3 className="text-center text-2xl font-semibold text-blue-900">{partner.name}</h3>
                  )}

                  {/* Partner Type */}
                  <p className="text-center italic text-gray-500 mt-1 mb-4 select-none">{partner.type}</p>

                  {/* Description */}
                  {partner.description && (
                    <p className="text-gray-700 text-sm leading-relaxed mb-6 whitespace-pre-line">{partner.description}</p>
                  )}

                  {/* Visit Website Link Button */}
                  {websiteUrl && (
                    <div className="mb-6 text-center">
                      <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 bg-blue-700 text-white font-medium rounded-full shadow-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                        aria-label={`Visit website of ${partner.name}`}
                        tabIndex={0}
                      >
                        Visit Website
                      </a>
                    </div>
                  )}

                  {/* Contact Info */}
                  {(partner.contact_person || partner.email || partner.phone) && (
                    <footer className="mt-auto border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-700">
                      {partner.contact_person && (
                        <p>
                          <strong>Contact:</strong> <span className="font-normal">{partner.contact_person}</span>
                        </p>
                      )}

                      {partner.email && (
                        <p>
                          <strong>Email:</strong>{' '}
                          <a
                            href={`mailto:${partner.email}`}
                            className="text-blue-600 hover:underline break-words"
                            tabIndex={0}
                          >
                            {partner.email}
                          </a>
                        </p>
                      )}

                      {partner.phone && (
                        <p>
                          <strong>Phone:</strong>{' '}
                          <a href={`tel:${partner.phone}`} className="text-blue-600 hover:underline" tabIndex={0}>
                            {partner.phone}
                          </a>
                        </p>
                      )}
                    </footer>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
