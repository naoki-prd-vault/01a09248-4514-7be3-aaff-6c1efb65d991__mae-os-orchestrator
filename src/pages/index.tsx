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
      <h1 className="text-4xl font-bold">Welcome to Mae Voice Agent Orchestrator</h1>
      <p className="text-lg">Admin Dashboard</p>
    </MainLayout>
  );
}
