import type { Metadata } from "next";
import { gilroy, poppins } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Project Intelligence Platform",
  description: "Enterprise AI that monitors your engineering organization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gilroy.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
