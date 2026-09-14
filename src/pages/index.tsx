import MainLayout from '@/components/layout/MainLayout';
import Head from 'next/head';

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>Mae Voice Agent Orchestrator</title>
        <meta name="description" content="Mae Voice Agent Orchestrator Admin Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Agents</h2>
          <p className="text-3xl font-bold">5</p> {/* Placeholder */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Active Conversations</h2>
          <p className="text-3xl font-bold">12</p> {/* Placeholder */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Knowledge Bases</h2>
          <p className="text-3xl font-bold">3</p> {/* Placeholder */}
        </div>
      </div>
    </MainLayout>
  );
}
