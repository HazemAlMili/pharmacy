"use client";

import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useTranslations } from "next-intl";
import styles from "./Contact.module.css";

export default function Contact() {
  const [isClient, setIsClient] = useState(false);
  const t = useTranslations("contact");

  useEffect(() => {
    setIsClient(true);
  }, []);
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // ✅ Regex rules
  const nameRegex = /^[a-zA-Z\s]{3,30}$/; // أحرف فقط وطول 3-30
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // ايميل صحيح
  const phoneRegex = /^[0-9]{8,15}$/; // رقم 8-15 أرقام

  const validateForm = (formData: FormData) => {
    const newErrors: { [key: string]: string } = {};

    if (!nameRegex.test(formData.get("user_name") as string)) {
      newErrors["user_name"] = t("nameError");
    }
    if (!emailRegex.test(formData.get("user_email") as string)) {
      newErrors["user_email"] = t("emailError");
    }
    if (
      formData.get("user_phone") &&
      !phoneRegex.test(formData.get("user_phone") as string)
    ) {
      newErrors["user_phone"] = t("phoneError");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    const formData = new FormData(form.current);
    if (!validateForm(formData)) {
      return;
    }

    setLoading(true);
    setStatus("");

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
      )
      .then(
        () => {
          setStatus(t("successMessage"));
          form.current?.reset();
        },
        (error) => {
          setStatus(t("errorMessage"));
          console.error(error);
        }
      )
      .finally(() => setLoading(false));
  };

  if (!isClient) {
    return (
      <section id="contact" className={styles.contact}>
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
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </div>

        <div className={styles.contactContent}>
          {/* ✅ Info Cards */}
          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📍</div>
              <div className={styles.infoContent}>
                <h3>{t("addressTitle")}</h3>
                <p>
                  {t("address")
                    .split("\n")
                    .map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < t("address").split("\n").length - 1 && <br />}
                      </span>
                    ))}
                </p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📞</div>
              <div className={styles.infoContent}>
                <h3>{t("phoneTitle")}</h3>
                <p>
                  {t("phone")
                    .split("\n")
                    .map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < t("phone").split("\n").length - 1 && <br />}
                      </span>
                    ))}
                </p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>✉️</div>
              <div className={styles.infoContent}>
                <h3>{t("emailTitle")}</h3>
                <p>{t("email")}</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🕒</div>
              <div className={styles.infoContent}>
                <h3>{t("hoursTitle")}</h3>
                <p>
                  {t("hours")
                    .split("\n")
                    .map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < t("hours").split("\n").length - 1 && <br />}
                      </span>
                    ))}
                </p>
              </div>
            </div>
          </div>

          {/* ✅ Contact Form */}
          <div className={styles.contactForm}>
            <form ref={form} onSubmit={sendEmail} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">{t("formName")}</label>
                <input
                  type="text"
                  name="user_name"
                  className={styles.formInput}
                />
                {errors.user_name && (
                  <p className={styles.errorMsg}>{errors.user_name}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">{t("formEmail")}</label>
                <input
                  type="email"
                  name="user_email"
                  className={styles.formInput}
                />
                {errors.user_email && (
                  <p className={styles.errorMsg}>{errors.user_email}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">{t("formPhone")}</label>
                <input
                  type="tel"
                  name="user_phone"
                  className={styles.formInput}
                />
                {errors.user_phone && (
                  <p className={styles.errorMsg}>{errors.user_phone}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">{t("formSubject")}</label>
                <select name="user_subject" className={styles.formSelect}>
                  <option value="">{t("selectSubject")}</option>
                  <option value="prescription">
                    {t("prescriptionOption")}
                  </option>
                  <option value="consultation">
                    {t("consultationOption")}
                  </option>
                  <option value="delivery">{t("deliveryOption")}</option>
                  <option value="general">{t("generalOption")}</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">{t("formMessage")}</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className={styles.formTextarea}
                ></textarea>
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? (
                  <span className={styles.spinner}></span>
                ) : (
                  t("sendButton")
                )}
              </button>

              {status && <p className={styles.statusMsg}>{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
