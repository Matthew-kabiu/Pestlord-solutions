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

  return (
    <div className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <img src={IMAGES.chatbot.bot} alt="" className="w-8 h-8 rounded-xl object-cover" />
        </div>
      )}

      <div className={`flex flex-col max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-brand-600 text-white rounded-br-md'
            : 'bg-surface-100 text-surface-900 rounded-bl-md'
        }`}>
          {isUser ? (
            <p className="text-sm leading-relaxed">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none break-words prose-headings:mt-2.5 prose-headings:mb-1.5 prose-headings:text-surface-900 prose-headings:font-semibold prose-p:my-1.5 prose-p:text-sm prose-p:leading-relaxed prose-strong:text-surface-900 prose-strong:font-semibold prose-ul:my-1.5 prose-ul:pl-3.5 prose-li:my-0.5 prose-li:leading-relaxed prose-ol:my-1.5 prose-ol:pl-3.5">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <p className="text-[10px] text-surface-400 mt-1 px-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {isUser && (
        <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  );
}
