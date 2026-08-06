import { get } from '@vercel/global-config';
import HomePage from '@/components/sections/HomePage';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const data: any = await get('homepage');
  return <HomePage data={data} />;
}