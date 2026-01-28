import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Claude Code Supercharged | 69 Skills, 37 Agents, 1,496+ Marketplace",
  description:
    "A comprehensive Claude Code configuration with 69 local skills, 37 specialized agents, and 1,496+ marketplace skills. Supercharge your AI-assisted development.",
  openGraph: {
    title: "Claude Code Supercharged",
    description: "69 Skills | 37 Agents | 1,496+ Marketplace Skills",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
