/**
 * Footer Component
 * ===================================
 * Professional footer with version info and support links
 */

"use client";

import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const version = "v0.1.0";

  return (
    <footer className="mt-auto border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-caption text-text-secondary">
              © {currentYear} MemberConnect. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center items-center gap-6">
            <Link
              href="/support"
              className="text-caption text-text-secondary hover:text-primary transition-colors duration-200 flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Support</span>
            </Link>
            <span className="text-text-secondary/30">|</span>
            <a
              href="mailto:support@memberconnect.com"
              className="text-caption text-text-secondary hover:text-primary transition-colors duration-200 flex items-center gap-1"
            >
              <span>Contact Us</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Version */}
          <div className="text-center md:text-right">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-caption bg-primary/5 text-primary border border-primary/10">
              {version}
            </span>
          </div>
        </div>

        {/* Compliance Note */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-caption text-text-secondary/70 text-center">
            Your health information is protected under HIPAA regulations.{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
