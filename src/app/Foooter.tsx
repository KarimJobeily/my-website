import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaLungs } from 'react-icons/fa';

export default function Foooter() {
  return (
    <footer
      className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-gray-200 py-8 px-6 sm:px-12"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {/* LARC Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold tracking-widest uppercase text-white flex items-center gap-2 border-b border-cyan-500 pb-1">
            <FaLungs className="text-cyan-400" />
            LARC
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            The Lebanese Association for Respiratory Care is dedicated to improving lung health through education, advocacy, and research.
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Quick Links" className="space-y-4">
          <h3 className="text-xl font-semibold tracking-widest uppercase text-white border-b border-cyan-500 pb-1">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About Us' },
              { href: '/membership', label: 'Membership' },
              { href: '/events', label: 'Events' },
             { href: 'mailto:info@lebanesearc.org', label: 'Contact' }

            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block hover:text-white transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-300 rounded"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social & Contact */}
        <div className="space-y-6">
          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold tracking-widest uppercase text-white border-b border-cyan-500 pb-1">
              Follow Us
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              {[
                { href: 'https://facebook.com/larc', label: 'Facebook', icon: FaFacebookF },
                { href: 'https://instagram.com/larc', label: 'Instagram', icon: FaInstagram },
                { href: 'https://linkedin.com/larc', label: 'LinkedIn', icon: FaLinkedinIn }
              ].map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Follow us on ${label}`}
                    className="flex items-center gap-2 transition-all duration-300 hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300 rounded"
                  >
                    <Icon className="text-cyan-400 group-hover:text-white transition" aria-hidden="true" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <address className="not-italic text-gray-300 text-sm space-y-1">
            <h3 className="text-xl font-semibold tracking-widest uppercase text-white border-b border-cyan-500 pb-1">
              Contact
            </h3>
            <p>
              Email:{' '}
              <a
                href="mailto:info@lebanesearc.org"
                className="hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 rounded"
              >
                info@lebanesearc.org
              </a>
            </p>
          </address>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400 select-none">
        © {new Date().getFullYear()} LARC – Lebanese Association for Respiratory Care<br />
        All rights reserved.
      </div>
    </footer>
  );
}
