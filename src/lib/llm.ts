import { Agent } from '@/types/agent';

const LLM_API_KEY = process.env.LLM_API_KEY || 'YOUR_LLM_API_KEY';
const LLM_BASE_URL = process.env.LLM_BASE_URL || 'https://api.openai.com/v1'; // Default to OpenAI
const LLM_MODEL = process.env.LLM_MODEL || 'gpt-3.5-turbo';

export const llmService = {
  async getCompletion(prompt: string, agent: Agent): Promise<string> {
    // This is a basic implementation for an OpenAI-compatible API.
    // It can be extended to support other LLMs (Gemini, etc.) based on configuration.
    const response = await fetch(`${LLM_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LLM_API_KEY}`,
      },
      body: JSON.stringify({
        model: LLM_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`LLM API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  },
};
