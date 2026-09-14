import type { NextApiRequest, NextApiResponse } from 'next';
import { knowledgeBaseService } from '@/services/knowledgeBaseService';
import { CreateKnowledgeBasePayload } from '@/types/knowledgeBase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const knowledgeBases = await knowledgeBaseService.getAllKnowledgeBases();
      return res.status(200).json(knowledgeBases);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const payload: CreateKnowledgeBasePayload = req.body;
      const newKnowledgeBase = await knowledgeBaseService.createKnowledgeBase(payload);
      return res.status(201).json(newKnowledgeBase);
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
