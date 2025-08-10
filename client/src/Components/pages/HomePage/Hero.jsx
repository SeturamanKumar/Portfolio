import React from "react";
import './Hero.css';

function Hero(){

    return(
        <section id="hero" className="hero">
            <div className="hero-content">
                <h1>Seturaman Kumar</h1>
                <p className="hero-subtitle">Web Developer & Tech Enthusiast</p>
                <a href="#projects" className="hero-button">View My Work</a>
            </div>
        </section>
    )

}

export default Hero;