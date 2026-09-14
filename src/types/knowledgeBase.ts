import { Enums, Json } from '@/types/db';

export interface KnowledgeBase {
  id: string;
  name: string;
  description: string | null;
  content_type: Enums<'content_type_enum'> | null;
  content_data: string | null;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface CreateKnowledgeBasePayload {
  name: string;
  description?: string;
  content_type: Enums<'content_type_enum'>;
  content_data: string;
}

export interface UpdateKnowledgeBasePayload {
  name?: string;
  description?: string;
  content_type?: Enums<'content_type_enum'>;
  content_data?: string;
  status?: 'active' | 'inactive';
}
