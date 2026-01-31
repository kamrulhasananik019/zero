"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const sponsors = [
  {
    id: "1",
    name: "GameTech",
    tier: "Title Sponsor",
    description:
      "Leading gaming hardware manufacturer providing our team with cutting-edge equipment.",
    logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=200&fit=crop",
    website: "#",
  },
  {
    id: "2",
    name: "ProGear",
    tier: "Premium Partner",
    description:
      "Premium gaming peripherals brand known for precision and reliability.",
    logo: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=400&h=200&fit=crop",
    website: "#",
  },
  {
    id: "3",
    name: "EnergyDrink",
    tier: "Premium Partner",
    description:
      "The fuel that keeps our players performing at their best during intense matches.",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=200&fit=crop",
    website: "#",
  },
  {
    id: "4",
    name: "StreamPro",
    tier: "Official Partner",
    description:
      "Professional streaming solutions for content creators and esports teams.",
    logo: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=400&h=200&fit=crop",
    website: "#",
  },
  {
    id: "5",
    name: "CloudHost",
    tier: "Official Partner",
    description:
      "Reliable cloud hosting services powering our digital infrastructure.",
    logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=200&fit=crop",
    website: "#",
  },
  {
    id: "6",
    name: "GamerSnacks",
    tier: "Official Partner",
    description:
      "Healthy snacks designed for gamers, keeping our players energized.",
    logo: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=400&h=200&fit=crop",
    website: "#",
  },
];

const tiers = [
  { name: "Title Sponsor", color: "text-yellow-400" },
  { name: "Premium Partner", color: "text-primary" },
  { name: "Official Partner", color: "text-muted-foreground" },
];

export default function SponsorsPage() {
  return (
    <>
      <section className="relative py-32 overflow-hidden hero-bg">
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm font-heading text-primary uppercase tracking-wider mb-6">
              Our Partners
            </span>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6">
              PROUD <span className="gradient-text">SPONSORS</span>
            </h1>

            <p className="text-xl text-muted-foreground font-heading">
              We're grateful for the amazing partners who support Zero Strikes.
            </p>
          </motion.div>
        </div>
      </section>

      {tiers.map((tier, tierIndex) => {
        const tierSponsors = sponsors.filter(
          (s) => s.tier === tier.name
        );

        if (tierSponsors.length === 0) return null;

        return (
          <section
            key={tier.name}
            className={`py-16 ${
              tierIndex % 2 === 1 ? "bg-background-secondary" : ""
            }`}
          >
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2
                  className={`text-3xl font-display font-bold ${tier.color}`}
                >
                  {tier.name}
                </h2>

                <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent mt-4" />
              </motion.div>

              <div
                className={`grid gap-8 ${
                  tier.name === "Title Sponsor"
                    ? "grid-cols-1"
                    : tier.name === "Premium Partner"
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {tierSponsors.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card gaming-border overflow-hidden group"
                  >
                    <div
                      className={`relative ${
                        tier.name === "Title Sponsor"
                          ? "h-48"
                          : "h-40"
                      } bg-muted flex items-center justify-center overflow-hidden`}
                    >
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-display font-bold text-foreground">
                            {sponsor.name}
                          </h3>

                          <p
                            className={`text-sm font-heading uppercase tracking-wider ${tier.color} mt-1`}
                          >
                            {sponsor.tier}
                          </p>
                        </div>

                        <a
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
                        >
                          <ExternalLink
                            size={18}
                            className="text-muted-foreground hover:text-primary"
                          />
                        </a>
                      </div>

                      <p className="text-muted-foreground mt-4">
                        {sponsor.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card gaming-border p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              BECOME A <span className="gradient-text">PARTNER</span>
            </h2>

            <p className="text-muted-foreground mb-8">
              Interested in partnering with Zero Strikes? Let’s build
              something amazing together.
            </p>

            <Link href="/contact">
              <Button variant="gaming" size="lg">
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
