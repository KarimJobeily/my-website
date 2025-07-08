'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';

interface Partner {
  id: number;
  name: string;
  type: string;
  logo_url: string;
  website_url?: string;
  description?: string;
  contact_person?: string;
  email?: string;
  phone?: string;
}

const PARTNERS_PER_PAGE = 6;

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  // ✅ Use optional chaining for safety
  const currentPage = Math.max(
    1,
    parseInt(searchParams?.get('page') || '1', 10)
  );
  const totalPages = Math.ceil(partners.length / PARTNERS_PER_PAGE);

  const paginatedPartners = partners.slice(
    (currentPage - 1) * PARTNERS_PER_PAGE,
    currentPage * PARTNERS_PER_PAGE
  );

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  // ESC key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPartner(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Partners</h1>
        <p className="text-lg max-w-3xl mx-auto font-light">
          Collaborating with organizations committed to respiratory health.
        </p>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {error && <p className="text-center text-red-600 text-lg">{error}</p>}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 animate-fade-in">
            {Array.from({ length: PARTNERS_PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 border border-gray-200 p-6 rounded-3xl shadow-inner space-y-4"
              >
                <div className="w-32 h-32 mx-auto rounded-lg bg-gray-300 animate-pulse" />
                <div className="h-6 w-3/4 mx-auto rounded bg-gray-300 animate-pulse" />
                <div className="h-4 w-1/2 mx-auto rounded bg-gray-300 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-gray-300 animate-pulse" />
                  <div className="h-3 w-5/6 rounded bg-gray-300 animate-pulse" />
                  <div className="h-3 w-4/6 rounded bg-gray-300 animate-pulse" />
                </div>
                <div className="w-32 h-8 mx-auto rounded-full bg-gray-300 animate-pulse mt-4" />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && paginatedPartners.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 animate-fade-in">
              {paginatedPartners.map((partner) => (
                <article
                  key={partner.id}
                  className="bg-white border border-gray-200 rounded-3xl shadow-md p-6 hover:shadow-xl hover:border-blue-500 transition cursor-pointer"
                  onClick={() => setSelectedPartner(partner)}
                  aria-label={`View details for ${partner.name}`}
                >
                  <div className="flex flex-col h-full">
                    <a
                      href={
                        partner.website_url?.startsWith('http')
                          ? partner.website_url
                          : `https://${partner.website_url}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-32 h-32 mx-auto mb-6 rounded-lg overflow-hidden block"
                    >
                      <Image
                        src={partner.logo_url}
                        alt={`${partner.name} Logo`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 80px, 128px"
                      />
                    </a>

                    <h2 className="text-center text-2xl font-semibold text-blue-900">
                      {partner.name}
                    </h2>
                    <p className="text-center italic text-gray-500 mt-1 mb-4">
                      {partner.type}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent card click
                        setSelectedPartner(partner);
                      }}
                      className="mt-auto self-center px-4 py-1 text-sm bg-blue-700 text-white rounded-full hover:bg-blue-800 transition cursor-pointer"
                      aria-label={`View more details about ${partner.name}`}
                    >
                      View More Details
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center items-center gap-4">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-full border text-sm transition ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-700 text-white hover:bg-blue-800 cursor-pointer'
                }`}
                aria-label="Previous Page"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-full border text-sm transition ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-700 text-white hover:bg-blue-800 cursor-pointer'
                }`}
                aria-label="Next Page"
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>

      {/* Modal */}
      {selectedPartner && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/60 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="partner-modal-title"
        >
          <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-2xl relative animate-scale-in">
            <button
              onClick={() => setSelectedPartner(null)}
              className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-xl font-bold cursor-pointer"
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex flex-col items-center mb-4">
              <div className="relative w-28 h-28 mb-4 rounded-2xl overflow-hidden">
                <Image
                  src={selectedPartner.logo_url}
                  alt={`${selectedPartner.name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <h2
                id="partner-modal-title"
                className="text-2xl font-semibold text-blue-900"
              >
                {selectedPartner.name}
              </h2>
              <p className="italic text-gray-500">{selectedPartner.type}</p>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              {selectedPartner.description && <p>{selectedPartner.description}</p>}
              {selectedPartner.website_url && (
                <p>
                  <strong>Website:</strong>{' '}
                  <a
                    href={
                      selectedPartner.website_url.startsWith('http')
                        ? selectedPartner.website_url
                        : `https://${selectedPartner.website_url}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-words"
                  >
                    {selectedPartner.website_url}
                  </a>
                </p>
              )}
              {selectedPartner.contact_person && (
                <p>
                  <strong>Contact:</strong> {selectedPartner.contact_person}
                </p>
              )}
              {selectedPartner.email && (
                <p>
                  <strong>Email:</strong>{' '}
                  <a
                    href={`mailto:${selectedPartner.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {selectedPartner.email}
                  </a>
                </p>
              )}
              {selectedPartner.phone && (
                <p>
                  <strong>Phone:</strong>{' '}
                  <a
                    href={`tel:${selectedPartner.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {selectedPartner.phone}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.25s ease-out;
        }
      `}</style>
    </main>
  );
}
