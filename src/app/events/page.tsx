'use client';
import SEO from '@/components/SEO';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

// Event type definition
interface Event {
  slug: string;
  title: string;
  date: string;
  location: string;
  type: string;
  price: string;
  description: string;
  link?: string;
}

const EVENTS_PER_PAGE = 20;

export default function EventsPage() {
    <SEO
        title="Events - Lebanese Association for Respiratory Care"
        description="Upcoming events and workshops by the Lebanese Association for Respiratory Care."
        canonical="https://lebanesearc.org/events"
        ogImage="https://lebanesearc.org/images/og-events.png" // Optional
      />
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const lastFocusedCard = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null); // ✅ ADD THIS LINE
  // Fetch events from API
  useEffect(() => {
    setLoading(true);
    fetch('/api/events')
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((data: Event[]) => {
        setEvents(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter events based on search term
  const filteredEvents = useMemo(() => {
    const term = debouncedSearch.toLowerCase().trim();
    if (!term) return events;
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(term) ||
        e.description.toLowerCase().includes(term)
    );
  }, [debouncedSearch, events]);

  // Reset to first page on search
  useEffect(() => setCurrentPage(1), [debouncedSearch]);

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [totalPages]
  );

  const clearSearch = useCallback(() => setSearchTerm(''), []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white px-6 pt-24 pb-20 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Upcoming Events</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Join LARC in promoting respiratory health through education, advocacy, and research.
        </p>
        <div className="mt-10 flex justify-center relative max-w-md mx-auto">
          <input
            type="search"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
            aria-label="Search events"
            autoComplete="off"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              aria-label="Clear search"
              title="Clear search"
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition cursor-pointer"
            >✕</button>
          )}
        </div>
      </section>

      {/* Events Listing Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Events</h2>

          {/* Skeleton loader while fetching */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[250px] bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-red-600 text-lg mt-12">{error}</p>
          ) : filteredEvents.length === 0 ? (
            <p className="text-center text-gray-500 text-lg mt-12">
              😕 No events match your search. Try a different keyword.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedEvents.map((event, idx) => (
                  <div
                    key={`${event.slug}-${idx}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      lastFocusedCard.current = document.activeElement as HTMLDivElement;
                      setSelectedEvent(event);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedEvent(event);
                      }
                    }}
                    className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
                  >
                    <div className="bg-white rounded-xl shadow hover:shadow-xl transform hover:-translate-y-1 transition duration-300 flex flex-col h-full p-6">
                      <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start">
                        {event.type}
                      </span>
                      <h3 className="text-xl font-bold text-blue-700 mb-1">{event.title}</h3>
                      <p className="text-sm text-gray-400 italic mb-2">{event.type} • {event.price}</p>
                      <p className="text-sm text-gray-500 mb-1">📅 {new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="text-sm text-gray-500 mb-3">📍 {event.location}</p>
                      <p className="text-gray-600 line-clamp-3 flex-grow">{event.description}</p>
                      <div className="mt-4 text-blue-600 font-medium">→ View Details</div>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
            </>
          )}
        </div>
      </section>

      {/* Event Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            className="relative bg-white max-w-xl w-full rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] flex flex-col p-6 outline-none animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 text-white bg-gradient-to-br from-blue-900 to-blue-700 rounded-full hover:scale-105 transition cursor-pointer"
            >✕</button>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-blue-800 mb-1">
              {selectedEvent.title}
            </h2>
            <div className="text-sm text-gray-500 mb-4">
              <p className="italic text-gray-400">{selectedEvent.type} • {selectedEvent.price}</p>
              <p>📅 {new Date(selectedEvent.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p>📍 {selectedEvent.location}</p>
            </div>
            <div className="text-gray-800 leading-relaxed overflow-y-auto max-h-[30vh] sm:max-h-[40vh] pr-1 mb-4">
              {selectedEvent.description}
            </div>
            {selectedEvent.link && (
              <a
                href={selectedEvent.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-6 py-3 bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-xl hover:from-blue-800 hover:to-blue-600 transition font-semibold text-center"
              >
                Register
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );

  function onClose() {
    setSelectedEvent(null);
    lastFocusedCard.current?.focus();
  }
}

// Pagination component
function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) {
  if (totalPages <= 1) return null;
  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav className="flex justify-center mt-12 space-x-2" aria-label="Pagination">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-default' : 'bg-blue-700 text-white hover:bg-blue-800 cursor-pointer'}`}>« First</button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-default' : 'bg-blue-700 text-white hover:bg-blue-800 cursor-pointer'}`}>‹ Prev</button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`px-4 py-1 rounded-md font-medium ${page === currentPage ? 'bg-blue-700 text-white cursor-default' : 'bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white cursor-pointer'}`}
        >{page}</button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-default' : 'bg-blue-700 text-white hover:bg-blue-800 cursor-pointer'}`}>Next ›</button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-default' : 'bg-blue-700 text-white hover:bg-blue-800 cursor-pointer'}`}>Last »</button>
    </nav>
  );
}
