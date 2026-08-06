import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate a unique filename to avoid collisions
  const timestamp = Date.now();
  const filename = `${timestamp}-${file.name}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  const filePath = path.join(uploadDir, filename);

  // Ensure the uploads directory exists (in dev it does, but safe to create)
  await writeFile(filePath, buffer);

  // Return the public URL
  const url = `/uploads/${filename}`;
  return NextResponse.json({ url });
}