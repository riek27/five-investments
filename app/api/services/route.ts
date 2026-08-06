import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const defaultData = {
  hero: {}, intro: {}, services: {}, industries: {}, whyUs: {},
  process: {}, faq: {}, callToAction: {}
};

export async function GET() {
  const data = await kv.get('services');
  return NextResponse.json(data || defaultData);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await kv.set('services', body);
  return NextResponse.json({ success: true });
}