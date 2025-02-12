"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const menuItems = [
  { href: "#about", label: "企業情報" },
  { href: "#services", label: "サービス" },
  { href: "#work", label: "実績" },
  { href: "#news", label: "お知らせ" },
  { href: "#career", label: "採用情報" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // ヘッダーの高さ分を考慮
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed w-full z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent backdrop-blur-sm" />
      <div className="container mx-auto px-8 h-24 flex justify-between items-center relative z-10">
        <Link href="/" className="text-xl text-gray-900 font-bold tracking-widest">
          CREATIVE MINDS
        </Link>

        {/* デスクトップメニュー */}
        <nav className="hidden lg:flex items-center space-x-12">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          >
            お問い合わせ
          </Link>
        </nav>

        {/* モバイルメニューボタン */}
        <button
          className="lg:hidden text-gray-900 hover:text-purple-600 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* モバイルメニュー */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className={`lg:hidden overflow-hidden bg-white/95 backdrop-blur-sm ${isOpen ? "border-b border-gray-200" : ""}`}
      >
        <nav className="container mx-auto px-8 py-6 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="block text-gray-600 hover:text-gray-900 transition-colors py-2"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className="block px-6 py-3 bg-purple-600 text-white text-center rounded-full hover:bg-purple-700 transition-colors"
          >
            お問い合わせ
          </Link>
        </nav>
      </motion.div>
    </header>
  );
}