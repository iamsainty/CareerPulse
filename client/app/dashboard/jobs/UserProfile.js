"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserAuth } from "@/context/userAuth";
import React from "react";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const { user } = useUserAuth();
  const router = useRouter();
  const loading = !user;

  return (
    <>
      <aside className="h-screen sticky top-0 px-4 py-6 md:flex flex-col gap-4 justify-center items-center hidden">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto p-8 space-y-6">
          <header className="space-y-1">
            <p className="text-sm">
              {loading ? (
                <Skeleton className="w-64 h-4" />
              ) : (
                "Here’s a quick summary of your details."
              )}
            </p>
          </header>

          {/* Info Section */}
          <section className="space-y-6">
            {[
              { label: "Name", value: user?.name },
              { label: "Email", value: user?.email },
              { label: "Location", value: user?.location },
              {
                label: "Years of Experience",
                value:
                  user?.yearsOfExperience !== undefined
                    ? `${user.yearsOfExperience} year(s)`
                    : undefined,
              },
              { label: "Preferred Job Type", value: user?.jobType },
            ].map((item) => (
              <div key={item.label}>
                <h2 className="text-xs font-semibold uppercase tracking-wide">
                  {item.label}
                </h2>
                <p className="text-base text-muted-foreground">
                  {loading ? (
                    <Skeleton className="w-40 h-5" />
                  ) : (
                    item.value || "N/A"
                  )}
                </p>
              </div>
            ))}
          </section>

          {/* Skills Section */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide mb-2">
              Skills
            </h2>
            {loading ? (
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            ) : user?.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full border text-sm text-muted-foreground bg-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-base text-foreground">N/A</p>
            )}
          </section>

          {/* Call-to-Action */}
          <div className="pt-6 border-t border-muted">
            <p className="text-sm mb-4">
              {loading ? (
                <Skeleton className="w-64 h-4" />
              ) : (
                "Update your profile to get more relevant job recommendations."
              )}
            </p>
            <Button
              onClick={() => router.push("/dashboard/edit-profile")}
              className="w-full hover:shadow-md transition"
              disabled={loading}
            >
              {loading ? <Skeleton className="w-24 h-5" /> : "Edit Profile"}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom CTA */}
      <div className="md:hidden fixed bottom-0 w-full bg-white p-6 rounded-t-4xl shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        <p className="text-sm text-center mb-3">
          {loading ? (
            <Skeleton className="w-full h-4 mx-auto" />
          ) : (
            "Job recommendations are tailored to your profile. Update it to receive more accurate matches."
          )}
        </p>
        <Button
          onClick={() => router.push("/dashboard/edit-profile")}
          className="w-full font-medium"
          disabled={loading}
        >
          {loading ? <Skeleton className="w-full h-5" /> : "Update Profile"}
        </Button>
      </div>
    </>
  );
};

export default UserProfile;
