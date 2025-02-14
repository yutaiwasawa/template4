'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { NotionBlocks } from "./components/NotionBlocks";  // パスを修正
import Image from "next/image";
import { useProcessImage } from '../../../hooks/useProcessImage';
import type { WorkDetailProps } from "../../../types/work";

export function WorkDetail({ currentCase, prevCase, nextCase }: WorkDetailProps) {

  const { processedUrl: coverImageUrl, isLoading } = useProcessImage(currentCase.coverImage || '');

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <Header />
      
      {/* ヒーローセクション */}
      <section className="relative pt-24">
        <div className="relative h-[50vh] flex items-center">
          <div className="absolute inset-0">
            {isLoading ? (
              <div className="w-full h-full bg-gray-200 animate-pulse rounded-2xl" />
            ) : (
              coverImageUrl && (
                <Image
                  src={coverImageUrl}
                  alt={currentCase.title}
                  className="w-full h-full object-cover"
                  width={1200}
                  height={630}
                />
              )
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/95 to-pink-600/90" />
          </div>
          
          <div className="container mx-auto px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center text-purple-100 mb-8">
                <Link href="/" className="hover:text-white transition-colors">
                  ホーム
                </Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <Link href="/works" className="hover:text-white transition-colors">
                  実績紹介
                </Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span>実績詳細</span>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-purple-200 text-lg">{currentCase.publishedAt}</span>
                <span className="px-4 py-1 bg-white/20 text-white rounded-full">
                  {currentCase.category.name}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-6">
                {currentCase.title}
              </h1>
              
              <p className="text-lg text-purple-100">
                {currentCase.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* コンテンツセクション */}
      <section className="py-24">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            {/* アイキャッチ画像 */}
            <div className="mb-16 rounded-2xl overflow-hidden">
              {isLoading ? (
                <div className="w-full h-full bg-gray-200 animate-pulse rounded-2xl" />
              ) : (
                coverImageUrl && (
                  <Image
                    src={coverImageUrl}
                    alt={currentCase.title}
                    width={1200}
                    height={630}
                    className="w-full aspect-video object-cover"
                  />
                )
              )}
            </div>

            {/* 基本情報 */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div>
                <h2 className="text-sm text-gray-500 mb-2">クライアント</h2>
                <p className="text-lg text-gray-900">{currentCase.client}</p>
              </div>
              <div>
                <h2 className="text-sm text-gray-500 mb-2">支援期間</h2>
                <p className="text-lg text-gray-900">{currentCase.period}</p>
              </div>
            </div>

            {/* 課題 */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">課題</h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {currentCase.challenge}
              </div>
            </div>

            {/* 解決策 */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">解決策</h2>
              <ul className="space-y-4">
                {currentCase.solution.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 成果 */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">成果</h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {currentCase.result}
              </div>
            </div>

            {/* Notionブロック */}
            {currentCase.blocks && <NotionBlocks blocks={currentCase.blocks} />}

            {/* ページネーション */}
            <div className="flex items-center pt-8 border-t border-gray-200">
              <div className="flex-1">
                {prevCase ? (
                  <Link href={`/works/${prevCase.id}`}>
                    <span>←前の記事: {prevCase.title}</span>
                  </Link>
                ) : (
                  <span>前の記事なし</span>
                )}
              </div>
              <div className="flex-1 text-center">
                <Link
                  href="/works"
                  className="text-purple-600 hover:text-purple-700 transition-colors"
                >
                  実績一覧に戻る
                </Link>
              </div>
              <div className="flex-1 text-right">
                {nextCase ? (
                  <Link href={`/works/${nextCase.id}`}>
                    <span>次の記事: {nextCase.title}→</span>
                  </Link>
                ) : (
                  <span>次の記事なし</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </motion.main>
  );
}