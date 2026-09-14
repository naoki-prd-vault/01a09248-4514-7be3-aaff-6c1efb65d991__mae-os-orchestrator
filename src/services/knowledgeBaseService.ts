import { db } from './db';
import { CreateKnowledgeBasePayload, UpdateKnowledgeBasePayload, KnowledgeBase } from '@/types/knowledgeBase';
import { knowledgeBaseSchema, createKnowledgeBaseSchema, updateKnowledgeBaseSchema } from '@/schemas/knowledgeBaseSchema';

export const knowledgeBaseService = {
  async getAllKnowledgeBases(): Promise<KnowledgeBase[]> {
    const knowledgeBases = await db.findMany('knowledge_bases');
    return knowledgeBases as KnowledgeBase[];
  },

  async getKnowledgeBaseById(id: string): Promise<KnowledgeBase | null> {
    const knowledgeBase = await db.findOne('knowledge_bases', id);
    return knowledgeBase as KnowledgeBase | null;
  },

  async createKnowledgeBase(payload: CreateKnowledgeBasePayload): Promise<KnowledgeBase> {
    createKnowledgeBaseSchema.parse(payload);
    const knowledgeBase = await db.insert('knowledge_bases', payload);
    return knowledgeBase as KnowledgeBase;
  },

  async updateKnowledgeBase(id: string, payload: UpdateKnowledgeBasePayload): Promise<KnowledgeBase> {
    updateKnowledgeBaseSchema.parse(payload);
    const knowledgeBase = await db.update('knowledge_bases', id, payload);
    return knowledgeBase as KnowledgeBase;
  },

  async deleteKnowledgeBase(id: string): Promise<void> {
    await db.delete('knowledge_bases', id);
  },
};
