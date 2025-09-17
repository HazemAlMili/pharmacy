"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import styles from "./Services.module.css";

export default function Services() {
  const [isClient, setIsClient] = useState(false);
  const t = useTranslations("services");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const services = [
    {
      title: t("prescriptionTitle"),
      description: t("prescriptionDesc"),
      icon: "💊",
    },
    {
      title: t("consultationTitle"),
      description: t("consultationDesc"),
      icon: "🩺",
    },
    {
      title: t("managementTitle"),
      description: t("managementDesc"),
      icon: "📋",
    },
    {
      title: t("immunizationTitle"),
      description: t("immunizationDesc"),
      icon: "💉",
    },
    {
      title: t("screeningTitle"),
      description: t("screeningDesc"),
      icon: "🔍",
    },
    {
      title: t("compoundingTitle"),
      description: t("compoundingDesc"),
      icon: "⚗️",
    },
  ];

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // كل كرت يتأخر شوي
      },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  if (!isClient) {
    return (
      <section id="services" className={styles.services}>
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
      id="services"
      className={styles.services}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </div>

        <motion.div
          className={styles.servicesGrid}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`${styles.serviceCard} pulse-on-hover`}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              variants={card}
            >
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
