import { db } from '@/services/db';
import { CreateAgentPayload, UpdateAgentPayload, Agent } from '@/types/agent';
import { createAgentSchema, updateAgentSchema } from '@/schemas/agentSchema';
import { v4 as uuidv4 } from 'uuid';

export const agentService = {
  async getAllAgents(): Promise<Agent[]> {
    const agents = await db.findMany('agents');
    return agents as Agent[];
  },

  async getAgentById(id: string): Promise<Agent | null> {
    const agent = await db.findOne('agents', id);
    return agent as Agent | null;
  },

  async getAgentByApiKey(apiKey: string): Promise<Agent | null> {
    const { data, error } = await db.supabase.from('agents').select('*').eq('api_key', apiKey).single();
    if (error) {
      if (error.code === 'PGRST116') return null; // No rows found
      throw error;
    }
    return data as Agent;
  },

  async createAgent(payload: CreateAgentPayload): Promise<Agent> {
    createAgentSchema.parse(payload);
    const newApiKey = uuidv4();
    const agent = await db.insert('agents', { ...payload, api_key: newApiKey });
    return agent as Agent;
  },

  async updateAgent(id: string, payload: UpdateAgentPayload): Promise<Agent> {
    updateAgentSchema.parse(payload);
    const agent = await db.update('agents', id, payload);
    return agent as Agent;
  },

  async deleteAgent(id: string): Promise<boolean> {
    return db.delete('agents', id);
  },
};
