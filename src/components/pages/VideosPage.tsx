import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Play, Eye, Clock } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Highlights", "Tournaments", "Behind the Scenes", "Tutorials"];

const videos = [
  {
    id: "1",
    title: "Regional Finals Highlights - Zero Strikes vs Phoenix Gaming",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    views: "125K",
    duration: "12:34",
    category: "Highlights",
    featured: true,
  },
  {
    id: "2",
    title: "PHOENIX Insane 1v4 Clutch - Must Watch!",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    views: "89K",
    duration: "5:22",
    category: "Highlights",
    featured: false,
  },
  {
    id: "3",
    title: "Zero Strikes Official Team Documentary",
    thumbnail: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    views: "245K",
    duration: "25:18",
    category: "Behind the Scenes",
    featured: true,
  },
  {
    id: "4",
    title: "Winter Championship Grand Finals Full Match",
    thumbnail: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    views: "180K",
    duration: "45:22",
    category: "Tournaments",
    featured: false,
  },
  {
    id: "5",
    title: "Pro Tips: Movement Mechanics Explained by SHADOW",
    thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541f7f58e5?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    views: "67K",
    duration: "15:45",
    category: "Tutorials",
    featured: false,
  },
  {
    id: "6",
    title: "Gaming House Tour 2025",
    thumbnail: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    views: "156K",
    duration: "18:30",
    category: "Behind the Scenes",
    featured: false,
  },
  {
    id: "7",
    title: "STORM's Sniper Compilation - Best Shots of 2024",
    thumbnail: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    views: "95K",
    duration: "8:15",
    category: "Highlights",
    featured: false,
  },
  {
    id: "8",
    title: "How to Improve Your Aim - Complete Guide",
    thumbnail: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=800&h=450&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
    views: "112K",
    duration: "22:00",
    category: "Tutorials",
    featured: false,
  },
];

const VideosPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filteredVideos = videos.filter((video) => 
    selectedCategory === "All" || video.category === selectedCategory
  );

  const featuredVideos = videos.filter((v) => v.featured);

  return (
    <Layout>
      {/* Hero */}
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
              Highlights, tutorials, and behind-the-scenes content from Zero Strikes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="py-12 bg-background-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-foreground mb-8">
            Featured Videos
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card gaming-border overflow-hidden group cursor-pointer"
                onClick={() => setSelectedVideo(video.youtubeId)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center glow-primary">
                      <Play size={36} className="text-primary-foreground ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-xs font-heading text-white">
                    {video.duration}
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-heading uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {video.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {video.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Videos */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-heading text-sm uppercase tracking-wider transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card gaming-border overflow-hidden group cursor-pointer"
                onClick={() => setSelectedVideo(video.youtubeId)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center glow-primary">
                      <Play size={24} className="text-primary-foreground ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs font-heading text-white">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs font-heading text-primary uppercase tracking-wider">
                    {video.category}
                  </span>
                  <h3 className="font-display font-bold text-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {video.views} views
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl"
            />
          </motion.div>
        </div>
      )}
    </Layout>
  );
};

export default VideosPage;
