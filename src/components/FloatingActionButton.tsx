import { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Bot, Phone } from 'lucide-react';
import ChatbotModal from './Chatbot/ChatbotModal';

export default function FloatingActionButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isChatbotOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isChatbotOpen]);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/254700000000?text=' + encodeURIComponent('Hello, I need help with pest control services.'), '_blank');
    setIsMenuOpen(false);
  };

  return (
    <>
      <div ref={menuRef} className="fixed bottom-6 right-6 z-40">
        {isMenuOpen && (
          <div className="absolute bottom-20 right-0 flex flex-col gap-3 mb-2">
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-3 bg-white text-surface-700 px-5 py-3 rounded-2xl shadow-soft-lg hover:shadow-soft-xl transition-all btn-press border border-surface-100 animate-fab-in"
              style={{ animationDelay: '0.05s' }}
              aria-label="Contact us on WhatsApp"
            >
              <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <div className="text-left whitespace-nowrap">
                <p className="text-xs text-surface-400 font-medium">WhatsApp</p>
                <p className="text-sm font-semibold text-surface-900">Chat with us</p>
              </div>
            </button>

            <button
              onClick={() => { setIsChatbotOpen(true); setIsMenuOpen(false); }}
              className="flex items-center gap-3 bg-white text-surface-700 px-5 py-3 rounded-2xl shadow-soft-lg hover:shadow-soft-xl transition-all btn-press border border-surface-100 animate-fab-in"
              style={{ animationDelay: '0s' }}
              aria-label="Talk with AI Assistant"
            >
              <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="text-left whitespace-nowrap">
                <p className="text-xs text-surface-400 font-medium">PestPal AI</p>
                <p className="text-sm font-semibold text-surface-900">Ask anything</p>
              </div>
            </button>
          </div>
        )}

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-14 h-14 bg-brand-600 text-white rounded-2xl shadow-brand-lg hover:shadow-brand transition-all btn-press flex items-center justify-center ${
            isMenuOpen ? 'rotate-45' : 'rotate-0'
          }`}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>

      <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </>
  );
}
