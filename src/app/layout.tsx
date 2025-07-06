import './globals.css';
import SiteHeader from './SiteHeader';
import Foooter from './Foooter'; // Keeping your component name as is

export const metadata = {
  title: 'Lebanese Association for Respiratory Care',
  description: 'Official website of the Lebanese ARC (LARC)',
  icons: {
    icon: '/favicon-32x32.png', // File must be in /public/
  },
};

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

