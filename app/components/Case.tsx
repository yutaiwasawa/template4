"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { SimplifiedCase } from "../../types/work";

const cases = [
  {
    id: "case1",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    date: "2024.04.15",
    category: "マーケティング",
    title: "SNSマーケティングで月間エンゲージメント200%増！化粧品ブランドの事例",
  },
  {
    id: "case2",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80",
    date: "2024.04.08",
    category: "ブランディング",
    title: "BtoBマーケティング戦略で受注率35%アップ！製造業の成功事例",
  },
  {
    id: "case3",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80",
    date: "2024.04.01",
    category: "採用戦略",
    title: "広告運用改善でCPA50%削減！アパレルECの実績報告",
  },
];

// propsでworksを受け取るように変更
export function Case({ works }: { works: SimplifiedCase[] }) {
  return (
    <section id="work" className="relative py-32 overflow-hidden">
      {/* 装飾的な背景 */}
      <div className="absolute inset-0 bg-purple-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-3xl animate-blob" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <p className="text-purple-600 text-lg tracking-widest mb-4 font-outfit">CASE</p>
          <h2 className="text-5xl text-gray-900 font-bold">
            成功事例
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* テスト用に実データとモックデータを併用 */}
          {works.length > 0 ? works.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Link href={`/works/${work.id}`}>
                <div className="group cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-100">
                  <div className="relative h-48">
                    <img
                      src={work.coverImage}
                      alt={work.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-gray-500 text-sm">{work.publishedAt}</span>
                      <span className="px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded-full">
                        {work.category.name}
                      </span>
                    </div>
                    <h3 className="text-xl text-gray-900 font-bold group-hover:text-purple-600 transition-colors">
                      {work.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          )) : (
            // データが取得できない場合は既存のモックデータを表示
            cases.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Link href={`/works/${item.id}`}>
                  <div className="group cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-100">
                    <div className="relative h-48">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-gray-500 text-sm">{item.date}</span>
                        <span className="px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-xl text-gray-900 font-bold group-hover:text-purple-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link href="/works" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-medium hover:opacity-90 transition-opacity">
            実績一覧
          </Link>
        </motion.div>
      </div>
      
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent mt-32" />
    </section>
  );
}