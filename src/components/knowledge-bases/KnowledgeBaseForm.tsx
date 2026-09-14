import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { KnowledgeBase, CreateKnowledgeBasePayload, UpdateKnowledgeBasePayload } from '@/types/knowledgeBase';
import { Enums } from '@/types/db';

interface KnowledgeBaseFormProps {
  initialData?: KnowledgeBase;
  onSubmit: (data: CreateKnowledgeBasePayload | UpdateKnowledgeBasePayload) => void;
  isEdit?: boolean;
}

export const KnowledgeBaseForm: React.FC<KnowledgeBaseFormProps> = ({
  initialData,
  onSubmit,
  isEdit = false,
}) => {
  const [name, setName] = React.useState(initialData?.name || '');
  const [description, setDescription] = React.useState(initialData?.description || '');
  const [contentType, setContentType] = React.useState<Enums<'content_type_enum'>>(initialData?.content_type || 'text');
  const [contentData, setContentData] = React.useState(initialData?.content_data || '');
  const [status, setStatus] = React.useState(initialData?.status || 'active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name,
      description: description || null,
      content_type: contentType,
      content_data: contentData,
      ...(isEdit && { status }),
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <Input
        id="name"
        label="Knowledge Base Name"
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
        <label htmlFor="contentType" className="block text-gray-700 text-sm font-bold mb-2">
          Content Type
        </label>
        <select
          id="contentType"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={contentType}
          onChange={(e) => setContentType(e.target.value as Enums<'content_type_enum'>)}
          required
        >
          <option value="text">Text</option>
          <option value="url">URL</option>
          <option value="document">Document</option>
          <option value="vector_id">Vector ID</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="contentData" className="block text-gray-700 text-sm font-bold mb-2">
          Content Data
        </label>
        <textarea
          id="contentData"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={7}
          value={contentData}
          onChange={(e) => setContentData(e.target.value)}
          required
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
            onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      )}
      <Button type="submit">
        {isEdit ? 'Update Knowledge Base' : 'Create Knowledge Base'}
      </Button>
    </form>
  );
};
