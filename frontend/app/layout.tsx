import type { Metadata } from "next";
import { Geist, Geist_Mono, Kanit, Mitr } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const kanit = Kanit({
  weight: ["200", "400"],
  subsets: ["latin"],
  variable: "--font-kanit",
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Partify",
    default: "Partify",
  },
  description: "Find your next opportunity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${kanit.variable} h-full antialiased`}
    >
      <body className="min-h-screen">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
