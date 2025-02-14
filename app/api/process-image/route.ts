import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    // Cloudinaryで画像を処理
    const result = await cloudinary.uploader.upload(url, {
      format: 'webp',
      quality: 'auto',
    });

    return Response.json({ url: result.secure_url });
  } catch (error) {
    console.error('Error in process-image:', error);
    return Response.json({ error: 'Failed to process image' }, { status: 500 });
  }
} 