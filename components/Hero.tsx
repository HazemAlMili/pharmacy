"use client";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

export default function Hero() {
  // Variants
  const fadeInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.section
      id="home"
      className={styles.hero}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.container}>
        {/* النصوص */}
        <motion.div className={styles.content} variants={fadeInLeft}>
          <h1 className={styles.title}>
            Your Trusted <span className={styles.highlight}>Healthcare</span>{" "}
            Partner
          </h1>
          <p className={styles.subtitle}>
            Providing quality pharmaceutical services and healthcare solutions
            to our community with professional care and expertise.
          </p>

          <div className={styles.mission}>
            <h3>Our Mission</h3>
            <p>
              To deliver exceptional pharmaceutical care while promoting health
              and wellness in our community through personalized service and
              professional expertise.
            </p>
          </div>

          <div className={styles.vision}>
            <h3>Our Vision</h3>
            <p>
              To be the leading pharmacy in providing innovative healthcare
              solutions and building lasting relationships with our patients.
            </p>
          </div>

          <a href="#services">
            <button className={`${styles.ctaButton} pulse-on-hover`}>
              Explore Our Services
            </button>
          </a>
        </motion.div>

        {/* الصورة */}
        <motion.div className={styles.imageContainer} variants={fadeInRight}>
          <img
            src="/hero.png"
            alt="Modern pharmacy interior"
            className={styles.heroImage}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
