import { useState } from 'react';
import { Menu, X, Bug, Phone as PhoneIcon, FileText } from 'lucide-react';

interface NavigationProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export default function Navigation({ currentPage = 'home', onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <Bug className="h-8 w-8 text-green-700" />
            <span className="ml-2 text-xl font-bold text-gray-900">Pestlords Fumigation</span>
          </div>

          {/* Middle: Page Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-green-700 border-b-2 border-green-700'
                    : 'text-gray-700 hover:text-green-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right: Buttons and Phone */}
          <div className="hidden md:flex space-x-4 items-center">
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-800 transition-colors flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>Get a Quote</span>
            </button>
            <a href="tel:+254700000000" className="text-gray-700 hover:text-green-700 text-sm font-medium flex items-center gap-2">
              <PhoneIcon className="h-4 w-4" />
              <span>+254 700 000 000</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === item.id
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className="block w-full text-left bg-green-700 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-green-800 flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>Get a Quote</span>
            </button>
            <a
              href="tel:+254700000000"
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <PhoneIcon className="h-4 w-4" />
              <span>+254 700 000 000</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
