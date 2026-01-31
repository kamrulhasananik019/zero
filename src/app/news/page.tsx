"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const categories = ["All", "Tournament", "Roster", "Feature", "Update"];

const news = [
  {
    id: "1",
    title: "Zero Strikes Dominates Regional Championship",
    excerpt:
      "Our team secured a commanding victory in the Southeast Asia Regional Finals, showcasing exceptional teamwork and individual skill that left opponents in awe.",
    image:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&h=400&fit=crop",
    date: "2025-01-28",
    readTime: "5 min read",
    category: "Tournament",
    featured: true,
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
    featured: false,
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
    featured: false,
  },
  {
    id: "4",
    title: "Partnership with GameTech Announced",
    excerpt:
      "Zero Strikes partners with GameTech for exclusive gaming peripherals and equipment sponsorship.",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
    date: "2025-01-20",
    readTime: "4 min read",
    category: "Update",
    featured: false,
  },
  {
    id: "5",
    title: "PHOENIX Named MVP of Winter Championship",
    excerpt:
      "Team captain PHOENIX receives the Most Valuable Player award for outstanding performance throughout the tournament.",
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=400&fit=crop",
    date: "2025-01-18",
    readTime: "3 min read",
    category: "Tournament",
    featured: false,
  },
  {
    id: "6",
    title: "Gaming House Tour 2025",
    excerpt:
      "Take a virtual tour of our newly renovated gaming house featuring state-of-the-art equipment and training facilities.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    date: "2025-01-15",
    readTime: "6 min read",
    category: "Feature",
    featured: false,
  },
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = news.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" ||
      article.category === selectedCategory;

    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredArticle = news.find((a) => a.featured);

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
              Latest Updates
            </span>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6">
              NEWS & <span className="gradient-text">UPDATES</span>
            </h1>

            <p className="text-xl text-muted-foreground font-heading">
              Stay updated with the latest Zero Strikes announcements and stories.
            </p>
          </motion.div>
        </div>
      </section>

      {featuredArticle && (
        <section className="py-12 bg-background-secondary">
          <div className="container mx-auto px-4">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card gaming-border overflow-hidden group"
            >
              <Link
                href={`/news/${featuredArticle.id}`}
                className="flex flex-col lg:flex-row"
              >
                <div className="lg:w-1/2 relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-heading uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                </div>

                <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                  <span className="text-sm font-heading text-primary uppercase tracking-wider mb-2">
                    {featuredArticle.category}
                  </span>

                  <h2 className="text-3xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-muted-foreground mb-6">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(
                        featuredArticle.date
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {featuredArticle.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          </div>
        </section>
      )}

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
            <div className="flex flex-wrap gap-2">
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

            <div className="relative w-full md:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />

              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews
              .filter((a) => !a.featured)
              .map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card gaming-border overflow-hidden group"
                >
                  <Link href={`/news/${article.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-xs font-heading text-primary uppercase tracking-wider">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(
                            article.date
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No articles found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
