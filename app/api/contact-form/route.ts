import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

// Reads the recipient email from homepage.json (admin can change it)
function getRecipientEmail(): string {
  const dataPath = path.join(process.cwd(), 'data', 'homepage.json');
  if (fs.existsSync(dataPath)) {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    return data?.contact?.email || 'info@fiveinvestment-ss.com';
  }
  return 'info@fiveinvestment-ss.com';
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, organization, service, subject, details } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 });
    }

    const recipientEmail = getRecipientEmail();

    await resend.emails.send({
      from: 'onboarding@resend.dev',   // works instantly for testing
      to: recipientEmail,
      subject: subject || `New inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Organization:</strong> ${organization || '-'}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || '-'}</p>
        <p><strong>Service:</strong> ${service || '-'}</p>
        <p><strong>Subject:</strong> ${subject || '-'}</p>
        <p><strong>Message:</strong><br/>${details || '-'}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}