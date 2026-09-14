import type { NextApiResponse } from 'next';
import { conversationService } from '@/services/conversationService';
import { ProcessUserInputPayload } from '@/types/conversation';
import { authenticateApiKey, NextApiRequestWithAgent } from '@/lib/auth';

const handler = async (
  req: NextApiRequestWithAgent,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    try {
      const { session_id, user_input }: ProcessUserInputPayload = req.body;
      const agent = req.agent!;

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
};

export default authenticateApiKey(handler);
