import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const defaultData = {
  hero: {}, contactInfo: {}, form: {}, map: {}, whyContactUs: {},
  responseCommitment: {}, faq: {}, gallery: {}, cta: {}, downloadProfile: {}
};

export async function GET() {
  const data = await kv.get('contact-page');
  return NextResponse.json(data || defaultData);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await kv.set('contact-page', body);
  return NextResponse.json({ success: true });
}