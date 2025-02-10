import { Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 py-20">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex-1">
            <h3 className="text-white text-xl font-bold mb-8">CREATIVE MINDS</h3>
            <p className="text-gray-400 leading-relaxed">
              〒150-0002
              <br />
              東京都渋谷区渋谷2-1-1
              <br />
              info@creativeminds.jp
            </p>
          </div>
          
          <div>
            <ul className="flex space-x-8">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">
                  会社概要
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">
                  サービス
                </Link>
              </li>
              <li>
                <Link href="/works" className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">
                  実績
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">
                  ニュース
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">
                  採用情報
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-500">&copy; 2024 Creative Minds. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}