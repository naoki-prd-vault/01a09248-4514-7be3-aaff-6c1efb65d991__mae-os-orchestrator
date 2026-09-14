import React, { useState, useEffect } from 'react';
import { Agent, CreateAgentPayload, UpdateAgentPayload } from '@/types/agent';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

interface AgentFormProps {
  initialData?: Agent;
  onSubmit: (data: CreateAgentPayload | UpdateAgentPayload) => void;
  isEdit?: boolean;
}

export const AgentForm: React.FC<AgentFormProps> = ({ initialData, onSubmit, isEdit = false }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [initialPrompt, setInitialPrompt] = useState(initialData?.initial_prompt || '');
  const [personaConfig, setPersonaConfig] = useState(JSON.stringify(initialData?.persona_config || {}, null, 2));
  const [status, setStatus] = useState(initialData?.status || 'active');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || '');
      setInitialPrompt(initialData.initial_prompt);
      setPersonaConfig(JSON.stringify(initialData.persona_config || {}, null, 2));
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedPersonaConfig = personaConfig ? JSON.parse(personaConfig) : null;
      const data: CreateAgentPayload | UpdateAgentPayload = {
        name,
        description: description || null,
        initial_prompt: initialPrompt,
        persona_config: parsedPersonaConfig,
      };
      if (isEdit) {
        (data as UpdateAgentPayload).status = status as 'active' | 'inactive' | 'draft';
      }
      onSubmit(data);
    } catch (error) {
      alert('Invalid Persona Config JSON');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div>
        <label htmlFor="initialPrompt" className="block text-sm font-medium text-gray-700">Initial Prompt</label>
        <Textarea
          id="initialPrompt"
          value={initialPrompt}
          onChange={(e) => setInitialPrompt(e.target.value)}
          required
          rows={5}
        />
      </div>
      <div>
        <label htmlFor="personaConfig" className="block text-sm font-medium text-gray-700">Persona Config (JSON)</label>
        <Textarea
          id="personaConfig"
          value={personaConfig}
          onChange={(e) => setPersonaConfig(e.target.value)}
          rows={7}
        />
      </div>
      {isEdit && (
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      )}
      <Button type="submit">{isEdit ? 'Update Agent' : 'Create Agent'}</Button>
    </form>
  );
};
