"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    title: "デジタル戦略",
    description: "データに基づいた戦略で、デジタル領域でのブランドの成長を加速させます。",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
  },
  {
    title: "ブランド開発",
    description: "ターゲット層の心に響く、魅力的なブランドアイデンティティを創造します。",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80",
  },
  {
    title: "コンテンツ制作",
    description: "ブランドストーリーを伝え、意味のある関係性を構築するコンテンツを制作します。",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80",
  },
  {
    title: "パフォーマンスマーケティング",
    description: "測定可能なビジネス成長を実現する、結果重視のキャンペーンを展開します。",
    image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80",
  },
];

export function Service() {
  return (
    <section id="services" className="py-32 bg-white">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <p className="text-purple-600 text-lg tracking-widest mb-4 font-outfit">SERVICES</p>
          <h2 className="text-5xl text-gray-900 font-bold">
            デジタルプレゼンスを
            <br />
            変革する
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              {/* <Link href="/services"> */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent z-10" />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                    <h3 className="text-3xl text-white font-bold mb-4">{service.title}</h3>
                    <p className="text-purple-100 text-lg">{service.description}</p>
                  </div>
                </div>
              {/* </Link> */}
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
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
          >
            サービス詳細
          </Link>
        </motion.div>
      </div>
    </section>
  );
}