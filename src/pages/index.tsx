import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Mae Voice Agent Orchestrator</title>
        <meta name="description" content="Mae Voice Agent Orchestrator Admin Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">Welcome to Mae Voice Agent Orchestrator</h1>
        <p className="text-lg">Admin Dashboard</p>
      </main>
    </>
  );
}
