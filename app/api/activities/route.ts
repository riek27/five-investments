import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'activities.json');

function readData() {
  if (!fs.existsSync(dataFilePath)) {
    const defaultData = {
      hero: {},
      intro: {},
      coreActivities: {},
      process: {},
      sectors: {},
      equipment: {},
      principles: {},
      gallery: {},
      impact: {},
      callToAction: {},
    };
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
  return JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
}

function writeData(data: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  return NextResponse.json(readData());
}

export async function PUT(request: Request) {
  const body = await request.json();
  writeData(body);
  return NextResponse.json({ success: true });
}