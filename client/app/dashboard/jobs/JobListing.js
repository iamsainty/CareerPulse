"use client";

import React, { useEffect, useState } from "react";
import useJob from "@/context/job";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";

const JobListing = () => {
  const { fetchJobs, jobs } = useJob();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchJobs().finally(() => setLoading(false));
    } else {
      router.push("/signin");
    }
  }, []);

  const skeletonArray = Array.from({ length: 3 });

  return (
    <section className="flex flex-col items-center justify-start min-h-screen mb-40 pt-32 md:pt-24 px-8 gap-12">
      <div className="flex flex-col gap-3 w-full">
        <h1 className="text-2xl md:text-4xl font-bold">Jobs based on your profile</h1>
        <p className="text-base md:text-lg text-muted-foreground">
          We found some jobs that match your profile.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {loading
          ? skeletonArray.map((_, idx) => (
              <Card
                key={idx}
                className="w-full border border-muted rounded-2xl px-2 py-4"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-5 w-16 rounded-md" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <div className="flex gap-2 flex-wrap pt-1">
                    <Skeleton className="h-6 w-14 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-12 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))
          : jobs.map((job) => (
              <Card
                key={job._id}
                className="w-full border border-muted rounded-2xl px-2 py-4"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-semibold text-foreground">
                        {job.jobTitle}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground mt-0.5">
                        {job.companyName}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs rounded-md">
                      {job.jobType}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 text-sm">
                  <p className="text-muted-foreground">{job.description}</p>

                  <div className="flex flex-wrap gap-4 text-muted-foreground text-xs">
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-[13px]" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaMoneyBillWave className="text-[13px]" />
                      <span>${job.salary?.toLocaleString() || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MdWork className="text-[13px]" />
                      <span>{job.experienceInYears}+ yrs</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-[13px]" />
                      <span>
                        {formatDistanceToNow(new Date(job.postedAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>

                  {job.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {job.skills.map((skill) => (
                        <Badge
                          key={skill}
                          className="rounded-full px-2 py-1 text-xs"
                          variant="secondary"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
      </div>
    </section>
  );
};

export default JobListing;