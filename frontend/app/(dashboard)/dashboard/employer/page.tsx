"use client";

import AvatarStack from "@/app/components/ui/AvatarStack";
import { useEffect, useState } from "react";
import SkeletonDashboard from "./skeletonDashboard";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { fetchOwnerRelatedJobs } from "@/app/store/slices/jobSlice";
import { fetchCurrentUser } from "@/app/store/slices/authSlice";
import Link from "next/link";
import { Icon } from "@iconify/react";

const getNavItems = (total: number) => [
  {
    label: "Dashboard",
    icon: <Icon icon="mdi:view-dashboard" className="w-4 h-4" />,
  },
  {
    label: "My Jobs",
    icon: <Icon icon="mdi:briefcase-outline" className="w-4 h-4" />,
  },
  {
    label: "Applicants",
    badge: total > 0 ? total : undefined,
    icon: <Icon icon="mdi:account-group-outline" className="w-4 h-4" />,
  },
  {
    label: "Messages",
    icon: <Icon icon="mdi:message-outline" className="w-4 h-4" />,
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
  const employeeJobs = Array.isArray(employeeJob) ? employeeJob : [];
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchOwnerRelatedJobs(user.id));
    }
  }, [user?.id, dispatch]);
  console.log(employeeJob);

  const filtered = employeeJobs.filter((j) => j.title);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const totalApplicants = employeeJobs.reduce(
    (sum, job) => sum + (job.applications?.length ?? 0),
    0,
  );
  const navItems = getNavItems(totalApplicants);
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

        {/* <div className="mx-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
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
        </div> */}
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              แดชบอร์ดผู้ประกอบการ
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              ยินดีต้อนรับกลับ {user?.profile?.name}{" "}
              นี่คือภาพรวมของประกาศงานที่คุณจัดการอยู่
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-150 shadow-sm">
              <Icon icon="mdi:plus" className="w-4 h-4" />
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
                  <Icon
                    icon="mdi:eye-outline"
                    className="w-4 h-4 text-blue-500"
                  />
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
                  <Icon
                    icon="mdi:account-group-outline"
                    className="w-4 h-4 text-violet-500"
                  />
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
                  <Icon
                    icon="mdi:check-circle-outline"
                    className="w-4 h-4 text-orange-400"
                  />
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
              <h2 className="text-base font-bold text-gray-900">
                จัดการประกาศงาน
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 w-52">
                  <Icon
                    icon="mdi:magnify"
                    className="w-3.5 h-3.5 text-gray-400 shrink-0"
                  />
                  <input
                    type="text"
                    placeholder="Search roles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
                  />
                </div>
                <button className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
                  <Icon icon="mdi:tune-vertical" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-[2.5fr_1fr_1fr_1.2fr_90px] px-6 py-2.5 bg-gray-50/60 border-b border-gray-50">
              {[
                "ตำแหน่งงาน",
                "สถานะ",
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

            {filtered.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <div className="grid grid-cols-[2.5fr_1fr_1fr_1.2fr_90px] px-6 py-4 border-b border-gray-50 last:border-0 items-center hover:bg-gray-50/50 transition-colors group">
                  {/* Title */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 shrink-0 group-hover:border-gray-200 transition-colors">
                      <Icon icon="mdi:briefcase-outline" className="w-4 h-4" />
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
                        .slice()
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime(),
                        )
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
