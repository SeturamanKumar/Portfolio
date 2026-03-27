"use client";
import { useEffect, useState, useRef } from "react";
import { SCRAMBLE_DURATION } from "@/lib/scrambleConfig";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
const FRAME_INTERVAL = 15;

function randomChar(): string {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

export function useScramble(text: string, delay: number = 0) {
  const [display, setDisplay] = useState("");
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if(!text) return;

    setDisplay("");

    const delayTimer = setTimeout(() => {
      startRef.current = performance.now();

      function tick() {
        const elapsed = performance.now() - (startRef.current ?? 0);
        const progress = Math.min(elapsed / SCRAMBLE_DURATION, 1);
        const resolvedCount = Math.floor(progress * text.length);

        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < resolvedCount) return char;
            if (i === resolvedCount) return randomChar();
              return "";
            })
            .join("")
        );

        if (progress < 1) {
          frameRef.current = setTimeout(tick, FRAME_INTERVAL);
        }
      }

      tick();
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [text, delay]);

  return display;
}
