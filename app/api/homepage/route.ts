import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const defaultData = {
  hero: {}, about: {}, services: {}, whyUs: {}, team: {}, legal: {}, contact: {}
};

export async function GET() {
  const data = await kv.get('homepage');
  return NextResponse.json(data || defaultData);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await kv.set('homepage', body);
  return NextResponse.json({ success: true });
}