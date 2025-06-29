import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

interface Event {
  slug: string;
  title: string;
  date: string;
  location: string;
  type: string;
  price: string;
  image: string;
  description: string;
  registerLink: string;
}

// Define PageProps interface to satisfy Next.js typing requirements
interface PageProps {
  params: {
    slug: string;
  };
}

async function getEventBySlug(slug: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Supabase error fetching event:', error.message);
    return null;
  }
  return data;
}

export default async function EventDetailPage({ params }: PageProps) {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    return <p>Event not found.</p>; // or use notFound() if you want 404
  }

  return (
    <article className="bg-white min-h-screen max-w-5xl mx-auto mt-10 shadow-md rounded-2xl overflow-hidden border border-gray-200">
      {/* Header Image with Title Overlay */}
      <header className="relative h-64 md:h-96 w-full">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/50 flex items-end p-6">
          <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow max-w-4xl">
            {event.title}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 sm:p-10 space-y-8">
        {/* Metadata Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
          <div>
            <h2 className="text-sm text-gray-500 font-semibold uppercase mb-1">
              Date
            </h2>
            <p className="text-lg font-medium">{event.date}</p>
          </div>
          <div>
            <h2 className="text-sm text-gray-500 font-semibold uppercase mb-1">
              Location
            </h2>
            <p className="text-lg font-medium">{event.location}</p>
          </div>
          <div>
            <h2 className="text-sm text-gray-500 font-semibold uppercase mb-1">
              Type
            </h2>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              {event.type}
            </span>
          </div>
          <div>
            <h2 className="text-sm text-gray-500 font-semibold uppercase mb-1">
              Price
            </h2>
            <p className="text-lg font-medium">{event.price}</p>
          </div>
        </section>

        {/* Description */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About This Event
          </h2>
          <p className="text-gray-800 leading-relaxed text-lg">{event.description}</p>
        </section>

        {/* Register Button */}
        <section className="pt-4">
          <a
            href={event.registerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-xl shadow-sm transition-colors duration-150"
            aria-label={`Register for ${event.title}`}
          >
            Register Now →
          </a>
        </section>
      </main>
    </article>
  );
}
