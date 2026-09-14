import type { NextApiRequest, NextApiResponse } from 'next';
import { conversationService } from '@/services/conversationService';
import { ProcessUserInputPayload } from '@/types/conversation';
import { agentService } from '@/services/agentService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { session_id, user_input }: ProcessUserInputPayload = req.body;
      const apiKey = req.headers.get('x-api-key');

      if (!apiKey) {
        return res.status(401).json({ message: 'API Key missing' });
      }

      const agent = await agentService.getAgentByApiKey(apiKey);

      if (!agent) {
        return res.status(403).json({ message: 'Invalid API Key' });
      }

      if (!session_id || !user_input) {
        return res.status(400).json({ message: 'session_id and user_input are required' });
      }

      const response = await conversationService.processUserInput(
        { session_id, user_input },
        agent
      );

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
