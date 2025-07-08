'use client';

import { useEffect, useState, useRef } from 'react';
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

  // Modal iframe URL and states
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  // Disable body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = iframeUrl ? 'hidden' : '';
  }, [iframeUrl]);

  // Close modal on ESC key
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Reset iframe loading states on open/close
  useEffect(() => {
    if (iframeUrl) {
      setIframeLoading(true);
      setIframeError(false);
    }
  }, [iframeUrl]);

  // Iframe load event
  function handleIframeLoad() {
    setIframeLoading(false);
    setIframeError(false);
  }

  // Iframe error fallback (some browsers may not trigger onError reliably)
  // We'll use a timeout to detect failure to load after 10 seconds.
  useEffect(() => {
    if (!iframeUrl) return;
    const timer = setTimeout(() => {
      if (iframeLoading) {
        setIframeLoading(false);
        setIframeError(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [iframeLoading, iframeUrl]);

  function closeModal() {
    setIframeUrl(null);
  }

  return (
    <main className="min-h-screen bg-white relative">
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
              const hasWebsite =
                partner.website_url && partner.website_url.trim().length > 0;

              // Normalize website url with https
              const websiteUrl =
                hasWebsite && partner.website_url!.startsWith('http')
                  ? partner.website_url!
                  : hasWebsite
                  ? `https://${partner.website_url!.trim()}`
                  : null;

              const hasExtraInfo =
                partner.description ||
                partner.contact_person ||
                partner.email ||
                partner.phone ||
                websiteUrl;

              return (
                <article
                  key={partner.id}
                  className="flex flex-col bg-white border border-gray-200 rounded-3xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                  {/* Logo clickable to open partner website in new tab */}
                  {websiteUrl ? (
                    <a
                      href={websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit website of ${partner.name}`}
                      className="relative w-32 h-32 mx-auto mb-6 block rounded-lg overflow-hidden focus:ring-4 focus:ring-blue-300"
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

                  {/* Name */}
                  <h3 className="text-center text-2xl font-semibold text-blue-900">
                    {partner.name}
                  </h3>

                  {/* Type */}
                  <p className="text-center italic text-gray-500 mt-1 mb-6 select-none">
                    {partner.type}
                  </p>

                  {/* View More Details button opens iframe modal */}
                  {hasExtraInfo && (
                    <button
                      onClick={() => {
                        if (websiteUrl) {
                          setIframeUrl(websiteUrl);
                        } else {
                          alert('No website available to show.');
                        }
                      }}
                      className="mt-auto self-center px-6 py-2 bg-blue-700 text-white font-medium rounded-full shadow-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                    >
                      View More Details
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Iframe Modal */}
      {iframeUrl && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent modal close on click inside
            className="relative w-full max-w-5xl h-[80vh] bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Close iframe modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Loading spinner */}
            {iframeLoading && !iframeError && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-40">
                <svg
                  className="animate-spin h-10 w-10 text-blue-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              </div>
            )}

            {/* Iframe or error message */}
            {iframeError ? (
              <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                <p className="text-red-600 text-lg font-semibold mb-4">
                  Unable to load the partner website.
                </p>
                <p className="text-gray-700 mb-6">
                  The partner website might not allow embedding in other sites.
                </p>
                <button
                  onClick={() => window.open(iframeUrl!, '_blank', 'noopener')}
                  className="px-6 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                >
                  Open in New Tab
                </button>
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                src={iframeUrl}
                className="flex-grow w-full border-none rounded-b-3xl"
                title="Partner Website"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                allow="fullscreen"
                onLoad={handleIframeLoad}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
}
