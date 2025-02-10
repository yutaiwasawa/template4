"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ChevronRight, Users, Target, Sparkles } from "lucide-react";

export default function About() {
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
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80"
              alt="企業情報"
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
              {/* パンくずリスト */}
              <div className="flex items-center text-purple-100 mb-8">
                <Link href="/" className="hover:text-white transition-colors">
                  ホーム
                </Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span>企業情報</span>
              </div>
              
              <h1 className="text-5xl text-white font-bold mb-8">
                企業情報
              </h1>
              <p className="text-purple-100 text-lg max-w-2xl">
                デジタルマーケティングの力で、企業のブランド価値を高め、
                持続的な成長を実現するパートナーとして、お客様と共に歩んでいきます。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ミッション・ビジョン セクション */}
      <section className="py-24">
        <div className="container mx-auto px-8">
          <div className="space-y-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-8">
                <h2 className="text-purple-600 text-lg tracking-widest mb-2 font-outfit">MISSION</h2>
                <p className="text-gray-900">ミッション</p>
              </div>
              <p className="text-4xl text-gray-900 font-bold mb-8">デジタルで企業と顧客をつなぐ</p>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                最新のデジタルテクノロジーとマーケティング戦略を融合させ、
                企業と顧客の間に価値ある関係性を構築し、ビジネスの成長を加速させます。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-8">
                <h2 className="text-purple-600 text-lg tracking-widest mb-2 font-outfit">VISION</h2>
                <p className="text-gray-900">ビジョン</p>
              </div>
              <p className="text-4xl text-gray-900 font-bold mb-8">
                アジアNo.1の<br />デジタルマーケティングカンパニーへ
              </p>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                革新的なデジタルソリューションと確かな実績で、
                アジアを代表するデジタルマーケティングエージェンシーとして
                業界をリードしていきます。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 社長メッセージ セクション */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="mb-16">
            <h2 className="text-purple-600 text-lg tracking-widest mb-2 font-outfit text-center">MESSAGE</h2>
            <p className="text-4xl text-gray-900 font-bold mb-8 text-center">メッセージ</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-8">
                デジタルの力で、<br />
                ビジネスの未来を創造する
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                デジタル技術の進化により、企業と顧客のコミュニケーション方法は
                劇的に変化しています。この変化を機会と捉え、最新のテクノロジーと
                創造的なアイデアを組み合わせることで、クライアント企業の
                デジタルプレゼンスを強化し、持続的な成長を支援します。
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                私たちは、常に最先端のデジタルマーケティング手法を追求し、
                データドリブンなアプローチで確実な成果を生み出すことに
                こだわり続けています。クライアントの成功が私たちの成功であり、
                共に成長していける関係性を大切にしています。
              </p>
              <p className="mt-8 text-gray-900 font-bold">
                代表取締役社長 山﨑 貴史
              </p>
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
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"
                alt="代表取締役社長"
                className="relative rounded-2xl w-full aspect-[3/4] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* バリュー セクション */}
      <section className="py-24">
        <div className="container mx-auto px-8">
          <div className="mb-16">
            <h2 className="text-purple-600 text-lg tracking-widest mb-2 font-outfit text-center">VALUE</h2>
            <p className="text-gray-900 text-center">価値観</p>
          </div>
          <p className="text-4xl text-gray-900 font-bold mb-8 text-center">デジタルで企業と顧客をつなぐ</p>          
          

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center p-8"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Innovation First</h3>
              <p className="text-gray-600">
                常に最新のデジタルトレンドを追求し、
                革新的なソリューションを生み出します。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-8"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Data Driven</h3>
              <p className="text-gray-600">
                すべての意思決定をデータに基づいて行い、
                確実な成果を追求します。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center p-8"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Client Success</h3>
              <p className="text-gray-600">
                クライアントの成功にコミットし、
                長期的なパートナーシップを築きます。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 会社プロフィール セクション */}
      <section id="profile" className="py-24 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="mb-16">
            <h2 className="text-purple-600 text-lg tracking-widest mb-2 font-outfit text-center">COMPANY PROFILE</h2>
            <p className="text-4xl text-gray-900 font-bold mb-8 text-center">会社概要</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <dl className="space-y-6">
              <div className="flex py-4 border-b border-gray-200">
                <dt className="w-1/3 text-gray-600">会社名</dt>
                <dd className="w-2/3 text-gray-900">株式会社Creative Minds</dd>
              </div>
              <div className="flex py-4 border-b border-gray-200">
                <dt className="w-1/3 text-gray-600">所在地</dt>
                <dd className="w-2/3 text-gray-900">
                  〒150-0002<br />
                  東京都渋谷区渋谷2-1-1
                </dd>
              </div>
              <div className="flex py-4 border-b border-gray-200">
                <dt className="w-1/3 text-gray-600">設立</dt>
                <dd className="w-2/3 text-gray-900">2020年1月</dd>
              </div>
              <div className="flex py-4 border-b border-gray-200">
                <dt className="w-1/3 text-gray-600">資本金</dt>
                <dd className="w-2/3 text-gray-900">1億円</dd>
              </div>
              <div className="flex py-4 border-b border-gray-200">
                <dt className="w-1/3 text-gray-600">代表者</dt>
                <dd className="w-2/3 text-gray-900">代表取締役社長 山﨑 貴史</dd>
              </div>
              <div className="flex py-4 border-b border-gray-200">
                <dt className="w-1/3 text-gray-600">事業内容</dt>
                <dd className="w-2/3 text-gray-900">
                  デジタルマーケティング戦略立案・実行支援<br />
                  SNSマーケティング運用支援<br />
                  SEO/MEO対策支援<br />
                  Web広告運用支援<br />
                  コンテンツマーケティング支援<br />
                  マーケティングオートメーション導入支援<br />
                  デジタルブランディング支援
                </dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </section>

      {/* Google Map */}
      <section className="h-[400px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7479754683745!2d139.7005713!3d35.6585805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ca7c2087f63%3A0x6a0b997c84d3d147!2z5riL6LC35YWs5ZyS!5e0!3m2!1sja!2sjp!4v1647834456789!5m2!1sja!2sjp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <Footer />
    </motion.main>
  );
}