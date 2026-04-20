"use client";

import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchProfile } from "@/app/store/slices/profileSlice";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import SkeletonCandidate from "./skeletonCandidate";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
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
const applications = [
  {
    id: "1",
    initials: "DS",
    company: "Design Studio Co.",
    role: "Senior UI Curator",
    status: "Interviewing",
    statusColor: "blue",
    appliedDate: "Applied 2 days ago",
  },
  {
    id: "2",
    initials: "LV",
    company: "Luxe Ventures",
    role: "Editorial Assistant",
    status: "In Review",
    statusColor: "amber",
    appliedDate: "Applied 5 days ago",
  },
  {
    id: "3",
    initials: "NT",
    company: "Nova Tech",
    role: "Content Strategist",
    status: "Interviewing",
    statusColor: "blue",
    appliedDate: "Applied 1 week ago",
  },
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
  const [activeNav, setActiveNav] = useState("Dashboard");
  const { profile, fetchLoading } = useAppSelector(
    (state) => state.profileReducer,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  if (fetchLoading || !profile) {
    return <SkeletonCandidate />;
  }
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 antialiased overflow-hidden">
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
                {item.icon}
                <span>{item.label}</span>
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
                  color="004AC6"
                  icon="material-symbols:send-outline"
                  width="24"
                  height="24"
                />
              </div>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-1">
              Applied
            </p>
            <p className="text-3xl font-bold text-gray-900 tabular-nums">1</p>
          </div>

          {/* Applicants */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-2xl" />
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center">
                <Icon icon="bx:chat" width="24" height="24" color="004AC6" />
              </div>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-1">
              Interviewing
            </p>
            <p className="text-3xl font-bold text-gray-900 tabular-nums">156</p>
          </div>

          {/* Hires */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-400 rounded-l-2xl" />
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                <Icon
                  icon="material-symbols:bookmark-outline"
                  width="24"
                  height="24"
                  color="F97316"
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
                  Application Progress
                </h2>
                <button className="text-xs text-blue-600">View all</button>
              </div>
              <div className="flex flex-col divide-y divide-gray-50">
                {applications.map((app) => (
                  <div key={app.id} className="flex items-center gap-3 py-3">
                    <Avatar initials={app.initials} color={app.statusColor} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">
                        {app.company}
                      </div>
                      <div className="text-xs text-gray-500">{app.role}</div>
                    </div>
                    <StatusBadge status={app.status} color={app.statusColor} />
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {app.appliedDate}
                    </span>
                    <button className="text-gray-300 hover:text-gray-500 text-base leading-none">
                      ···
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended */}
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
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#16A34A"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
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
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
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

            {/* Editorial Tip */}
            <div className="bg-blue-600 rounded-2xl p-4 text-white">
              <div className="flex items-center gap-1.5 mb-1.5 text-[11px] uppercase tracking-wider opacity-75">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Editorial Tip
              </div>
              <p className="text-xs opacity-90 leading-relaxed">
                Personalize your cover message for every curation. It increases
                your match score by up to 25%!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-2xl border p-4 ${
        highlight
          ? "border-t-2 border-t-blue-600 border-x-gray-100 border-b-gray-100"
          : "border-gray-100"
      }`}
    >
      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 uppercase tracking-wider mb-2">
        <span className="w-3.5 h-3.5">{icon}</span>
        {label}
      </div>
      <div
        className={`text-3xl font-semibold ${highlight ? "text-blue-600" : "text-gray-900"}`}
      >
        {value}
      </div>
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

function StatusBadge({ status, color }: { status: string; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-700",
  };
  return (
    <span
      className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${colors[color] || colors.blue}`}
    >
      {status}
    </span>
  );
}

function TrendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2563EB"
      strokeWidth="2"
      width="14"
      height="14"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2563EB"
      strokeWidth="2"
      width="14"
      height="14"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function BookmarkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2563EB"
      strokeWidth="2"
      width="14"
      height="14"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}
