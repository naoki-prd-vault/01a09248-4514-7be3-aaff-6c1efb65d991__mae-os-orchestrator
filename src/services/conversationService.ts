import { db } from '@/services/db';
import { llmService } from '@/lib/llm';
import { elevenLabsService } from '@/lib/elevenlabs';
import { InitiateConversationPayload, ProcessUserInputPayload, ConversationResponse } from '@/types/conversation';
import { Agent } from '@/types/agent';
import { v4 as uuidv4 } from 'uuid';

const SUPABASE_STORAGE_BUCKET = 'voice-outputs'; // Define your Supabase storage bucket name

export const conversationService = {
  async initiateConversation(payload: InitiateConversationPayload): Promise<string> {
    const conversation = await db.insert('conversations', {
      agent_id: payload.agent_id,
      client_user_id: payload.client_user_id,
      context: {},
      status: 'active',
    });
    return conversation.id;
  },

  async processUserInput(
    payload: ProcessUserInputPayload,
    agent: Agent // Agent object passed from middleware/API route
  ): Promise<ConversationResponse> {
    const { session_id, user_input } = payload;

    // 1. Retrieve conversation context
    const conversation = await db.findOne('conversations', session_id);
    if (!conversation) {
      throw new Error('Conversation not found.');
    }

    // 2. Save user message
    await db.insert('messages', {
      conversation_id: session_id,
      sender: 'user',
      content: user_input,
    });

    // 3. Prepare prompt for LLM (simplified for now)
    // In a real scenario, this would involve:
    // - Fetching conversation history
    // - Integrating knowledge bases
    // - Detecting dynamic profiles
    const fullPrompt = `${agent.initial_prompt}\nUser: ${user_input}\nAgent:`;

    // 4. Get response from LLM
    const llmResponseText = await llmService.generateResponse(fullPrompt);

    // 5. Save agent message
    const agentMessage = await db.insert('messages', {
      conversation_id: session_id,
      sender: 'agent',
      content: llmResponseText,
    });

    // 6. Generate voice output
    let audioUrl: string | undefined;
    if (agent.persona_config && (agent.persona_config as any).voice_id) {
      try {
        const audioBuffer = await elevenLabsService.generateAudio(llmResponseText, {
          voice_id: (agent.persona_config as any).voice_id,
          model_id: (agent.persona_config as any).model_id,
          voice_settings: (agent.persona_config as any).voice_settings,
        });

        // Upload audio to Supabase Storage
        const fileName = `audio-${uuidv4()}.mp3`;
        const { data, error } = await db.supabase.storage
          .from(SUPABASE_STORAGE_BUCKET)
          .upload(fileName, audioBuffer, {
            contentType: 'audio/mpeg',
            upsert: false,
          });

        if (error) throw error;

        const { data: publicUrlData } = db.supabase.storage
          .from(SUPABASE_STORAGE_BUCKET)
          .getPublicUrl(fileName);

        audioUrl = publicUrlData.publicUrl;

        // Update agent message with audio URL
        await db.update('messages', agentMessage.id, { audio_url: audioUrl });
      } catch (error) {
        console.error('Error generating or uploading audio:', error);
        // Continue without audio if there's an error
      }
    }

    // 7. Update conversation last activity
    await db.update('conversations', session_id, { last_activity_at: new Date().toISOString() });

    return {
      text_response: llmResponseText,
      audio_url: audioUrl,
    };
  },
};
