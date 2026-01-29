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
  metadataBase: new URL("https://claude.travisjneuman.com"),
  title: "tjn.claude/ | Skills, Agents & Marketplace",
  description:
    "A comprehensive Claude Code configuration with 72 local skills, 36 specialized agents, and 1,700+ marketplace skills across 50 repos. Supercharge your AI-assisted development.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "tjn.claude/",
    description:
      "72 Skills, 36 Agents & 1,700+ Marketplace Skills for Claude Code",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "tjn.claude/ — Global Claude Code Development Toolkit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "tjn.claude/",
    description:
      "72 Skills, 36 Agents & 1,700+ Marketplace Skills for Claude Code",
    images: ["/og-image.png"],
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
