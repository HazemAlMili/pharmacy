"use client";
import { motion } from "framer-motion";
import styles from "./About.module.css";

export default function About() {
  // Animation Variants
  const fadeInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: (i = 1) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

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
          <h2 className={styles.title}>About HealthCare Pharmacy</h2>
          <p className={styles.subtitle}>
            Committed to excellence in pharmaceutical care and community health
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.textContent}>
            <div className={styles.section}>
              <h3>Our Story</h3>
              <p>
                Founded with a vision to provide exceptional pharmaceutical
                services, HealthCare Pharmacy has been serving our community for
                over a decade. We combine traditional pharmacy values with
                modern healthcare innovations to deliver personalized care to
                every patient.
              </p>
            </div>

            <div className={styles.section}>
              <h3>Our Goals</h3>
              <ul className={styles.goalsList}>
                <li>Provide accessible and affordable healthcare solutions</li>
                <li>Maintain the highest standards of pharmaceutical care</li>
                <li>
                  Build lasting relationships with our patients and community
                </li>
                <li>Continuously improve our services through innovation</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h3>Our Values</h3>
              <div className={styles.values}>
                <div className={styles.value}>
                  <h4>Integrity</h4>
                  <p>
                    We uphold the highest ethical standards in all our practices
                  </p>
                </div>
                <div className={styles.value}>
                  <h4>Compassion</h4>
                  <p>We care deeply about our patients health and wellbeing</p>
                </div>
                <div className={styles.value}>
                  <h4>Excellence</h4>
                  <p>We strive for perfection in every service we provide</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.imageContainer}>
            <img
              src="/About.jpg"
              alt="Pharmacist consulting with patient"
              className={styles.aboutImage}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
