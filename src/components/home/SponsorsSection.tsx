"use client";

import { motion } from "framer-motion";

const sponsors = [
  {
    id: "1",
    name: "GameTech",
    logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=100&fit=crop",
    tier: "title",
  },
  {
    id: "2",
    name: "ProGear",
    logo: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=200&h=100&fit=crop",
    tier: "premium",
  },
  {
    id: "3",
    name: "EnergyDrink",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&h=100&fit=crop",
    tier: "premium",
  },
  {
    id: "4",
    name: "StreamPro",
    logo: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=200&h=100&fit=crop",
    tier: "partner",
  },
  {
    id: "5",
    name: "CloudHost",
    logo: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=100&fit=crop",
    tier: "partner",
  },
  {
    id: "6",
    name: "GamerSnacks",
    logo: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=200&h=100&fit=crop",
    tier: "partner",
  },
];

export function SponsorsSection() {
  return (
    <section className="py-24 bg-background-secondary relative">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm font-heading text-primary uppercase tracking-wider mb-4">
            Our Partners
          </span>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            PROUD <span className="gradient-text">SPONSORS</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto font-heading">
            Thanks to our amazing partners who support Zero Strikes on our journey
            to the top.
          </p>
        </motion.div>

        <div className="relative overflow-hidden py-8">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background-secondary to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background-secondary to-transparent z-10" />

          <motion.div
            className="flex gap-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <div
                key={`${sponsor.id}-${index}`}
                className="flex-shrink-0 w-48 h-24 glass-card gaming-border flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
