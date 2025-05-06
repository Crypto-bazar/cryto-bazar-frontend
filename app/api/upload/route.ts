import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file received' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${uuidv4()}-${file.name}`;

  try {
    // Для локального сохранения
    const filePath = path.join(process.cwd(), 'public/uploads', filename);
    await writeFile(filePath, buffer);

    // Возвращаем URL изображения
    return NextResponse.json({
      success: true,
      url: `${filename}`,
    });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ error: 'Error saving file' }, { status: 500 });
  }
}
