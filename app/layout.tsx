import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blush&Wear | Premium Cosmetics",
  description: "Experience the ultimate in premium cosmetics and skincare. Elegant, effective, and ethically made.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            <Toaster position="bottom-right" reverseOrder={false} />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
