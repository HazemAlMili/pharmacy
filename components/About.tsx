"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import styles from "./About.module.css";

export default function About() {
  const [isClient, setIsClient] = useState(false);
  const t = useTranslations("about");

  useEffect(() => {
    setIsClient(true);
  }, []);
  // Animation Variants
  const fadeInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: (i = 1) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  if (!isClient) {
    return (
      <section id="about" className={styles.about}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Loading...</h2>
            <p className={styles.subtitle}>Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="about"
      className={styles.about}
      variants={fadeInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={0}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </div>

        <div className={styles.content}>
          <div className={styles.textContent}>
            <div className={styles.section}>
              <h3>{t("storyTitle")}</h3>
              <p>{t("storyText")}</p>
            </div>

            <div className={styles.section}>
              <h3>{t("goalsTitle")}</h3>
              <ul className={styles.goalsList}>
                {t.raw("goals").map((goal: string, index: number) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h3>{t("valuesTitle")}</h3>
              <div className={styles.values}>
                <div className={styles.value}>
                  <h4>{t("integrityTitle")}</h4>
                  <p>{t("integrityText")}</p>
                </div>
                <div className={styles.value}>
                  <h4>{t("compassionTitle")}</h4>
                  <p>{t("compassionText")}</p>
                </div>
                <div className={styles.value}>
                  <h4>{t("excellenceTitle")}</h4>
                  <p>{t("excellenceText")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.imageContainer}>
            <Image
              src="/About.jpg"
              alt="Pharmacist consulting with patient"
              width={500}
              height={500}
              className={styles.aboutImage}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
