import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'services.json');

function readData() {
  if (!fs.existsSync(dataFilePath)) {
    const defaultData = {
      hero: {},
      intro: {},
      services: {},
      industries: {},
      whyUs: {},
      process: {},
      faq: {},
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
  try {
    const body = await request.json();
    writeData(body);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}