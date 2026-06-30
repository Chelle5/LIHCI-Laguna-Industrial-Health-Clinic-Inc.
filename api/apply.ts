import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

function parseForm(request: VercelRequest) {
  const form = formidable({ multiples: false, keepExtensions: true });

  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    form.parse(request, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ fields, files });
    });
  });
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  let fields: formidable.Fields = {};
  let files: formidable.Files = {};

  try {
    ({ fields, files } = await parseForm(request));
  } catch (err) {
    response.status(400).json({ success: false, error: `Unable to parse form data: ${String(err)}` });
    return;
  }

  const firstName = String(fields.firstName || '');
  const middleName = String(fields.middleName || '');
  const lastName = String(fields.lastName || '');
  const age = String(fields.age || '');
  const gender = String(fields.gender || '');
  const civilStatus = String(fields.civilStatus || '');
  const position = String(fields.position || '');
  const email = String(fields.email || '');
  const contactNumber = String(fields.contactNumber || '');
  const address = String(fields.address || '');
  const city = String(fields.city || '');
  const state = String(fields.state || '');
  const zipCode = String(fields.zipCode || '');
  const notes = String(fields.notes || '');
  const rawWorkExperiences = fields.workExperiences;

  if (!firstName || !lastName || !position || !email || !contactNumber || !city || !state) {
    response.status(400).json({ success: false, error: 'All required fields must be provided.' });
    return;
  }

  const parsedWorkHistory = typeof rawWorkExperiences === 'string' ? JSON.parse(rawWorkExperiences as string) : Array.isArray(rawWorkExperiences) ? rawWorkExperiences : [];
  const workHistoryText = Array.isArray(parsedWorkHistory)
    ? parsedWorkHistory
        .map(
          (entry: any, index: number) =>
            `Work Experience ${index + 1}:\nPosition: ${entry.workPosition || 'N/A'}\nCompany: ${entry.companyName || 'N/A'}\nFrom: ${entry.serviceStart || 'N/A'}\nTo: ${entry.serviceEnd || 'N/A'}\nDescription: ${entry.jobDescription || 'N/A'}\n`,
        )
        .join('\n')
    : '';

  const attachments: any[] = [];
  const resume = files.resume as formidable.File | formidable.File[] | undefined;

  if (resume) {
    const file = Array.isArray(resume) ? resume[0] : resume;
    if (file && file.filepath && fs.existsSync(file.filepath)) {
      attachments.push({
        filename: file.originalFilename || 'resume',
        content: fs.createReadStream(file.filepath),
      });
    }
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USERNAME,
      to: process.env.SMTP_RECIPIENT,
      subject: `Job Application from ${firstName} ${lastName} - ${position}`,
      replyTo: email,
      text: `Applicant Information:\nName: ${firstName} ${middleName || ''} ${lastName}\nAge: ${age || 'N/A'}\nGender: ${gender || 'N/A'}\nCivil Status: ${civilStatus || 'N/A'}\nPosition: ${position}\nEmail: ${email}\nPhone: ${contactNumber}\nAddress: ${address || 'N/A'}\nCity: ${city}\nState: ${state}\nZip Code: ${zipCode || 'N/A'}\n\nNotes:\n${notes || 'N/A'}\n\n${workHistoryText}`,
      attachments,
    });

    response.status(200).json({ success: true, message: 'Application submitted successfully.' });
  } catch (error) {
    response.status(500).json({ success: false, error: String(error) });
  }
}
