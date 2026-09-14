import type { NextApiResponse } from 'next';
import { conversationService } from '@/services/conversationService';
import { InitiateConversationPayload } from '@/types/conversation';
import { authenticateApiKey, NextApiRequestWithAgent } from '@/lib/auth';

const handler = async (
  req: NextApiRequestWithAgent,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    try {
      const { client_user_id }: InitiateConversationPayload = req.body;
      const agent_id = req.agent!.id; // agent_id is derived from authenticated agent

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
};

export default authenticateApiKey(handler);

