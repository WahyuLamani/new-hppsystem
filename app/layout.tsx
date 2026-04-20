import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HPP system by lumi and bloom",
  description: "HPP system by lumi and bloom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-[max(884px,100dvh)] text-on-surface`}
      >
        <div className="canvas-container flex flex-col pb-32">{children}</div>
      </body>
    </html>
  );
}
