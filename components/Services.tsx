"use client";
import { motion } from "framer-motion";
import styles from "./Services.module.css";

export default function Services() {
  const services = [
    {
      title: "Prescription Services",
      description:
        "Professional dispensing of prescription medications with thorough consultation and safety checks.",
      icon: "💊",
    },
    {
      title: "Health Consultations",
      description:
        "Expert advice on medications, health conditions, and wellness strategies from certified pharmacists.",
      icon: "🩺",
    },
    {
      title: "Medication Management",
      description:
        "Comprehensive medication reviews and management plans to optimize your treatment outcomes.",
      icon: "📋",
    },
    {
      title: "Immunizations",
      description:
        "Professional vaccination services including flu shots, travel vaccines, and routine immunizations.",
      icon: "💉",
    },
    {
      title: "Health Screenings",
      description:
        "Regular health monitoring including blood pressure, cholesterol, and diabetes screenings.",
      icon: "🔍",
    },
    {
      title: "Compounding Services",
      description:
        "Custom medication preparation tailored to individual patient needs and specifications.",
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
          <h2 className={styles.title}>Our Services</h2>
          <p className={styles.subtitle}>
            Comprehensive pharmaceutical care tailored to your health needs
          </p>
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
