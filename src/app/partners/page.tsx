import { Suspense } from 'react';
import PartnersClientPage from './PartnersClientPage';

export default function PartnersPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading partners...</div>}>
      <PartnersClientPage />
    </Suspense>
  );
}
