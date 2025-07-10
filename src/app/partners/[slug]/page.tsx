import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { PartnerClientPage } from './client'; // or default import depending on client.tsx

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

async function getPartnerBySlug(slug: string) {
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

export async function generateStaticParams() {
  const { data, error } = await supabase.from('partners').select('slug');
  if (error || !data) return [];
  return data.map((partner) => ({ slug: partner.slug }));
}

export default async function PartnerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const partner = await getPartnerBySlug(slug);
  if (!partner) notFound();
  return <PartnerClientPage partner={partner} />;
}