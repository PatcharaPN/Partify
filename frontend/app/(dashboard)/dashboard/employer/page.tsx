"use client";

import AvatarStack from "@/app/components/ui/AvatarStack";
import { useEffect, useState } from "react";
import SkeletonDashboard from "./skeletonDashboard";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { fetchOwnerRelatedJobs } from "@/app/store/slices/jobSlice";
import { fetchCurrentUser } from "@/app/store/slices/authSlice";
import Link from "next/link";

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
  const dispatch = useAppDispatch();
  const { employeeJob, isLoading } = useAppSelector(
    (state: RootState) => state.jobReducer,
  );
  const { user } = useAppSelector((state: RootState) => state.AuthReducer);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchOwnerRelatedJobs(user.id));
    }
  }, [user?.id, dispatch]);
  console.log(employeeJob);

  const employeeJobs = Array.isArray(employeeJob) ? employeeJob : [];
  const filtered = employeeJobs.filter((j) => j.title);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SkeletonDashboard />;
  }
  return (
    <div className="flex h-[calc(100vh-70px)] bg-gray-50 font-sans text-gray-900 antialiased overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 flex flex-col bg-white border-gray-100 shrink-0">
        {/* Nav */}
        <nav className="flex-1 px-6 space-y-0.5 py-4">
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
                {item.badge && (
                  <span
                    className={`ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Credits */}
        <div className="mx-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-1.5">
            Hiring Credits
          </p>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-xl font-bold text-gray-800">14</span>
            <span className="text-xs text-gray-400">/ 20 left</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: "70%" }}
            />
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Employer Dashboard
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Welcome back, Sarah. Here's what's happening with your curated
              roles.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-150 shadow-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              ลงประกาศหางาน
            </button>
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
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <path d="M6 2l4 8H2z" />
                  </svg>
                  +12%
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-1">
                Total Views
              </p>
              <p className="text-3xl font-bold text-gray-900 tabular-nums">
                2,482
              </p>
            </div>

            {/* Applicants */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-violet-500 rounded-l-2xl" />
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-violet-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <path d="M6 2l4 8H2z" />
                  </svg>
                  +5%
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-1">
                Total Applicants
              </p>
              <p className="text-3xl font-bold text-gray-900 tabular-nums">
                156
              </p>
            </div>

            {/* Hires */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-400 rounded-l-2xl" />
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-400">— 0%</span>
              </div>
              <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-1">
                Total Hires
              </p>
              <p className="text-3xl font-bold text-gray-900 tabular-nums">8</p>
            </div>
          </div>

          {/* Manage Jobs */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h2 className="text-base font-bold text-gray-900">Manage Jobs</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 w-52">
                  <svg
                    className="w-3.5 h-3.5 text-gray-400 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search roles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
                  />
                </div>
                <button className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-[2.5fr_1fr_1fr_1.2fr_90px] px-6 py-2.5 bg-gray-50/60 border-b border-gray-50">
              {[
                "Job Title",
                "Status",
                "Applicants",
                "Posted Date",
                "Actions",
              ].map((h) => (
                <span
                  key={h}
                  className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold"
                >
                  {h}
                </span>
              ))}
            </div>

            {filtered.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <div className="grid grid-cols-[2.5fr_1fr_1fr_1.2fr_90px] px-6 py-4 border-b border-gray-50 last:border-0 items-center hover:bg-gray-50/50 transition-colors group">
                  {/* Title */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 shrink-0 group-hover:border-gray-200 transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {job.title}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {job.companyName} · {job.location}
                      </p>
                    </div>
                  </div>
                  <div>
                    {job.status === "active" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        Closed
                      </span>
                    )}
                  </div>
                  {/* Applicants */}{" "}
                  <div>
                    <AvatarStack
                      count={job.applications.length}
                      avatars={job.applications
                        .map((a) => a.user!.profile?.avatarUrl)
                        .filter((url): url is string => Boolean(url))}
                    />
                  </div>
                  {/* <div>
                  {job.applications.length > 0 ? (
                    <AvatarStack
                      colors={job.avatarColors}
                      count={job.applicants}
                    />
                  ) : (
                    <span className="text-sm text-gray-600 font-medium">
                      {job.applicants} Applicants
                    </span>
                  )}
                </div> */}
                  {/* Date */}
                  <p className="text-sm text-gray-400">
                    {new Date(job.createdAt).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  {/* Action */}
                  <div>
                    {job.status === "active" ? (
                      <button className="text-sm font-semibold text-gray-600 border border-gray-200 px-4 py-1.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all">
                        Edit
                      </button>
                    ) : (
                      <button className="text-sm font-semibold text-blue-600 border border-blue-200 px-3 py-1.5 rounded-xl hover:bg-blue-50 active:scale-95 transition-all">
                        Reopen
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            ))}

            {filtered.length === 0 && (
              <div className="py-12 text-center text-gray-400 text-sm">
                No roles match your search.
              </div>
            )}
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
