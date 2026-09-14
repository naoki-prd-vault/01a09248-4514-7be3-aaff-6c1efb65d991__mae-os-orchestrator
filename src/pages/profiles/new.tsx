import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { ProfileForm } from '@/components/profiles/ProfileForm';
import { CreateProfilePayload } from '@/types/profile';
import { useRouter } from 'next/router';

const NewProfilePage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (payload: CreateProfilePayload) => {
    try {
      const response = await fetch('/api/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create profile');
      }

      router.push('/profiles');
    } catch (error: any) {
      alert(`Failed to create profile: ${error.message}`);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Create New Dynamic Profile</h1>
      <ProfileForm onSubmit={handleSubmit} />
    </MainLayout>
  );
};

export default NewProfilePage;
