import { createClient } from 'redis';
import HomePage from '@/components/sections/HomePage';

let redis: any;

async function getClient() {
  if (!redis) {
    redis = await createClient({ url: process.env.REDIS_URL }).connect();
  }
  return redis;
}

export const dynamic = 'force-dynamic';

export default async function Page() {
  const client = await getClient();
  const raw = await client.get('homepage');
  const data: any = raw ? JSON.parse(raw) : null;
  return <HomePage data={data} />;
}