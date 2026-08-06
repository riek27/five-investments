import { NextResponse } from 'next/server';
import { get, set } from '@vercel/global-config';

const defaultData = {
  hero: {}, intro: {}, legalDocs: {}, companyRegistrations: {},
  complianceStandards: {}, procurementStandards: {}, hseCommitment: {},
  corporateGovernance: {}, companyPolicies: {}, faq: {}, downloadCenter: {},
  contactVerification: {}
};

export async function GET() {
  const data = await get('legal');
  return NextResponse.json(data || defaultData);
}

export async function PUT(request: Request) {
  const body = await request.json();
  await set('legal', body);
  return NextResponse.json({ success: true });
}