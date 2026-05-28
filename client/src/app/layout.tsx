import type { Metadata } from "next";
import styles from "./layout.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import CursorGlow from "@/components/CursorGlow/CursorGlow";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seturaman Kumar's Portfolio",
  description: "Full Stack Developer & DevOps Engineer — IIT BHU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CursorGlow />
        <div className={styles.container}>
          <Sidebar />
          <main className={styles.main}>
            <div className={`${styles.content} ${styles.safePaddingBottom}`}>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
