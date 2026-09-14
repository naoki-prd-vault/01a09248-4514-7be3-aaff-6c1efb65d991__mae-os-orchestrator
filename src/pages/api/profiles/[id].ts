import { NextApiRequest, NextApiResponse } from 'next';
import { profileService } from '@/services/profileService';
import { UpdateProfilePayload } from '@/types/profile';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid Profile ID' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const profile = await profileService.getProfileById(id);
        if (!profile) {
          return res.status(404).json({ message: 'Profile not found' });
        }
        return res.status(200).json(profile);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    case 'PUT':
      try {
        const payload: UpdateProfilePayload = req.body;
        const updatedProfile = await profileService.updateProfile(id, payload);
        return res.status(200).json(updatedProfile);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case 'DELETE':
      try {
        await profileService.deleteProfile(id);
        return res.status(204).end();
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
