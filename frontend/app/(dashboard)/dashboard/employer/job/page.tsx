"use client";
import DashboardHeader from "@/app/components/ui/DashboardHeader";
import SearchInput from "@/app/components/ui/Searchbar";
import StatCard from "@/app/components/ui/StatCard";
import TableHeader from "@/app/components/ui/TableHeader";
import { Icon } from "@iconify/react";
import React, { useMemo, useState } from "react";
import SkeletonDashboard from "../skeletonDashboard";
import { useEmployerJobs } from "@/app/hooks/useEmployerJobs";
import JobRow from "@/app/components/ui/JobRow";

const JobListPage = () => {
  const { jobs, user, isLoading, totalApplicants } = useEmployerJobs();
  const [search, setSearch] = useState("");
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [jobs, search]);
  if (isLoading) {
    return <SkeletonDashboard />;
  }
  return (
    <div className="flex h-[calc(100vh-70px)] bg-gray-50 font-sans text-gray-900 antialiased overflow-hidden">
      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="px-8 py-6 space-y-6">
          {/* Manage Jobs */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h2 className="text-base font-bold text-gray-900">
                จัดการประกาศงาน
              </h2>
              <div className="flex items-center gap-2">
                <SearchInput value={search} onChange={setSearch} />
              </div>
            </div>

            <TableHeader />
            {filteredJobs.map((job) => (
              <JobRow key={job.id} job={job} />
            ))}
            {filteredJobs.length === 0 && (
              <div className="py-12 text-center text-gray-400 text-sm">
                No roles match your search.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobListPage;
