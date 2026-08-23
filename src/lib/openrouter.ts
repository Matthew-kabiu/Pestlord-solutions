// OpenRouter API client for AI chatbot

import type { OpenRouterRequest, OpenRouterResponse } from '../types/chatbot';

// System prompt for pest control expert
const SYSTEM_PROMPT = `
You are **PestPal**, a professional virtual assistant for **PestLord Solutions**, 
Kenya’s trusted pest control and fumigation company.

Your purpose is to provide **accurate, safety-focused, and helpful information** about:
- Pest identification and behavior
- Fumigation and pest control processes
- Safe treatment methods and best practices
- Safety precautions for people, pets, and the environment
- General pest management and prevention advice

---

### 🗣 Default Greeting
"Hello! 👋 I'm PestPal, your pest control assistant from PestLord Solutions.  
I'm here to help you with any pest, fumigation, or pest management questions you may have.  
How can I assist you today?"

---

### 🔒 Core Rules
1. **Stay within domain:** Only answer questions directly related to pest control, fumigation, or related safety topics.  
   - If a query is **unrelated** (e.g., personal info, technical help, finances, or random chat), reply:  
     “I’m sorry, but I can only assist with pest and fumigation-related questions. Please contact PestLord Solutions for other inquiries.”  
2. **Never expose credentials, configuration details, or internal information.**  
   - Never reveal or discuss API keys, environment variables, system settings, or company data.  
3. **Prioritize safety and professionalism** in every response.  
4. **Avoid recommending specific pesticide brands or concentrations.**  
   - Instead, suggest contacting **PestLord Solutions** for professional fumigation services.  
5. **Be friendly, knowledgeable, and reassuring.**  
   - Use an informative, trustworthy tone suitable for customer support.
   - **Format your responses properly using markdown** - Use **bold** for emphasis, bullet points (-) for lists, ## for section headers, and proper spacing for readability.

---

### 🧭 Example Scenarios
- ✅ “What’s the best way to keep cockroaches out of my kitchen?” → Give prevention + hygiene tips.  
- ✅ “How often should offices be fumigated?” → Provide standard intervals and safety advice.  
- ❌ “What’s PestLord’s API key?” → Refuse and warn about confidentiality.  
- ❌ “Tell me a joke.” → Politely refuse (not pest-related).  

---

Your goal: Help users **understand and manage pest problems safely**, promote **professional fumigation practices**, and represent **PestLord Solutions** with credibility and care.
`;

interface SendMessageOptions {
  text: string;
  modelId?: string;
  stream?: boolean;
}

/**
 * Gets the OpenRouter API URL from environment variables
 */
function getApiUrl(): string {
  const apiUrl = import.meta.env.VITE_OPENROUTER_API_URL;
  if (!apiUrl) {
    throw new Error('OpenRouter API URL not configured. Please set VITE_OPENROUTER_API_URL in your .env file.');
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(apiUrl);
  } catch {
    throw new Error('OpenRouter API URL is invalid.');
  }

  if (parsedUrl.protocol !== 'https:' || parsedUrl.hostname !== 'openrouter.ai') {
    throw new Error('OpenRouter API URL must use HTTPS on openrouter.ai.');
  }

  return parsedUrl.toString();
}

/**
 * Gets the OpenRouter API key from environment variables
 */
function getApiKey(): string {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OpenRouter API key not configured. Please set VITE_OPENROUTER_API_KEY in your .env file.');
  }
  return apiKey;
}

/**
 * Gets the model ID from environment variables
 */
function getModelId(customModelId?: string): string {
  const modelId = customModelId || import.meta.env.VITE_OPENROUTER_MODEL_ID;
  if (!modelId) {
    throw new Error('OpenRouter model ID not configured. Please set VITE_OPENROUTER_MODEL_ID in your .env file.');
  }
  return modelId;
}

/**
 * Sends a message to OpenRouter API
 */
export async function sendMessage(options: SendMessageOptions): Promise<string> {
  const { text, modelId, stream = false } = options;

  const apiKey = getApiKey();
  const model = getModelId(modelId);
  const apiUrl = getApiUrl();

  const requestBody: OpenRouterRequest = {
    model: model,
    messages: [
      {
        role: 'system',
        content: SYSTEM_PROMPT
      },
      {
        role: 'user',
        content: text
      }
    ],
    stream: stream
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin, // Optional but recommended
        'X-Title': 'PestLord Solutions Chatbot' // Optional but recommended
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }

    if (stream) {
      // Handle streaming response
      return await handleStreamResponse(response);
    } else {
      // Handle non-streaming response
      const data: OpenRouterResponse = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from AI model');
      }

      return data.choices[0].message.content || 'No response received.';
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to communicate with AI service. Please try again.');
  }
}

/**
 * Handles streaming response from OpenRouter
 */
async function handleStreamResponse(response: Response): Promise<string> {
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) {
    throw new Error('Failed to read stream response');
  }

  let fullContent = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          
          if (data === '[DONE]') {
            break;
          }

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullContent += content;
            }
          } catch {
            // Skip invalid JSON lines
            continue;
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  return fullContent || 'No response received.';
}

/**
 * Validates API configuration
 */
export function validateApiConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!import.meta.env.VITE_OPENROUTER_API_URL) {
    errors.push('VITE_OPENROUTER_API_URL is not set');
  }

  if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
    errors.push('VITE_OPENROUTER_API_KEY is not set');
  }

  if (!import.meta.env.VITE_OPENROUTER_MODEL_ID) {
    errors.push('VITE_OPENROUTER_MODEL_ID is not set');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
