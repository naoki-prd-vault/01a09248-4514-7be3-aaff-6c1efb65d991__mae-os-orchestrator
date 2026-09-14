import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { KnowledgeBase } from '@/types/knowledgeBase';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';

const KnowledgeBasesPage: React.FC = () => {
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKnowledgeBases = async () => {
      try {
        const response = await fetch('/api/knowledge-bases');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: KnowledgeBase[] = await response.json();
        setKnowledgeBases(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchKnowledgeBases();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this knowledge base?')) return;

    try {
      const response = await fetch(`/api/knowledge-bases/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setKnowledgeBases(knowledgeBases.filter((kb) => kb.id !== id));
    } catch (err: any) {
      alert(`Failed to delete knowledge base: ${err.message}`);
    }
  };

  if (loading) return <MainLayout><div>Loading knowledge bases...</div></MainLayout>;
  if (error) return <MainLayout><div className="text-red-500">Error: {error}</div></MainLayout>;

  const tableData = knowledgeBases.map((kb) => [
    kb.name,
    kb.content_type,
    kb.status,
    <div key={kb.id} className="flex space-x-2">
      <Link href={`/knowledge-bases/${kb.id}`} passHref>
        <Button size="sm" variant="secondary">Edit</Button>
      </Link>
      <Button size="sm" variant="danger" onClick={() => handleDelete(kb.id)}>
        Delete
      </Button>
    </div>,
  ]);

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Knowledge Bases</h1>
        <Link href="/knowledge-bases/new" passHref>
          <Button>Create New Knowledge Base</Button>
        </Link>
      </div>
      {knowledgeBases.length === 0 ? (
        <p>No knowledge bases found. Create one to get started!</p>
      ) : (
        <Table headers={['Name', 'Content Type', 'Status', 'Actions']} data={tableData} />
      )}
    </MainLayout>
  );
};

export default KnowledgeBasesPage;
