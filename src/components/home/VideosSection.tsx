"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const videos = [
  {
    id: "1",
    title: "Regional Finals Highlights - Zero Strikes vs Phoenix Gaming",
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    views: "125K",
    duration: "12:34",
  },
  {
    id: "2",
    title: "PHOENIX Insane 1v4 Clutch - Must Watch!",
    thumbnail:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    views: "89K",
    duration: "5:22",
  },
  {
    id: "3",
    title: "Zero Strikes Official Team Documentary",
    thumbnail:
      "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    views: "245K",
    duration: "25:18",
  },
];

export function VideosSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm font-heading text-primary uppercase tracking-wider mb-4">
            Featured Content
          </span>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            LATEST <span className="gradient-text">VIDEOS</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto font-heading">
            Watch our best plays, tournament highlights, and behind-the-scenes
            content.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card gaming-border overflow-hidden group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center glow-primary">
                    <Play
                      size={28}
                      className="text-primary-foreground ml-1"
                    />
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs font-heading text-white">
                  {video.duration}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-display font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>

                <p className="text-sm text-muted-foreground mt-2">
                  {video.views} views
                </p>
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
          <Link href="/videos">
            <Button variant="outline" size="lg">
              View All Videos
              <ArrowRight size={18} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
