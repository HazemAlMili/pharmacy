import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cairo } from "./fonts";

import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl"; // 🟢 استخدام next-intl
import { getMessages } from "next-intl/server";
import "./globals.css";

export const metadata: Metadata = {
  title: "Healthcare App",
  description: "Created with Next.js and next-intl",
  generator: "v0.app",
};

const geistSans = GeistSans.variable;
const geistMono = GeistMono.variable;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Updated to match [locale]/layout.tsx
}) {
  // First await the entire params object
  const { locale } = await params || { locale: "en" };
  const messages = await getMessages({ locale });

  return (
    // In your root layout.tsx
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={` ${cairo.variable}${geistSans} ${geistMono} antialiased`}
    >
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <NextIntlClientProvider locale={locale} messages={messages}>
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
          </NextIntlClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
