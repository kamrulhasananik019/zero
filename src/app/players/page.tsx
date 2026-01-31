"use client";

import { motion } from "framer-motion";
import { Twitter, Youtube, Twitch } from "lucide-react";

const players = [
  {
    id: "1",
    name: "PHOENIX",
    realName: "Marcus Chen",
    role: "Team Captain / Fragger",
    country: "Singapore",
    age: 22,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=800&fit=crop",
    bio: "The heart and soul of Zero Strikes. Phoenix leads by example with his aggressive playstyle and clutch performances.",
    stats: { kills: 15420, winRate: "94%", kd: "4.2", matches: 1250 },
    social: { twitter: "#", youtube: "#", twitch: "#" },
  },
  {
    id: "2",
    name: "SHADOW",
    realName: "Alex Rivera",
    role: "Entry Fragger",
    country: "Philippines",
    age: 20,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=800&fit=crop",
    bio: "Known for his lightning-fast reflexes and fearless entries. Shadow creates space for the team with his aggressive pushes.",
    stats: { kills: 12850, winRate: "91%", kd: "3.8", matches: 980 },
    social: { twitter: "#", youtube: "#", twitch: "#" },
  },
  {
    id: "3",
    name: "VIPER",
    realName: "James Wong",
    role: "Support / IGL",
    country: "Malaysia",
    age: 24,
    image: "https://images.unsplash.com/photo-1493711662062-fa541f7f58e5?w=600&h=800&fit=crop",
    bio: "The tactical mastermind behind Zero Strikes. Viper's game sense and callouts are unmatched in the competitive scene.",
    stats: { kills: 10200, winRate: "92%", kd: "3.5", matches: 1100 },
    social: { twitter: "#", youtube: "#", twitch: "#" },
  },
  {
    id: "4",
    name: "STORM",
    realName: "David Kim",
    role: "Sniper",
    country: "South Korea",
    age: 21,
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=800&fit=crop",
    bio: "The silent assassin. Storm's precision with long-range weapons has earned him the title of 'One Shot King'.",
    stats: { kills: 11800, winRate: "93%", kd: "4.0", matches: 890 },
    social: { twitter: "#", youtube: "#", twitch: "#" },
  },
  {
    id: "5",
    name: "BLAZE",
    realName: "Ryan Tanaka",
    role: "Rusher",
    country: "Japan",
    age: 19,
    image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=600&h=800&fit=crop",
    bio: "The youngest member with the hottest plays. Blaze brings explosive energy and unpredictable tactics to every match.",
    stats: { kills: 9500, winRate: "90%", kd: "3.3", matches: 720 },
    social: { twitter: "#", youtube: "#", twitch: "#" },
  },
];

export default function PlayersPage() {
  return (
    <>
      <section className="relative py-32 overflow-hidden hero-bg">
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm font-heading text-primary uppercase tracking-wider mb-6">
              Our Roster
            </span>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6">
              ELITE <span className="gradient-text">PLAYERS</span>
            </h1>

            <p className="text-xl text-muted-foreground font-heading">
              Meet the warriors who carry the Zero Strikes legacy into battle.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 0
                    ? "lg:flex-row"
                    : "lg:flex-row-reverse"
                } gap-8 items-center`}
              >
                <div className="w-full lg:w-1/3">
                  <div className="relative glass-card gaming-border overflow-hidden group">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={player.image}
                        alt={player.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-heading uppercase tracking-wider">
                        {player.role.split(" / ")[0]}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <a
                        href={player.social.twitter}
                        className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <Twitter size={18} />
                      </a>

                      <a
                        href={player.social.youtube}
                        className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <Youtube size={18} />
                      </a>

                      <a
                        href={player.social.twitch}
                        className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <Twitch size={18} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">
                    {player.name}
                  </h2>

                  <p className="text-lg text-muted-foreground font-heading mb-2">
                    {player.realName}
                  </p>

                  <p className="text-primary font-heading uppercase tracking-wider mb-6">
                    {player.role}
                  </p>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-muted-foreground mb-6">
                    <span>🌍 {player.country}</span>
                    <span>📅 Age {player.age}</span>
                  </div>

                  <p className="text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
                    {player.bio}
                  </p>

                  <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto lg:mx-0">
                    <div className="glass-card p-4 text-center">
                      <p className="text-2xl font-display font-bold text-primary">
                        {player.stats.kills.toLocaleString()}
                      </p>

                      <p className="text-xs text-muted-foreground uppercase">
                        Kills
                      </p>
                    </div>

                    <div className="glass-card p-4 text-center">
                      <p className="text-2xl font-display font-bold text-primary">
                        {player.stats.winRate}
                      </p>

                      <p className="text-xs text-muted-foreground uppercase">
                        Win Rate
                      </p>
                    </div>

                    <div className="glass-card p-4 text-center">
                      <p className="text-2xl font-display font-bold text-primary">
                        {player.stats.kd}
                      </p>

                      <p className="text-xs text-muted-foreground uppercase">
                        K/D
                      </p>
                    </div>

                    <div className="glass-card p-4 text-center">
                      <p className="text-2xl font-display font-bold text-primary">
                        {player.stats.matches}
                      </p>

                      <p className="text-xs text-muted-foreground uppercase">
                        Matches
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
