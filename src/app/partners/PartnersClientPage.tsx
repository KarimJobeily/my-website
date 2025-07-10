'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

export default function PartnersClientPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Math.max(1, parseInt(searchParams?.get('page') || '1', 10));
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPartner(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedPartner ? 'hidden' : '';
  }, [selectedPartner]);

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Partners</h1>
        <p className="text-lg max-w-3xl mx-auto font-light">
          Collaborating with organizations committed to respiratory health.
        </p>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {error && <p className="text-center text-red-600 text-lg">{error}</p>}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 animate-fade-in">
            {Array.from({ length: PARTNERS_PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 border border-gray-200 p-8 rounded-3xl shadow-inner space-y-4"
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
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 items-stretch animate-fade-in">
              {paginatedPartners.map((partner) => (
                <motion.article
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedPartner(partner)}
                  className="
                    flex flex-col justify-between 
                    bg-white border border-gray-200 
                    rounded-3xl shadow-md p-8 sm:p-8 md:p-10
                    hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 hover:border-blue-500 
                    hover:bg-blue-50 transition-all duration-300 ease-in-out 
                    cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-200
                  "
                  tabIndex={0}
                  aria-label={`View details for ${partner.name}`}
                >
                  <div className="flex flex-col flex-1 space-y-6">
                    <a
                      href={
                        partner.website_url?.startsWith('http')
                          ? partner.website_url
                          : `https://${partner.website_url}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-lg overflow-hidden block transition-transform duration-300 hover:scale-105"
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
                    <p className="text-center italic text-gray-500">{partner.type}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPartner(partner);
                      }}
                      className="mt-auto px-5 py-2 text-sm bg-blue-700 text-white rounded-full hover:bg-blue-800 transition self-center"
                    >
                      View More Details
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-12 flex justify-center items-center gap-4">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-full border text-sm transition ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-700 text-white hover:bg-blue-800'
                }`}
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
                    : 'bg-blue-700 text-white hover:bg-blue-800'
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>

      {selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/60 animate-fade-in">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto p-8 rounded-2xl shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedPartner(null)}
              className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
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
              <h2 className="text-2xl font-semibold text-blue-900">
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
          </motion.div>
        </div>
      )}

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
      `}</style>
    </main>
  );
}
