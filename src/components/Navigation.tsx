import { useState, useEffect } from 'react';
import { Menu, X, Bug, Phone as PhoneIcon, ArrowRight } from 'lucide-react';

interface NavigationProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export default function Navigation({ currentPage = 'home', onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-soft'
          : 'bg-white/60 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group focus-ring"
          >
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
              <Bug className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-display font-bold text-surface-900 tracking-tight">
              Pestlord
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 focus-ring after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:rounded-full after:transition-all after:duration-200 ${
                  currentPage === item.id
                    ? 'text-brand-700 after:w-6 after:bg-brand-600'
                    : 'text-surface-500 hover:text-surface-900 after:w-0 after:bg-surface-400 hover:after:w-6'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+254700000000"
              className="flex items-center gap-2 text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors"
            >
              <PhoneIcon className="h-4 w-4" />
              <span>+254 700 000 000</span>
            </a>
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-brand-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-700 transition-all duration-200 inline-flex items-center gap-2 btn-press shadow-brand hover:shadow-brand-lg"
            >
              <span>Get a Quote</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-surface-600 hover:bg-surface-100 transition-colors focus-ring"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden glass border-t border-surface-200 animate-fade-in">
          <div className="px-4 pt-3 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-surface-700 hover:bg-surface-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => handleNavClick('contact')}
                className="block w-full bg-brand-600 text-white px-4 py-3 rounded-xl text-base font-semibold hover:bg-brand-700 transition-colors inline-flex items-center justify-center gap-2 btn-press shadow-brand"
              >
                <span>Get a Quote</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="tel:+254700000000"
                className="block w-full text-center px-4 py-3 rounded-xl text-base font-medium text-surface-700 hover:bg-surface-100 transition-colors"
              >
                +254 700 000 000
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
