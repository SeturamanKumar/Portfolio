"use client";

import { useScramble } from "@/hooks/useScramble";

interface ScrambleTextProps {
  text: string;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function ScrambleText({ text, delay = 0, className, as: Tag = "span", }: ScrambleTextProps) {
  const display = useScramble(text, delay);

  return <Tag className={className}>{display}</Tag>
}
