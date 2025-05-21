"use client";

import React, { useEffect, useState } from "react";
import { useUserAuth } from "@/context/userAuth";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import heroImage from "@/public/dashboard-hero-image.png";
import Link from "next/link";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { LuBrainCircuit } from "react-icons/lu";
import { FaUserEdit } from "react-icons/fa";

const HeroSection = () => {
  const { user } = useUserAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for user fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!user) {
        window.location.href = "/signin";
      }
    }, 1250); // Optional delay to show skeleton

    return () => clearTimeout(timer);
  }, [user]);

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 min-h-screen py-10 flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-10 md:gap-16">
        {/* Left Section Skeleton */}
        <div className="flex flex-col gap-6 w-full md:max-w-xl">
          <Skeleton className="h-8 w-1/4" /> {/* Welcome text */}
          <Skeleton className="h-14 w-1/2" /> {/* User name */}
          <Skeleton className="h-20 w-full" /> {/* Description text */}
          <div className="space-y-2 w-full max-w-xs sm:max-w-sm">
            <Skeleton className="h-6 w-1/2" /> {/* Profile strength label */}
            <Skeleton className="h-4 w-full" /> {/* Progress bar */}
          </div>
          <Skeleton className="h-10 w-full" /> {/* Profile status text */}
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-10 w-40" /> {/* Button 1 */}
            <Skeleton className="h-10 w-52" /> {/* Button 2 (if shown) */}
          </div>
          <Skeleton className="h-16 w-full" /> {/* Tip box */}
        </div>

        {/* Right Section Skeleton (Image) */}
        <div className="w-full md:w-auto hidden md:flex justify-center">
          <Skeleton className="w-64 sm:w-80 md:w-[420px] h-[280px] rounded-md" />
        </div>
      </section>
    );
  }

  const totalFields = 5;
  let filledFields = 0;

  if (user?.name?.trim()) filledFields++;
  if (user?.location?.trim()) filledFields++;
  if (typeof user?.yearsOfExperience === "number" && user.yearsOfExperience > 0)
    filledFields++;
  if (Array.isArray(user?.skills) && user.skills.length > 0) filledFields++;
  if (["Remote", "Hybrid", "Onsite"].includes(user?.jobType)) filledFields++;

  const profileCompletion = (filledFields / totalFields) * 100;
  const isComplete = profileCompletion === 100;
  const getFirstName = (fullName) => fullName?.split(" ")[0] || "User";

  return (
    <section className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col-reverse md:flex-row items-center justify-center md:justify-between min-h-screen py-10 gap-10 md:gap-16">
      <div className="flex flex-col gap-6 w-full md:max-w-xl text-center md:text-left">
        <div>
          <p className="text-3xl font-semibold text-blue-800">Welcome</p>
          <h1 className="text-5xl font-extrabold tracking-wide text-blue-900 leading-wide">
            {getFirstName(user?.name)}
          </h1>
          <p className="mt-3 text-gray-700 text-base sm:text-lg">
            We’re excited to have you on board! Let’s enhance your profile so we
            can recommend the most relevant job opportunities tailored just for
            you.
          </p>
        </div>

        {!isComplete && (
          <div className="space-y-2 w-full max-w-xs sm:max-w-sm mx-auto md:mx-0">
            <p className="text-base sm:text-lg font-medium text-blue-900">
              Profile Strength:{" "}
              <span className="font-semibold">
                {profileCompletion.toFixed(0)}%
              </span>
            </p>
            <Progress value={profileCompletion} />
          </div>
        )}

        <div className="text-sm sm:text-base text-gray-800 px-2 sm:px-0">
          <p>
            {isComplete
              ? "Your profile is fully complete. Keep it updated for the most accurate AI job matches."
              : "Complete your profile to unlock smart job recommendations tailored to your expertise and preferences."}
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-3">
          <Link href="/dashboard/edit-profile" className="w-2/3 md:w-auto">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-base w-full md:w-auto">
              <FaUserEdit />
              {isComplete ? "Update Profile" : "Complete Profile"}
            </Button>
          </Link>
          {isComplete && (
            <Link href="/dashboard/jobs" className="w-2/3 md:w-auto">
              <Button
                variant="secondary"
                className="border border-blue-400 text-blue-900 text-base w-full md:w-auto"
              >
                <LuBrainCircuit />
                Explore AI-Powered Jobs
              </Button>
            </Link>
          )}
        </div>

        <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md text-sm text-blue-900 shadow-sm">
          <p>
            <MdOutlineTipsAndUpdates className="inline-block mr-2 align-text-bottom" />
            <strong>Tip:</strong> A complete profile enables smarter and more
            accurate job matching using AI.
          </p>
        </div>
      </div>

      <div className="w-full md:w-auto md:flex justify-center hidden">
        <Image
          src={heroImage}
          alt="Dashboard illustration"
          className="w-64 sm:w-80 md:w-[420px] h-auto object-contain drop-shadow-lg"
          priority
        />
      </div>
    </section>
  );
};

export default HeroSection;
