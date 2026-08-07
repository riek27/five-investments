import { NextResponse } from 'next/server';
import { createClient } from 'redis';

let redis: any;

async function getClient() {
  if (!redis) {
    redis = await createClient({ url: process.env.REDIS_URL }).connect();
  }
  return redis;
}

// Full default data including the new mining category under services
const defaultData: any = {
  hero: {},
  about: {},
  services: {
    mining: { title: 'Mining & Mineral', items: [] },        // ← NEW (appears first)
    construction: { title: 'Construction', items: [] },
    procurement: { title: 'Procurement', items: [] },
    agriculture: { title: 'Agriculture', items: [] },
    other: { title: 'Other', items: [] },
  },
  whyUs: {},
  team: {},
  legal: {},
  contact: {},
};

// Helper that deep‑merges missing keys from defaults into the actual data
function mergeDefaults(actual: any, defaults: any): any {
  if (!actual) return JSON.parse(JSON.stringify(defaults));
  const merged = JSON.parse(JSON.stringify(actual));
  for (const key of Object.keys(defaults)) {
    if (!(key in merged)) {
      merged[key] = JSON.parse(JSON.stringify(defaults[key]));
    } else if (
      typeof defaults[key] === 'object' &&
      defaults[key] !== null &&
      !Array.isArray(defaults[key])
    ) {
      merged[key] = mergeDefaults(merged[key], defaults[key]);
    }
  }
  return merged;
}

export async function GET() {
  const client = await getClient();
  const raw = await client.get('homepage');
  let data = raw ? JSON.parse(raw) : {};
  // Ensure any new category (like mining) is present
  data = mergeDefaults(data, defaultData);
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const client = await getClient();
  // Merge with defaults before saving so that any missing default sections are preserved
  const merged = mergeDefaults(body, defaultData);
  await client.set('homepage', JSON.stringify(merged));
  return NextResponse.json({ success: true });
}