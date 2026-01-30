"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-bg" />
      <div className="absolute inset-0 bg-grid opacity-10" />

      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card gaming-border p-8 md:p-16 text-center max-w-4xl mx-auto"
        >
          <div className="corner-decoration top-left" />
          <div className="corner-decoration top-right" />
          <div className="corner-decoration bottom-left" />
          <div className="corner-decoration bottom-right" />

          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm font-heading text-primary uppercase tracking-wider mb-6">
            Join the Community
          </span>

          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            READY TO <span className="gradient-text glow-text">JOIN US</span>?
          </h2>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-heading">
            Be part of the Zero Strikes family. Follow us on social media, join our
            Discord, and never miss a moment of the action.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button variant="hero" size="xl">
                Get in Touch
                <ArrowRight size={20} />
              </Button>
            </Link>

            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="glass" size="xl">
                Join Discord
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
