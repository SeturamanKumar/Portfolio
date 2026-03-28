"use client";

import { useEffect, useState } from "react";
import styles from "./ScrambleCard.module.css";

interface ScrambleCardProps {
  delay?: number;
  className?: string;
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  href?: string;
  target?: string;
  rel?: string;
}

export default function ScrambleCard({
  delay = 0,
  className,
  children,
  as: Tag = "div",
  href,
  target,
  rel,
}: ScrambleCardProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Tag
      className={`${styles.card} ${visible ? styles.visible : ""} ${className ?? ""}`}
      href={href}
      target={target}
      rel={rel}
    >
      {children}
    </Tag>
  );
}
