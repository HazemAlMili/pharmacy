"use client";
import { motion } from "framer-motion";
import styles from "./Products.module.css";
import Image from "next/image";

export default function Products() {
  const products = [
    {
      name: "Pain Relief Medications",
      category: "Over-the-Counter",
      description:
        "Effective pain management solutions including acetaminophen, ibuprofen, and aspirin.",
      image: "/Pain Relief Medications.jpg",
    },
    {
      name: "Vitamins & Supplements",
      category: "Wellness",
      description:
        "Complete range of vitamins, minerals, and dietary supplements for optimal health.",
      image: "/Vitamins & Supplements.jpg",
    },
    {
      name: "Cold & Flu Remedies",
      category: "Seasonal Care",
      description:
        "Comprehensive cold and flu treatments to help you recover faster.",
      image: "/Cold & Flu Remedies.jpg",
    },
    {
      name: "Diabetes Care",
      category: "Chronic Conditions",
      description:
        "Blood glucose monitors, test strips, and diabetes management supplies.",
      image: "/Diabetes Care.jpg",
    },
    {
      name: "Heart Health",
      category: "Cardiovascular",
      description:
        "Medications and supplements supporting cardiovascular health and wellness.",
      image: "/Heart Health.jpg",
    },
    {
      name: "Skin Care Products",
      category: "Dermatology",
      description:
        "Therapeutic skin care solutions for various skin conditions and concerns.",
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
          <h2 className={styles.title}>Our Products</h2>
          <p className={styles.subtitle}>
            Quality healthcare products and medications for all your health
            needs
          </p>
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
            <strong>Disclaimer:</strong> This is a product showcase only. Please
            consult with our pharmacists for proper medication guidance and
            prescription requirements.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
