import { z } from 'zod';

export const initiateConversationSchema = z.object({
  agent_id: z.string().uuid("Invalid agent ID format"),
  client_user_id: z.string().optional(),
});

export const processUserInputSchema = z.object({
  session_id: z.string().uuid("Invalid session ID format"),
  user_input: z.string().min(1, "User input cannot be empty"),
});
