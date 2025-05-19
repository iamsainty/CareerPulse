"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center text-center px-4 sm:px-8 py-24 w-full h-full max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-blue-900 tracking-tight text-balance ">
        Skilled but Struggling to Land a Job?
      </h1>

      <p className="text-lg sm:text-xl max-w-3xl mb-4 font-medium leading-relaxed">
        Introducing <span className="font-bold text-blue-900">CareerPulse</span>{" "}
        — your smart, AI-powered job matchmaker
      </p>

      <p className="text-base sm:text-lg max-w-3xl mb-10 leading-relaxed">
        Browse through thousands of jobs, and find the perfect fit with your
        skills and preferences.
      </p>

      <Button
        onClick={() => router.push("/signup")}
        className="bg-blue-400 hover:bg-blue-600 text-white px-6 py-3 text-lg font-semibold rounded-sm shadow-md transition-all duration-300 cursor-pointer"
        aria-label="Get started with Career Pulse"
      >
        Find Your Next Job Now
      </Button>
    </section>
  );
};

export default HeroSection;
