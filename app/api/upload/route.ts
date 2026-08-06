import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // Upload to Vercel Blob – returns a public URL
  const blob = await put(file.name, file, { access: 'public' });

  return NextResponse.json({ url: blob.url });
}