import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { KnowledgeBaseForm } from '@/components/knowledge-bases/KnowledgeBaseForm';
import { CreateKnowledgeBasePayload } from '@/types/knowledgeBase';
import { useRouter } from 'next/router';

const NewKnowledgeBasePage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (payload: CreateKnowledgeBasePayload) => {
    try {
      const response = await fetch('/api/knowledge-bases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create knowledge base');
      }

      router.push('/knowledge-bases');
    } catch (error: any) {
      alert(`Failed to create knowledge base: ${error.message}`);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Create New Knowledge Base</h1>
      <KnowledgeBaseForm onSubmit={handleSubmit} />
    </MainLayout>
  );
};

export default NewKnowledgeBasePage;
