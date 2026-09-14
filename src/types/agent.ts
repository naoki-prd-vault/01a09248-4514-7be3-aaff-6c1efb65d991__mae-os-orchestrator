import { Json } from '@/types/db';

export interface Agent {
  id: string;
  name: string;
  description: string | null;
  initial_prompt: string;
  persona_config: Json | null;
  status: 'active' | 'inactive' | 'draft';
  api_key: string;
  owner_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateAgentPayload {
  name: string;
  description?: string;
  initial_prompt: string;
  persona_config?: Json;
  owner_id?: string;
}

export interface UpdateAgentPayload {
  name?: string;
  description?: string;
  initial_prompt?: string;
  persona_config?: Json;
  status?: 'active' | 'inactive' | 'draft';
}
