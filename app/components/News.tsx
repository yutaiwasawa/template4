"use client";

import { motion } from "framer-motion";

const news = [
  {
    date: "2024.02.28",
    category: "インサイト",
    title: "デジタルマーケティングにおけるAIの未来",
  },
  {
    date: "2024.02.15",
    category: "受賞",
    title: "グローバルマーケティング・エクセレンス賞を受賞",
  },
  {
    date: "2024.02.01",
    category: "企業情報",
    title: "渋谷にクリエイティブハブを新設",
  },
  {
    date: "2024.01.20",
    category: "イベント",
    title: "デジタルイノベーションサミット2024開催レポート",
  },
];

export function News() {
  return (
    <section id="news" className="py-32 bg-white">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <p className="text-purple-600 text-lg tracking-widest mb-4">NEWS</p>
          <h2 className="text-5xl text-gray-900 font-bold">
            最新情報
          </h2>
        </motion.div>

        <div className="space-y-6">
          {news.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="flex items-center gap-8 py-8 border-b border-gray-200 group-hover:border-purple-300 transition-colors">
                <span className="text-gray-500 text-sm tracking-wider">{item.date}</span>
                <span className="px-4 py-1 text-xs tracking-wider bg-purple-100 text-purple-600 rounded-full">
                  {item.category}
                </span>
                <h3 className="text-xl text-gray-900 group-hover:text-purple-600 transition-colors">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-medium hover:opacity-90 transition-opacity">
            ニュース一覧
          </button>
        </motion.div>
      </div>
    </section>
  );
}