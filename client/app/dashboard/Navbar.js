"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import React from "react";
import { LuLogOut, LuMenu } from "react-icons/lu";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/signin");
    router.refresh();
  };

  return (
    <nav className="flex justify-center items-center w-full px-4 fixed top-0 left-0 right-0 z-10 mt-10">
      <div className="flex justify-between items-center w-full max-w-3xl bg-blue-100 border border-blue-700 shadow-sm px-6 py-2 rounded-lg">
        <h1 className="text-blue-900 text-xl font-semibold tracking-wide select-none cursor-pointer">
          Career Pulse
        </h1>

        {/* Desktop Nav */}
        <ul className="justify-between items-center gap-8 font-semibold hidden md:flex">
          <Link href="/dashboard">
            <li>Dashboard</li>
          </Link>
          <Link href="/dashboard/jobs">
            <li>Jobs</li>
          </Link>
          <Link href="/dashboard/edit-profile">
            <li>Edit Profile</li>
          </Link>
        </ul>

        <Button className="bg-blue-400 hover:bg-blue-600 text-white px-6 py-2 text-sm font-semibold rounded transition-colors cursor-pointer hidden md:flex" onClick={handleSignOut}>
          Sign Out <LuLogOut className="ml-2" />
        </Button>

        {/* Mobile Nav - Sheet Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <LuMenu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-6 mt-6 text-blue-900 font-semibold">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/dashboard/jobs">Jobs</Link>
                <Link href="/dashboard/edit-profile">Edit Profile</Link>
                <Button className="bg-blue-400 hover:bg-blue-600 text-white mt-4" onClick={handleSignOut}>
                  Sign Out <LuLogOut className="ml-2" />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
