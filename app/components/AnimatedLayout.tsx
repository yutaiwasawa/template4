"use client";

import { motion } from "framer-motion";
import { Loading } from "./Loading";

export function AnimatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Loading />
      {children}
    </motion.main>
  );
} 