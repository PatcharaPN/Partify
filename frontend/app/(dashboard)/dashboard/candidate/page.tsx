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
import { fetchRecomandJob } from "@/app/store/slices/jobSlice";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import ProfileStrengthCard from "@/app/components/ui/ProfileStrengthCard";

const navItems = [
  { label: "Dashboard", icon: "mdi:view-dashboard" },
  // { label: "My Jobs", icon: "mdi:briefcase-outline" },
  // {
  //   label: "Applicants",
  //   badge: 12,
  //   icon: "mdi:account-group-outline",
  // },
  // { label: "Messages", icon: "mdi:message-outline" },
];

const statusMap = {
  PENDING: "รอดำเนินการ",
  ACCEPTED: "ผ่านการคัดเลือก",
  REJECTED: "ไม่ผ่าน",
  INTERVIEW: "สัมภาษณ์",
};
export default function DashboardPage() {
  const { candidateApplication } = useAppSelector(
    (state) => state.ApplicationReducer,
  );
  const { currentUser, isAuthenticated, isLoading } = useCurrentUser();
  const { recomandJobs } = useAppSelector((state) => state.jobReducer);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const router = useRouter();
  const { profile, fetchLoading } = useAppSelector(
    (state) => state.profileReducer,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    dispatch(fetchCandidateApplication());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRecomandJob());
  }, [dispatch]);

  if (fetchLoading || !profile || !candidateApplication) {
    return <SkeletonCandidate />;
  }
  const checklist = [
    {
      label: "เพิ่มรูปโปรไฟล์",
      sub: "ช่วยให้นายจ้างจดจำคุณได้",
      done: !!profile?.avatarUrl,
    },
    {
      label: "กรอกข้อมูลส่วนตัว",
      sub: "ชื่อ เบอร์โทร จังหวัด",
      done: !!profile?.firstName && !!profile?.phone && !!profile?.province,
    },
    {
      label: "เพิ่มทักษะ",
      sub: "ช่วยให้ระบบแนะนำงานได้ตรงขึ้น",
      done: (profile?.skills?.length ?? 0) > 0,
    },
    {
      label: "เขียน Bio",
      sub: "แนะนำตัวเองสั้นๆ",
      done: !!profile?.summary,
    },
    {
      label: "อัปโหลด Resume",
      sub: "เพิ่มโอกาสได้รับการติดต่อ",
      done: !!currentUser?.resume,
    },
  ];

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
                {/* {item.badge && (
                  <span className="ml-auto bg-blue-100 text-blue-600 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )} */}
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
            Welcome back, {profile?.firstName || "User"}!
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

          {/* <div className="bg-white rounded-2xl border border-gray-100 p-5 relative overflow-hidden">
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
          </div> */}

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
            <p className="text-3xl font-bold text-gray-900 tabular-nums">0</p>
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
                        src={app.job?.company?.companyImageURL}
                        className="w-15 h-15"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">
                          {app.job?.company?.companyName || ""}
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
                แนะนำสำหรับคุณ
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {recomandJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                  >
                    <div className={`h-24 relative`}>
                      <img
                        src={job.overviewPictureURL?.[0]}
                        className="absolute w-full h-full object-cover"
                        alt=""
                      />
                      <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {/* {job.match}% Match */} 90 % Match
                      </span>
                    </div>
                    <div className="p-3">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          {job.title}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {job.company?.companyName || ""} • {job.location}
                      </div>
                      <div className="flex gap-1.5 mt-2 mb-3">
                        {/* {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-100"
                          >
                            {tag}
                          </span>
                        ))} */}
                      </div>
                      <Link href={`/jobs/${job.id}`}>
                        {" "}
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 rounded-lg transition-colors">
                          Apply Now
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ProfileStrengthCard />
        </div>
      </main>
    </div>
  );
}
