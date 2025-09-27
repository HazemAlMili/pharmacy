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
            <a href="https://maps.app.goo.gl/QThkb6r45LW6EoFs6" target="_blank">
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
                <div className={styles.infoIcon}>
                  <svg
                    fill="oklch(0.58 0.2 17.28)"
                    height="24px"
                    width="24px"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 292.169 292.169"
                    xmlSpace="preserve"
                    transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
                    stroke="#fff"
                    strokeWidth="1"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <path d="M215.868,183.462c-4.564-4.563-10.633-7.075-17.086-7.075c-0.803,0-1.615,0.04-2.418,0.121 c-11.312,1.143-21.92,5.497-30.679,12.594c-0.239,0.193-0.55,0.301-0.875,0.301c-0.186,0-0.545-0.038-0.865-0.296 c-22.373-18.009-42.845-38.493-60.847-60.884c-0.392-0.488-0.39-1.253,0.006-1.741c7.09-8.754,11.439-19.357,12.578-30.659 c0.729-7.245-1.806-14.354-6.955-19.504l-37.061-37.06c-4.563-4.562-10.626-7.074-17.074-7.074c-0.785,0-1.58,0.039-2.36,0.115 c-13.275,1.3-25.801,7.231-35.272,16.702C-1.242,67.205-5.259,95.598,7.178,118.028c29.314,53.483,99.862,130.607,167.167,167.086 c8.437,4.603,18.019,7.036,27.712,7.036c15.388,0,30.379-6.168,41.13-16.92c9.472-9.47,15.404-21.997,16.704-35.273 c0.708-7.217-1.828-14.3-6.959-19.435L215.868,183.462z"></path>{" "}
                        <path d="M233.113,148.387c0.899,0.215,1.799,0.317,2.686,0.317c5.198,0,9.912-3.549,11.175-8.826 c6.408-26.788-1.378-54.391-20.826-73.837c-19.449-19.449-47.052-27.232-73.839-20.826c-6.177,1.477-9.986,7.684-8.509,13.86 c1.479,6.177,7.686,9.984,13.86,8.509c18.95-4.534,38.473,0.969,52.224,14.721c13.751,13.749,19.254,33.271,14.72,52.222 C223.126,140.703,226.936,146.908,233.113,148.387z"></path>{" "}
                        <path d="M256.553,35.635C229.246,8.328,191.635-4.193,153.358,1.279c-6.287,0.9-10.655,6.725-9.756,13.013 c0.899,6.288,6.732,10.655,13.012,9.756c31.037-4.438,61.537,5.713,83.676,27.851c22.138,22.14,32.29,52.638,27.851,83.677 c-0.899,6.287,3.469,12.113,9.756,13.012c0.552,0.079,1.1,0.117,1.643,0.117c5.629,0,10.549-4.139,11.37-9.873 C296.382,100.556,283.86,62.943,256.553,35.635z"></path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </div>
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
                <div className={styles.infoIcon}>
                  <svg
                    fill="oklch(0.58 0.2 17.28)"
                    height="24px"
                    width="24px"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 293.088 293.088"
                    xmlSpace="preserve"
                    stroke="#fff"
                    strokeWidth="1"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <path d="M86.954,0H36.823c-8.425,0-15.279,6.853-15.279,15.277V277.81c0,8.424,6.854,15.277,15.279,15.277h50.131 c8.367,0,15.179-6.761,15.272-15.105V15.104C102.133,6.761,95.321,0,86.954,0z"></path>{" "}
                        <path d="M257.364,15.104H113.545v262.878h143.819c7.818,0,14.18-6.361,14.18-14.18V29.285 C271.544,21.466,265.183,15.104,257.364,15.104z M134.561,31.104h96.033v53.552h-96.033V31.104z M151.134,231.324h-14.572 c-4.136,0-7.5-3.364-7.5-7.5c0-4.136,3.364-7.5,7.5-7.5h14.572c4.136,0,7.5,3.364,7.5,7.5 C158.634,227.96,155.27,231.324,151.134,231.324z M151.134,199.192h-14.572c-4.136,0-7.5-3.364-7.5-7.5c0-4.136,3.364-7.5,7.5-7.5 h14.572c4.136,0,7.5,3.364,7.5,7.5C158.634,195.828,155.27,199.192,151.134,199.192z M151.134,167.061h-14.572 c-4.136,0-7.5-3.364-7.5-7.5s3.364-7.5,7.5-7.5h14.572c4.136,0,7.5,3.364,7.5,7.5S155.27,167.061,151.134,167.061z M151.134,134.929h-14.572c-4.136,0-7.5-3.364-7.5-7.5c0-4.136,3.364-7.5,7.5-7.5h14.572c4.136,0,7.5,3.364,7.5,7.5 C158.634,131.564,155.27,134.929,151.134,134.929z M191.864,231.324h-14.572c-4.136,0-7.5-3.364-7.5-7.5c0-4.136,3.364-7.5,7.5-7.5 h14.572c4.136,0,7.5,3.364,7.5,7.5C199.364,227.96,196,231.324,191.864,231.324z M191.864,199.192h-14.572 c-4.136,0-7.5-3.364-7.5-7.5c0-4.136,3.364-7.5,7.5-7.5h14.572c4.136,0,7.5,3.364,7.5,7.5 C199.364,195.828,196,199.192,191.864,199.192z M191.864,167.061h-14.572c-4.136,0-7.5-3.364-7.5-7.5s3.364-7.5,7.5-7.5h14.572 c4.136,0,7.5,3.364,7.5,7.5S196,167.061,191.864,167.061z M191.864,134.929h-14.572c-4.136,0-7.5-3.364-7.5-7.5 c0-4.136,3.364-7.5,7.5-7.5h14.572c4.136,0,7.5,3.364,7.5,7.5C199.364,131.564,196,134.929,191.864,134.929z M232.595,231.324 h-14.572c-4.136,0-7.5-3.364-7.5-7.5c0-4.136,3.364-7.5,7.5-7.5h14.572c4.136,0,7.5,3.364,7.5,7.5 C240.095,227.96,236.73,231.324,232.595,231.324z M232.595,199.192h-14.572c-4.136,0-7.5-3.364-7.5-7.5c0-4.136,3.364-7.5,7.5-7.5 h14.572c4.136,0,7.5,3.364,7.5,7.5C240.095,195.828,236.73,199.192,232.595,199.192z M232.595,167.061h-14.572 c-4.136,0-7.5-3.364-7.5-7.5s3.364-7.5,7.5-7.5h14.572c4.136,0,7.5,3.364,7.5,7.5S236.73,167.061,232.595,167.061z M232.595,134.929h-14.572c-4.136,0-7.5-3.364-7.5-7.5c0-4.136,3.364-7.5,7.5-7.5h14.572c4.136,0,7.5,3.364,7.5,7.5 C240.095,131.564,236.73,134.929,232.595,134.929z"></path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </div>
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
                    fill="oklch(0.58 0.2 17.28)"
                    stroke="white"
                    strokeWidth="1"
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
