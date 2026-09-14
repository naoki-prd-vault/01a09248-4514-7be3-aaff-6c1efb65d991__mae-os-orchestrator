import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const SettingsPage: React.FC = () => {
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState('');
  const [llmApiKey, setLlmApiKey] = useState('');
  const [llmBaseUrl, setLlmBaseUrl] = useState('');
  const [llmModel, setLlmModel] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, these would be saved securely, e.g., to environment variables
    // or a secure configuration store. For this exercise, we'll just log them.
    console.log('Saving settings:');
    console.log('ElevenLabs API Key:', elevenLabsApiKey);
    console.log('LLM API Key:', llmApiKey);
    console.log('LLM Base URL:', llmBaseUrl);
    console.log('LLM Model:', llmModel);
    alert('Settings saved (check console for values)');
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Global Settings</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-semibold">ElevenLabs Configuration</legend>
          <div>
            <label htmlFor="elevenLabsApiKey" className="block text-sm font-medium text-gray-700">ElevenLabs API Key</label>
            <Input
              id="elevenLabsApiKey"
              type="password"
              value={elevenLabsApiKey}
              onChange={(e) => setElevenLabsApiKey(e.target.value)}
              placeholder="sk-..."
            />
          </div>
        </fieldset>

        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-semibold">LLM Configuration</legend>
          <div>
            <label htmlFor="llmApiKey" className="block text-sm font-medium text-gray-700">LLM API Key</label>
            <Input
              id="llmApiKey"
              type="password"
              value={llmApiKey}
              onChange={(e) => setLlmApiKey(e.target.value)}
              placeholder="sk-..."
            />
          </div>
          <div>
            <label htmlFor="llmBaseUrl" className="block text-sm font-medium text-gray-700">LLM Base URL</label>
            <Input
              id="llmBaseUrl"
              type="text"
              value={llmBaseUrl}
              onChange={(e) => setLlmBaseUrl(e.target.value)}
              placeholder="https://api.openai.com/v1"
            />
          </div>
          <div>
            <label htmlFor="llmModel" className="block text-sm font-medium text-gray-700">LLM Model</label>
            <Input
              id="llmModel"
              type="text"
              value={llmModel}
              onChange={(e) => setLlmModel(e.target.value)}
              placeholder="gpt-3.5-turbo"
            />
          </div>
        </fieldset>

        <Button type="submit">Save Settings</Button>
      </form>
    </MainLayout>
  );
};

export default SettingsPage;
