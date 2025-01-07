import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clothing Classifier",
  description: "Full-stack web app: Next.js, Flask, Tensorflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background">
        {children}
      </body>
    </html>
  );
}
