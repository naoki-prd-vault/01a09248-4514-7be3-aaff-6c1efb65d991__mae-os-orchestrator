import { z } from 'zod';

export const createAgentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  initial_prompt: z.string().min(1, "Initial prompt is required"),
  persona_config: z.record(z.any()).optional(),
  owner_id: z.string().uuid().optional(),
});

export const updateAgentSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
  initial_prompt: z.string().min(1, "Initial prompt is required").optional(),
  persona_config: z.record(z.any()).optional(),
  status: z.enum(['active', 'inactive', 'draft']).optional(),
});
