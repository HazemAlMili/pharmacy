"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import styles from "./Navbar.module.css";

export default function Navbar({ locale }: { locale: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");
  // const tButtons = useTranslations("buttons");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0) {
      segments[0] = newLocale; // أول جزء هو locale
    } else {
      segments.unshift(newLocale); // إذا كنا عالرئيسية
    }

    const newPath = "/" + segments.join("/");
    router.replace(newPath);
  };

  if (!isClient) {
    return (
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.logo}>
            
          </div>
          <ul className={styles.navLinks}>
            <li>
              <a href="#home">Loading...</a>
            </li>
            <li>
              <a href="#about">Loading...</a>
            </li>
            <li>
              <a href="#services">Loading...</a>
            </li>
            <li>
              <a href="#features">Loading...</a>
            </li>
            <li>
              <a href="#products">Loading...</a>
            </li>
            <li>
              <a href="#offers">Loading...</a>
            </li>
            <li>
              <a href="#contact">Loading...</a>
            </li>
            <li>
              <ThemeToggle />
            </li>
            <li>
              <a className={styles.langBtn}>
                <Globe size={20} />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}>
          <li>
            <a href="#home" onClick={handleLinkClick}>
              {t("home")}
            </a>
          </li>
          <li>
            <a href="#about" onClick={handleLinkClick}>
              {t("about")}
            </a>
          </li>
          <li>
            <a href="#services" onClick={handleLinkClick}>
              {t("services")}
            </a>
          </li>
          <li>
            <a href="#features" onClick={handleLinkClick}>
              {t("features")}
            </a>
          </li>

          {/* Logo in center of links */}
          <li className={styles.logoInMenu}>
            <Image
              src="/logo.png"
              alt="pharmacy's Logo"
              width={100}
              height={100}
              className={styles.heroImage}
            />
          </li>

          <li>
            <a href="#products" onClick={handleLinkClick}>
              {t("products")}
            </a>
          </li>
          <li>
            <a href="#offers" onClick={handleLinkClick}>
              {t("offers")}
            </a>
          </li>
          <li>
            <a href="#contact" onClick={handleLinkClick}>
              {t("contact")}
            </a>
          </li>

          {/* Mobile Menu Buttons */}
          <li className={styles.mobileButtons}>
            <ThemeToggle />
            <a onClick={toggleLanguage} className={styles.langBtn}>
              <Globe size={20} />
            </a>
          </li>
        </ul>

        {/* Right Side - Remaining Links and Buttons */}
        <div className={styles.rightSection}>
          <div className={styles.buttons}>
            <ThemeToggle />
            <a onClick={toggleLanguage} className={styles.langBtn}>
              <Globe size={20} />
            </a>
          </div>
        </div>

        <button
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        {/* Logo when screen is Mobile */}
        <div className={styles.logoOutMenu}>
          <Image
            src="/logo.png"
            alt="pharmacy's Logo"
            width={100}
            height={100}
            className={styles.heroImage}
          />
        </div>
      </div>
    </nav>
  );
}
