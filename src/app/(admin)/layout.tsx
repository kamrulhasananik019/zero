"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  FileText,
  Video,
  Newspaper,
  Handshake,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { supabase } from "@/lib/supabaseClient";

type Props = {
  children: ReactNode;
};

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/players", label: "Players", icon: Users },
  { href: "/dashboard/blogs", label: "Blogs", icon: FileText },
  { href: "/dashboard/videos", label: "Videos", icon: Video },
  { href: "/dashboard/news", label: "News", icon: Newspaper },
  { href: "/dashboard/sponsors", label: "Sponsors", icon: Handshake },
];

export default function AdminLayout({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const checkAuth = async (): Promise<void> => {
    // Skip auth check on login page
    if (pathname === "/login") {
      setLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    // Optional: Check for admin role in profiles table
    // If profiles table doesn't exist or no admin check needed, comment this out
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      // If profile check fails or role isn't admin, still allow access
      // Remove this condition if you want strict admin-only access
      if (!error && data?.role !== "admin") {
        // Uncomment below to enforce admin-only access:
        // await supabase.auth.signOut();
        // router.push("/login");
        // return;
      }
    } catch {
      // Profiles table might not exist, continue anyway
    }

    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async (): Promise<void> => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg text-white"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-red-500">Zero Strikes</h2>
            <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
