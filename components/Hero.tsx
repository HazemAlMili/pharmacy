"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const [isClient, setIsClient] = useState(false);
  const t = useTranslations("hero");

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Variants
  const fadeInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  if (!isClient) {
    return (
      <section id="home" className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>Loading...</h1>
            <p className={styles.subtitle}>Loading...</p>
          </div>
        </div>
      </section>
    );
  }

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
            {t.rich("title", {
              highlight: (chunks) => (
                <span className={styles.highlight}>{chunks}</span>
              ),
            })}
          </h1>

          <p className={styles.subtitle}>{t("subtitle")}</p>

          <div className={styles.mission}>
            <h3>{t("missionTitle")}</h3>
            <p>{t("missionText")}</p>
          </div>

          <div className={styles.vision}>
            <h3>{t("visionTitle")}</h3>
            <p>{t("visionText")}</p>
          </div>

          <a href="#services">
            <button className={`${styles.ctaButton} pulse-on-hover`}>
              {t("button")}
            </button>
          </a>
        </motion.div>

        {/* الصورة */}
        <motion.div className={styles.imageContainer} variants={fadeInRight}>
          <Image
            src="/hero.png"
            alt="Modern pharmacy interior"
            width={500}
            height={500}
            className={styles.heroImage}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
