import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Notionの署名付きURLから画像を取得
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch image from Notion' },
        { status: 500 }
      );
    }

    // 画像をArrayBufferとして取得
    const imageBuffer = await imageResponse.arrayBuffer();
    
    // BufferをBase64に変換
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const dataUri = `data:${imageResponse.headers.get('content-type')};base64,${base64Image}`;

    // Cloudinaryにアップロード
    const cloudinaryUrl = await uploadToCloudinary(dataUri);

    if (!cloudinaryUrl) {
      return NextResponse.json(
        { error: 'Failed to upload image to Cloudinary' },
        { status: 500 }
      );
    }

    return NextResponse.json({ cloudinaryUrl });
  } catch (error) {
    console.error('Error in uploadToCloudinary API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}