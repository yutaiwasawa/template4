"use client";

import Link from 'next/link';
import { motion } from "framer-motion";
import { SimplifiedCase } from '../../../types/work';
import { useProcessImage } from '../../../hooks/useProcessImage';

interface WorksListProps {
  works: SimplifiedCase[];
  currentPage: number;
  totalPages: number;
}

export default function WorksList({ works, currentPage, totalPages }: WorksListProps) {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-8">
        {works.map((work) => {
          const { processedUrl: coverImageUrl, isLoading } = useProcessImage(work.coverImage);
          
          return (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link href={`/works/${work.id}`}>
                <div className="group cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-100">
                  <div className="relative h-48">
                    {isLoading ? (
                      <div className="w-full h-full bg-gray-200 animate-pulse" />
                    ) : (
                      <img
                        src={coverImageUrl}
                        alt={work.title}
                        className="w-full h-full object-cover"
                      />
                    )}
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
          );
        })}
      </div>
      
      {/* ページネーション */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }).map((_, i) => (
          <Link
            key={i}
            href={`/works?page=${i + 1}`}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
} 