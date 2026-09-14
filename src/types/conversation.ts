import { Json, Enums } from '@/types/db';

export interface Conversation {
  id: string;
  agent_id: string;
  client_user_id: string | null;
  status: Enums<'conversation_status_enum'>;
  context: Json;
  started_at: string;
  last_activity_at: string;
  ended_at: string | null;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender: Enums<'sender_enum'>;
  content: string;
  audio_url: string | null;
  timestamp: string;
}

export interface InitiateConversationPayload {
  agent_id: string;
  client_user_id?: string;
}

export interface ProcessUserInputPayload {
  session_id: string;
  user_input: string;
}

export interface ConversationResponse {
  text_response: string;
  audio_url?: string;
}
