"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.css";

export default function Contact() {
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
      newErrors["user_name"] = "❌ Name must be 3-30 letters only.";
    }
    if (!emailRegex.test(formData.get("user_email") as string)) {
      newErrors["user_email"] = "❌ Invalid email address.";
    }
    if (
      formData.get("user_phone") &&
      !phoneRegex.test(formData.get("user_phone") as string)
    ) {
      newErrors["user_phone"] = "❌ Phone must be 8-15 digits.";
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
          setStatus("✅ Message sent successfully!");
          form.current?.reset();
        },
        (error) => {
          setStatus("❌ Failed to send message. Try again.");
          console.error(error);
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Contact Us</h2>
          <p className={styles.subtitle}>
            Get in touch with our healthcare professionals for any questions or
            concerns
          </p>
        </div>

        <div className={styles.contactContent}>
          {/* ✅ Info Cards */}
          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📍</div>
              <div className={styles.infoContent}>
                <h3>Address</h3>
                <p>
                  123 Healthcare Avenue
                  <br />
                  Medical District, City 12345
                </p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📞</div>
              <div className={styles.infoContent}>
                <h3>Phone</h3>
                <p>
                  Main: (555) 123-4567
                  <br />
                  Emergency: (555) 987-6543
                </p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>✉️</div>
              <div className={styles.infoContent}>
                <h3>Email</h3>
                <p>
                  info@healthcarepharmacy.com
                  <br />
                  support@healthcarepharmacy.com
                </p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🕒</div>
              <div className={styles.infoContent}>
                <h3>Working Hours</h3>
                <p>
                  Monday - Friday: 8:00 AM - 8:00 PM
                  <br />
                  Saturday: 9:00 AM - 6:00 PM
                  <br />
                  Sunday: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* ✅ Contact Form */}
          <div className={styles.contactForm}>
            <form ref={form} onSubmit={sendEmail} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
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
                <label htmlFor="email">Email Address</label>
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
                <label htmlFor="phone">Phone Number</label>
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
                <label htmlFor="subject">Subject</label>
                <select name="user_subject" className={styles.formSelect}>
                  <option value="">Select a subject</option>
                  <option value="prescription">Prescription Inquiry</option>
                  <option value="consultation">Health Consultation</option>
                  <option value="delivery">Delivery Service</option>
                  <option value="general">General Question</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
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
                  "Send Message"
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
