import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const defaultData = {
  hero: {}, intro: {}, whyClients: {}, competitiveAdvantages: {},
  coreValues: {}, commitment: {}, industries: {}, clientSatisfaction: {},
  certifications: {}, motto: {}, callToAction: {}
};

export async function GET() {
  const data = await kv.get('whyus');
  return NextResponse.json(data || defaultData);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await kv.set('whyus', body);
  return NextResponse.json({ success: true });
}