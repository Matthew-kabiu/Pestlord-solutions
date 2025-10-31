// ChatMessage component for displaying individual chat messages

import type { ChatMessage as ChatMessageType } from '../../types/chatbot';
import { User } from 'lucide-react';
import { IMAGES } from '../../constants/images';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={`flex gap-3 mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {isAssistant && (
        <img
          src={IMAGES.chatbot.bot}
          alt="AI Assistant"
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
      )}

      <div className="flex flex-col max-w-[70%]">
        <div
          className={`rounded-lg px-4 py-3 ${
            isUser
              ? 'bg-green-700 text-white rounded-br-none'
              : 'bg-gray-100 text-gray-900 rounded-bl-none'
          }`}
        >
          {/* Message Content */}
          {isAssistant ? (
            <div className="prose prose-sm max-w-none break-words prose-headings:mt-3 prose-headings:mb-2 prose-headings:text-gray-900 prose-headings:font-semibold prose-p:my-2 prose-p:leading-relaxed prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:my-2 prose-ul:pl-4 prose-li:my-1 prose-li:leading-relaxed prose-ul:list-disc prose-ol:my-2 prose-ol:pl-4 prose-ol:list-decimal">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          )}
        </div>

        {/* Timestamp - Full date and time */}
        <p className="text-xs text-gray-500 mt-1 ml-1">
          {message.timestamp.toLocaleString([], {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
          <User className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  );
}
