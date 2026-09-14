import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { DynamicProfile } from '@/types/profile';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';

const DynamicProfilesPage: React.FC = () => {
  const [profiles, setProfiles] = useState<DynamicProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('/api/profiles');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: DynamicProfile[] = await response.json();
        setProfiles(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this dynamic profile?')) return;

    try {
      const response = await fetch(`/api/profiles/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setProfiles(profiles.filter((profile) => profile.id !== id));
    } catch (err: any) {
      alert(`Failed to delete dynamic profile: ${err.message}`);
    }
  };

  if (loading) return <MainLayout><div>Loading dynamic profiles...</div></MainLayout>;
  if (error) return <MainLayout><div className="text-red-500">Error: {error}</div></MainLayout>;

  const tableData = profiles.map((profile) => [
    profile.name,
    profile.agent_id,
    <div key={profile.id} className="flex space-x-2">
      <Link href={`/profiles/${profile.id}`} passHref>
        <Button size="sm" variant="secondary">Edit</Button>
      </Link>
      <Button size="sm" variant="danger" onClick={() => handleDelete(profile.id)}>
        Delete
      </Button>
    </div>,
  ]);

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dynamic Profiles</h1>
        <Link href="/profiles/new" passHref>
          <Button>Create New Profile</Button>
        </Link>
      </div>
      {profiles.length === 0 ? (
        <p>No dynamic profiles found. Create one to get started!</p>
      ) : (
        <Table headers={['Name', 'Agent ID', 'Actions']} data={tableData} />
      )}
    </MainLayout>
  );
};

export default DynamicProfilesPage;
