import { NextApiRequest, NextApiResponse } from 'next';
import { knowledgeBaseService } from '@/services/knowledgeBaseService';
import { CreateKnowledgeBasePayload } from '@/types/knowledgeBase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const knowledgeBases = await knowledgeBaseService.getAllKnowledgeBases();
        return res.status(200).json(knowledgeBases);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    case 'POST':
      try {
        const payload: CreateKnowledgeBasePayload = req.body;
        const newKnowledgeBase = await knowledgeBaseService.createKnowledgeBase(payload);
        return res.status(201).json(newKnowledgeBase);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
