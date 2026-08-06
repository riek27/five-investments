import { NextResponse } from 'next/server';
import { get, set } from '@vercel/global-config';

const defaultData = {
  hero: {}, intro: {}, services: {}, industries: {}, whyUs: {},
  process: {}, faq: {}, callToAction: {}
};

export async function GET() {
  const data = await get('services');
  return NextResponse.json(data || defaultData);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await set('services', body);
  return NextResponse.json({ success: true });
}