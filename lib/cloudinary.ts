import cloudinary from 'cloudinary';

// Cloudinaryの設定
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(dataUri: string) {
  try {
    // 画像をアップロードしてWebPに変換
    const result = await cloudinary.v2.uploader.upload(dataUri, {
      format: 'webp',
      transformation: [
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });

    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return null;
  }
}