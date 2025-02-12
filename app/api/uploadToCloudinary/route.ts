import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// Cloudinaryの設定
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();
    console.log('Received image URL:', imageUrl);

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    // NotionのURLから画像を取得してCloudinaryにアップロード
    const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
      folder: 'notion-images', // Cloudinaryでの保存フォルダ
      format: 'webp',
      transformation: [
        { width: 'auto', crop: 'scale' },
        { quality: 'auto' },
        { fetch_format: 'webp' }
      ]
    });

    console.log('Cloudinary upload response:', uploadResponse);

    return NextResponse.json({
      success: true,
      cloudinaryUrl: uploadResponse.secure_url
    });

  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json(
      { error: "Failed to upload image to Cloudinary" },
      { status: 500 }
    );
  }
}