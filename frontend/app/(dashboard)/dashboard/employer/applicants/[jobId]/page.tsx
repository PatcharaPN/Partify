"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { useJobApplications } from "@/app/hooks/useJobApplications";
import { useParams } from "next/navigation";
import { formatTimeAgo } from "@/app/utils/FormatTimeAgo";

const candidates = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Lead Designer @ Studio X",
    initials: "SC",
    avatar: null,
    avatarImg: "https://i.pravatar.cc/150?img=47",
    priority: "HIGH PRIORITY",
    priorityColor: "blue",
    match: "Perfect Match",
    matchType: "perfect",
    skills: ["Art Direction", "Figma"],
    score: 98,
    timeAgo: "2d ago",
    status: "INTERVIEWING",
    statusColor: "blue",
    isNew: false,
  },
];

const matchConfig: Record<
  string,
  { icon: string; color: string; text: string }
> = {
  perfect: {
    icon: "material-symbols:check-circle-rounded",
    color: "text-emerald-500",
    text: "Perfect Match",
  },
  partial: {
    icon: "material-symbols:check-circle-outline-rounded",
    color: "text-orange-400",
    text: "Partial Match",
  },
  mismatch: {
    icon: "material-symbols:cancel-rounded",
    color: "text-red-400",
    text: "Mismatch",
  },
};

const scoreColor = (s: number) =>
  s >= 95
    ? "from-blue-500 to-blue-400"
    : s >= 88
      ? "from-violet-500 to-blue-400"
      : s >= 80
        ? "from-amber-400 to-orange-400"
        : "from-gray-400 to-gray-300";

export default function ApplicantsPage() {
  const params = useParams();
  const jobId = params.jobId as string;
  const { jobDetail } = useJobApplications(jobId);
  const [view, setView] = useState<"list" | "grid">("list");
  const [activeFilter, setActiveFilter] = useState("All Statuses");
  console.log(jobDetail);
  return (
    <div className="h-[calc(100vh-70px)] bg-[#F4F6FA] font-sans">
      <div className="   mx-auto px-6 py-8">
        {/* Breadcrumb */}
        {/* <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
          <span className="hover:text-blue-600 cursor-pointer transition-colors">
            Dashboard
          </span>
          <Icon
            icon="material-symbols:chevron-right-rounded"
            width="14"
            height="14"
          />
          <span className="text-gray-600 font-medium">
            Senior Creative Director
          </span>
        </div> */}

        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">
              {jobDetail?.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>Active Hiring Campaign • New York, NY</span>
              <span className="flex items-center gap-1.5 text-emerald-500 font-semibold text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                LIVE
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-center px-5 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">48</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mt-0.5">
                Total Applicants
              </div>
            </div>
            <div className="text-center px-5 py-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-[10px] text-blue-200 uppercase tracking-widest font-medium mt-0.5">
                New Candidates
              </div>
            </div>
            <div className="text-center px-5 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-orange-500">5</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mt-0.5">
                Interviewing
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            {["All Statuses", "Match Score: 80%+", "Availability"].map((f) => (
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
            ))}
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
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1.2fr_auto] gap-4 px-5 mb-2">
          {[
            "ผู้สมัคร",
            "ทักษะ",
            "ลงสมัครเมื่อ",
            "SCORE & TIMELINE",
            "ACTIONS",
          ].map((h) => (
            <div
              key={h}
              className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase"
            >
              {h}
            </div>
          ))}
        </div>

        {/* Candidate rows */}
        <div className="flex flex-col gap-2.5">
          {jobDetail?.applications.map((c) => {
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

                  {/* Score + timeline */}
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-xs font-semibold text-gray-700">
                        {formatTimeAgo(c.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5"></div>
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-200 transition-all">
                      <Icon
                        icon="material-symbols:chat-bubble-outline-rounded"
                        width="17"
                        height="17"
                      />
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm shadow-blue-200 hover:shadow-blue-300">
                      Profile
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6">
          <span className="text-sm text-gray-400">
            Showing <span className="font-semibold text-gray-600">1-12</span> of{" "}
            <span className="font-semibold text-gray-600">48</span> applicants
          </span>
          <div className="flex items-center gap-1.5">
            <button className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all">
              <Icon
                icon="material-symbols:chevron-left-rounded"
                width="18"
                height="18"
              />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                  p === 1
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                    : "bg-white border border-gray-200 text-gray-500 hover:border-blue-200 hover:text-blue-600"
                }`}
              >
                {p}
              </button>
            ))}
            <button className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all">
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
