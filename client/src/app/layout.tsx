import type { Metadata } from "next";
import styles from "./layout.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seturaman Kumar's Portfolio",
  description: "Built with Next.js and Standard CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
