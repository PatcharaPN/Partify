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
import ApplicantList from "@/app/components/ui/ApplicantList";
import { useApplicant } from "@/app/hooks/useJobApplications";

export default function EmployerDashboard() {
  const { jobs, user, isLoading, totalApplicants } = useEmployerJobs();
  const { ownerApplications } = useApplicant();
  const [search, setSearch] = useState("");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [jobs, search]);

  const recentApllicants = useMemo(() => {
    return [...ownerApplications]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5);
  }, [ownerApplications]);
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
              label="ผู้สมัครทั้งหมด"
              value={totalApplicants}
            />

            <StatCard
              icon="mdi:check-circle-outline"
              color="orange"
              label="รับเข้าทำงานทั้งหมด"
              value={
                jobs
                  .flatMap((j) => j.applications ?? [])
                  .filter((a) => a.status === "ACCEPTED").length
              }
            />

            <StatCard
              icon="mdi:briefcase-outline"
              color="blue"
              label="งานที่ลงประกาศอยู่"
              value={jobs.filter((j) => j.status === "active").length}
            />

            <StatCard
              icon="mdi:clock-outline"
              color="yellow"
              label="รอการตอบกลับ"
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
                <div className="flex justify-between items-center w-full">
                  <h2 className="flex p-2 justify-start border-b border-gray-100 font-semibold">
                    ผู้สมัครล่าสุด
                  </h2>
                  <Link href={"/dashboard/employer/applicants"}>
                    <p className="text-primary w-fit">ดูทั้งหมด</p>
                  </Link>
                </div>
                <ApplicantList applications={recentApllicants} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
