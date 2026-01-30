import { useState } from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  FileText,
  Newspaper,
  Video,
  Handshake,
  Image,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminPlayers from "@/components/admin/AdminPlayers";
import AdminBlogs from "@/components/admin/AdminBlogs";
import AdminNews from "@/components/admin/AdminNews";
import AdminVideos from "@/components/admin/AdminVideos";
import AdminSponsors from "@/components/admin/AdminSponsors";
import AdminMedia from "@/components/admin/AdminMedia";
import AdminSettings from "@/components/admin/AdminSettings";

const sidebarLinks = [
  { href: "/admin", icon: LayoutDashboard, label: "Overview" },
  { href: "/admin/players", icon: Users, label: "Players" },
  { href: "/admin/blogs", icon: FileText, label: "Blogs" },
  { href: "/admin/news", icon: Newspaper, label: "News" },
  { href: "/admin/videos", icon: Video, label: "Videos" },
  { href: "/admin/sponsors", icon: Handshake, label: "Sponsors" },
  { href: "/admin/media", icon: Image, label: "Media" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

const AdminDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-40 flex flex-col bg-card border-r border-border transition-all duration-300",
          isCollapsed ? "w-20" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/50">
              <span className="font-display font-bold text-lg text-primary">ZS</span>
            </div>
            {!isCollapsed && (
              <span className="font-display font-bold text-foreground">ADMIN</span>
            )}
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1 rounded hover:bg-muted transition-colors"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg font-heading text-sm transition-all",
                isActive(link.href)
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <link.icon size={20} />
              {!isCollapsed && <span>{link.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Link to="/">
            <Button
              variant="ghost"
              className={cn("w-full justify-start gap-3", isCollapsed && "justify-center")}
            >
              <LogOut size={20} />
              {!isCollapsed && <span>Back to Site</span>}
            </Button>
          </Link>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-x-hidden">
        <div className="p-6 lg:p-8">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="players" element={<AdminPlayers />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="videos" element={<AdminVideos />} />
            <Route path="sponsors" element={<AdminSponsors />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
