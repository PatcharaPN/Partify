"use client";
import ApplicantDetailModal from "@/app/components/ui/ApplicantDetailModal";
import ApplicantList from "@/app/components/ui/ApplicantList";
import ApplicantRow from "@/app/components/ui/ApplicantRow";
import AvatarStack from "@/app/components/ui/AvatarStack";
import FilterContainer from "@/app/components/ui/FilterContainer";
import JobRow from "@/app/components/ui/JobRow";
import PopupContainer from "@/app/components/ui/PopupContainer";
import SearchInput from "@/app/components/ui/Searchbar";
import TableHeader from "@/app/components/ui/TableHeader";
import { useEmployerJobs } from "@/app/hooks/useEmployerJobs";
import { useApplicant } from "@/app/hooks/useJobApplications";
import { Application, ApplicationStatus } from "@/app/types/job.type";
import { PopupState } from "@/app/types/ui.type";
import { Icon } from "@iconify/react";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import SkeletonApplicantPage from "./SkeletonApplicantPage";

export default function ApplicantPage() {
  const filterRef = useRef<HTMLDivElement>(null);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const handleClicOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClicOutside);
    return () => document.removeEventListener("mousedown", handleClicOutside);
  }, []);

  const {
    ownerApplications,
    loading,
    interviewApplication,
    approveApplication,
    rejectApplication,
  } = useApplicant();
  const [search, setSearch] = useState("");
  const [loadingState, setLoadingState] = useState<PopupState | null>(null);
  const [selectedApplicant, setSelectedApplicant] =
    useState<Application | null>(null);

  const handleApproveApps = async (id: string, status: ApplicationStatus) => {
    setLoadingState("loading");
    try {
      switch (status) {
        case "ACCEPTED":
          await approveApplication(id);
          break;
        case "REJECTED":
          await rejectApplication(id);
          break;
        case "INTERVIEW":
          await interviewApplication(id);
          break;
        default:
          break;
      }
      setLoadingState("success");
      setTimeout(() => {
        setLoadingState(null);
        setSelectedApplicant(null);
      }, 1500);
    } catch (error) {
      setLoadingState("error");
      setTimeout(() => {
        setLoadingState(null);
        setSelectedApplicant(null);
      }, 1500);
    }
  };
  const filteredApplicants = useMemo(() => {
    const keyword = search.toLowerCase();
    return ownerApplications.filter((app) => {
      const firstName = app.user?.profile?.firstName?.toLowerCase() ?? "";
      const lastName = app.user?.profile?.lastName?.toLowerCase() ?? "";
      const jobTitle = app.job?.title?.toLowerCase() ?? "";
      return (
        firstName.includes(keyword) ||
        lastName.includes(keyword) ||
        jobTitle.includes(keyword)
      );
    });
  }, [ownerApplications, search]);

  if (loading) {
    return <SkeletonApplicantPage />;
  }
  return (
    <div className="bg-white border border-gray-100 ">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <h2 className="text-base font-bold text-gray-900">จัดการผู้สมัคร</h2>
        <div className="flex items-center gap-2">
          <SearchInput value={search} onChange={setSearch} />
          <div className="relative " ref={filterRef}>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon icon="mdi:tune-vertical" className="w-4 h-4" />
            </button>{" "}
            <AnimatePresence>
              {showFilter && <FilterContainer />}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Table header */}
      <div className="grid grid-cols-[2.5fr_1fr_1fr_1.2fr_90px] px-6 py-2.5 bg-gray-50/60 border-b border-gray-50">
        {[
          "ชื่อผู้สมัคร",
          "ตำแหน่งที่สมัคร",
          "สมัครเมื่อ",
          "สถานะ",
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
      <ApplicantRow
        applications={filteredApplicants}
        onSelect={setSelectedApplicant}
      />

      {selectedApplicant && (
        <ApplicantDetailModal
          onStatusChange={handleApproveApps}
          applicants={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        />
      )}
      {loadingState && <PopupContainer state={loadingState} />}
    </div>
  );
}
