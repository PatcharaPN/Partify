"use client";

import SkeletonDashboard from "../skeletonDashboard";

import { Icon } from "@iconify/react";
import TableHeader from "@/app/components/ui/TableHeader";
import JobRow from "@/app/components/ui/JobRow";
import { useEmployerJobs } from "@/app/hooks/useEmployerJobs";
import SearchInput from "@/app/components/ui/Searchbar";
import { useMemo, useState } from "react";
import DashboardHeader from "@/app/components/ui/DashboardHeader";
import StatCard from "@/app/components/ui/StatCard";

export default function EmployerDashboard() {
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
        <DashboardHeader
          title="แดชบอร์ดผู้ประกอบการ"
          name={user?.profile?.name}
        />

        <div className="px-8 py-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard
              icon="mdi:eye-outline"
              color="blue"
              label="Total Views"
              value="2,482"
              change="+12%"
            />

            <StatCard
              icon="mdi:account-group-outline"
              color="violet"
              label="Total Applicants"
              value={totalApplicants}
              change="+5%"
            />

            <StatCard
              icon="mdi:check-circle-outline"
              color="orange"
              label="Total Hires"
              value="8"
            />
          </div>

          {/* Manage Jobs */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h2 className="text-base font-bold text-gray-900">
                จัดการประกาศงาน
              </h2>
              <div className="flex items-center gap-2">
                <SearchInput value={search} onChange={setSearch} />
                <button className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
                  <Icon icon="mdi:tune-vertical" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table header */}
            <TableHeader />
            {/* JobRow */}
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
}
