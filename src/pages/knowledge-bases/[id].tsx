import MainLayout from '@/components/layout/MainLayout';
import { KnowledgeBaseForm } from '@/components/knowledge-bases/KnowledgeBaseForm';
import { UpdateKnowledgeBasePayload, KnowledgeBase } from '@/types/knowledgeBase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function KnowledgeBaseDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchKnowledgeBase = async () => {
        try {
          const response = await fetch(`/api/knowledge-bases/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: KnowledgeBase = await response.json();
          setKnowledgeBase(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchKnowledgeBase();
    }
  }, [id]);

  const handleSubmit = async (data: UpdateKnowledgeBasePayload) => {
    try {
      const response = await fetch(`/api/knowledge-bases/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      alert('Knowledge Base updated successfully!');
      router.push('/knowledge-bases');
    } catch (error: any) {
      alert(`Failed to update knowledge base: ${error.message}`);
    }
  };

  if (loading) return <MainLayout><div>Loading knowledge base...</div></MainLayout>;
  if (error) return <MainLayout><div className="text-red-500">Error: {error}</div></MainLayout>;
  if (!knowledgeBase) return <MainLayout><div>Knowledge base not found.</div></MainLayout>;

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Edit Knowledge Base: {knowledgeBase.name}</h1>
      <KnowledgeBaseForm initialData={knowledgeBase} onSubmit={handleSubmit} isEdit />
    </MainLayout>
  );
}
