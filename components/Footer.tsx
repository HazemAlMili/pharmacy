"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./Footer.module.css";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.info}>
            <h3 className={styles.name}>
              <Image
                src="/logo.png"
                alt="pharmacy's Logo"
                width={100}
                height={100}
                className={styles.heroImage}
              />
            </h3>
            <p className={styles.slogan}>{t("slogan")}</p>
          </div>
          <div className={styles.social}>
            <a
              href="https://www.facebook.com/share/1GwXTDMZEH/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>
        <div className={styles.copy}>
          <p>
            &copy; {new Date().getFullYear()} {t("name")}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
