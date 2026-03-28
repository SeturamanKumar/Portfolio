"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";
import { useScramble } from "@/hooks/useScramble";
import { SCRAMBLE_DURATION, GAP } from "@/lib/scrambleConfig";

const STEP = SCRAMBLE_DURATION + GAP; // 800ms

const navItems = [
  { name: "Home",     path: "/" },
  { name: "About",    path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact",  path: "/contact" },
];

interface NavLinkProps {
  name: string;
  path: string;
  isActive: boolean;
  initialDelay: number;
}

function NavLink({ name, path, isActive, initialDelay }: NavLinkProps) {
  const display = useScramble(name, isActive ? 0 : initialDelay);

  return (
    <Link
      href={path}
      className={`${styles.link} ${isActive ? styles.active : ""}`}
    >
      <span className={styles.linkText}>{display}</span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {navItems.map((item, index) => {
          const isActive =
            item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);
          return (
            <NavLink
              key={isActive ? `${item.path}-active`: item.path}
              name={item.name}
              path={item.path}
              isActive={isActive}
              initialDelay={index * STEP}
            />
          );
        })}
      </nav>
    </aside>
  );
}
