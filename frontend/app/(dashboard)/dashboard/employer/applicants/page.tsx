"use client";
import ApplicantList from "@/app/components/ui/ApplicantList";
import AvatarStack from "@/app/components/ui/AvatarStack";
import JobRow from "@/app/components/ui/JobRow";
import SearchInput from "@/app/components/ui/Searchbar";
import TableHeader from "@/app/components/ui/TableHeader";
import { useApplicant } from "@/app/hooks/useApplicant";
import { useEmployerJobs } from "@/app/hooks/useEmployerJobs";
import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";

export default function ApplicantPage() {
  const { ownerApplications } = useApplicant();
  const [search, setSearch] = useState("");
  const applicants = useMemo(() => {
    return ownerApplications.filter((applicant) =>
      applicant.user?.profile?.firstName
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [ownerApplications, search]);
  return (
    <div className="bg-white border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <h2 className="text-base font-bold text-gray-900">จัดการผู้สมัคร</h2>
        <div className="flex items-center gap-2">
          <SearchInput value={search} onChange={setSearch} />
          <button className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
            <Icon icon="mdi:tune-vertical" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[2.5fr_1fr_1fr_1.2fr_90px] px-6 py-2.5 bg-gray-50/60 border-b border-gray-50">
        {[
          "ชื่อผู้สมัคร",
          "ตำแหน่งที่สมัคร",
          "ผู้สมัคร",
          "วันที่ประกาศ",
          "การจัดการ",
        ].map((h) => (
          <span
            key={h}
            className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold"
          >
            {h}
          </span>
        ))}
      </div>
      {/* JobRow */}

      <ApplicantList applications={applicants} />

      {/* {filteredJobs.length === 0 && (
        <div className="py-12 text-center text-gray-400 text-sm">
          No roles match your search.
        </div>
      )} */}
    </div>
  );
}
