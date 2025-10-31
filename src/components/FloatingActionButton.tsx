// FloatingActionButton component with menu for WhatsApp and AI Chatbot

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Bot, X, Phone } from 'lucide-react';
import ChatbotModal from './Chatbot/ChatbotModal';

export default function FloatingActionButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when chatbot is open
  useEffect(() => {
    if (isChatbotOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isChatbotOpen]);

  const handleWhatsAppClick = () => {
    // WhatsApp number - update with actual number
    const whatsappNumber = '254700000000'; // Format: country code + number without +
    const message = encodeURIComponent('Hello, I need help with pest control services.');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    setIsMenuOpen(false);
  };

  const handleChatbotClick = () => {
    setIsChatbotOpen(true);
    setIsMenuOpen(false);
  };

  const handleCloseChatbot = () => {
    setIsChatbotOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div ref={menuRef} className="fixed bottom-6 right-6 z-40">
        {/* Menu Items */}
        {isMenuOpen && (
          <div className="absolute bottom-20 right-0 flex flex-col gap-3 mb-2 animate-fade-in">
            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-3 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all transform hover:scale-105 animate-slide-up"
              aria-label="Contact us on WhatsApp"
            >
              <Phone className="h-5 w-5" />
              <span className="font-medium">WhatsApp</span>
            </button>

            {/* AI Chatbot Button */}
            <button
              onClick={handleChatbotClick}
              className="flex items-center gap-3 bg-green-700 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-800 transition-all transform hover:scale-105 animate-slide-up"
              aria-label="Talk with AI Assistant"
            >
              <Bot className="h-5 w-5" />
              <span className="font-medium">Chatbot</span>
            </button>
          </div>
        )}

        {/* Main FAB Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-14 h-14 bg-green-700 text-white rounded-full shadow-lg hover:bg-green-800 transition-all transform hover:scale-110 flex items-center justify-center ${
            isMenuOpen ? 'rotate-45' : 'rotate-0'
          }`}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Chatbot Modal */}
      <ChatbotModal isOpen={isChatbotOpen} onClose={handleCloseChatbot} />
    </>
  );
}

