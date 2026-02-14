"use client";

import { useState, useEffect } from "react";
import styles from "./ContactMe.module.css";
    
export default function ContactMe() {

    const [status, setStatus] = useState<string | null>(null);
    const [formData, setFormData] = useState({name: '', email: '', message: ''});
    
    useEffect(() => {
        if(status === 'success' || status === 'error') {
            const timer = setTimeout(() => (
                setStatus(null)
            ), 3000);
            return () => {
                clearTimeout(timer);
            }
        }
    }, [status])

    async function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
            const response = await fetch(`/api/contact/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if(response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } 
        catch(e) {
            console.error('Error', e);
            setStatus('error');
        }
    }

    return(
        <section className={styles.container}>
            <h2 className={styles.title}>Get In Touch</h2>
            <div className={styles.cardGrid}>
                <a 
                    href="https://github.com/SeturamanKumar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.card}
                >
                    <div className={styles.cardIcon}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </div>
                    <span className={styles.cardTitle}>GitHub</span>
                    <span className={styles.cardSub}>Check my code</span>
                </a>
                <a 
                    href="https://www.linkedin.com/in/seturaman-kumar-955615320/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.card}
                >
                    <div className={styles.cardIcon}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect width="4" height="12" x="2" y="9"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                    </div>
                    <span className={styles.cardTitle}>LinkedIn</span>
                    <span className={styles.cardSub}>Let's connect</span>
                </a>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input type="text" id="name" name="name" placeholder="Your Name" required className={styles.input} value={formData.name} onChange={handleChange}/>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input type="email" id="email" name="email" placeholder="yourname@example.com" required className={styles.input} value={formData.email} onChange={handleChange}/>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="message" className={styles.label}>Message</label>
                    <textarea id="message" name="message" placeholder="Hello, let's discuss something..." required className={styles.textarea} value={formData.message} onChange={handleChange}/>
                </div>
                <button type="submit" className={styles.sendButton} disabled={status === 'loading'}>
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
            </form>
            {
                status === 'success' && (
                    <div className={`${styles.toast} ${styles.success} ${styles.slideOut}`}>
                        <span>✅</span>
                        Message Sent Successfully
                    </div>
                )
            }

            {
                status === 'error' && (
                    <div className={`${styles.toast} ${styles.error} ${styles.slideOut}`}>
                        <span>❌</span>
                        Something Went Wrong
                    </div>
                )
            }
        </section>
    )

}