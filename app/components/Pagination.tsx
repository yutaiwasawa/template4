import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: Props) {
  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <Link
        href={`/works?page=${Math.max(currentPage - 1, 1)}`}
        className={`p-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
        } transition-colors`}
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <Link
          key={page}
          href={`/works?page=${page}`}
          className={`min-w-[2.5rem] h-10 rounded-lg flex items-center justify-center transition-colors ${
            currentPage === page
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
              : "text-purple-600 hover:bg-purple-50"
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={`/works?page=${Math.min(currentPage + 1, totalPages)}`}
        className={`p-2 rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        } transition-colors`}
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </div>
  );
}