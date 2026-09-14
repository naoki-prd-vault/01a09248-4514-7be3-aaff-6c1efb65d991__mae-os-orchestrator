import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Agent, CreateAgentPayload, UpdateAgentPayload } from '@/types/agent';

interface AgentFormProps {
  initialData?: Agent;
  onSubmit: (data: CreateAgentPayload | UpdateAgentPayload) => void;
  isEdit?: boolean;
}

export const AgentForm: React.FC<AgentFormProps> = ({
  initialData,
  onSubmit,
  isEdit = false,
}) => {
  const [name, setName] = React.useState(initialData?.name || '');
  const [description, setDescription] = React.useState(initialData?.description || '');
  const [initialPrompt, setInitialPrompt] = React.useState(initialData?.initial_prompt || '');
  const [personaConfig, setPersonaConfig] = React.useState(JSON.stringify(initialData?.persona_config || {}, null, 2));
  const [status, setStatus] = React.useState(initialData?.status || 'draft');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedPersonaConfig = personaConfig ? JSON.parse(personaConfig) : {};
      const data = {
        name,
        description: description || null,
        initial_prompt: initialPrompt,
        persona_config: parsedPersonaConfig,
        ...(isEdit && { status }),
      };
      onSubmit(data);
    } catch (error) {
      alert('Invalid Persona Config JSON');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <Input
        id="name"
        label="Agent Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        id="description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="mb-4">
        <label htmlFor="initialPrompt" className="block text-gray-700 text-sm font-bold mb-2">
          Initial Prompt
        </label>
        <textarea
          id="initialPrompt"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={5}
          value={initialPrompt}
          onChange={(e) => setInitialPrompt(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="personaConfig" className="block text-gray-700 text-sm font-bold mb-2">
          Persona Configuration (JSON)
        </label>
        <textarea
          id="personaConfig"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={7}
          value={personaConfig}
          onChange={(e) => setPersonaConfig(e.target.value)}
        ></textarea>
      </div>
      {isEdit && (
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
            Status
          </label>
          <select
            id="status"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'active' | 'inactive' | 'draft')}
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      )}
      <Button type="submit">
        {isEdit ? 'Update Agent' : 'Create Agent'}
      </Button>
    </form>
  );
};
