import { NextResponse } from 'next/server';
import { createClient } from 'redis';

let redis: any;

async function getClient() {
  if (!redis) {
    redis = await createClient({ url: process.env.REDIS_URL }).connect();
  }
  return redis;
}

const defaultData = {
  hero: {}, about: {}, services: {}, whyUs: {}, team: {}, legal: {}, contact: {}
};

export async function GET() {
  const client = await getClient();
  const raw = await client.get('homepage');
  const data = raw ? JSON.parse(raw) : defaultData;
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const client = await getClient();
  await client.set('homepage', JSON.stringify(body));
  return NextResponse.json({ success: true });
}