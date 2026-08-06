import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'about.json');

function readData() {
  if (!fs.existsSync(dataFilePath)) {
    const defaultData = {
      hero: {},
      about: {},
      howWeWork: {},
      callToAction: {}
    };
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
  const raw = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(raw);
}

function writeData(data: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const body = await request.json();
  writeData(body);
  return NextResponse.json({ success: true });
}