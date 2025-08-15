import React, { useState } from "react";
import './Contact.css';

function Contact(): React.JSX.Element {
    
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [confirmation, setConfirmation] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = { name, email, message};
        setConfirmation('Sending...');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                });

            if(response.ok){
                setName('');
                setEmail('');
                setMessage('');
                setConfirmation('Message sent successfull! Thank you.');
            } else {
                setConfirmation('Failed to send message. Please try again.')
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setConfirmation('An error occured. Please try again.');
        }
    };

    return(
        <section id="contact" className="contact">
            <div className="contact-container">
                <h2 className="contact-title">Contact Me</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                    <input type="text" placeholder="Your Name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} required />
                    <input type="email" placeholder="Your Email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required />
                    <textarea placeholder="Your Message" rows={7} value={message} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} required></textarea>
                    <button type="submit">Send Message</button>
                </form>
                {confirmation && <p className="confirmation-message">{confirmation}</p>}
            </div>
        </section>
    );

}

export default Contact;