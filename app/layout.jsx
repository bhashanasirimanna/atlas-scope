import { Inter, Over_the_Rainbow } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { AuthProvider } from "@/components/auth-provider";
import { icons } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Atlas Scope",
  description:
    "Explore countries around the world with detailed information and interactive maps",
  generator: "v0.dev",
  icons: {
    icon: "/icons/icon.png",
    shortcut: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
    other: {
      rel: "icon",
      url: "/icons/icon.png",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className=" w-full">{children}</main>
              <footer className="border-t py-4 w-full">
                <div className="container flex flex-col max-w-[1200px] mx-auto items-center justify-between gap-4 md:flex-row">
                  <p className="text-center text-sm text-muted-foreground w-full">
                    &copy; {new Date().getFullYear()} Atlas Scope. All rights
                    reserved.
                  </p>
                </div>
              </footer>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
