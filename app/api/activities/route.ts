import { NextResponse } from 'next/server';
import { get, set } from '@vercel/global-config';

const defaultData = {
  hero: {}, intro: {}, coreActivities: {}, process: {}, sectors: {},
  equipment: {}, principles: {}, gallery: {}, impact: {}, callToAction: {}
};

export async function GET() {
  const data = await get('activities');
  return NextResponse.json(data || defaultData);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await set('activities', body);
  return NextResponse.json({ success: true });
}