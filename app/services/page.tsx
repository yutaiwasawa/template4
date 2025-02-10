"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ChevronRight, ArrowRight } from "lucide-react";

const services = [
  {
    id: "digital-strategy",
    title: "デジタル戦略",
    subtitle: "データドリブンな意思決定で成長を加速",
    description: "最新のデータ分析とマーケットリサーチに基づき、お客様のビジネス目標達成に向けた包括的なデジタル戦略を策定します。",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    points: [
      "市場分析とベンチマーキング",
      "KPI設定とパフォーマンス測定",
      "デジタルトランスフォーメーション戦略",
      "ROI最大化のための施策立案"
    ]
  },
  {
    id: "brand-development",
    title: "ブランド開発",
    subtitle: "独自の価値を市場に浸透させる",
    description: "ブランドの本質的な価値を見出し、競合との差別化を図りながら、顧客の心に響くブランドストーリーを構築します。",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80",
    points: [
      "ブランドアイデンティティ開発",
      "ビジュアルデザインシステム構築",
      "ブランドガイドライン作成",
      "社内外のブランド浸透施策"
    ]
  },
  {
    id: "content-creation",
    title: "コンテンツ制作",
    subtitle: "魅力的なストーリーで顧客を惹きつける",
    description: "戦略的なコンテンツマーケティングを通じて、ターゲット層との深い関係性を構築し、ブランドの価値を効果的に伝えます。",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80",
    points: [
      "コンテンツ戦略立案",
      "SNSコンテンツ制作",
      "動画・写真撮影",
      "編集・ライティング"
    ]
  },
  {
    id: "performance-marketing",
    title: "パフォーマンスマーケティング",
    subtitle: "データに基づく継続的な改善",
    description: "広告運用、SEO、CRO等を組み合わせた統合的なアプローチで、マーケティング活動の効果を最大化します。",
    image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80",
    points: [
      "広告運用最適化",
      "SEO/SEM戦略",
      "コンバージョン率改善",
      "アトリビューション分析"
    ]
  }
];

export default function Services() {
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
              alt="サービス"
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
                <span>サービス</span>
              </div>
              
              <h1 className="text-5xl text-white font-bold mb-8">
                サービス詳細
              </h1>
              <p className="text-purple-100 text-lg max-w-2xl">
                私たちは、お客様のビジネスの成長を支援するため、
                包括的なデジタルマーケティングソリューションを提供しています。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* サービス一覧 */}
      <section className="py-24">
        <div className="container mx-auto px-8">
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-16 items-center`}
              >
                <div className="flex-1 relative">
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-3xl opacity-20" />
                  </div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="relative rounded-2xl w-full aspect-[4/3] object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-purple-600 text-lg tracking-widest mb-4 font-outfit">
                    {service.subtitle}
                  </h3>
                  <h2 className="text-4xl text-gray-900 font-bold mb-6">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 text-lg mb-8">
                    {service.description}
                  </p>
                  <ul className="space-y-4">
                    {service.points.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4"
                      >
                        <ArrowRight className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl text-white font-bold mb-8">
              お客様のビジネスの成長を支援します
            </h2>
            <p className="text-purple-100 text-lg mb-12 max-w-2xl mx-auto">
              私たちのサービスについて、より詳しい情報をご希望の方は
              お気軽にお問い合わせください。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 rounded-full text-lg font-medium hover:bg-purple-50 transition-colors"
            >
              無料相談はこちら
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.main>
  );
}