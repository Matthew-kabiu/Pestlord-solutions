import { Facebook, Twitter, Linkedin, Instagram, Music2, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Services', href: '#services' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Music2, label: 'TikTok', href: '#' },
  ];

  return (
    <footer className="bg-surface-950 text-surface-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <span className="text-lg font-display font-bold text-white tracking-tight">
                Pestlord
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Professional pest management services for residential, commercial, and institutional properties across Kenya.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-surface-800 flex items-center justify-center text-surface-400 hover:bg-brand-600 hover:text-white transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-surface-400 hover:text-brand-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+254700000000" className="hover:text-brand-400 transition-colors">
                  +254 700 000 000
                </a>
              </li>
              <li>
                <a href="mailto:info@pestlord.co.ke" className="hover:text-brand-400 transition-colors">
                  info@pestlord.co.ke
                </a>
              </li>
              <li className="text-surface-500">Nairobi, Kenya</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Business Hours
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span className="text-surface-300">8AM - 6PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-surface-300">9AM - 4PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-surface-500">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-800 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-surface-500">
            &copy; {currentYear} Pestlord Solutions. All rights reserved.
          </p>
          <p className="text-xs text-surface-600">
            Built by SpookieLabsInc
          </p>
        </div>
      </div>
    </footer>
  );
}
