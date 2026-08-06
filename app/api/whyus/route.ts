import { NextResponse } from 'next/server';
import { get, set } from '@vercel/global-config';

const defaultData = {
  hero: {}, intro: {}, whyClients: {}, competitiveAdvantages: {},
  coreValues: {}, commitment: {}, industries: {}, clientSatisfaction: {},
  certifications: {}, motto: {}, callToAction: {}
};

export async function GET() {
  const data = await get('whyus');
  return NextResponse.json(data || defaultData);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await set('whyus', body);
  return NextResponse.json({ success: true });
}