"use client";

import { useState, useEffect } from "react";
import styles from "./ContactMe.module.css";
import { contactContent } from "@/lib/pageContent";

export default function ContactMe() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (status === "success" || status === "error") {
      const t = setTimeout(() => {
        setStatus("idle")
        setErrorMessage("");
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [status]);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if(!siteKey) return;

    if(document.querySelector('#recaptcha-script')) return;

    const script = document.createElement('script');
    script.id = 'recaptcha-script'

    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      const recaptcha_token = await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(siteKey!, { action: 'contact_form'}).then(resolve).catch(reject)
        });
      });
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptcha_token }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        setErrorMessage(data.error || "Something went wrong. Please try again.")
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div className={`page ${styles.page}`}>
      <div className={styles.inner}>

        <h1 className={`${styles.heading} reveal`}>{contactContent.heading}</h1>

        {/* Social links */}
        <div className={`${styles.socials} reveal reveal-delay-1`}>
          <a
            href="https://github.com/SeturamanKumar"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialCard}
          >
            <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            <div>
              <p className={styles.socialName}>GitHub</p>
              <p className={styles.socialSub}>Check my code</p>
            </div>
            <span className={styles.socialArrow}>↗</span>
          </a>

          <a
            href="https://www.linkedin.com/in/seturaman-kumar-955615320/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialCard}
          >
            <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <div>
              <p className={styles.socialName}>LinkedIn</p>
              <p className={styles.socialSub}>Let's connect</p>
            </div>
            <span className={styles.socialArrow}>↗</span>
          </a>
        </div>

        {/* Form */}
        <form className={`${styles.form} reveal reveal-delay-2`} onSubmit={handleSubmit} noValidate>

          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              id="name" name="name" type="text"
              placeholder="Your Name" required
              className={styles.input}
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email" name="email" type="email"
              placeholder="yourname@example.com" required
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="message" className={styles.label}>Message</label>
            <textarea
              onChange={handleChange}
              id="message" name="message"
              placeholder="Hello, let's talk about something..."
              required
              className={styles.textarea}
              value={formData.message}
            />
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "error" && errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}

          <p className={styles.recaptchaDisclosure}>
            Protected by reCAPTCHA -{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Privacy
            </a>{" "}
            &{" "}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
              Terms
            </a>
          </p>

        </form>
      </div>

      {status === "success" && (
        <div className={`${styles.toast} ${styles.toastSuccess}`}>
          <span>✓</span> Message sent successfully
        </div>
      )}
    </div>
  );
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}
