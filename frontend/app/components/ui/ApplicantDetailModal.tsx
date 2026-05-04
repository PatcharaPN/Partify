"use client";

import { useState } from "react";
import { Application, ApplicationStatus } from "@/app/types/job.type";
import ResumeAttachment from "./ResumeAttachment";

interface ApplicantDetailModalProps {
  applicants: Application;
  onClose: () => void;
  onStatusChange?: (id: string, status: ApplicationStatus) => void;
}

const SHIFT_LABEL: Record<string, string> = {
  MORNING: "เช้า",
  AFTERNOON: "บ่าย",
  EVENING: "เย็น",
  NIGHT: "กลางคืน",
};

const DAY_SHORT = ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"];
const DAY_KEYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; className: string }
> = {
  PENDING: { label: "รอพิจารณา", className: "bg-amber-100 text-amber-800" },
  ACCEPTED: {
    label: "รับเข้าทำงาน",
    className: "bg-emerald-100 text-emerald-800",
  },
  REJECTED: { label: "ไม่ผ่าน", className: "bg-red-100 text-red-800" },
  INTERVIEW: { label: "นัดสัมภาษณ์", className: "bg-blue-100 text-[#2563EB]" },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-[11px] font-semibold tracking-widest uppercase text-gray-400">
      {children}
    </p>
  );
}

export default function ApplicantDetailModal({
  applicants,
  onClose,
  onStatusChange,
}: ApplicantDetailModalProps) {
  const [status, setStatus] = useState<ApplicationStatus>(applicants.status);
  const profile = applicants.user?.profile;

  const availability = profile?.availability ?? [];
  const shifts = profile?.shifts ?? [];
  const skills = profile?.skills ?? [];
  const experience = profile?.experience ?? [];

  const appliedDate = new Date(applicants.createdAt).toLocaleDateString(
    "th-TH",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  function handleStatusChange(next: ApplicationStatus) {
    setStatus(next);
    onStatusChange?.(applicants.id, next);
  }

  const cfg = STATUS_CONFIG[status];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/15 backdrop-blur-[5px]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-140 max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 shrink-0">
          <div className="flex items-center gap-3">
            {profile?.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-11 h-11 rounded-xl object-cover border-2 border-white/10"
              />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-gray-800 border-2 border-white/10 flex items-center justify-center text-lg font-semibold ">
                {profile?.name?.[0] ?? "?"}
              </div>
            )}
            <div>
              <p className="m-0 text-base font-bold leading-tight">
                {profile?.name ?? "ไม่ระบุชื่อ"}
              </p>
              <p className="m-0 text-xs text-gray-400 mt-0.5">
                สมัครวันที่ {appliedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.className}`}
            >
              {cfg.label}
            </span>
            {/* Outlined close — design system */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center text-lg leading-none cursor-pointer"
            >
              ×
            </button>
          </div>
        </div>

        {/* ── Contact row ── */}
        <div className="flex flex-wrap gap-x-5 gap-y-1 px-5 py-3 border-b border-gray-100">
          {applicants.user?.email && (
            <span className="flex items-center gap-1.5 text-[13px] text-gray-500">
              <svg
                className="w-3.5 h-3.5 text-[#2563EB] shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {applicants.user.email}
            </span>
          )}
          {profile?.phone && (
            <span className="flex items-center gap-1.5 text-[13px] text-gray-500">
              <svg
                className="w-3.5 h-3.5 text-[#2563EB] shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 15.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {profile.phone}
            </span>
          )}
          {profile?.birthDate && (
            <span className="flex items-center gap-1.5 text-[13px] text-gray-500">
              <svg
                className="w-3.5 h-3.5 text-[#2563EB] shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(profile.birthDate).toLocaleDateString("th-TH", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1">
          <div className="flex flex-col gap-5 px-5 py-4">
            {/* Summary */}
            {profile?.summary && (
              <div className="bg-gray-50 rounded-xl px-4 py-3 border-l-[3px] border-[#2563EB]">
                <p className="m-0 text-[13px] text-gray-600 leading-relaxed">
                  {profile.summary}
                </p>
              </div>
            )}
            {/* Availability */}
            <div>
              <SectionLabel>วันที่ว่าง</SectionLabel>
              <div className="flex gap-1.5 flex-wrap">
                {DAY_KEYS.map((key, i) => {
                  const active = availability.includes(key);
                  return (
                    <div
                      key={key}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-[13px] select-none transition-all
                        ${
                          active
                            ? "bg-[#2563EB] text-white font-bold"
                            : "bg-gray-100 text-gray-400 font-normal"
                        }`}
                    >
                      {DAY_SHORT[i]}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Shifts */}
            {shifts.length > 0 && (
              <div>
                <SectionLabel>ช่วงเวลาที่ทำได้</SectionLabel>
                <div className="flex gap-2 flex-wrap">
                  {shifts.map((s) => (
                    <span
                      key={s}
                      className="text-[13px] font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200"
                    >
                      {SHIFT_LABEL[s] ?? s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <SectionLabel>ทักษะ</SectionLabel>
                <div className="flex gap-1.5 flex-wrap">
                  {skills.map((sk) => (
                    <span
                      key={sk}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 border border-gray-200"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* Experience */}
            {experience.length > 0 && (
              <div>
                <SectionLabel>ประสบการณ์</SectionLabel>
                <div className="flex flex-col gap-2">
                  {experience.map((exp, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                      <p className="m-0 text-[13px] text-gray-600 leading-relaxed">
                        {exp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <SectionLabel>เรซูเม่ / CV</SectionLabel>
            {profile?.resumeUrl && (
              <ResumeAttachment resumeUrl={profile?.resumeUrl} />
            )}
          </div>
        </div>

        {/* ── Footer actions ── */}
        <div className="flex gap-2 px-5 py-3.5 border-t border-gray-100 bg-white shrink-0">
          {/* Outlined / Reject */}
          <button
            onClick={() => handleStatusChange("REJECTED")}
            className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold cursor-pointer transition-all border border-red-200 text-red-600
              ${status === "REJECTED" ? "bg-red-50" : "bg-white hover:bg-red-50"}`}
          >
            ไม่ผ่าน
          </button>

          {/* Outlined / Interview — Tertiary #BC4800 */}
          <button
            onClick={() => handleStatusChange("INTERVIEW")}
            className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold cursor-pointer transition-all border border-orange-300 text-[#BC4800]
              ${status === "INTERVIEW" ? "bg-orange-50" : "bg-white hover:bg-orange-50"}`}
          >
            นัดสัมภาษณ์
          </button>

          {/* Primary / Accept */}
          <button
            onClick={() => handleStatusChange("ACCEPTED")}
            className={`flex-1 py-2.5 rounded-xl text-[13px] font-bold cursor-pointer transition-all text-white
              ${status === "ACCEPTED" ? "bg-[#1D4ED8]" : "bg-[#2563EB] hover:bg-[#1D4ED8]"}`}
          >
            รับเข้าทำงาน
          </button>
        </div>
      </div>
    </div>
  );
}
