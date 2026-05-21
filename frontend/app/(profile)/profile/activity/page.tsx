"use client";

import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchProfile } from "@/app/store/slices/profileSlice";
import { fetchCandidateApplication } from "@/app/store/slices/applicationSlice";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { formatDate } from "@/app/lib/formatDate";
import { ApplicationStatus, Profile } from "@/app/types/job.type";
import TabButton from "@/app/components/ui/TabButton";
import CompanyLogo from "@/app/components/ui/CompanyLogo";
import EmptyState from "@/app/components/ui/EmptyStateTab";

const STATUS_LABEL: Record<ApplicationStatus, string> = {
  PENDING: "รอดำเนินการ",
  ACCEPTED: "ผ่านการคัดเลือก",
  REJECTED: "ไม่ผ่าน",
  INTERVIEW: "นัดสัมภาษณ์",
};

const STATUS_COLOR: Record<ApplicationStatus, string> = {
  PENDING: "bg-yellow-50 text-yellow-600 border-yellow-200",
  ACCEPTED: "bg-green-50 text-green-600 border-green-200",
  REJECTED: "bg-red-50 text-red-500 border-red-200",
  INTERVIEW: "bg-blue-50 text-blue-600 border-blue-200",
};

type Tab = "applications" | "saved";

function getMissingFields(profile: Profile): string[] {
  const missing: string[] = [];
  if (!profile.avatarUrl) missing.push("รูปโปรไฟล์");
  if (!profile.phone) missing.push("เบอร์โทรศัพท์");
  if (!profile.summary) missing.push("Bio");
  if (!profile.skills?.length) missing.push("ทักษะ");
  return missing;
}

export default function CandidateDashboard() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { currentUser, isAuthenticated, isLoading } = useCurrentUser();
  const { profile, fetchLoading } = useAppSelector((s) => s.profileReducer);
  const { candidateApplication, loading: appLoading } = useAppSelector(
    (s) => s.ApplicationReducer,
  );

  const [activeTab, setActiveTab] = useState<Tab>("applications");
  const [profileBannerDismissed, setProfileBannerDismissed] = useState(false);

  // Auth guard
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Fetch data
  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchCandidateApplication());
  }, [dispatch]);

  const interviewApps = candidateApplication.filter(
    (a) => a.status === "INTERVIEW",
  );
  const savedJobs = candidateApplication.filter((a) => a.job?.isBookmarked);
  const pendingCount = candidateApplication.filter(
    (a) => a.status === "PENDING",
  ).length;
  const acceptedCount = candidateApplication.filter(
    (a) => a.status === "ACCEPTED",
  ).length;
  const rejectedCount = candidateApplication.filter(
    (a) => a.status === "REJECTED",
  ).length;

  const hasResume = (currentUser?.resume?.length ?? 0) > 0;

  return (
    <div className="min-h-[calc(100vh-70px)] bg-white">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-5">
        {interviewApps.length > 0 && (
          <div className="bg-white border border-blue-200 rounded-2xl px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <p className="text-sm font-semibold text-gray-900">
                นัดสัมภาษณ์ที่รอดำเนินการ ({interviewApps.length})
              </p>
            </div>
            <ul className="space-y-2">
              {interviewApps.map((app) => (
                <li key={app.id}>
                  <Link
                    href={`/jobs/${app.job?.id}`}
                    className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-white shrink-0 flex items-center justify-center border border-blue-100">
                      {app.job?.company?.companyImageURL ? (
                        <img
                          src={app.job.company.companyImageURL}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon
                          icon="mdi:office-building-outline"
                          width="16"
                          className="text-gray-400"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {app.job?.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {app.job?.company?.companyName}
                      </p>
                    </div>
                    <Icon
                      icon="material-symbols:chevron-right"
                      width="16"
                      className="text-blue-400 shrink-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {candidateApplication.length > 0 && (
          <div className="grid grid-cols-4 gap-3">
            {[
              {
                label: "ทั้งหมด",
                value: candidateApplication.length,
                color: "text-gray-900",
                bg: "bg-white",
              },
              {
                label: "รอดำเนินการ",
                value: pendingCount,
                color: "text-yellow-600",
                bg: "bg-white",
              },
              {
                label: "ผ่านการคัดเลือก",
                value: acceptedCount,
                color: "text-green-600",
                bg: "bg-white",
              },
              {
                label: "ไม่ผ่าน",
                value: rejectedCount,
                color: "text-red-500",
                bg: "bg-white",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`${stat.bg} rounded-2xl border border-gray-100 px-4 py-3 text-center`}
              >
                <p className={`text-2xl font-bold tabular-nums ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="w-full flex justify-center items-center">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit ">
            <TabButton
              active={activeTab === "applications"}
              onClick={() => setActiveTab("applications")}
              icon="material-symbols:send-outline"
              label="งานที่สมัครแล้ว"
              count={candidateApplication.length}
              countColor="bg-blue-100 text-blue-600"
            />
            <TabButton
              active={activeTab === "saved"}
              onClick={() => setActiveTab("saved")}
              icon="material-symbols:bookmark-outline"
              label="งานที่บันทึกไว้"
              count={savedJobs.length}
              countColor="bg-orange-100 text-orange-600"
            />
          </div>
        </div>

        {activeTab === "applications" && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {candidateApplication.length === 0 ? (
              <EmptyState
                icon="material-symbols:send-outline"
                title="ยังไม่มีงานที่สมัคร"
                sub="เริ่มสมัครงานแรกของคุณได้เลย"
                href="/jobs"
                cta="ค้นหางาน"
              />
            ) : (
              <ul className="divide-y divide-gray-50">
                {candidateApplication.map((app) => (
                  <li key={app.id}>
                    <Link
                      href={`/jobs/${app.job?.id}`}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <CompanyLogo url={app.job?.company?.companyImageURL} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {app.job?.title}
                        </p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">
                          {app.job?.company?.companyName}
                          {app.job?.location ? ` • ${app.job.location}` : ""}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${STATUS_COLOR[app.status]}`}
                        >
                          {STATUS_LABEL[app.status]}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {formatDate(app.createdAt)}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === "saved" && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {savedJobs.length === 0 ? (
              <EmptyState
                icon="material-symbols:bookmark-outline"
                title="ยังไม่มีงานที่บันทึกไว้"
                sub="กด bookmark งานที่สนใจเพื่อดูทีหลัง"
                href="/jobs"
                cta="ค้นหางาน"
              />
            ) : (
              <ul className="divide-y divide-gray-50">
                {savedJobs.map((app) => (
                  <li key={app.id}>
                    <Link
                      href={`/jobs/${app.job?.id}`}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <CompanyLogo url={app.job?.company?.companyImageURL} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {app.job?.title}
                        </p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">
                          {app.job?.company?.companyName}
                          {app.job?.location ? ` • ${app.job.location}` : ""}
                        </p>
                      </div>
                      <Icon
                        icon="material-symbols:chevron-right"
                        width="18"
                        className="text-gray-300 shrink-0"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
