import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { sendMessage } from '../../lib/openrouter';
import type { ChatMessage as ChatMessageType } from '../../types/chatbot';
import { IMAGES } from '../../constants/images';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatbotModal({ isOpen, onClose }: ChatbotModalProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([]);
    setIsLoading(false);
    setError(null);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!isOpen) setError(null);
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessageId = `user-${Date.now()}`;
    setMessages(prev => [...prev, { id: userMessageId, role: 'user', content: text, timestamp: new Date() }]);
    setIsLoading(true);
    setError(null);

    const assistantMessageId = `assistant-${Date.now()}`;
    setMessages(prev => [...prev, { id: assistantMessageId, role: 'assistant', content: '', timestamp: new Date() }]);

    try {
      const response = await sendMessage({ text, stream: false });
      setMessages(prev => prev.map(msg => msg.id === assistantMessageId ? { ...msg, content: response } : msg));
    } catch (err) {
      setMessages(prev => prev.filter(msg => msg.id !== assistantMessageId));
      setError(err instanceof Error ? err.message : 'Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-surface-950/50 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-soft-xl w-full max-w-4xl h-[90vh] sm:h-[85vh] flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
              <img src={IMAGES.chatbot.bot} alt="PestPal" className="w-10 h-10 rounded-xl object-cover" />
            </div>
            <div>
              <h2 className="text-sm font-display font-semibold text-surface-900">PestPal AI</h2>
              <p className="text-xs text-surface-400">Powered by PestLord Solutions</p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-surface-100 transition-colors text-surface-400" aria-label="Close chatbot">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mb-4">
                <img src={IMAGES.chatbot.bot} alt="PestPal" className="w-16 h-16 rounded-2xl object-cover" />
              </div>
              <h3 className="font-display font-semibold text-surface-900 mb-1">PestPal AI</h3>
              <p className="text-sm text-surface-400 max-w-xs">Ask me anything about pest control, fumigation, or our services.</p>
            </div>
          )}

          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <img src={IMAGES.chatbot.bot} alt="" className="w-8 h-8 rounded-xl object-cover" />
              </div>
              <div className="bg-surface-100 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-surface-300 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-surface-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-surface-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error */}
        {error && (
          <div className="mx-5 mb-3 bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-xs text-red-700">{error}</p>
            <button onClick={() => setError(null)} className="mt-1.5 text-xs text-red-600 hover:text-red-800 underline">Dismiss</button>
          </div>
        )}

        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
