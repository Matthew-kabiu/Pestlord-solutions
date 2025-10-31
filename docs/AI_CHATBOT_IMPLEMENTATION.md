# AI Chatbot Implementation Documentation

## Overview
✅ **IMPLEMENTED** - An AI-powered chatbot that answers pest and fumigation-related questions. The chatbot is accessible via a Floating Action Button (FAB) menu, supports text-only communication, and uses OpenRouter as the AI model provider.

## Features

### 1. Floating Action Button (FAB) Menu ✅ IMPLEMENTED
- **Location**: Fixed position, bottom-right corner
- **Behavior**: 
  - Main FAB button with menu icon
  - On click, expands to show two options:
    1. **WhatsApp Button**: Redirects users to WhatsApp
    2. **AI Chatbot Button**: Opens the AI chatbot interface
- **Design**: Mid-tone green theme (company brand color)
- **Animation**: Smooth expand/collapse transitions

### 2. AI Chatbot Interface ✅ IMPLEMENTED
- **Modal/Overlay**: Full-screen modal interface with overlay
- **Communication Methods**:
  - **Text Input**: Standard message input field (text-only)
- **Features**:
  - Chat history display with timestamps
  - **Markdown rendering** - Assistant messages support formatted text (bold, lists, headers, etc.)
  - Loading states during AI responses (animated dots)
  - Error handling and display with dismiss option
  - Default greeting message from PestPal
  - Auto-scroll to latest message
  - Conversation clears on page reload/refresh
  - Clean, modern UI matching Gali Bot design reference
  - PestPal bot avatar (PinkBot.jpg)

### 3. OpenRouter Integration ✅ IMPLEMENTED
- **Model Provider**: OpenRouter API
- **Configuration**: 
  - API URL (required, from environment variable)
  - Model ID/Name (required, from environment variable)
  - API key (required, from environment variable)
  - **Request Format**:
  - Text-only messages
  - Custom system prompt for PestPal AI assistant
  - Markdown formatting enabled in responses
- **Response Handling**: 
  - Non-streaming responses (streaming available but not enabled by default)
  - Comprehensive error handling for API failures
  - User-friendly error messages

### 4. Pest & Fumigation Context ✅ IMPLEMENTED
- **System Prompt**: Pre-configured prompt that specializes the AI as "PestPal"
- **Domain Knowledge**: AI provides relevant, helpful answers about:
  - Pest identification and behavior
  - Fumigation and pest control processes
  - Safe treatment methods and best practices
  - Safety precautions for people, pets, and environment
  - General pest management and prevention advice
- **Behavior Rules**: 
  - Stays within pest/fumigation domain only
  - Never exposes credentials or internal information
  - Prioritizes safety and professionalism
  - Recommends professional consultation for serious issues

## Technical Implementation

### Project Structure

```
src/
├── components/
│   ├── FloatingActionButton.tsx      # Main FAB component with menu ✅
│   ├── Chatbot/
│   │   ├── ChatbotModal.tsx          # Main chatbot modal/panel ✅
│   │   ├── ChatMessage.tsx           # Individual message component ✅
│   │   └── ChatInput.tsx             # Text input area ✅
│   └── ...
├── lib/
│   └── openrouter.ts                 # OpenRouter API client ✅
├── types/
│   └── chatbot.ts                    # TypeScript types for chatbot ✅
└── ...
```

### Component Details

#### 1. FloatingActionButton.tsx
- **Props**: None (uses context/global state)
- **State**:
  - `isMenuOpen`: boolean - Controls menu visibility
  - `isChatbotOpen`: boolean - Controls chatbot visibility
- **Features**:
  - Fixed positioning (bottom-right, z-index high)
  - Menu animation (expand/collapse)
  - Click outside to close
- **Icons**: 
  - Menu icon (lucide-react: `Menu` or `MessageCircle`)
  - WhatsApp icon (lucide-react: `MessageCircle` or custom SVG)
  - AI icon (lucide-react: `Bot` or `Brain`)

#### 2. ChatbotModal.tsx
- **Props**:
  - `isOpen`: boolean
  - `onClose`: () => void
- **State**:
  - `messages`: Array of chat messages
  - Generated unique IDs per session
