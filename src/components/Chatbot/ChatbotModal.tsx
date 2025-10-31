// ChatbotModal component - Main chatbot interface

import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
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
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Clear conversation on page reload/refresh
  useEffect(() => {
    // Clear messages when component mounts (page reload)
    setMessages([]);
    setIsLoading(false);
    setError(null);
  }, []); // Empty dependency array means this runs only once on mount

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setError(null);
    }
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) {
      return;
    }

    // Add user message
    const userMessageId = `user-${Date.now()}`;
    const userMessage: ChatMessageType = {
      id: userMessageId,
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Add placeholder for assistant response
    const assistantMessageId = `assistant-${Date.now()}`;
    const assistantPlaceholder: ChatMessageType = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, assistantPlaceholder]);

    try {
      // Send message to OpenRouter
      const response = await sendMessage({
        text: text,
        stream: false
      });

      // Update assistant message with response
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMessageId
            ? { ...msg, content: response }
            : msg
        )
      );
    } catch (err) {
      // Remove placeholder message
      setMessages(prev => prev.filter(msg => msg.id !== assistantMessageId));

      const errorMessage =
        err instanceof Error ? err.message : 'Failed to get response. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] md:h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <img
              src={IMAGES.chatbot.bot}
              alt="AI Assistant"
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">PestPal AI</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            aria-label="Close chatbot"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 bg-white"
        >
          {messages.length === 0 && (
            <div className="flex gap-3 mb-6">
              <img
                src={IMAGES.chatbot.bot}
                alt="PestPal AI Assistant"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex flex-col max-w-[70%]">
                <div className="bg-gray-100 text-gray-900 rounded-lg rounded-bl-none px-4 py-3">
                  <p className="whitespace-pre-wrap break-words">
                    Hello! 👋 I'm PestPal, your pest control assistant from PestLord Solutions.
                    <br /><br />
                    I'm here to help you with any pest, fumigation, or pest management questions you may have.
                    <br /><br />
                    How can I assist you today?
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-1">
                  {new Date().toLocaleString([], {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          )}

          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex gap-3 mb-6">
              <img
                src={IMAGES.chatbot.bot}
                alt="AI Assistant"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="bg-gray-100 text-gray-900 rounded-lg rounded-bl-none px-4 py-3 max-w-[70%]">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="mx-4 mb-2 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Input Area */}
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
