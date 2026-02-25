import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { getCounts } from "@/lib/data/counts";
import ConsoleGreeting from "@/components/ConsoleGreeting";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const counts = getCounts();

export const metadata: Metadata = {
  metadataBase: new URL("https://claude.travisjneuman.com"),
  title: {
    default: counts.seo.home.title,
    template: "%s | tjn.claude/",
  },
  description: counts.seo.home.description,
  alternates: { canonical: "/" },
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
    description: counts.tagline,
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "tjn.claude/ — Global Claude Code Development Toolkit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "tjn.claude/",
    description: counts.tagline,
    images: ["/og-image.jpg"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "tjn.claude/",
                  url: "https://claude.travisjneuman.com",
                  description: counts.seo.home.description,
                },
                {
                  "@type": "Organization",
                  name: "tjn.claude/",
                  url: "https://claude.travisjneuman.com",
                  logo: "https://claude.travisjneuman.com/icon-512.png",
                  sameAs: ["https://github.com/travisjneuman/.claude"],
                },
              ],
            }),
          }}
        />
        <ConsoleGreeting stats={counts.consoleText} />
        {children}
      </body>
    </html>
  );
}
