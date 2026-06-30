import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    // TODO: Add email-sending logic here.
    return res.status(200).json({ message: 'Email sent successfully!' });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
