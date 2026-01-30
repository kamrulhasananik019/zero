"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const news = [
  {
    id: "1",
    title: "Zero Strikes Dominates Regional Championship",
    excerpt:
      "Our team secured a commanding victory in the Southeast Asia Regional Finals, showcasing exceptional teamwork and individual skill.",
    image:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&h=400&fit=crop",
    date: "2025-01-28",
    readTime: "5 min read",
    category: "Tournament",
  },
  {
    id: "2",
    title: "New Roster Announcement: Welcome STORM",
    excerpt:
      "We are excited to announce the addition of STORM to our roster as our new dedicated sniper, bringing unparalleled precision to the team.",
    image:
      "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=400&fit=crop",
    date: "2025-01-25",
    readTime: "3 min read",
    category: "Roster",
  },
  {
    id: "3",
    title: "Behind the Scenes: Training Regimen",
    excerpt:
      "Get an exclusive look at how Zero Strikes prepares for major tournaments with our intense training schedule and strategy sessions.",
    image:
      "https://images.unsplash.com/photo-1493711662062-fa541f7f58e5?w=800&h=400&fit=crop",
    date: "2025-01-22",
    readTime: "7 min read",
    category: "Feature",
  },
];

export function NewsSection() {
  return (
    <section className="py-24 bg-background-secondary relative">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm font-heading text-primary uppercase tracking-wider mb-4">
              Latest Updates
            </span>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              NEWS & <span className="gradient-text">UPDATES</span>
            </h2>
          </div>

          <Link href="/news" className="mt-4 md:mt-0">
            <Button variant="outline">
              View All News
              <ArrowRight size={18} />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-card gaming-border overflow-hidden group"
          >
            <Link href={`/news/${news[0].id}`} className="block">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={news[0].image}
                  alt={news[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-heading uppercase tracking-wider">
                    {news[0].category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(news[0].date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {news[0].readTime}
                  </span>
                </div>

                <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {news[0].title}
                </h3>

                <p className="text-muted-foreground line-clamp-2">
                  {news[0].excerpt}
                </p>
              </div>
            </Link>
          </motion.article>

          <div className="space-y-6">
            {news.slice(1).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 1) * 0.1 }}
                className="glass-card gaming-border overflow-hidden group"
              >
                <Link
                  href={`/news/${article.id}`}
                  className="flex gap-4 p-4"
                >
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-heading text-primary uppercase tracking-wider">
                      {article.category}
                    </span>

                    <h4 className="font-display font-bold text-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>

                    <span className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(article.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
