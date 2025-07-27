import React, { useState } from "react";
import './Contact.css';

function Contact(){
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [confirmation, setConfirmation] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = { name, email, message};
        setConfirmation('Sending...');

        try {
            const response = await fetch('http://localhost:5001/api/contact', {
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
                    <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <textarea placeholder="Your Message" rows='7' value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                    <button type="submit">Send Message</button>
                </form>
                {confirmation && <p className="confirmation-message">{confirmation}</p>}
            </div>
        </section>
    );

}

export default Contact;