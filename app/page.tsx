import { TopBar } from "@/components/shared/top-bar";
import { Footer } from "@/components/shared/footer";
import { Hero } from "@/components/sections/hero";
import { Categories } from "@/components/sections/categories";
import { HowItWorks } from "@/components/sections/how-it-works";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar initialSession={session} />
      
      <main className="flex-1">
        <Hero />
        <Categories />
        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}
