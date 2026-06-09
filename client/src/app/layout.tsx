import type { Metadata } from "next";
import styles from "./layout.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
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
        <div className={styles.container}>
          <Sidebar />
          <main className={styles.main}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
