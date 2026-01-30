import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Calendar, Clock, User, Search, Tag } from "lucide-react";

import { useState } from "react";

const categories = ["All", "Strategy", "Analysis", "Guides", "Interviews"];

const blogs = [
  {
    id: "1",
    title: "Mastering Close-Range Combat in Free Fire",
    excerpt: "Learn the essential techniques and strategies that our pro players use to dominate close-quarter battles in Free Fire.",
    content: "",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    author: "PHOENIX",
    date: "2025-01-27",
    readTime: "8 min read",
    category: "Strategy",
    tags: ["combat", "tips", "pro-tips"],
  },
  {
    id: "2",
    title: "The Psychology of Esports: Mental Preparation",
    excerpt: "Discover how professional players prepare mentally for high-stakes tournaments and maintain peak performance under pressure.",
    content: "",
    image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=400&fit=crop",
    author: "VIPER",
    date: "2025-01-24",
    readTime: "10 min read",
    category: "Analysis",
    tags: ["psychology", "performance", "mindset"],
  },
  {
    id: "3",
    title: "Complete Sniper Guide: From Beginner to Pro",
    excerpt: "STORM shares his comprehensive guide to mastering sniper rifles in Free Fire, including positioning, aim techniques, and loadout recommendations.",
    content: "",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=400&fit=crop",
    author: "STORM",
    date: "2025-01-21",
    readTime: "12 min read",
    category: "Guides",
    tags: ["sniper", "guide", "weapons"],
  },
  {
    id: "4",
    title: "Interview: Building a Championship Team",
    excerpt: "An exclusive interview with team management about the philosophy behind building and nurturing a championship-caliber esports team.",
    content: "",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
    author: "Team Manager",
    date: "2025-01-19",
    readTime: "15 min read",
    category: "Interviews",
    tags: ["interview", "team-building", "management"],
  },
  {
    id: "5",
    title: "Map Control Strategies for Ranked Play",
    excerpt: "Understanding map control is crucial for climbing the ranks. Learn how to read the map and make better rotational decisions.",
    content: "",
    image: "https://images.unsplash.com/photo-1493711662062-fa541f7f58e5?w=800&h=400&fit=crop",
    author: "SHADOW",
    date: "2025-01-16",
    readTime: "9 min read",
    category: "Strategy",
    tags: ["strategy", "ranked", "map-control"],
  },
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              Knowledge Base
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6">
              TEAM <span className="gradient-text">BLOG</span>
            </h1>
            <p className="text-xl text-muted-foreground font-heading">
              Strategies, insights, and stories from the Zero Strikes team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card gaming-border overflow-hidden group"
              >
                <Link to={`/blog/${blog.id}`} className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative h-48 md:h-auto overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card md:block hidden" />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-xs font-heading text-primary uppercase tracking-wider">
                        {blog.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {blog.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {blog.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {blog.readTime}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
                        >
                          <Tag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No blog posts found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
