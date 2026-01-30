"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Trophy, Users, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Trophy, value: "50+", label: "Tournaments Won" },
  { icon: Users, value: "1M+", label: "Followers" },
  { icon: Target, value: "95%", label: "Win Rate" },
  { icon: Zap, value: "5", label: "Pro Players" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-bg mt-20">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background " />

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: "-100%",
              right: "-100%",
            }}
            animate={{ x: ["0%", "200%"] }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-heading text-primary uppercase tracking-wider">
              Professional Free Fire Team
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6"
          >
            <span className="text-foreground">ZERO</span>
            <br />
            <span className="gradient-text glow-text">STRIKES</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl font-heading"
          >
            Dominating the Free Fire competitive scene. No errors. No mercy. Just
            victory.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link href="/players">
              <Button variant="hero" size="xl">
                Meet the Team
                <ArrowRight size={20} />
              </Button>
            </Link>

            <Link href="/videos">
              <Button variant="glass" size="xl">
                Watch Highlights
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.5 + index * 0.1,
                }}
                className="glass-card gaming-border p-6 text-center stat-glow"
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="text-3xl font-display font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground font-heading uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full hidden xl:block">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent" />

          <motion.div
            className="absolute top-1/4 right-20 w-64 h-64 border border-primary/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="absolute top-1/3 right-32 w-48 h-48 border border-primary/10 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </section>
  );
}
