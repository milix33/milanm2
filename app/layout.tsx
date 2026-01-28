import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "M² Architecture",
  description: "M² Architecture – Projektovanje · Nadzor · Konsulting"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

