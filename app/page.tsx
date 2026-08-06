import HomePage from '@/components/sections/HomePage';

async function getHomepageData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/homepage`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
    return null;
  }
}

export default async function Page() {
  const data = await getHomepageData();
  return <HomePage data={data} />;
}