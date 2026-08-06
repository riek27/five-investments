import { NextResponse } from 'next/server';
import { get, set } from '@vercel/global-config';

const defaultData = {
  hero: {}, about: {}, howWeWork: {}, callToAction: {}
};

export async function GET() {
  const data = await get('about');
  return NextResponse.json(data || defaultData);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await set('about', body);
  return NextResponse.json({ success: true });
}