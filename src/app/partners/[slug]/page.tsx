import Image from 'next/image';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Partner type
interface Partner {
  id: number;
  slug: string;
  name: string;
  logo_url: string;
  website_url?: string;
  type: string;
  description?: string;
  contact_person?: string;
  email?: string;
  phone?: string;
}

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Fetch partner by slug
async function getPartnerBySlug(slug: string): Promise<Partner | null> {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error('Partner fetch error:', error?.message);
    return null;
  }
  return data;
}

// Generate static params for SSG/ISR
export async function generateStaticParams() {
  const { data, error } = await supabase.from('partners').select('slug');
  if (error || !data) return [];
  return data.map((partner) => ({ slug: partner.slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const partner = await getPartnerBySlug(slug);

  if (!partner) {
    return { title: 'Partner Not Found' };
  }

  return {
    title: `${partner.name} | Our Partners`,
    description: partner.description
      ? partner.description.slice(0, 150)
      : `Learn more about ${partner.name}, our ${partner.type} partner.`,
    openGraph: {
      title: partner.name,
      description: partner.description || `Partner: ${partner.name}`,
      images: [{ url: partner.logo_url }],
    },
  };
}

// Page component
export default async function PartnerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const partner = await getPartnerBySlug(slug);

  if (!partner) notFound();

  const websiteUrl =
    partner.website_url && partner.website_url.startsWith('http')
      ? partner.website_url
      : partner.website_url
      ? `https://${partner.website_url}`
      : null;

  const hasContact =
    partner.contact_person || partner.email || partner.phone;

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 animate-fadeIn">
      {/* Logo */}
      <div className="w-40 h-40 relative mx-auto mb-8 rounded-xl overflow-hidden shadow-lg">
        <Image
          src={partner.logo_url || '/fallback-logo.png'}
          alt={`${partner.name} Logo`}
          fill
          sizes="160px"
          className="object-contain"
          priority
        />
      </div>

      {/* Name & Type */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-900 mb-2">
        {partner.name}
      </h1>
      <p className="text-center text-gray-600 italic mb-8">{partner.type}</p>

      {/* Website Button */}
      {websiteUrl && (
        <div className="text-center mb-12">
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-white font-bold px-8 py-3 rounded-full shadow transition"
          >
            Visit Website
          </a>
        </div>
      )}

      {/* Description */}
      {partner.description && (
        <section className="prose prose-blue mx-auto mb-12 text-lg">
          <p>{partner.description}</p>
        </section>
      )}

      {/* Contact Info */}
      {hasContact && (
        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mx-auto max-w-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
            Contact Information
          </h2>
          <ul className="space-y-3 text-blue-900 text-base">
            {partner.contact_person && (
              <li>
                <strong>Contact:</strong> {partner.contact_person}
              </li>
            )}
            {partner.email && (
              <li>
                <strong>Email:</strong>{' '}
                <a
                  href={`mailto:${partner.email}`}
                  className="text-blue-700 hover:underline"
                >
                  {partner.email}
                </a>
              </li>
            )}
            {partner.phone && (
              <li>
                <strong>Phone:</strong>{' '}
                <a
                  href={`tel:${partner.phone}`}
                  className="text-blue-700 hover:underline"
                >
                  {partner.phone}
                </a>
              </li>
            )}
          </ul>
        </section>
      )}

      {/* Fallback if no description/contact */}
      {!partner.description && !hasContact && (
        <p className="text-center text-gray-500">
          No additional information available.
        </p>
      )}
    </main>
  );
}