import { NextApiRequest, NextApiResponse } from 'next';
import { knowledgeBaseService } from '@/services/knowledgeBaseService';
import { UpdateKnowledgeBasePayload } from '@/types/knowledgeBase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid Knowledge Base ID' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const knowledgeBase = await knowledgeBaseService.getKnowledgeBaseById(id);
        if (!knowledgeBase) {
          return res.status(404).json({ message: 'Knowledge Base not found' });
        }
        return res.status(200).json(knowledgeBase);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    case 'PUT':
      try {
        const payload: UpdateKnowledgeBasePayload = req.body;
        const updatedKnowledgeBase = await knowledgeBaseService.updateKnowledgeBase(id, payload);
        return res.status(200).json(updatedKnowledgeBase);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case 'DELETE':
      try {
        await knowledgeBaseService.deleteKnowledgeBase(id);
        return res.status(204).end();
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
