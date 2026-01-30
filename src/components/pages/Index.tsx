import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { PlayersSection } from "@/components/home/PlayersSection";
import { NewsSection } from "@/components/home/NewsSection";
import { VideosSection } from "@/components/home/VideosSection";
import { SponsorsSection } from "@/components/home/SponsorsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <PlayersSection />
      <NewsSection />
      <VideosSection />
      <SponsorsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
