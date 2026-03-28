"use client";

import { useState, useEffect } from "react";
import styles from "./ContactMe.module.css";
import ScrambleText from "@/components/ScrambleText/ScrambleText";
import ScrambleCard from "@/components/ScrambleCard/ScrambleCard";
import { SCRAMBLE_DURATION, GAP } from "@/lib/scrambleConfig";
import { contactContent } from "@/lib/pageContent";

const STEP = SCRAMBLE_DURATION + GAP; // 800ms

const HEADING_DELAY   = 0;
const GITHUB_DELAY    = HEADING_DELAY  + STEP; // 800ms
const LINKEDIN_DELAY  = GITHUB_DELAY   + STEP; // 1600ms
const NAME_DELAY      = LINKEDIN_DELAY + STEP; // 2400ms
const EMAIL_DELAY     = NAME_DELAY     + STEP; // 3200ms
const MESSAGE_DELAY   = EMAIL_DELAY    + STEP; // 4000ms
const BUTTON_DELAY    = MESSAGE_DELAY  + STEP; // 4800ms

function slices(cardDelay: number, n: number) {
  const duration = SCRAMBLE_DURATION / n;
  return Array.from({ length: n }, (_, i) => ({
    delay: cardDelay + i * duration,
    duration,
  }));
}

export default function ContactMe() {
  const [status, setStatus] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (e) {
      console.error("Error", e);
      setStatus("error");
    }
  }

  const github   = slices(GITHUB_DELAY,   2); // icon label + sub
  const linkedin = slices(LINKEDIN_DELAY, 2);

  return (
    <section className={styles.container}>
      <ScrambleText as="h2" text={contactContent.heading} className={styles.title} delay={HEADING_DELAY} />

      <div className={styles.cardGrid}>

        <ScrambleCard
          as="a"
          href="https://github.com/SeturamanKumar"
          target="_blank"
          rel="noopener noreferrer"
          delay={GITHUB_DELAY}
          className={styles.card}
        >
          <div className={styles.cardIcon}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </div>
          <ScrambleText as="span" text="GitHub"          className={styles.cardTitle} delay={github[0].delay} duration={github[0].duration} />
          <ScrambleText as="span" text="Check my code"   className={styles.cardSub}   delay={github[1].delay} duration={github[1].duration} />
        </ScrambleCard>

        <ScrambleCard
          as="a"
          href="https://www.linkedin.com/in/seturaman-kumar-955615320/"
          target="_blank"
          rel="noopener noreferrer"
          delay={LINKEDIN_DELAY}
          className={styles.card}
        >
          <div className={styles.cardIcon}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </div>
          <ScrambleText as="span" text="LinkedIn"        className={styles.cardTitle} delay={linkedin[0].delay} duration={linkedin[0].duration} />
          <ScrambleText as="span" text="Let's connect"   className={styles.cardSub}   delay={linkedin[1].delay} duration={linkedin[1].duration} />
        </ScrambleCard>

      </div>

      <form className={styles.form} onSubmit={handleSubmit}>

        <ScrambleCard delay={NAME_DELAY} className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            <ScrambleText as="span" text="Name" delay={NAME_DELAY} />
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
          />
        </ScrambleCard>

        <ScrambleCard delay={EMAIL_DELAY} className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            <ScrambleText as="span" text="Email" delay={EMAIL_DELAY} />
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="yourname@example.com"
            required
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
          />
        </ScrambleCard>

        <ScrambleCard delay={MESSAGE_DELAY} className={styles.inputGroup}>
          <label htmlFor="message" className={styles.label}>
            <ScrambleText as="span" text="Message" delay={MESSAGE_DELAY} />
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Hello, let's discuss something..."
            required
            className={styles.textarea}
            value={formData.message}
            onChange={handleChange}
          />
        </ScrambleCard>

        <ScrambleCard delay={BUTTON_DELAY}>
          <button
            type="submit"
            className={styles.sendButton}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </ScrambleCard>

      </form>

      {status === "success" && (
        <div className={`${styles.toast} ${styles.success} ${styles.slideOut}`}>
          <span>✅</span> Message Sent Successfully
        </div>
      )}
      {status === "error" && (
        <div className={`${styles.toast} ${styles.error} ${styles.slideOut}`}>
          <span>❌</span> Something Went Wrong
        </div>
      )}
    </section>
  );
}
