"use client";

import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Company } from "./components/Company";
import { Service } from "./components/Service";
import { Case } from "./components/Case";
import { News } from "./components/News";
import { Career } from "./components/Career";
import { Footer } from "./components/Footer";
import { Loading } from "./components/Loading";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <Loading />
      <Header />
      <Hero />
      <Company />
      <Service />
      <Case />
      <News />
      <Career />
      <Footer />
    </motion.main>
  );
}