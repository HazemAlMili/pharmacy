"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Products from "@/components/Products";
import Contact from "@/components/Contact";
import "@/app/globals.css";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const locale = (params as { locale: string }).locale;
  return (
    <main className="min-h-screen bg-background">
      <Navbar locale={locale} />
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="products">
        <Products />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
