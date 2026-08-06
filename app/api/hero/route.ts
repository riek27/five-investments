import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'hero.json');

// Helper: read the current hero data
function readHeroData() {
  const fileContents = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(fileContents);
}

// Helper: write hero data to the JSON file
function writeHeroData(data: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    // If file doesn't exist, create it with default values
    if (!fs.existsSync(dataFilePath)) {
      writeHeroData({
        id: 1,
        tagline: '★ Under Promise & Over Deliver ★',
        heading: 'Building South Sudan\nThrough Investment & Innovation',
        subheading:
          'Five Investment Limited is a proudly South Sudanese-owned company delivering excellence in Construction, Procurement, Agriculture, Import/Export, and Light Agro-Industries across the nation.',
        backgroundImage: '/assets/five.jpg',
        stats: [
          { number: '11+', label: 'Years of Excellence' },
          { number: '5', label: 'Investment Pillars' },
          { number: '100%', label: 'Client Commitment' },
        ],
      });
    }
    const hero = readHeroData();
    return NextResponse.json(hero);
  } catch (error) {
    return NextResponse.json({ error: 'Could not load hero data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { tagline, heading, subheading, backgroundImage, stats } = body;
    const current = fs.existsSync(dataFilePath) ? readHeroData() : {};
    const updated = {
      ...current,
      id: 1,
      tagline,
      heading,
      subheading,
      backgroundImage,
      stats,
    };
    writeHeroData(updated);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}