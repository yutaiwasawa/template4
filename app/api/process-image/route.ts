import { v2 as cloudinary } from 'cloudinary';
import crypto from 'crypto';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// URLからユニークなファイル名を生成する関数
function generateFileName(url: string): string {
  return crypto.createHash('md5').update(url).digest('hex');
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    // URLからファイル名部分を抽出
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/');
    const originalFileName = pathSegments[pathSegments.length - 1];
    
    // 検索用のファイル名を生成
    const fileName = originalFileName.split('.')[0];  // 拡張子を除去
    
    console.log('Searching for:', fileName);
    
    // 既存の画像を検索（検索条件を緩和）
    const searchResult = await cloudinary.search
      .expression(`public_id:${fileName}*`)  // ワイルドカード検索
      .max_results(1)
      .execute();

    if (searchResult.total_count > 0) {
      console.log('Found existing image:', searchResult.resources[0].public_id);
      return Response.json({ url: searchResult.resources[0].secure_url });
    }

    console.log('Uploading new image with ID:', fileName);
    const result = await cloudinary.uploader.upload(url, {
      format: 'webp',
      quality: 'auto',
      public_id: fileName,
      overwrite: false,  // 既存の画像を上書きしない
    });

    return Response.json({ url: result.secure_url });
  } catch (error) {
    console.error('Error details:', error);
    return Response.json({ error: 'Failed to process image' }, { status: 500 });
  }
} 