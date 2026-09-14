import { Agent } from '@/types/agent';

export interface ElevenLabsTTSConfig {
  voice_id: string;
  model_id?: string;
  voice_settings?: {
    stability?: number;
    similarity_boost?: number;
    style?: number;
    use_speaker_boost?: boolean;
  };
}

export const elevenLabsService = {
  async generateAudio(
    text: string,
    config: ElevenLabsTTSConfig
  ): Promise<ArrayBuffer> {
    const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
    if (!ELEVENLABS_API_KEY) {
      throw new Error('ELEVENLABS_API_KEY is not set in environment variables.');
    }

    const { voice_id, model_id = 'eleven_multilingual_v2', voice_settings } = config;

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id,
          voice_settings,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`ElevenLabs API error: ${response.status} - ${errorData.detail || response.statusText}`);
    }

    return await response.arrayBuffer();
  },
};
