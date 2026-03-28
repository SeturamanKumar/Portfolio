"use client";

import { useScramble } from "@/hooks/useScramble";

interface ScrambleTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function ScrambleText({ text, delay = 0, duration, className, as: Tag = "span", }: ScrambleTextProps) {
  const display = useScramble(text, delay, duration);

  return <Tag className={className}>{display}</Tag>
}
