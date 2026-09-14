import { NextApiRequest, NextApiResponse } from 'next';
import { agentService } from '@/services/agentService';
import { Agent } from '@/types/agent';

export type NextApiRequestWithAgent = NextApiRequest & { agent?: Agent };

export const authenticateApiKey = (handler: Function) => {
  return async (req: NextApiRequestWithAgent, res: NextApiResponse) => {
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
      return res.status(401).json({ message: 'API Key is required' });
    }

    const agent = await agentService.getAgentByApiKey(apiKey);

    if (!agent) {
      return res.status(403).json({ message: 'Invalid API Key' });
    }

    req.agent = agent;
    return handler(req, res);
  };
};
