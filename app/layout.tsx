import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "Jack Shanks - Pirate Portfolio",
  description: "Set sail through Jack Shanks' interactive pirate-themed portfolio. Full-Stack Developer specializing in microservices and AI.",
  keywords: ["Jack Shanks", "Full-Stack Developer", "Portfolio", "React", "Next.js", "TypeScript", "AI", "Microservices"],
  authors: [{ name: "Jack Shanks" }],
  openGraph: {
    title: "Jack Shanks - Pirate Portfolio",
    description: "Set sail through Jack Shanks' interactive pirate-themed portfolio. Full-Stack Developer specializing in microservices and AI.",
    type: "website",
    locale: "en_US",
    siteName: "Jack Shanks Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jack Shanks - Pirate Portfolio",
    description: "Set sail through Jack Shanks' interactive pirate-themed portfolio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pressStart2P.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
