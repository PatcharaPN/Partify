"use client";
import AvatarStack from "@/app/components/ui/AvatarStack";
import JobRow from "@/app/components/ui/JobRow";
import SearchInput from "@/app/components/ui/Searchbar";
import TableHeader from "@/app/components/ui/TableHeader";
import { useEmployerJobs } from "@/app/hooks/useEmployerJobs";
import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";

export default function ApplicantPage() {
  const { jobs } = useEmployerJobs();
  const [search, setSearch] = useState("");
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [jobs, search]);
  return (
    <div className="bg-white border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <h2 className="text-base font-bold text-gray-900">จัดการประกาศงาน</h2>
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
        <JobRow
          key={job.id}
          job={job}
          href={`/dashboard/employer/applicants/${job.id}`}
        />
      ))}
      {filteredJobs.length === 0 && (
        <div className="py-12 text-center text-gray-400 text-sm">
          No roles match your search.
        </div>
      )}
    </div>
  );
}
