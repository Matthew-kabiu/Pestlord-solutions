import {  Facebook, Twitter, Linkedin, Instagram, Music2, FileText } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Pestlord Solutions</h3>
            <p className="text-sm">
              Professional pest management services for residential, commercial, and institutional properties.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-green-500 transition-colors inline-flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Services</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 transition-colors inline-flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 transition-colors inline-flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-start">
                <span>info@pestlord.co.ke</span>
              </li>
              <li className="flex items-start">
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-green-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-green-500 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-green-500 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-green-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" aria-label="TikTok" className="hover:text-green-500 transition-colors">
                <Music2 className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>Built by SpookieLabsInc &copy; {currentYear} Pestlord Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
