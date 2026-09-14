import React, { useState, useEffect } from 'react';
import { DynamicProfile, CreateProfilePayload, UpdateProfilePayload } from '@/types/profile';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Agent } from '@/types/agent';

interface ProfileFormProps {
  initialData?: DynamicProfile;
  onSubmit: (data: CreateProfilePayload | UpdateProfilePayload) => void;
  isEdit?: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialData, onSubmit, isEdit = false }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [agentId, setAgentId] = useState(initialData?.agent_id || '');
  const [detectionRules, setDetectionRules] = useState(JSON.stringify(initialData?.detection_rules || {}, null, 2));
  const [profileSpecificPromptAddendum, setProfileSpecificPromptAddendum] = useState(initialData?.profile_specific_prompt_addendum || '');
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setAgentId(initialData.agent_id);
      setDetectionRules(JSON.stringify(initialData.detection_rules || {}, null, 2));
      setProfileSpecificPromptAddendum(initialData.profile_specific_prompt_addendum || '');
    }
  }, [initialData]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('/api/agents');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Agent[] = await response.json();
        setAgents(data);
      } catch (err) {
        console.error('Failed to fetch agents:', err);
      }
    };
    fetchAgents();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedDetectionRules = detectionRules ? JSON.parse(detectionRules) : null;
      const data: CreateProfilePayload | UpdateProfilePayload = {
        name,
        agent_id: agentId,
        detection_rules: parsedDetectionRules,
        profile_specific_prompt_addendum: profileSpecificPromptAddendum || null,
      };
      onSubmit(data);
    } catch (error) {
      alert('Invalid Detection Rules JSON');
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
        <label htmlFor="agentId" className="block text-sm font-medium text-gray-700">Agent</label>
        <select
          id="agentId"
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          required
        >
          <option value="">Select an Agent</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="detectionRules" className="block text-sm font-medium text-gray-700">Detection Rules (JSON)</label>
        <Textarea
          id="detectionRules"
          value={detectionRules}
          onChange={(e) => setDetectionRules(e.target.value)}
          rows={7}
        />
      </div>
      <div>
        <label htmlFor="profileSpecificPromptAddendum" className="block text-sm font-medium text-gray-700">Profile Specific Prompt Addendum</label>
        <Textarea
          id="profileSpecificPromptAddendum"
          value={profileSpecificPromptAddendum}
          onChange={(e) => setProfileSpecificPromptAddendum(e.target.value)}
          rows={5}
        />
      </div>
      <Button type="submit">{isEdit ? 'Update Profile' : 'Create Profile'}</Button>
    </form>
  );
};
