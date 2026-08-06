import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { get } from '@vercel/global-config';

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper: read the recipient email from the Global Config KV store
async function getRecipientEmail(): Promise<string> {
  const homepageData: any = await get('homepage');
  return homepageData?.contact?.email || 'info@fiveinvestment-ss.com';
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, organization, service, subject, details } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 });
    }

    const recipientEmail = await getRecipientEmail();

    await resend.emails.send({
      from: 'onboarding@resend.dev',   // change after domain verification
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