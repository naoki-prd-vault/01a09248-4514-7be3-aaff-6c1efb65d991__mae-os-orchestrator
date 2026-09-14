import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { ProfileForm } from '@/components/profiles/ProfileForm';
import { UpdateProfilePayload, DynamicProfile } from '@/types/profile';
import { useRouter } from 'next/router';

const EditProfilePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState<DynamicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`/api/profiles/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: DynamicProfile = await response.json();
          setProfile(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [id]);

  const handleSubmit = async (payload: UpdateProfilePayload) => {
    try {
      const response = await fetch(`/api/profiles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      router.push('/profiles');
    } catch (error: any) {
      alert(`Failed to update profile: ${error.message}`);
    }
  };

  if (loading) return <MainLayout><div>Loading profile...</div></MainLayout>;
  if (error) return <MainLayout><div className="text-red-500">Error: {error}</div></MainLayout>;
  if (!profile) return <MainLayout><div>Profile not found.</div></MainLayout>;

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Edit Dynamic Profile: {profile.name}</h1>
      <ProfileForm initialData={profile} onSubmit={handleSubmit} isEdit />
    </MainLayout>
  );
};

export default EditProfilePage;
