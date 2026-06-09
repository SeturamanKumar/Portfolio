"use client";

import { useRef, useEffect } from "react";
import styles from "./TechMarquee.module.css";

const techStack = [
  "Python", "TypeScript", "JavaScript", "C++",
  "Django", "Node.js", "Next.js", "React",
  "PostgreSQL", "MongoDB", "Redis", "Docker",
  "Ansible", "Nginx", "AWS", "Azure",
  "Terraform", "Linux", "Arch Linux", "Git",
];

const SPEED = 0.45; // px per frame

export default function TechMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const halfRef = useRef(0);
  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const animId = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Wait one frame for layout
    const init = requestAnimationFrame(() => {
      halfRef.current = track.scrollWidth / 2;
    });

    function animate() {
      if (!dragRef.current) {
        xRef.current -= SPEED;
      }
      if (halfRef.current > 0 && xRef.current <= -halfRef.current) {
        xRef.current += halfRef.current;
      }
      if (track) track.style.transform = `translateX(${xRef.current}px)`;
      animId.current = requestAnimationFrame(animate);
    }
    animId.current = requestAnimationFrame(animate);

    // Mouse
    function onDown(e: MouseEvent) {
      dragRef.current = true;
      lastXRef.current = e.clientX;
      if (track) track.style.cursor = "grabbing";
    }
    function onMove(e: MouseEvent) {
      if (!dragRef.current) return;
      xRef.current += (e.clientX - lastXRef.current) * 1.6;
      lastXRef.current = e.clientX;
    }
    function onUp() {
      dragRef.current = false;
      if (track) track.style.cursor = "grab";
    }

    // Touch
    function onTouchStart(e: TouchEvent) {
      dragRef.current = true;
      lastXRef.current = e.touches[0].clientX;
    }
    function onTouchMove(e: TouchEvent) {
      if (!dragRef.current) return;
      xRef.current += (e.touches[0].clientX - lastXRef.current) * 1.6;
      lastXRef.current = e.touches[0].clientX;
    }
    function onTouchEnd() { dragRef.current = false; }

    track.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(init);
      cancelAnimationFrame(animId.current);
      track.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Triple for seamless wrap
  const items = [...techStack, ...techStack, ...techStack];

  return (
    <div className={styles.wrapper}>
      <div className={styles.fadeLeft} aria-hidden="true" />
      <div className={styles.fadeRight} aria-hidden="true" />
      <div ref={trackRef} className={styles.track}>
        {items.map((tech, i) => (
          <span key={i} className={styles.item}>
            {tech}
            <span className={styles.sep} aria-hidden="true"> · </span>
          </span>
        ))}
      </div>
    </div>
  );
}
