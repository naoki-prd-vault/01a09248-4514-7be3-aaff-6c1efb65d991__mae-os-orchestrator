import MainLayout from '@/components/layout/MainLayout';

export default function SettingsPage() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-lg">Global application settings will be configured here.</p>
        <p className="text-sm text-gray-600 mt-2">API Keys for ElevenLabs and LLMs should be managed securely via environment variables.</p>
      </div>
    </MainLayout>
  );
}
