"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUserAuth } from "@/context/userAuth";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { user } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { signin } = useUserAuth();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async () => {
    const { email, password } = formData;

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    const signinResponse = await signin(email, password);
    if (signinResponse === "Signed in successfully") {
      toast.success("Signed in successfully hjh");
      window.location.href = "/dashboard";
    } else {
      toast.error(signinResponse);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50">
      <div className="container mx-auto flex flex-col items-center justify-center max-w-[90%] md:w-2/5 bg-white rounded-2xl p-8 md:px-16 shadow-lg space-y-4">
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-600 text-sm mb-4 text-center">
          Sign in to access your personalized job matches powered by AI.
        </p>

        <Input
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Your password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <Button className="w-full mt-2" onClick={handleSubmit}>
          Sign In
        </Button>

        <p className="text-sm text-gray-600 mt-2 text-center">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-500 underline hover:text-blue-600"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
