import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Company } from "./components/Company";
import { Service } from "./components/Service";
import { CaseServer } from "./components/CaseServer";
import { News } from "./components/News";
import { Career } from "./components/Career";
import { Footer } from "./components/Footer";
import { AnimatedLayout } from "./components/AnimatedLayout";

export default function Home() {
  return (
    <AnimatedLayout>
      <div className="min-h-screen bg-white">
        <Header />
        <Hero />
        <Company />
        <Service />
        <CaseServer />
        <News />
        <Career />
        <Footer />
      </div>
    </AnimatedLayout>
  );
}