- **Features**:
  - Scrollable message area
  - Auto-scroll to bottom on new messages
  - Close button (X icon)
  - Mobile-responsive design

#### 3. ChatMessage.tsx ✅ IMPLEMENTED
- **Props**:
  - `message`: Message object (user/assistant)
- **Features**:
  - Different styling for user vs assistant messages
  - **Markdown rendering** for assistant messages using ReactMarkdown
  - Full date/time timestamp display
  - Bot avatar display (PinkBot.jpg)
  - User icon for user messages
  - Responsive layout with Tailwind Typography plugin

#### 4. ChatInput.tsx ✅ IMPLEMENTED
- **Props**:
  - `onSendMessage`: (text: string) => void
  - `isLoading`: boolean
- **State**:
  - `inputText`: string
- **Features**:
  - Text input field with placeholder
  - Send button (circular, green theme)
  - Disabled during loading
  - Enter key to send
  - Clean, minimal design

#### 5. openrouter.ts (API Client) ✅ IMPLEMENTED
- **Functions**:
  - `sendMessage(options: SendMessageOptions): Promise<string>`
  - `validateApiConfig(): { valid: boolean; errors: string[] }`
- **Configuration**:
  - API endpoint: Configurable via `VITE_OPENROUTER_API_URL` (required)
  - Headers: Authorization (Bearer token), Content-Type, HTTP-Referer, X-Title
  - Request body: Follows OpenRouter API format (text-only)
  - System prompt: Pre-configured PestPal assistant prompt

### Environment Variables ✅ CONFIGURED

```env
# OpenRouter Configuration (REQUIRED - No fallback defaults)
VITE_OPENROUTER_API_URL=https://openrouter.ai/api/v1/chat/completions
VITE_OPENROUTER_API_KEY=your_api_key_here
VITE_OPENROUTER_MODEL_ID=model_name_here
```

**Note**: All three variables are strictly required. The application will throw clear error messages if any are missing.

### API Integration Details

#### OpenRouter Request Format ✅ IMPLEMENTED
```typescript
{
  model: string,              // Model ID from env var (required)
  messages: [
    {
      role: "system",
      content: "You are PestPal, a professional virtual assistant..."
    },
    {
      role: "user",
      content: "User's question"  // Text-only string
    }
  ],
  stream: false  // Non-streaming by default
}
```

#### System Prompt ✅ IMPLEMENTED
The system prompt is configured as "PestPal" - a professional virtual assistant for PestLord Solutions with:
- Default greeting message
- Core rules (domain restriction, safety, confidentiality)
- **Markdown formatting instructions** - Encourages proper use of bold, lists, and headers for readability
- Example scenarios for appropriate responses
- Focus on professional, safety-focused pest control advice

## Implementation Status

### Phase 1: Setup & Configuration ✅ COMPLETED
1. ✅ Create implementation plan document
2. ✅ Dependencies installed (react-markdown, remark-gfm, @tailwindcss/typography)
3. ✅ Environment variables configured (strict requirement, no defaults)
4. ✅ TypeScript type definitions created and cleaned up
5. ✅ OpenRouter API client utilities implemented
6. ✅ Markdown rendering configured with Tailwind Typography

### Phase 2: Core Components ✅ COMPLETED
1. ✅ `FloatingActionButton` component
   - FAB structure with menu
   - Menu toggle with animations
   - WhatsApp redirect button
   - AI Chatbot button
2. ✅ `ChatbotModal` component
   - Modal/overlay structure
   - Layout and styling matching design reference
   - Open/close functionality
   - Conversation clears on page reload
3. ✅ `ChatMessage` component
   - Message display for user and assistant
   - **Markdown rendering** for assistant messages
   - Timestamp formatting
   - Avatar integration
   - Tailwind Typography styling
4. ✅ `ChatInput` component
   - Text input field
   - Send button with loading state
   - Clean, minimal design

### Phase 3: OpenRouter Integration ✅ COMPLETED
1. ✅ `openrouter.ts` API client
   - Text-only message sending
   - Response handling
   - Comprehensive error handling
   - API configuration validation
2. ✅ API integration in chatbot
   - Send user messages
   - Handle AI responses
   - Loading state management
