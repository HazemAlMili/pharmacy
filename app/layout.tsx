
import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
};

const geistSans = GeistSans.variable;
const geistMono = GeistMono.variable;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans} ${geistMono} antialiased`}>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="animated-background">
            <div className="gradient-overlay"></div>
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
              <div className="shape shape-4"></div>
              <div className="shape shape-5"></div>
            </div>
            <div className="floating-particles">
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
            </div>
            <div className="medical-crosses">
              <div className="medical-cross cross-1"></div>
              <div className="medical-cross cross-2"></div>
              <div className="medical-cross cross-3"></div>
              <div className="medical-cross cross-4"></div>
            </div>
            <div className="pill-capsules">
              <div className="pill-capsule pill-1"></div>
              <div className="pill-capsule pill-2"></div>
              <div className="pill-capsule pill-3"></div>
            </div>
            <div className="heartbeat-pulse"></div>
          </div>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
