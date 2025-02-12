"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Work = {
  id: string;
  title: string;
  publishedAt: string;
  category?: string; // カテゴリーのslug
};

export default function Works() {
  const [currentCategory, setCurrentCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [works, setWorks] = useState<Work[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [categoriesRes, worksRes] = await Promise.all([
          fetch('/api/notion/categories'),
          fetch('/api/notion/works')
        ]);

        if (!categoriesRes.ok) throw new Error('Failed to fetch categories');
        if (!worksRes.ok) throw new Error('Failed to fetch works');

        const categoriesData = await categoriesRes.json();
        const worksData = await worksRes.json();

        console.log('Categories:', categoriesData); // デバッグ用
        console.log('Works:', worksData); // デバッグ用

        if (categoriesData.categories?.length > 0) {
          setCategories(categoriesData.categories);
        }
        if (worksData.works?.length > 0) {
          setWorks(worksData.works);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // カテゴリーでフィルタリングされた記事を取得
  const filteredWorks = currentCategory === "all"
    ? works
    : works.filter(work => work.category === currentCategory);

  // ページネーション
  const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);
  const currentWorks = filteredWorks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // カテゴリー名を取得する関数
  const getCategoryName = (slug: string | undefined) => {
    if (!slug) return "その他";
    const category = categories.find(cat => cat.slug === slug);
    return category?.name || "その他";
  };

  // エラー表示
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600">エラーが発生しました: {error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4 mx-auto"></div>
            <p className="text-gray-600">読み込み中...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
        <div className="relative h-[40vh] flex items-center">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
              alt="実績紹介"
              className="w-full h-full object-cover"
            />
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
                <span>実績紹介</span>
              </div>
              
              <h1 className="text-5xl text-white font-bold mb-8">
                実績紹介
              </h1>
              <p className="text-purple-100 text-lg max-w-2xl">
                私たちは、クライアントの課題に真摯に向き合い、
                最適なソリューションを提供してきました。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-3xl animate-blob" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full blur-3xl animate-blob animation-delay-4000" />
          </div>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          {/* カテゴリータブ */}
          <div className="mb-12">
            <div className="flex justify-center">
              <div className="inline-flex p-1 bg-white rounded-xl">
                <button
                  onClick={() => {
                    setCurrentCategory("all");
                    setCurrentPage(1);
                  }}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentCategory === "all"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  すべての記事
                </button>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setCurrentCategory(category.slug);
                      setCurrentPage(1);
                    }}
                    className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentCategory === category.slug
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "text-gray-600 hover:text-purple-600"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 実績一覧 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentWorks.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/works/${work.id}`}>
                  <div className="group cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-100 hover:border-purple-300 transition-all duration-300">
                    <div className="relative h-48">
                      <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-gray-500 text-sm">{work.publishedAt}</span>
                        <span className="px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded-full">
                          {getCategoryName(work.category)}
                        </span>
                      </div>
                      <h3 className="text-xl text-gray-900 font-bold group-hover:text-purple-600 transition-colors">
                        {work.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* ページネーション */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-[2.5rem] h-10 rounded-lg flex items-center justify-center transition-colors ${
                    currentPage === page
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
                      : "text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </motion.main>
  );
}