import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { UserAuthProvider } from "@/context/userAuth";
import { UserProfileProvider } from "@/context/userProfile";
import { JobProvider } from "@/context/job";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Career Pulse",
  description: "Career Pulse is a platform that helps you find your dream job.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserAuthProvider>
          <UserProfileProvider>
            <JobProvider>
              {children}
              <Toaster />
            </JobProvider>
          </UserProfileProvider>
        </UserAuthProvider>
      </body>
    </html>
  );
}