3. ✅ Loading and error states
   - Loading indicators (animated dots)
   - Error message display with dismiss
   - User-friendly error messages

### Phase 4: Markdown Rendering ✅ COMPLETED
1. ✅ Markdown rendering library integration
   - Installed and configured react-markdown
   - Added remark-gfm for GitHub Flavored Markdown support
   - Integrated @tailwindcss/typography plugin
2. ✅ Component updates
   - ChatMessage component renders markdown for assistant messages
   - User messages remain plain text
   - Proper styling with Tailwind Typography classes
3. ✅ System prompt updated
   - Instructions for AI to use markdown formatting properly
   - Encourages structured, readable responses

### Phase 5: Polish & Optimization ✅ COMPLETED
1. ✅ Animations and transitions
   - Menu expand/collapse animations
   - Modal open/close transitions
   - Message appearance
2. ✅ Mobile responsiveness
   - Responsive design implemented
   - Mobile-friendly layouts
3. ✅ Accessibility
   - ARIA labels on buttons
   - Keyboard navigation support
4. ✅ Error handling
   - Network error handling
   - API error messages
   - User-friendly error display

### Phase 6: Testing ✅ COMPLETED
1. ✅ Text-only conversations tested
2. ✅ Error scenarios tested
3. ✅ Mobile responsiveness verified
4. ✅ Page reload clears conversation
5. ✅ Ready for production use

## Dependencies

### Required
- `lucide-react` - For icons
- `react` and `react-dom` - React framework
- `react-markdown` - Markdown rendering component for React
- `remark-gfm` - GitHub Flavored Markdown support (tables, strikethrough, etc.)
- `@tailwindcss/typography` - Tailwind plugin for styled markdown/prose content
- React hooks: `useState`, `useEffect`, `useRef` (built-in)

## Design Guidelines

### Colors
- **Primary**: Mid-tone green (#5a8f3e or similar) - Company brand color
- **Secondary**: White, Gray scale
- **Accent**: Green variations for hover states

### Typography
- Follow existing site typography
- Ensure readability in chat messages
- **Markdown rendering** with Tailwind Typography plugin for styled prose
- Proper formatting for headers, lists, bold text, and other markdown elements

### Spacing & Layout
- Consistent padding and margins
- Mobile-first responsive design
- Max-width constraints for chat messages

### Animations
- Smooth transitions (200-300ms)
- Ease-in-out timing functions
- Subtle hover effects

## API Considerations

### Rate Limiting
- Implement client-side rate limiting if needed
- Handle 429 (Too Many Requests) errors gracefully

### Costs
- Monitor API usage and costs
- Consider implementing rate limiting for production

### Model Selection
- User provides model ID/name via environment variable
- Ensure model supports text-based conversations
- Consider model capabilities and costs

## Security & Privacy

### Data Handling
- No persistent storage of user conversations
- Conversation clears on page reload/refresh
- API key stored in environment variables only
- Never expose API keys in client-side code

### API Key
- Store in environment variables only
- Never expose in client-side code (use proxy if necessary)
- Consider backend proxy for production

## Current Features

### ✅ Implemented Features
- Floating Action Button (FAB) with WhatsApp and AI Chatbot options
- Text-only AI chatbot interface with **markdown rendering support**
- PestPal AI assistant with specialized system prompt
- Clean, modern UI with PestPal avatar (PinkBot.jpg)
- Conversation history with timestamps
- **Properly formatted responses** using markdown (bold, lists, headers)
- Loading states and error handling
- Conversation clears on page reload/refresh
- Mobile-responsive design
- Smooth animations and transitions

### 🚀 Future Enhancements (Not Currently Implemented)
- Chat history persistence (localStorage/database)
- Conversation export/download
- Multi-language support
- Voice input/output
- Streaming responses (infrastructure ready, disabled by default)
- Integration with booking system
- Admin analytics dashboard

## Notes
- All code should follow existing project patterns
- Use TypeScript for type safety
- Maintain code file size limit (~250 lines max per file)
- Follow design patterns (Factory, Singleton, etc.) where appropriate
- Ensure accessibility compliance

---

**Status**: ✅ **PRODUCTION READY** - Implementation completed and tested. (October 31st 2025)

