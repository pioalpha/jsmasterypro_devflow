import type { Metadata } from "next";
import localFont from "next/font/local";
// import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import React from "react";

import ThemeProvider from "@/context/Theme";

const inter = localFont({
  // const inter = Inter({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 700 800 900",
  // weight: ["100", "200", "300", "400", "500", "700", "800", "900"],
});

const spaceGrotesk = localFont({
  // const spaceGrotesk = Space_Grotesk({
  src: "./fonts/SpaceGroteskVF.ttf",
  variable: "--font-space-grotesk",
  weight: "300 400 500 700",
  // weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Dev Overflow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
