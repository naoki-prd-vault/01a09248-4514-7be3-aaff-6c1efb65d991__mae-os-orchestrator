import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { AgentForm } from '@/components/agents/AgentForm';
import { UpdateAgentPayload, Agent } from '@/types/agent';
import { useRouter } from 'next/router';

const EditAgentPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchAgent = async () => {
        try {
          const response = await fetch(`/api/agents/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: Agent = await response.json();
          setAgent(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchAgent();
    }
  }, [id]);

  const handleSubmit = async (payload: UpdateAgentPayload) => {
    try {
      const response = await fetch(`/api/agents/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update agent');
      }

      router.push('/agents');
    } catch (error: any) {
      alert(`Failed to update agent: ${error.message}`);
    }
  };

  if (loading) return <MainLayout><div>Loading agent...</div></MainLayout>;
  if (error) return <MainLayout><div className="text-red-500">Error: {error}</div></MainLayout>;
  if (!agent) return <MainLayout><div>Agent not found.</div></MainLayout>;

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Edit Agent: {agent.name}</h1>
      <AgentForm initialData={agent} onSubmit={handleSubmit} isEdit />
    </MainLayout>
  );
};

export default EditAgentPage;
