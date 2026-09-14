import type { NextApiRequest, NextApiResponse } from 'next';
import { agentService } from '@/services/agentService';
import { UpdateAgentPayload } from '@/types/agent';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Agent ID is required' });
  }

  if (req.method === 'GET') {
    try {
      const agent = await agentService.getAgentById(id);
      if (!agent) {
        return res.status(404).json({ message: 'Agent not found' });
      }
      return res.status(200).json(agent);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const payload: UpdateAgentPayload = req.body;
      const updatedAgent = await agentService.updateAgent(id, payload);
      return res.status(200).json(updatedAgent);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await agentService.deleteAgent(id);
      return res.status(204).end();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
