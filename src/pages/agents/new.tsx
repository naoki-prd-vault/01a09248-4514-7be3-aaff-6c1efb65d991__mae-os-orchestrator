import MainLayout from '@/components/layout/MainLayout';
import { AgentForm } from '@/components/agents/AgentForm';
import { CreateAgentPayload } from '@/types/agent';
import { useRouter } from 'next/router';

export default function NewAgentPage() {
  const router = useRouter();

  const handleSubmit = async (data: CreateAgentPayload) => {
    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      alert('Agent created successfully!');
      router.push('/agents');
    } catch (error: any) {
      alert(`Failed to create agent: ${error.message}`);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Create New Agent</h1>
      <AgentForm onSubmit={handleSubmit} />
    </MainLayout>
  );
}
