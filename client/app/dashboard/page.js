"use client";

import { useUserAuth } from "@/context/userAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import HeroSection from "./HeroSection";
export default function Dashboard() {
  const { user } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50 w-full">
      <HeroSection />
    </div>
  );
}
