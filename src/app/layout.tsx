import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "SSL Airport Parking Services",
  description: "Seamless Airport Parking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          "flex flex-col"
        )}
      >
        <AuthProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
