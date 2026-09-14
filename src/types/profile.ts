import { Json } from '@/types/db';

export interface DynamicProfile {
  id: string;
  agent_id: string;
  name: string;
  detection_rules: Json | null;
  profile_specific_prompt_addendum: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateProfilePayload {
  agent_id: string;
  name: string;
  detection_rules?: Json;
  profile_specific_prompt_addendum?: string;
}

export interface UpdateProfilePayload {
  agent_id?: string;
  name?: string;
  detection_rules?: Json;
  profile_specific_prompt_addendum?: string;
}
