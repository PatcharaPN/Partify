"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useJobApplications } from "@/app/hooks/useJobApplications";
import { useParams } from "next/navigation";
import { formatTimeAgo } from "@/app/utils/FormatTimeAgo";
import ApplicantDetailModal from "@/app/components/ui/ApplicantDetailModal";
import { Application, ApplicationStatus } from "@/app/types/job.type";
import { axiosInstance } from "@/app/lib/axiosInstance";
import PopupContainer from "@/app/components/ui/PopupContainer";
import { PopupState } from "@/app/types/ui.type";

export default function ApplicantsPage() {
  const params = useParams();
  const jobId = params.jobId as string;
  const { jobDetail, approveApplication, totalApplicants } =
    useJobApplications(jobId);
  const [view, setView] = useState<"list" | "grid">("list");
  const [activeFilter, setActiveFilter] = useState("All Statuses");
  const [loadingState, setLoadingState] = useState<PopupState | null>(null);
  const [selectedApplicant, setSelectedApplicant] =
    useState<Application | null>(null);
  const now = new Date();
  const last24hr = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(totalApplicants / pageSize));
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalApplicants);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const applications = jobDetail?.applications ?? [];
  const sorted = [...applications]
    .filter((a) => a.status === "PENDING")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  const paginatedApplicants = sorted.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  const newCandidate = applications.filter(
    (c) => new Date(c.createdAt) >= last24hr,
  ).length;

  const interviews = applications.filter(
    (i) => i.status === "INTERVIEW",
  ).length;

  const handleApproveApps = async (id: string, status: ApplicationStatus) => {
    setLoadingState("loading");
    try {
      if (status === "ACCEPTED") {
        await approveApplication(id);
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
      console.error(error);
    }
  };
  return (
    <div className="h-[calc(100vh-70px)] bg-[#F4F6FA] font-sans">
      <div className="flex flex-col justify-between h-full mx-auto px-6 py-8">
        <div>
          <div className="flex items-start justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">
                {jobDetail?.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>
                  {jobDetail?.status === "active" ? (
                    <span className="text-emerald-500">Active</span>
                  ) : (
                    <span className="text-gray-500">Unactive</span>
                  )}
                </span>
                <span>{jobDetail?.location}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-center px-5 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-2xl font-bold text-blue-600">
                  {" "}
                  {totalApplicants}
                </div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mt-0.5">
                  Total Applicants
                </div>
              </div>
              <div className="text-center px-5 py-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                <div className="text-2xl font-bold text-white">
                  {newCandidate}
                </div>
                <div className="text-[10px] text-blue-200 uppercase tracking-widest font-medium mt-0.5">
                  New Candidates
                </div>
              </div>
              <div className="text-center px-5 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-2xl font-bold text-orange-500">
                  {interviews}
                </div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mt-0.5">
                  Interviewing
                </div>
              </div>
            </div>
          </div>{" "}
          {/* Filters */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              {["All Statuses", "Match Score: 80%+", "Availability"].map(
                (f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                      activeFilter === f
                        ? "bg-white border-blue-200 text-blue-600 shadow-sm"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {f === "All Statuses" && (
                      <Icon
                        icon="material-symbols:filter-list-rounded"
                        width="16"
                        height="16"
                      />
                    )}
                    {f}
                    {f !== "All Statuses" && (
                      <Icon
                        icon="material-symbols:keyboard-arrow-down-rounded"
                        width="16"
                        height="16"
                      />
                    )}
                  </button>
                ),
              )}
            </div>

            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
              <button
                onClick={() => setView("grid")}
                className={`p-1.5 rounded-lg transition-all ${view === "grid" ? "bg-blue-600 text-white shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
              >
                <Icon
                  icon="material-symbols:grid-view-rounded"
                  width="16"
                  height="16"
                />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-1.5 rounded-lg transition-all ${view === "list" ? "bg-blue-600 text-white shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
              >
                <Icon
                  icon="material-symbols:view-list-rounded"
                  width="16"
                  height="16"
                />
              </button>
            </div>
          </div>{" "}
          {/* Table header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1.2fr_auto] gap-4 px-5 mb-2">
            {["ผู้สมัคร", "ทักษะ", "ลงสมัครเมื่อ", "ACTIONS"].map((h) => (
              <div
                key={h}
                className="text-[10px] flex justify-center items-center font-semibold tracking-widest text-gray-400 uppercase"
              >
                {h}
              </div>
            ))}
          </div>{" "}
          <div className="flex flex-col gap-2.5">
            {paginatedApplicants.map((c) => {
              const skills = c.user?.profile?.skills || [];
              const shown = skills.slice(0, 2);
              const remaining = skills.length - 2;
              return (
                <div
                  key={c.id}
                  className="row-animate bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200 group"
                >
                  <div className="grid grid-cols-[2fr_1fr_1fr_1.2fr_auto] gap-4 items-center px-5 py-4">
                    {/* Candidate */}
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        {c.user?.profile?.avatarUrl ? (
                          <img
                            src={c.user?.profile?.avatarUrl}
                            alt={c.user?.profile?.name || "Avatar"}
                            className="w-11 h-11 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-sm font-bold text-blue-600">
                            {/* {c.initials} */}
                          </div>
                        )}
                        {/* {c.priorityColor === "blue" && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 border-2 border-white rounded-full" />
                      )} */}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900 text-[15px]">
                            {c.user?.profile?.name}
                          </span>
                          {/* {c.priority && (
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-md tracking-wider uppercase ${
                              c.priorityColor === "blue"
                                ? "bg-blue-600 text-white"
                                : "bg-orange-100 text-orange-600 border border-orange-200"
                            }`}
                          >
                            {c.priority}
                          </span>
                        )} */}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5 truncate">
                          Role
                        </div>
                      </div>
                    </div>
                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5">
                      {shown.map((s) => (
                        <span
                          key={s}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 font-medium border border-gray-200"
                        >
                          {s}
                        </span>
                      ))}

                      {remaining > 0 && (
                        <span className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-50 text-gray-400 font-medium border border-gray-200">
                          +{remaining}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      <div className="text-xs font-semibold text-gray-700">
                        {formatTimeAgo(c.createdAt)}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-center gap-2">
                      <button className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-200 transition-all">
                        <Icon
                          icon="material-symbols:chat-bubble-outline-rounded"
                          width="17"
                          height="17"
                        />
                      </button>
                      <button
                        onClick={() => setSelectedApplicant(c)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm shadow-blue-200 hover:shadow-blue-300"
                      >
                        Profile
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Candidate rows */}

        {selectedApplicant && (
          <ApplicantDetailModal
            onStatusChange={handleApproveApps}
            applicants={selectedApplicant}
            onClose={() => setSelectedApplicant(null)}
          />
        )}
        <PopupContainer state={loadingState} />
        {/* Footer */}
        <div className="flex items-center justify-between mt-6">
          <span className="text-sm text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-600">
              {start}-{end}
            </span>
            of{" "}
            <span className="font-semibold text-gray-600">
              {totalApplicants}
            </span>{" "}
            applicants
          </span>
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={handlePrev}
              className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all"
            >
              <Icon
                icon="material-symbols:chevron-left-rounded"
                width="18"
                height="18"
              />
            </button>
            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                    page === currentPage
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                      : "bg-white border border-gray-200 text-gray-500 hover:border-blue-200 hover:text-blue-600"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              disabled={currentPage === totalPages}
              onClick={handleNext}
              className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all"
            >
              <Icon
                icon="material-symbols:chevron-right-rounded"
                width="18"
                height="18"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
