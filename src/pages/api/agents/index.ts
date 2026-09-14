import type { NextApiRequest, NextApiResponse } from 'next';
import { agentService } from '@/services/agentService';
import { CreateAgentPayload } from '@/types/agent';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const agents = await agentService.getAllAgents();
      return res.status(200).json(agents);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const payload: CreateAgentPayload = req.body;
      const newAgent = await agentService.createAgent(payload);
      return res.status(201).json(newAgent);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
