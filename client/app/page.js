import Navbar from "@/components/Navbar";
import HeroSection from "./HeroSection";

export default function Home() {
  return (
    <section className="flex flex-col items-center h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50">
      <Navbar />
      <HeroSection />
    </section>
  );
}
