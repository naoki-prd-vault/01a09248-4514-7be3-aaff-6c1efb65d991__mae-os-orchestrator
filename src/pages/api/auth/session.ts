import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        return res.status(500).json({ message: error.message });
      }

      return res.status(200).json({ session });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
