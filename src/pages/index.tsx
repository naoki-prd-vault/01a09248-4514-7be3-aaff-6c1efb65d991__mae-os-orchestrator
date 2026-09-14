import MainLayout from '@/components/layout/MainLayout';
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p>Welcome to the Mae Voice Agent Orchestrator Administration Dashboard.</p>
      {/* Add dashboard content here */}
    </MainLayout>
  );
};

export default DashboardPage;
