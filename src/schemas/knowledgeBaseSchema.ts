import { z } from 'zod';

export const createKnowledgeBaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  content_type: z.enum(['text', 'url', 'document', 'vector_id'], { required_error: "Content type is required" }),
  content_data: z.string().min(1, "Content data is required"),
});

export const updateKnowledgeBaseSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
  content_type: z.enum(['text', 'url', 'document', 'vector_id']).optional(),
  content_data: z.string().min(1, "Content data is required").optional(),
  status: z.enum(['active', 'inactive']).optional(),
});
