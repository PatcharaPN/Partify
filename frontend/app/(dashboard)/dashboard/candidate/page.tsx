"use client";

import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchProfile } from "@/app/store/slices/profileSlice";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import SkeletonCandidate from "./skeletonCandidate";
import { fetchCandidateApplication } from "@/app/store/slices/applicationSlice";
import { formatDate } from "@/app/lib/formatDate";
import StatusBadge from "@/app/components/ui/StatusBadge";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", icon: "material-symbols:grid-view-rounded" },
  { label: "My Jobs", icon: "material-symbols:work-outline-rounded" },
  {
    label: "Applicants",
    badge: 12,
    icon: "material-symbols:people-outline-rounded",
  },
  { label: "Messages", icon: "material-symbols:chat-bubble-outline-rounded" },
  { label: "Billing", icon: "material-symbols:credit-card-outline-rounded" },
];

const recommended = [
  {
    id: "1",
    title: "Visual Storyteller",
    rate: "$45/hr",
    company: "CreativHaus",
    location: "Remote",
    tags: ["Contract", "Part-time"],
    match: 98,
    bgClass: "bg-slate-300",
  },
  {
    id: "2",
    title: "Marketing Analyst",
    rate: "$38/hr",
    company: "DataPeak",
    location: "London",
    tags: ["On-site", "Flexible"],
    match: 92,
    bgClass: "bg-blue-300",
  },
];

const checklist = [
  {
    label: "Add a portfolio link",
    sub: "Showcase your best work",
    done: false,
  },
  {
    label: "Verify your identity",
    sub: "Increase trust score by 15%",
    done: true,
  },
  { label: "Upload video intro", sub: "Stand out to curators", done: false },
];

export default function DashboardPage() {
  const { candidateApplication } = useAppSelector(
    (state) => state.ApplicationReducer,
  );
  const [activeNav, setActiveNav] = useState("Dashboard");
  const { profile, fetchLoading } = useAppSelector(
    (state) => state.profileReducer,
  );
  const dispatch = useAppDispatch();

  console.log(candidateApplication);
  useEffect(() => {
    dispatch(fetchCandidateApplication());
  }, [dispatch, candidateApplication]);

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  if (fetchLoading || !profile || !candidateApplication) {
    return <SkeletonCandidate />;
  }

  return (
    <div className="flex h-[calc(100vh-70px)] bg-gray-50 font-sans text-gray-900 antialiased overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-white border-r border-gray-100 flex flex-col py-4 px-3">
        <nav className="flex-1 px-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive = activeNav === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                <Icon icon={item.icon} width="16" height="16" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-blue-100 text-blue-600 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 px-6 py-7 overflow-auto">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back, {profile?.name || "User"}!
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            You have 3 active applications this week.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-2xl" />
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                <Icon
                  icon="material-symbols:send-outline"
                  width="24"
                  height="24"
                  color="#004AC6"
                />
              </div>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-1">
              Applied
            </p>
            <p className="text-3xl font-bold text-gray-900 tabular-nums">
              {candidateApplication.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-2xl" />
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center">
                <Icon icon="bx:chat" width="24" height="24" color="#004AC6" />
              </div>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-1">
              Interviewing
            </p>
            <p className="text-3xl font-bold text-gray-900 tabular-nums">
              {
                candidateApplication.filter((j) => j.status === "INTERVIEW")
                  .length
              }
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-400 rounded-l-2xl" />
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                <Icon
                  icon="material-symbols:bookmark-outline"
                  width="24"
                  height="24"
                  color="#F97316"
                />
              </div>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-1">
              Saved Jobs
            </p>
            <p className="text-3xl font-bold text-gray-900 tabular-nums">8</p>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_400px] gap-4">
          {/* Left */}
          <div className="flex flex-col gap-4">
            {/* Application Progress */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  รายการการสมัคร
                </h2>
                <button className="text-xs text-blue-600">View all</button>
              </div>
              <div className="flex flex-col divide-y divide-gray-50">
                {candidateApplication.map((app) => (
                  <Link key={app.id} href={`/jobs/${app.job?.id}`}>
                    <div className="flex items-center gap-3 py-3">
                      <img
                        src={app.job?.companyImageURL}
                        className="w-15 h-15"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">
                          {app.job?.companyName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {app.job?.title}
                        </div>
                      </div>
                      <StatusBadge status={app.status} />
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatDate(app.createdAt)}
                      </span>
                      <button className="text-gray-300 hover:text-gray-500">
                        <Icon
                          icon="material-symbols:more-horiz"
                          width="18"
                          height="18"
                        />
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                Recommended for You
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {recommended.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                  >
                    <div className={`h-24 ${job.bgClass} relative`}>
                      <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {job.match}% Match
                      </span>
                    </div>
                    <div className="p-3">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          {job.title}
                        </span>
                        <span className="text-xs font-semibold text-green-600">
                          {job.rate}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {job.company} • {job.location}
                      </div>
                      <div className="flex gap-1.5 mt-2 mb-3">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 rounded-lg transition-colors">
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-3">
            {/* Profile Strength */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-900">
                  Profile Strength
                </span>
                <span className="text-sm font-semibold text-blue-600">75%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full my-2">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
              <p className="text-[11px] text-gray-400 mb-3">
                Complete these to reach 100%:
              </p>
              <div className="flex flex-col gap-2.5">
                {checklist.map((item) => (
                  <div key={item.label} className="flex items-start gap-2">
                    <div
                      className={`w-4 h-4 rounded-full shrink-0 mt-0.5 flex items-center justify-center ${
                        item.done ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      {item.done ? (
                        <Icon
                          icon="material-symbols:check-rounded"
                          width="10"
                          height="10"
                          color="#16A34A"
                        />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-800">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {item.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Interview */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center gap-1.5 mb-2 text-[11px] text-gray-400 uppercase tracking-wider">
                <Icon
                  icon="material-symbols:calendar-month-outline-rounded"
                  width="12"
                  height="12"
                  color="#2563EB"
                />
                Next Interview
              </div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                Tomorrow at 10:30 AM
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">
                Design Studio Co.
              </p>
              <p className="text-xs text-gray-400">Technical Round • Zoom</p>
              <button className="w-full mt-3 border border-gray-200 text-xs text-gray-600 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                Prepare Notes
              </button>
            </div>

            {/* Editorial Tip
            <div className="bg-blue-600 rounded-2xl p-4 text-white">
              <div className="flex items-center gap-1.5 mb-1.5 text-[11px] uppercase tracking-wider opacity-75">
                <Icon
                  icon="material-symbols:info-outline-rounded"
                  width="12"
                  height="12"
                  color="white"
                />
                Editorial Tip
              </div>
              <p className="text-xs opacity-90 leading-relaxed">
                Personalize your cover message for every curation. It increases
                your match score by up to 25%!
              </p>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
}

function Avatar({ initials, color }: { initials: string; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    green: "bg-green-50 text-green-600",
  };
  return (
    <div
      className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
        colors[color] || colors.blue
      }`}
    >
      {initials}
    </div>
  );
}
