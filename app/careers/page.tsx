"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ChevronRight, Briefcase, Users, Trophy } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// 募集職種データ
const positions = [
  {
    title: "デジタルマーケティングマネージャー",
    type: "正社員",
    location: "東京",
    description: "デジタルマーケティング戦略の立案から実行まで、包括的なプロジェクト管理をお任せします。",
    details: {
      responsibilities: [
        "クライアントのデジタルマーケティング戦略立案",
        "プロジェクトマネジメント",
        "チームマネジメント",
        "KPI設定と分析レポート作成",
      ],
      requirements: [
        "デジタルマーケティング経験3年以上",
        "チームマネジメント経験",
        "データ分析スキル",
      ],
      benefits: [
        "年収600万円〜1000万円",
        "フレックスタイム制",
        "リモートワーク可",
        "各種社会保険完備",
      ]
    }
  },
  {
    title: "Webアナリスト",
    type: "正社員",
    location: "東京",
    description: "データ分析とインサイト抽出により、クライアントのビジネス成長を支援します。",
    details: {
      responsibilities: [
        "Webサイトのアクセス解析",
        "改善提案の作成と実施",
        "レポーティング",
        "クライアントとの定期ミーティング",
      ],
      requirements: [
        "Google Analytics経験2年以上",
        "データビジュアライゼーションスキル",
        "コミュニケーション能力",
      ],
      benefits: [
        "年収450万円〜700万円",
        "フレックスタイム制",
        "リモートワーク可",
        "各種社会保険完備",
      ]
    }
  },
  {
    title: "SNSマーケティングスペシャリスト",
    type: "正社員",
    location: "東京",
    description: "SNSを活用したブランド構築とエンゲージメント向上を実現します。",
    details: {
      responsibilities: [
        "SNS戦略の立案と実行",
        "コンテンツ企画と制作管理",
        "コミュニティマネジメント",
        "効果測定と改善",
      ],
      requirements: [
        "SNSマーケティング経験2年以上",
        "コンテンツ制作スキル",
        "トレンド分析力",
      ],
      benefits: [
        "年収400万円〜600万円",
        "フレックスタイム制",
        "リモートワーク可",
        "各種社会保険完備",
      ]
    }
  }
];

export default function Careers() {
  const [selectedPosition, setSelectedPosition] = useState<typeof positions[0] | null>(null);

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
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
              alt="採用情報"
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
                <span>採用情報</span>
              </div>
              
              <h1 className="text-5xl text-white font-bold mb-8">
                採用情報
              </h1>
              <p className="text-purple-100 text-lg max-w-2xl">
                私たちと共に、デジタルマーケティングの未来を創造しませんか？
                意欲的な人材を募集しています。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 企業文化セクション */}
      <section className="py-24">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl text-gray-900 font-bold mb-8">
              私たちが大切にしている企業文化
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-purple-50 rounded-2xl flex items-center justify-center">
                <Briefcase className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">自律的な働き方</h3>
              <p className="text-gray-600">
                フレックスタイム制度やリモートワークなど、
                柔軟な働き方を推進しています。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-purple-50 rounded-2xl flex items-center justify-center">
                <Users className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">成長機会の提供</h3>
              <p className="text-gray-600">
                研修制度や資格取得支援など、
                キャリア開発をサポートします。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-purple-50 rounded-2xl flex items-center justify-center">
                <Trophy className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">実力主義</h3>
              <p className="text-gray-600">
                年齢や経験に関係なく、
                能力と実績を正当に評価します。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 募集職種セクション */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-white" />
        
        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl text-gray-900 font-bold mb-8">
              募集職種
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              私たちは常に、情熱を持ってデジタルマーケティングに
              取り組める仲間を探しています。
            </p>
          </motion.div>

          <div className="space-y-8">
            {positions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedPosition(position)}
              >
                <div className="p-8 bg-white rounded-2xl border border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{position.title}</h3>
                    <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                      {position.type}
                    </span>
                    <span className="text-gray-500">{position.location}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{position.description}</p>
                  <div className="flex items-center text-purple-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    詳細を見る
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 職種詳細ダイアログ */}
      <Dialog open={!!selectedPosition} onOpenChange={() => setSelectedPosition(null)}>
        <DialogContent className="max-w-2xl">
          {selectedPosition && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedPosition.title}</DialogTitle>
                <div className="flex items-center gap-4 mt-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                    {selectedPosition.type}
                  </span>
                  <span className="text-gray-500">{selectedPosition.location}</span>
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">主な業務内容</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {selectedPosition.details.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">応募要件</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {selectedPosition.details.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">待遇</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {selectedPosition.details.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <button className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-medium hover:opacity-90 transition-opacity">
                    応募する
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </motion.main>
  );
}