import { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import styles from "./Features.module.css";

export default function Features() {
  const features = [
    {
      title: "Fast Delivery",
      description:
        "Quick and reliable medication delivery service to your doorstep within 24 hours.",
      icon: "🚚",
    },
    {
      title: "Trusted Products",
      description:
        "Only authentic, high-quality medications from certified manufacturers and suppliers.",
      icon: "🏆",
    },
    {
      title: "Professional Staff",
      description:
        "Licensed pharmacists and healthcare professionals with years of experience and expertise.",
      icon: "👨‍⚕️",
    },
    {
      title: "24/7 Support",
      description:
        "Round-the-clock customer support for urgent medication needs and health consultations.",
      icon: "📞",
    },
  ];

  const statsData = useMemo(
    () => [
      { number: 10, label: "Years of Service", suffix: "+" },
      { number: 5000, label: "Happy Customers", suffix: "+" },
      { number: 50, label: "Healthcare Products", suffix: "+" },
      { number: 24, label: "Customer Support", suffix: "/7" },
    ],
    []
  );

  const [counts, setCounts] = useState(statsData.map(() => 0));
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef(null);

  // مراقبة دخول السيكشن
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.3 }
    );
    const currentSection = sectionRef.current;
    if (currentSection) observer.observe(currentSection);
    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);

  // تشغيل العد عند الدخول
  useEffect(() => {
    if (!startCount) return;

    const duration = 2000;
    const steps = 60;
    const intervalTime = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setCounts(
        statsData.map((stat) => {
          const increment = Math.ceil(stat.number / steps);
          const value = increment * currentStep;
          return value >= stat.number ? stat.number : value;
        })
      );

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [startCount, statsData]);

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
      id="features"
      className={styles.features}
      ref={sectionRef}
      variants={fadeInRight}
      initial="hidden"
      animate={startCount ? "visible" : "hidden"}
      custom={0}
    >
      <motion.div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why Choose Us</h2>
          <p className={styles.subtitle}>
            Discover what makes HealthCare Pharmacy your best choice for
            pharmaceutical care
          </p>
        </div>

        {/* Grid Features مع fade in right */}
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section مع fade in right */}
        <motion.div className={styles.statsSection}>
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.stat}
              variants={fadeInRight}
              initial="hidden"
              animate={startCount ? "visible" : "hidden"}
              custom={index}
            >
              <h3 className={styles.statNumber}>
                {counts[index]}
                {stat.suffix}
              </h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
