"use client"
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Products from "@/components/Products";
import Contact from "@/components/Contact";
import "@/app/globals.css";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
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
