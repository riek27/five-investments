import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const defaultData = {
  hero: {}, about: {}, howWeWork: {}, callToAction: {}
};

export async function GET() {
  const data = await kv.get('about');
  return NextResponse.json(data || defaultData);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await kv.set('about', body);
  return NextResponse.json({ success: true });
}