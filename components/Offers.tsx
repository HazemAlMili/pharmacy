"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import styles from "./Offers.module.css";
import Image from "next/image";

interface Offer {
  id: number;
  title: string;
  description: string;
  validUntil: string;
  image: string;
  discount: string;
  category: string;
}

export default function Offers() {
  const [isClient, setIsClient] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);
  const t = useTranslations("offers");

  useEffect(() => {
    setIsClient(true);
    // Fetch offers from the JSON file
    fetch("/offers.json")
      .then((response) => response.json())
      .then((data) => setOffers(data))
      .catch((error) => console.error("Error loading offers:", error));
  }, []);

  // Animation variants
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

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!isClient) {
    return (
      <section id="offers" className={styles.offers}>
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
      id="offers"
      className={styles.offers}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.container}>
        <motion.div className={styles.header} variants={fadeInUp} custom={0}>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </motion.div>

        <div className={styles.offersGrid}>
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              className={styles.offerCard}
              variants={fadeInUp}
              custom={index + 1}
            >
              <div className={styles.offerImage}>
                <div className={styles.discountBadge}>{offer.discount}</div>
                <Image
                  src={offer.image || "/placeholder.svg"}
                  alt={offer.title}
                  width={300}
                  height={200}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.offerContent}>
                <span className={styles.offerCategory}>{offer.category}</span>
                <h3 className={styles.offerTitle}>{offer.title}</h3>
                <p className={styles.offerDescription}>{offer.description}</p>
                <span className={styles.validUntil}>
                  {t("validUntil")}: {formatDate(offer.validUntil)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.disclaimer}
          variants={fadeInUp}
          custom={offers.length + 1}
        >
          <p>
            <strong>{t("disclaimer")}</strong>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}