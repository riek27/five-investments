import { NextResponse } from 'next/server';
import { get, set } from '@vercel/global-config';

const defaultData = {
  hero: {}, intro: {}, pillars: {}, additionalAreas: {}, whyInvest: {},
  approach: {}, featuredProjects: {}, impact: {}, partnerReasons: {},
  opportunities: {}, faq: {}, callToAction: {}
};

export async function GET() {
  const data = await get('investments');
  return NextResponse.json(data || defaultData);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await set('investments', body);
  return NextResponse.json({ success: true });
}