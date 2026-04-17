import { TopBar } from "@/components/shared/top-bar";
import { Footer } from "@/components/shared/footer";
import { Hero } from "@/components/sections/hero";
import { Categories } from "@/components/sections/categories";
import { HowItWorks } from "@/components/sections/how-it-works";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />
      
      <main className="flex-1">
        <Hero />
        <Categories />
        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}
