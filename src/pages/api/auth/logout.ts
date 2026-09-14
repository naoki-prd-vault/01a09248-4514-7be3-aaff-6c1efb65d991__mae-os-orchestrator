import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return res.status(500).json({ message: error.message });
      }

      return res.status(200).json({ message: 'Signed out successfully' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
