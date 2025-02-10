import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Company } from "./components/Company";
import { Service } from "./components/Service";
import { Case } from "./components/Case";
import { News } from "./components/News";
import { Career } from "./components/Career";
import { Footer } from "./components/Footer";
import { Loading } from "./components/Loading";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Loading />
      <Header />
      <Hero />
      <Company />
      <Service />
      <Case />
      <News />
      <Career />
      <Footer />
    </main>
  );
}