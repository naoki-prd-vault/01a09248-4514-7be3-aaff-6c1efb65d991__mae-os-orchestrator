import React, { useState, useEffect } from 'react';
import { KnowledgeBase, CreateKnowledgeBasePayload, UpdateKnowledgeBasePayload } from '@/types/knowledgeBase';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

interface KnowledgeBaseFormProps {
  initialData?: KnowledgeBase;
  onSubmit: (data: CreateKnowledgeBasePayload | UpdateKnowledgeBasePayload) => void;
  isEdit?: boolean;
}

export const KnowledgeBaseForm: React.FC<KnowledgeBaseFormProps> = ({ initialData, onSubmit, isEdit = false }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [contentType, setContentType] = useState(initialData?.content_type || 'text');
  const [contentData, setContentData] = useState(initialData?.content_data || '');
  const [status, setStatus] = useState(initialData?.status || 'active');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || '');
      setContentType(initialData.content_type || 'text');
      setContentData(initialData.content_data || '');
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: CreateKnowledgeBasePayload | UpdateKnowledgeBasePayload = {
      name,
      description: description || null,
      content_type: contentType as 'text' | 'url' | 'document' | 'vector_id',
      content_data: contentData || null,
    };
    if (isEdit) {
      (data as UpdateKnowledgeBasePayload).status = status as 'active' | 'inactive';
    }
    onSubmit(data);
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
        <label htmlFor="contentType" className="block text-sm font-medium text-gray-700">Content Type</label>
        <select
          id="contentType"
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="text">Text</option>
          <option value="url">URL</option>
          <option value="document">Document</option>
          <option value="vector_id">Vector ID</option>
        </select>
      </div>
      <div>
        <label htmlFor="contentData" className="block text-sm font-medium text-gray-700">Content Data</label>
        <Textarea
          id="contentData"
          value={contentData}
          onChange={(e) => setContentData(e.target.value)}
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
          </select>
        </div>
      )}
      <Button type="submit">{isEdit ? 'Update Knowledge Base' : 'Create Knowledge Base'}</Button>
    </form>
  );
};
