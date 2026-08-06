import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const defaultData = {
  hero: {}, intro: {}, legalDocs: {}, companyRegistrations: {},
  complianceStandards: {}, procurementStandards: {}, hseCommitment: {},
  corporateGovernance: {}, companyPolicies: {}, faq: {}, downloadCenter: {},
  contactVerification: {}
};

export async function GET() {
  const data = await kv.get('legal');
  return NextResponse.json(data || defaultData);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await kv.set('legal', body);
  return NextResponse.json({ success: true });
}