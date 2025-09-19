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
            <a href="" target="_blank">
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
                          {index < t("address").split("\n").length - 1 && (
                            <br />
                          )}
                        </span>
                      ))}
                  </p>
                </div>
              </div>
            </a>
            <a href="tel:01153827570" target="_blank">
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
            </a>
            <a href="tel:+0233907788">
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📞</div>
                <div className={styles.infoContent}>
                  <h3>{t("landPhoneTitle")}</h3>
                  <p>
                    {t("landPhone")
                      .split("\n")
                      .map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < t("landPhone").split("\n").length - 1 && (
                            <br />
                          )}
                        </span>
                      ))}
                  </p>
                </div>
              </div>
            </a>
            <a href={`https://wa.me/${t("whatsApp")}`} target="_blank">
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </div>
                <div className={styles.infoContent}>
                  <h3>{t("whatsAppTitle")}</h3>
                  <p>
                    {t("whatsApp")
                      .split("\n")
                      .map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < t("whatsApp").length - 1 && <br />}
                        </span>
                      ))}
                  </p>
                </div>
              </div>
            </a>
            <a href={`mailto:${t("email")}`} target="_blank">
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>✉️</div>
                <div className={styles.infoContent}>
                  <h3>{t("emailTitle")}</h3>
                  <p>{t("email")}</p>
                </div>
              </div>
            </a>
            
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
