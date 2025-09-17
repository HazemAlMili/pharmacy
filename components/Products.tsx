"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import styles from "./Products.module.css";
import Image from "next/image";

export default function Products() {
  const [isClient, setIsClient] = useState(false);
  const t = useTranslations("products");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const products = [
    {
      name: t("painReliefName"),
      category: t("painReliefCategory"),
      description: t("painReliefDesc"),
      image: "/Pain Relief Medications.jpg",
    },
    {
      name: t("vitaminsName"),
      category: t("vitaminsCategory"),
      description: t("vitaminsDesc"),
      image: "/Vitamins & Supplements.jpg",
    },
    {
      name: t("coldFluName"),
      category: t("coldFluCategory"),
      description: t("coldFluDesc"),
      image: "/Cold & Flu Remedies.jpg",
    },
    {
      name: t("diabetesName"),
      category: t("diabetesCategory"),
      description: t("diabetesDesc"),
      image: "/Diabetes Care.jpg",
    },
    {
      name: t("heartName"),
      category: t("heartCategory"),
      description: t("heartDesc"),
      image: "/Heart Health.jpg",
    },
    {
      name: t("skinName"),
      category: t("skinCategory"),
      description: t("skinDesc"),
      image: "/Skin Care Products.jpg",
    },
  ];

  // Variants للانيميشن
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
  };

  if (!isClient) {
    return (
      <section id="products" className={styles.products}>
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
      id="products"
      className={styles.products}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.container}>
        <motion.div className={styles.header} variants={fadeInUp} custom={0}>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </motion.div>

        <div className={styles.productsGrid}>
          {products.map((product, index) => (
            <motion.div
              key={index}
              className={styles.productCard}
              variants={fadeInUp}
              custom={index + 1}
            >
              <div className={styles.productImage}>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={200}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.productContent}>
                <span className={styles.productCategory}>
                  {product.category}
                </span>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.disclaimer}
          variants={fadeInUp}
          custom={products.length + 1}
        >
          <p>
            <strong>{t("disclaimer")}</strong>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
