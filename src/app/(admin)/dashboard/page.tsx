"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import {
  Users,
  FileText,
  Video,
  Newspaper,
  Handshake,
  TrendingUp,
  ArrowRight,
  Loader2,
} from "lucide-react";

type Stats = {
  players: number;
  blogs: number;
  videos: number;
  news: number;
  sponsors: number;
};

type RecentItem = {
  id: string;
  title: string;
  date: string;
  type: string;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    players: 0,
    blogs: 0,
    videos: 0,
    news: 0,
    sponsors: 0,
  });
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);

    // Fetch counts from all tables
    const [playersRes, blogsRes, videosRes, newsRes, sponsorsRes] =
      await Promise.all([
        supabase.from("players").select("id", { count: "exact", head: true }),
        supabase.from("blogs").select("id", { count: "exact", head: true }),
        supabase.from("videos").select("id", { count: "exact", head: true }),
        supabase.from("news").select("id", { count: "exact", head: true }),
        supabase.from("sponsors").select("id", { count: "exact", head: true }),
      ]);

    setStats({
      players: playersRes.count || 0,
      blogs: blogsRes.count || 0,
      videos: videosRes.count || 0,
      news: newsRes.count || 0,
      sponsors: sponsorsRes.count || 0,
    });

    // Fetch recent items
    const [recentBlogs, recentNews] = await Promise.all([
      supabase
        .from("blogs")
        .select("id, title, date")
        .order("date", { ascending: false })
        .limit(3),
      supabase
        .from("news")
        .select("id, title, date")
        .order("date", { ascending: false })
        .limit(3),
    ]);

    const items: RecentItem[] = [];

    if (recentBlogs.data) {
      items.push(
        ...recentBlogs.data.map((b) => ({
          id: b.id,
          title: b.title,
          date: b.date,
          type: "Blog",
        }))
      );
    }

    if (recentNews.data) {
      items.push(
        ...recentNews.data.map((n) => ({
          id: n.id,
          title: n.title,
          date: n.date,
          type: "News",
        }))
      );
    }

    // Sort by date and take top 5
    items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setRecentItems(items.slice(0, 5));

    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Players",
      value: stats.players,
      icon: Users,
      href: "/dashboard/players",
      color: "bg-blue-600",
    },
    {
      label: "Blog Posts",
      value: stats.blogs,
      icon: FileText,
      href: "/dashboard/blogs",
      color: "bg-green-600",
    },
    {
      label: "Videos",
      value: stats.videos,
      icon: Video,
      href: "/dashboard/videos",
      color: "bg-purple-600",
    },
    {
      label: "News Articles",
      value: stats.news,
      icon: Newspaper,
      href: "/dashboard/news",
      color: "bg-orange-600",
    },
    {
      label: "Sponsors",
      value: stats.sponsors,
      icon: Handshake,
      href: "/dashboard/sponsors",
      color: "bg-yellow-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-red-500" size={40} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">
          Welcome to Zero Strikes Admin Panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-red-500 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <ArrowRight
                size={20}
                className="text-gray-600 group-hover:text-red-500 transition-colors"
              />
            </div>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={20} className="text-red-500" />
            <h2 className="text-xl font-bold text-white">Recent Content</h2>
          </div>

          {recentItems.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No recent content yet. Start creating!
            </p>
          ) : (
            <div className="space-y-4">
              {recentItems.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {item.title}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      item.type === "Blog"
                        ? "bg-green-600/20 text-green-400"
                        : "bg-orange-600/20 text-orange-400"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>

          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/dashboard/players"
              className="flex flex-col items-center justify-center p-6 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Users size={32} className="text-blue-400 mb-2" />
              <span className="text-white font-medium">Add Player</span>
            </Link>
            <Link
              href="/dashboard/blogs"
              className="flex flex-col items-center justify-center p-6 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FileText size={32} className="text-green-400 mb-2" />
              <span className="text-white font-medium">New Blog Post</span>
            </Link>
            <Link
              href="/dashboard/videos"
              className="flex flex-col items-center justify-center p-6 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Video size={32} className="text-purple-400 mb-2" />
              <span className="text-white font-medium">Add Video</span>
            </Link>
            <Link
              href="/dashboard/news"
              className="flex flex-col items-center justify-center p-6 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Newspaper size={32} className="text-orange-400 mb-2" />
              <span className="text-white font-medium">Post News</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-gray-400 text-sm text-center">
          Zero Strikes Admin Dashboard - Manage your esports team content
        </p>
      </div>
    </div>
  );
}
