import React from "react";
import { useUserAuth } from "@/context/userAuth";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import heroImage from "@/public/dashboard-hero-image.png";

const HeroSection = () => {
  const { user } = useUserAuth();

  const totalFields = 5;
  let filledFields = 0;

  if (user?.name) filledFields++;
  if (user?.location) filledFields++;
  if (user?.yearsOfExperience) filledFields++;
  if (user?.skills) filledFields++;
  if (user?.jobType) filledFields++;

  const profileCompletion = (filledFields / totalFields) * 100;
  const isComplete = profileCompletion === 100;

  const getFirstName = (fullName) => {
    return fullName?.split(" ")[0] || "User";
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col-reverse md:flex-row items-center justify-center min-h-screen py-10 gap-10 md:gap-14">
      <div className="flex flex-col gap-5 w-full md:max-w-xl text-center md:text-left">
        <div>
          <p className="text-3xl font-medium text-blue-900">Welcome</p>
          <h1 className="text-5xl font-extrabold tracking-wide text-blue-900 leading-tight">
            {getFirstName(user?.name)}
          </h1>
        </div>

        <div className="space-y-2 w-full max-w-xs sm:max-w-sm mx-auto md:mx-0">
          <p className="text-base sm:text-lg font-medium text-blue-900">
            Profile Completion: {profileCompletion.toFixed(0)}%
          </p>
          <Progress value={profileCompletion} />
        </div>

        <p className="text-base text-gray-700 px-2 sm:px-0">
          {isComplete
            ? "Your profile is complete. If you wish, you can update your data."
            : "Complete your profile to start using AI to find the best job for your skills."}
        </p>

        <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white text-base cursor-pointer">
            {isComplete ? "Update Profile" : "Complete Profile"}
          </Button>
          {isComplete && (
            <Button
              variant="secondary"
              className="border border-blue-300 text-blue-900 text-base cursor-pointer"
            >
              Find Jobs with AI
            </Button>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="w-full md:w-auto md:flex justify-center hidden">
        <Image
          src={heroImage}
          alt="Hero Image"
          className="w-64 sm:w-80 md:w-[420px] h-auto object-contain"
          priority
        />
      </div>
    </section>
  );
};

export default HeroSection;
