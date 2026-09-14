import { Agent } from '@/types/agent';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || 'YOUR_ELEVENLABS_API_KEY';
const ELEVENLABS_BASE_URL = 'https://api.elevenlabs.io/v1';

export const elevenLabsService = {
  async generateVoice(text: string, agent: Agent): Promise<string> {
    if (!agent.persona_config || !(agent.persona_config as any).voice_id) {
      throw new Error('Agent persona_config or voice_id not found for ElevenLabs');
    }

    const voiceId = (agent.persona_config as any).voice_id;
    const modelId = (agent.persona_config as any).model_id || 'eleven_monolingual_v1';
    const voiceSettings = (agent.persona_config as any).voice_settings || { stability: 0.5, similarity_boost: 0.75 };

    const response = await fetch(`${ELEVENLABS_BASE_URL}/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: modelId,
          voice_settings: voiceSettings,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`ElevenLabs API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const audioBuffer = await response.arrayBuffer();
    // In a real application, you would upload this audioBuffer to a storage service (e.g., Supabase Storage)
    // and return the public URL. For now, we'll return a placeholder or base64 encode it.
    // For simplicity, returning a base64 encoded string for now.
    const base64Audio = Buffer.from(audioBuffer).toString('base64');
    return `data:audio/mpeg;base64,${base64Audio}`;
  },
};
