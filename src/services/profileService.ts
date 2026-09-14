import { db } from './db';
import { CreateProfilePayload, UpdateProfilePayload, DynamicProfile } from '@/types/profile';

export const profileService = {
  async getAllProfiles(): Promise<DynamicProfile[]> {
    const profiles = await db.findMany('dynamic_profiles');
    return profiles as DynamicProfile[];
  },

  async getProfileById(id: string): Promise<DynamicProfile | null> {
    const profile = await db.findOne('dynamic_profiles', id);
    return profile as DynamicProfile | null;
  },

  async createProfile(payload: CreateProfilePayload): Promise<DynamicProfile> {
    const profile = await db.insert('dynamic_profiles', payload);
    return profile as DynamicProfile;
  },

  async updateProfile(id: string, payload: UpdateProfilePayload): Promise<DynamicProfile> {
    const profile = await db.update('dynamic_profiles', id, payload);
    return profile as DynamicProfile;
  },

  async deleteProfile(id: string): Promise<void> {
    await db.delete('dynamic_profiles', id);
  },
};
