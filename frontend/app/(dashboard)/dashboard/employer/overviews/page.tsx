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
import Link from "next/link";

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
          name={user?.profile?.firstName}
        />

        <div className="px-8 py-6 space-y-6">
          <div className="grid grid-cols-4 gap-4">
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
              value="99"
            />

            <StatCard
              icon="mdi:briefcase-outline"
              color="blue"
              label="Active Jobs"
              value={jobs.filter((j) => j.status === "ACTIVE").length}
            />

            <StatCard
              icon="mdi:clock-outline"
              color="yellow"
              label="Pending Review"
              value={
                jobs
                  .flatMap((j) => j.applications ?? [])
                  .filter((a) => a.status === "PENDING").length
              }
            />
          </div>

          {/* Manage Jobs */}
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-[2fr_1fr] gap-6">
              <div className="bg-white p-2 rounded-2xl">
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
                <div className="flex p-2 justify-end w-full border-t border-gray-100">
                  <Link
                    href={"/dashboard/employer/job"}
                    className="text-primary"
                  >
                    ดูทั้งหมด
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <h2 className="font-bold text-gray-900 mb-4">ผู้สมัครล่าสุด</h2>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
