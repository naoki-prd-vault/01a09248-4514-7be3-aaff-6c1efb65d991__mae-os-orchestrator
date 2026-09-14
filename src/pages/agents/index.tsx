import MainLayout from '@/components/layout/MainLayout';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Agent } from '@/types/agent';

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('/api/agents');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Agent[] = await response.json();
        setAgents(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this agent?')) return;
    try {
      const response = await fetch(`/api/agents/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setAgents(agents.filter((agent) => agent.id !== id));
    } catch (err: any) {
      alert(`Failed to delete agent: ${err.message}`);
    }
  };

  if (loading) return <MainLayout><div>Loading agents...</div></MainLayout>;
  if (error) return <MainLayout><div className="text-red-500">Error: {error}</div></MainLayout>;

  const tableHeaders = ['Name', 'Status', 'API Key', 'Actions'];
  const tableData = agents.map((agent) => [
    agent.name,
    agent.status,
    agent.api_key,
    <div key={agent.id} className="flex space-x-2">
      <Link href={`/agents/${agent.id}`} passHref>
        <Button size="sm" variant="secondary">Edit</Button>
      </Link>
      <Button size="sm" variant="danger" onClick={() => handleDelete(agent.id)}>
        Delete
      </Button>
    </div>,
  ]);

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Agents</h1>
        <Link href="/agents/new" passHref>
          <Button>Create New Agent</Button>
        </Link>
      </div>
      {agents.length === 0 ? (
        <p>No agents found. Create one to get started!</p>
      ) : (
        <Table headers={tableHeaders} data={tableData} />
      )}
    </MainLayout>
  );
}
