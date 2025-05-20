"use client";

import React, { useEffect, useState } from "react";
import { useUserAuth } from "@/context/userAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUserProfile } from "@/context/userProfile";
const EditProfile = () => {
  const { user, fetchUser } = useUserAuth();
  const { updateProfile } = useUserProfile();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    location: user?.location || "",
    yearsOfExperience: user?.yearsOfExperience || "",
    skills: Array.isArray(user?.skills)
      ? user.skills.join(", ")
      : user?.skills || "",
    jobType: user?.jobType || "",
  });

  const token = typeof window !== "undefined" && localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      router.push("/signin");
    }
  }, [token]);

  useEffect(() => {
    if (token && user === null) {
      router.push("/signin");
    }
  }, [user, token]);

  const handleSubmit = async () => {
    const { name, location, yearsOfExperience, skills, jobType } = formData;

    if (
      !name.trim() ||
      !location.trim() ||
      !yearsOfExperience ||
      !skills.trim() ||
      !jobType
    ) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    // Validate experience is a number and non-negative
    const experienceNum = Number(yearsOfExperience);
    if (isNaN(experienceNum) || experienceNum < 0) {
      toast.error("Years of experience must be a valid non-negative number.");
      return;
    }

    // Clean and validate skills
    const skillArray = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    if (skillArray.length === 0) {
      toast.error("Please enter at least one skill.");
      return;
    }

    try {
      const response = await updateProfile(
        name.trim(),
        location.trim(),
        experienceNum,
        skillArray,
        jobType
      );

      if (response === "Profile updated successfully!") {
        toast.success("Your profile has been updated");
        router.push("/dashboard");
      } else {
        toast.error(
          response || "Something went wrong while updating your profile."
        );
      }
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section className="container mx-auto flex flex-col items-center justify-center max-w-[90%] md:w-1/2 bg-white rounded-2xl p-8 md:px-16 shadow-lg space-y-8">
      <div className="w-full text-left">
        <h1 className="text-3xl font-bold ">Edit Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update your personal and professional details
        </p>
      </div>

      <div className="w-full space-y-3">
        <div className="space-y-1">
          <Label className="text-sm font-medium">Display Name</Label>
          <Input
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <Label className="text-sm font-medium">
            Email{" "}
            <span className="text-xs text-muted-foreground">
              (Cannot be changed)
            </span>
          </Label>
          <Input type="email" disabled value={formData.email} />
        </div>

        <div className="space-y-1">
          <Label className="text-sm font-medium">Your current location</Label>
          <Input
            type="text"
            placeholder="City, Country"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </div>

        <div className="space-y-1">
          <Label className="text-sm font-medium">
            Total years of experience
          </Label>
          <Input
            type="number"
            min="0"
            placeholder="e.g. 2"
            value={formData.yearsOfExperience}
            onChange={(e) =>
              setFormData({ ...formData, yearsOfExperience: e.target.value })
            }
          />
        </div>

        <div className="space-y-1">
          <Label className="text-sm font-medium">
            Skills{" "}
            <span className="text-xs text-muted-foreground">
              (Comma separated)
            </span>
          </Label>
          <Input
            type="text"
            placeholder="JavaScript, React, Node.js"
            value={formData.skills}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value })
            }
          />
        </div>

        <div className="space-y-1">
          <Label className="text-sm font-medium">Job Type</Label>
          <div className="flex gap-4">
            {["Remote", "Hybrid", "Onsite"].map((type) => (
              <label
                key={type}
                className={`flex items-center gap-2 text-sm ${
                  formData.jobType === type ? "font-semibold" : "font-normal"
                }`}
              >
                <Input
                  type="radio"
                  name="jobType"
                  value={type}
                  checked={formData.jobType === type}
                  onChange={(e) =>
                    setFormData({ ...formData, jobType: e.target.value })
                  }
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <Button
          className="w-full mt-6 hover:bg-primary/90 transition"
          onClick={handleSubmit}
        >
          Update Profile
        </Button>
      </div>
    </section>
  );
};

export default EditProfile;
