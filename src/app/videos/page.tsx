"use client";

import { motion } from "framer-motion";
import { Play, Eye, Clock } from "lucide-react";
import { useState } from "react";

const categories = [
  "All",
  "Highlights",
  "Tournaments",
  "Behind the Scenes",
  "Tutorials",
];

const videos = [
  {
    id: "1",
    title: "Regional Finals Highlights - Zero Strikes vs Phoenix Gaming",
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    views: "125K",
    duration: "12:34",
    category: "Highlights",
    featured: true,
  },
  {
    id: "2",
    title: "PHOENIX Insane 1v4 Clutch - Must Watch!",
    thumbnail:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    views: "89K",
    duration: "5:22",
    category: "Highlights",
    featured: false,
  },
  {
    id: "3",
    title: "Zero Strikes Official Team Documentary",
    thumbnail:
      "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    views: "245K",
    duration: "25:18",
    category: "Behind the Scenes",
    featured: true,
  },
  {
    id: "4",
    title: "Winter Championship Grand Finals Full Match",
    thumbnail:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    views: "180K",
    duration: "45:22",
    category: "Tournaments",
    featured: false,
  },
  {
    id: "5",
    title: "Pro Tips: Movement Mechanics Explained by SHADOW",
    thumbnail:
      "https://images.unsplash.com/photo-1493711662062-fa541f7f58e5?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    views: "67K",
    duration: "15:45",
    category: "Tutorials",
    featured: false,
  },
];

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filteredVideos = videos.filter(
    (v) => selectedCategory === "All" || v.category === selectedCategory
  );

  const featuredVideos = videos.filter((v) => v.featured);

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
              Watch & Learn
            </span>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6">
              VIDEO <span className="gradient-text">GALLERY</span>
            </h1>

            <p className="text-xl text-muted-foreground font-heading">
              Highlights, tutorials, and behind-the-scenes content.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card gaming-border overflow-hidden cursor-pointer"
                onClick={() => setSelectedVideo(video.youtubeId)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                      <Play size={36} className="text-primary-foreground ml-1" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-display font-bold">
                    {video.title}
                  </h3>

                  <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye size={14} /> {video.views}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {video.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video.youtubeId)}
                className="glass-card gaming-border cursor-pointer"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full aspect-video object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {video.views} views
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              className="w-full h-full rounded-xl"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
