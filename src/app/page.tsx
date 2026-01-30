import { PlayersSection } from "@/components/home/PlayersSection";
import HeroSection  from "../components/home/HeroSection";
import { NewsSection } from "@/components/home/NewsSection";
import { VideosSection } from "@/components/home/VideosSection";
import { SponsorsSection } from "@/components/home/SponsorsSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
<>

<HeroSection />
<PlayersSection />
<NewsSection />
<VideosSection />
<SponsorsSection />
<CTASection />
</>
  );
}
