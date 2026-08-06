import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const defaultData = {
  hero: {}, intro: {}, coreActivities: {}, process: {}, sectors: {},
  equipment: {}, principles: {}, gallery: {}, impact: {}, callToAction: {}
};

export async function GET() {
  const data = await kv.get('activities');
  return NextResponse.json(data || defaultData);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await kv.set('activities', body);
  return NextResponse.json({ success: true });
}