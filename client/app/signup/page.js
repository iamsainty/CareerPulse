"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserAuth } from "@/context/userAuth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function SignUp() {
  const { user } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const { signup } = useUserAuth();

  const handleSubmit = async () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!password) {
      toast.error("Please create a password");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const signupResponse = await signup(name, email, password);
    if (signupResponse === "Account created successfully") {
      toast.success("Account created successfully");
      router.push("/dashboard");
    } else {
      toast.error(signupResponse);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50">
      <div className="container mx-auto flex flex-col items-center justify-center max-w-[90%] md:w-2/5 bg-white rounded-2xl p-8 md:px-16 shadow-lg space-y-4">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Create your account
        </h1>
        <p className="text-gray-600 text-sm mb-4 text-center">
          Join the platform to get AI-powered job recommendations tailored to
          your profile.
        </p>

        <Input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <Input
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />

        <Button className="w-full mt-2 cursor-pointer" onClick={handleSubmit}>
          Sign Up
        </Button>

        <p className="text-sm text-gray-600 mt-2 text-center">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-blue-500 underline hover:text-blue-600"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}
