"use client";

import AvatarStack from "@/app/components/ui/AvatarStack";
import { useState } from "react";
import { Bone } from "../../jobs/JobListSkeleton";

const jobs = [
  {
    id: 1,
    title: "Senior UX Curator",
    type: "Part-time",
    department: "Design",
    location: "Remote",
    status: "active",
    applicants: 22,
    postedDate: "Oct 12, 2024",
    avatarColors: ["bg-violet-400", "bg-pink-400", "bg-sky-400"],
  },
  {
    id: 2,
    title: "Freelance Backend Specialist",
    type: "Contract",
    department: "Engineering",
    location: "London",
    status: "active",
    applicants: 8,
    postedDate: "Oct 15, 2024",
    avatarColors: ["bg-amber-400", "bg-emerald-400"],
  },
  {
    id: 3,
    title: "Growth Strategist",
    type: "Hybrid",
    department: "Marketing",
    location: "Hybrid",
    status: "closed",
    applicants: 42,
    postedDate: "Sept 28, 2024",
    avatarColors: [],
  },
];

const navItems = [
  {
    label: "Dashboard",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
        <rect x="1" y="1" width="6" height="6" rx="1.5" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" />
      </svg>
    ),
  },
  {
    label: "My Jobs",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 16 16"
      >
        <rect x="2" y="3" width="12" height="10" rx="1.5" />
        <line x1="5" y1="6.5" x2="11" y2="6.5" />
        <line x1="5" y1="9.5" x2="9" y2="9.5" />
      </svg>
    ),
  },
  {
    label: "Applicants",
    badge: 12,
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 16 16"
      >
        <circle cx="8" cy="6" r="3" />
        <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" />
      </svg>
    ),
  },
  {
    label: "Messages",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 16 16"
      >
        <rect x="2" y="2" width="12" height="9" rx="1.5" />
        <path d="M5 11l-2 3h10l-2-3" />
      </svg>
    ),
  },
  {
    label: "Billing",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 16 16"
      >
        <rect x="2" y="4" width="12" height="9" rx="1.5" />
        <path d="M5 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      </svg>
    ),
  },
];

export default function EmployerDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const isLoading = true;
  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.department.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 antialiased overflow-hidden">
      {/* Sidebar */}
      <div className="w-52 bg-white border-r p-3 space-y-2">
        {[...Array(5)].map((_, i) => (
          <Bone key={i} className="h-8 w-full rounded-lg" />
        ))}
      </div>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <Bone className="w-48 h-5" />
            <Bone className="w-72 h-3 mt-2" />
          </div>
          <div className="flex items-center gap-3">
            <Bone className="h-8 w-20 rounded-xl" />
          </div>
        </header>

        <div className="px-8 py-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {/* Views */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-2xl" />
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Bone className="w-9 h-9 rounded-xl" />
                </div>
                <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                  <Bone className="w-3 h-3 rounded-xl" />
                  <Bone className="w-5 h-2" />
                </span>
              </div>
              <Bone className="w-20 h-4" />
              <Bone className="w-32 h-5 mt-2" />
            </div>

            {/* Applicants */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-violet-500 rounded-l-2xl" />
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center">
                  <Bone className="w-9 h-9 rounded-xl" />
                </div>
                <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                  <Bone className="w-5 h-2" />
                </span>
              </div>
              <Bone className="w-20 h-4" />
              <Bone className="w-32 h-5 mt-2" />
            </div>

            {/* Hires */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-400 rounded-l-2xl" />
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Bone className="w-9 h-9 rounded-xl" />
                </div>
                <Bone className="w-5 h-2" />
              </div>
              <Bone className="w-20 h-4" />
              <Bone className="w-32 h-5 mt-2" />
            </div>
          </div>

          {/* Manage Jobs */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <Bone className="w-32 h-4" />
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 w-52">
                  <Bone className="w-9 h-9 rounded-xl" />
                </div>
                <Bone className="h-8 w-20 rounded-xl" />
              </div>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-[2.5fr_1fr_1fr_1.2fr_90px] px-6 py-2.5 bg-gray-50/60 border-b border-gray-50">
              <Bone className="w-40 h-4" />
              <Bone className="w-16 h-4" />
              <Bone className="w-20 h-4" />
              <Bone className="w-24 h-4" />
              <Bone className="w-16 h-8 rounded-xl" />
            </div>

            {/* Rows */}
            {filtered.map((job) => (
              <div
                key={job.id}
                className="grid grid-cols-[2.5fr_1fr_1fr_1.2fr_90px] px-6 py-4 border-b border-gray-50 last:border-0 items-center hover:bg-gray-50/50 transition-colors group"
              >
                {/* Title */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 shrink-0 group-hover:border-gray-200 transition-colors">
                    <Bone className="w-9 h-9 rounded-xl" />
                  </div>
                  <div>
                    <Bone className="w-24 h-3" />
                    <Bone className="w-40 h-4 mt-1" />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <Bone className="w-12 h-5 rounded-full" />
                </div>

                {/* Applicants */}
                <div>
                  <Bone className="w-15 h-5" />
                </div>

                {/* Date */}
                <Bone className="w-20 h-5 text-gray-400" />

                {/* Action */}
                <div>
                  <Bone className="h-8 w-20 rounded-xl" />
                </div>
              </div>
            ))}
          </div>

          {/* Upgrade banner */}
          {/* <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl p-6 flex items-center justify-between shadow-lg shadow-blue-200">
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Upgrade to Partify Pro
              </h3>
              <p className="text-sm text-blue-100 max-w-sm leading-relaxed">
                Get exclusive access to top-tier verified talent and featured
                placement for your listings.
              </p>
            </div>
            <button className="shrink-0 bg-white text-blue-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 active:scale-95 transition-all shadow-sm">
              View Plans
            </button>
          </div> */}
        </div>
      </main>
    </div>
  );
}
