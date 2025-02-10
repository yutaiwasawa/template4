"use client";

import { motion } from "framer-motion";

export function Company() {
  return (
    <section id="about" className="py-32 bg-white">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-purple-600 text-lg tracking-widest mb-4">ABOUT US</p>
            <h2 className="text-5xl text-gray-900 font-bold mb-8">
              クリエイティブな
              <br />
              イノベーターたち
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              私たちCreative Mindsは、データ駆動型の戦略とクリエイティブな発想を組み合わせ、
              卓越したデジタルマーケティングソリューションを提供しています。
              イノベーションへの情熱とデジタル領域への深い理解により、
              今日の競争の激しい市場でブランドの存在感を高めます。
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-medium hover:opacity-90 transition-opacity">
                私たちについて
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-3xl opacity-20" />
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80"
              alt="クリエイティブチームミーティング"
              className="relative rounded-2xl w-full aspect-[4/3] object-cover"
            />
          </motion.div>
        </div>
      </div>
      
      {/* セクション区切り線 */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent mt-32" />
    </section>
  );
}