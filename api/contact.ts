import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  const { fullName, email, company, message } = request.body || {};

  if (!fullName || !email || !company || !message) {
    response.status(400).json({ success: false, error: 'All fields are required' });
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USERNAME,
      to: process.env.SMTP_RECIPIENT,
      subject: `Inquiry from ${fullName} (${company})`,
      replyTo: email,
      text: `Full Name: ${fullName}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`,
    });

    response.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    response.status(500).json({ success: false, error: String(error) });
  }
}
