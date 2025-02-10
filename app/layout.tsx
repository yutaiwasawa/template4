import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_JP, Outfit } from 'next/font/google';

const notoSansJP = Noto_Sans_JP({ 
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
});

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Creative Minds',
  description: 'デジタルマーケティングエージェンシー',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} ${outfit.variable} font-sans`}>{children}</body>
    </html>
  );
}