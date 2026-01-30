"use client";

import Link from "next/link";

import {
  Youtube,
  Twitter,
  Instagram,
  Twitch,
  Facebook,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const socialLinks = [
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitch, href: "#", label: "Twitch" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

const quickLinks = [
  { href: "/team", label: "About Team" },
  { href: "/players", label: "Our Players" },
  { href: "/news", label: "Latest News" },
  { href: "/videos", label: "Match Videos" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
];

export function Footer() {
  return (
    <footer className="relative bg-background-secondary border-t border-border">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/50">
                <span className="font-display font-bold text-2xl text-primary">
                  ZS
                </span>
              </div>

              <div>
                <p className="font-display font-bold text-lg text-foreground">
                  ZERO STRIKES
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  Esports Team
                </p>
              </div>
            </Link>

            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Professional Free Fire esports team competing at the highest level.
              Join us on our journey to victory.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground uppercase tracking-wider mb-6">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground uppercase tracking-wider mb-6">
              Contact Us
            </h4>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  contact@zerostrikes.gg
                </span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Gaming House, Esports City
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Phone size={18} className="text-primary mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  +1 (555) 123-4567
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground uppercase tracking-wider mb-6">
              Stay Updated
            </h4>

            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to get the latest news and updates.
            </p>

            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />

              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-heading text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Zero Strikes Esports. All rights reserved.
          </p>

          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
