"use client";
import type { SVGProps } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "My Profile", href: "/profile" },
];

const support = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

type SocialIconProps = SVGProps<SVGSVGElement>;

function XIcon(props: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon(props: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon(props: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const socials = [
  { label: "X", href: "#", icon: XIcon },
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
];

type LinkItem = {
  label: string;
  href: string;
};

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: LinkItem[];
}) {
  return (
    <div>
      <h3 className="text-sm font-light uppercase tracking-wide">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 md:px-10">
        {/* Brand */}
        <div>
          <h2 className="font-serif text-6xl font-bold tracking-tight md:text-8xl">
            Wanderlust
          </h2>

          <p className="mt-2 text-sm text-white/70 md:text-base">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        {/* Footer Columns */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-light uppercase tracking-wide">
              Newsletter
            </h3>

            <p className="mt-2 text-xs text-white/60">
              Subscribe for exclusive travel deals and inspiration.
            </p>

            <form
              className="mt-4 flex w-full max-w-[280px] items-center bg-white/10"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                required
                aria-label="Email address"
                className="h-10 rounded-none border-0 bg-transparent px-3 text-sm text-white placeholder:text-white/50 focus-visible:ring-0"
              />

              <Button
                type="submit"
                size="icon"
                variant="ghost"
                aria-label="Subscribe"
                className="h-10 w-10 shrink-0 rounded-none text-white hover:bg-transparent hover:text-white/70"
              >
                <ArrowUpRight className="size-4" />
              </Button>
            </form>
          </div>

          {/* Quick Links */}
          <LinkColumn title="Quick Links" links={quickLinks} />

          {/* Support */}
          <LinkColumn title="Support" links={support} />

          {/* Contact */}
          <div>
            <h3 className="text-sm font-light uppercase tracking-wide">
              Contact Us
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>
                <a
                  href="tel:+7869011622"
                  className="transition-colors hover:text-white"
                >
                  786 901 1622
                </a>
              </li>

              <li>
                <a
                  href="mailto:info@wandarland.com"
                  className="transition-colors hover:text-white"
                >
                  info@wandarland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/60">
            © 2026 Wanderlust. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-white transition-opacity hover:opacity-70"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}