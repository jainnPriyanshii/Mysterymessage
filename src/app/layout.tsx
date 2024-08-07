import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Authprovider from "@/context/Authprovider";
import { Toaster } from "@/components/ui/toaster"



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mystery Message",
  description: "Generated by Priyanshi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Authprovider>
      <body className={inter.className}>
      
        {children}
      <Toaster />
      </body>
      </Authprovider>
     
    </html>
  );
}
