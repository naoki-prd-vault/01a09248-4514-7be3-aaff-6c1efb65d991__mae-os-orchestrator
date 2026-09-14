import { NextApiRequest, NextApiResponse } from 'next';
import { profileService } from '@/services/profileService';
import { CreateProfilePayload } from '@/types/profile';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const profiles = await profileService.getAllProfiles();
        return res.status(200).json(profiles);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    case 'POST':
      try {
        const payload: CreateProfilePayload = req.body;
        const newProfile = await profileService.createProfile(payload);
        return res.status(201).json(newProfile);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
