

// app/layout.tsx
import './globals.css';
import SiteHeader from './SiteHeader';
import Foooter from './Foooter';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-800">
        <SiteHeader />
        <main className="flex-grow">{children}</main>
        <Foooter />
      </body>
    </html>
  );
}