import type { NextApiRequest, NextApiResponse } from 'next';
import { conversationService } from '@/services/conversationService';
import { InitiateConversationPayload } from '@/types/conversation';
import { agentService } from '@/services/agentService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { agent_id, client_user_id }: InitiateConversationPayload = req.body;

      // In a real scenario, the agent_id would be derived from the API key
      // or explicitly passed and validated.
      // For now, we assume agent_id is provided in the body.
      if (!agent_id) {
        return res.status(400).json({ message: 'agent_id is required' });
      }

      const sessionId = await conversationService.initiateConversation({
        agent_id,
        client_user_id,
      });

      return res.status(200).json({ session_id: sessionId });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
