import HomePage from '@/components/sections/HomePage';
import { kv } from '@vercel/kv';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const data = await kv.get('homepage');
  return <HomePage data={data} />;
}