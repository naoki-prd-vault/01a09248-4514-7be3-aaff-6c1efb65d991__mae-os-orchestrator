import { db } from '@/services/db';
import { llmService } from '@/lib/llm';
import { elevenLabsService } from '@/lib/elevenlabs';
import { InitiateConversationPayload, ProcessUserInputPayload, ConversationResponse } from '@/types/conversation';
import { Agent } from '@/types/agent';
import { v4 as uuidv4 } from 'uuid';
import { knowledgeBaseService } from './knowledgeBaseService';
import { profileService } from './profileService';
import { Tables } from '@/types/db';
import { initiateConversationSchema, processUserInputSchema } from '@/schemas/conversationSchema';

const SUPABASE_STORAGE_BUCKET = 'voice-outputs'; // Define your Supabase storage bucket name

export const conversationService = {
  async initiateConversation(payload: InitiateConversationPayload): Promise<string> {
    initiateConversationSchema.parse(payload);
    const conversation = await db.insert('conversations', {
      agent_id: payload.agent_id,
      client_user_id: payload.client_user_id,
      context: {},
      status: 'active',
    });
    return conversation.id;
  },

  // Placeholder for dynamic profile detection
  async detectUserProfile(agent: Agent, conversationId: string, userInput: string): Promise<string> {
    // In a real implementation, this would involve:
    // 1. Fetching dynamic_profiles associated with the agent.
    // 2. Analyzing conversation history and user_input against detection_rules.
    // 3. Returning relevant profile_specific_prompt_addendum.
    // For now, return an empty string.
    return "";
  },

  // Placeholder for knowledge base integration
  async integrateKnowledgeBase(agent: Agent, userInput: string): Promise<string> {
    // In a real implementation, this would involve:
    // 1. Fetching agent_knowledge_bases for the agent.
    // 2. Querying knowledge bases based on user_input (e.g., RAG).
    // 3. Returning relevant context to be injected into the prompt.
    // For now, return an empty string.
    return "";
  },

  async processUserInput(
    payload: ProcessUserInputPayload,
    agent: Agent // Agent object passed from middleware/API route
  ): Promise<ConversationResponse> {
    processUserInputSchema.parse(payload);
    const { session_id, user_input } = payload;

    // 1. Retrieve conversation context and history
    const conversation = await db.findOne('conversations', session_id);
    if (!conversation) {
      throw new Error('Conversation not found.');
    }

    const messagesResult = await db.supabase
      .from('messages')
      .select('sender, content')
      .eq('conversation_id', session_id)
      .order('timestamp', { ascending: true });

    if (messagesResult.error) throw messagesResult.error;

    const conversationHistory = messagesResult.data.map(msg => `${msg.sender}: ${msg.content}`).join('\n') || '';

    // 2. Save user message
    await db.insert('messages', {
      conversation_id: session_id,
      sender: 'user',
      content: user_input,
    });

    // 3. Detect dynamic profiles and integrate knowledge bases
    const profileContext = await this.detectUserProfile(agent, session_id, user_input);
    const knowledgeBaseContext = await this.integrateKnowledgeBase(agent, user_input);

    // 4. Prepare prompt for LLM
    const fullPrompt = `${agent.initial_prompt}
${knowledgeBaseContext ? `Knowledge Base Context: ${knowledgeBaseContext}\n` : ''}
${profileContext ? `User Profile Context: ${profileContext}\n` : ''}
${conversationHistory}
User: ${user_input}
Agent:`;

    // 5. Get response from LLM
    const llmResponseText = await llmService.getCompletion(fullPrompt, agent);

    // 6. Save agent message
    const agentMessage = await db.insert('messages', {
      conversation_id: session_id,
      sender: 'agent',
      content: llmResponseText,
    });

    // 7. Generate voice output and upload to Supabase Storage
    let audioUrl: string | undefined;
    if (agent.persona_config && (agent.persona_config as any).voice_id) {
      try {
        const base64Audio = await elevenLabsService.generateVoice(llmResponseText, agent);
        // Extract base64 data and convert to ArrayBuffer
        const base64Data = base64Audio.split(',')[1];
        const audioBuffer = Buffer.from(base64Data, 'base64');

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

    // 8. Update conversation last activity
    await db.update('conversations', session_id, { last_activity_at: new Date().toISOString() });

    return {
      text_response: llmResponseText,
      audio_url: audioUrl,
    };
  },
};
