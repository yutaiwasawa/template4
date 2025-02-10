"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Career() {
  return (
    <section id="career" className="relative">
      {/* ヘッダー部分 */}
      <div className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80"
            alt="オフィス"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/95 to-pink-600/90" />
        </div>
        
        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-purple-200 text-lg tracking-widest mb-4 font-outfit">CAREER</p>
            <h2 className="text-5xl text-white font-bold mb-8">
              私たちと一緒に
              <br />
              働くメンバーを探しています。
            </h2>
            <p className="text-purple-100 text-lg max-w-2xl">
              私たちはミッション、価値観への共感を何よりも大切に考え、一緒に働くメンバーを探しています。
              ご興味をお持ちの方は、こちらから情報をご覧いただけます。
            </p>
          </motion.div>
        </div>
      </div>

      {/* リンクセクション */}
      <div className="container mx-auto px-8 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-24 relative">
            {/* 採用について */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-2xl text-gray-900 font-bold mb-6">採用について</h3>
              <p className="text-gray-600 mb-8">
                チームのビジョンに共感し、共に前進できる仲間を探しています。一緒に働いてみませんか？
              </p>
              <Link
                href="/careers"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:opacity-90 transition-opacity"
              >
                <span className="text-lg">採用情報はこちら</span>
                <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            {/* 区切り線 */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-200 to-transparent -translate-x-1/2" />

            {/* お問い合わせ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-2xl text-gray-900 font-bold mb-6">お問い合わせ</h3>
              <p className="text-gray-600 mb-8">
                サービスに関するご質問や、取材・パートナーシップのご相談などはこちらからお気軽にご連絡ください。
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:opacity-90 transition-opacity"
              >
                <span className="text-lg">お問い合わせはこちら</span>
                <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}