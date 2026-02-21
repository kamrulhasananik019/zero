"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const players = [
  {
    id: "1",
    name: "PHOENIX",
    role: "Team Captain / Fragger",
     image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=600&h=800&fit=crop",
    stats: { kills: 15420, winRate: "94%", kd: "4.2" },
  },
  {
    id: "2",
    name: "SHADOW",
    role: "Entry Fragger",
    image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=600&h=800&fit=crop",
    stats: { kills: 12850, winRate: "91%", kd: "3.8" },
  },
  {
    id: "3",
    name: "VIPER",
    role: "Support / IGL",
   image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=600&h=800&fit=crop",
    stats: { kills: 10200, winRate: "92%", kd: "3.5" },
  },
  {
    id: "4",
    name: "STORM",
    role: "Sniper",
     image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=600&h=800&fit=crop",
    stats: { kills: 11800, winRate: "93%", kd: "4.0" },
  },
];

export function PlayersSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm font-heading text-primary uppercase tracking-wider mb-4">
            Our Roster
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            ELITE <span className="gradient-text">PLAYERS</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-heading">
            Meet the warriors who carry the Zero Strikes legacy into every battle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="player-card glass-card gaming-border group"
            >
              <div className="relative h-80 overflow-hidden rounded-t-xl">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-xs font-heading text-primary uppercase tracking-wider">
                    {player.role.split(" / ")[0]}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-display font-bold text-foreground mb-1">
                  {player.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 font-heading">
                  {player.role}
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <p className="text-lg font-display font-bold text-primary">
                      {player.stats.kills.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase">
                      Kills
                    </p>
                  </div>

                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <p className="text-lg font-display font-bold text-primary">
                      {player.stats.winRate}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase">
                      Win Rate
                    </p>
                  </div>

                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <p className="text-lg font-display font-bold text-primary">
                      {player.stats.kd}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase">
                      K/D
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/players">
            <Button variant="outline" size="lg">
              View All Players
              <ArrowRight size={18} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
