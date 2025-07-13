import HomePageClient from './HomePageClient';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default async function HomePage() {
  const { data, error } = await supabase
    .from('home')
    .select('id, link')
    .order('id', { ascending: true });

  console.log('Supabase data:', data);
  console.log('Supabase error:', error);

  const images = data || [];

  return <HomePageClient images={images} />;
}
