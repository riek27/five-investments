import { createClient } from 'redis';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const redis = await createClient({ url: process.env.REDIS_URL }).connect();

const files = {
  homepage: 'data/homepage.json',
  about: 'data/about.json',
  services: 'data/services.json',
  investments: 'data/investments.json',
  activities: 'data/activities.json',
  whyus: 'data/whyus.json',
  legal: 'data/legal.json',
  'contact-page': 'data/contact.json',
};

for (const [key, filePath] of Object.entries(files)) {
  const content = readFileSync(filePath, 'utf-8');
  await redis.set(key, content);
  console.log(`✅ Seeded: ${key}`);
}

console.log('All keys seeded successfully.');
await redis.disconnect();
process.exit(0);