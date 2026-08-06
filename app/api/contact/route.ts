import { NextResponse } from 'next/server';
import { get, set } from '@vercel/global-config';

const defaultData = {
  hero: {}, contactInfo: {}, form: {}, map: {}, whyContactUs: {},
  responseCommitment: {}, faq: {}, gallery: {}, cta: {}, downloadProfile: {}
};

export async function GET() {
  const data = await get('contact-page');
  return NextResponse.json(data || defaultData);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await set('contact-page', body);
  return NextResponse.json({ success: true });
}