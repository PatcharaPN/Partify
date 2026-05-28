"use client";

import { Bone } from "@/app/(main)/jobs/JobListSkeleton";

export default function SkeletonApplicantPage() {
  const columns = [
    "ชื่อผู้สมัคร",
    "ตำแหน่งที่สมัคร",
    "สมัครเมื่อ",
    "สถานะ",
    "การจัดการ",
  ];

  return (
    <div className="bg-white border border-gray-100">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <Bone className="w-32 h-5 rounded-lg" />
        <div className="flex items-center gap-2">
          <Bone className="w-48 h-9 rounded-xl" />
          <Bone className="w-8 h-8 rounded-xl" />
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[2.5fr_1fr_1fr_1.2fr_90px] px-6 py-2.5 bg-gray-50/60 border-b border-gray-50">
        {columns.map((col) => (
          <span
            key={col}
            className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold"
          >
            {col}
          </span>
        ))}
      </div>

      {/* Applicant Rows */}
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[2.5fr_1fr_1fr_1.2fr_90px] px-6 py-4 border-b border-gray-50 last:border-0 items-center"
        >
          {/* Name + Avatar */}
          <div className="flex items-center gap-3">
            <Bone className="w-9 h-9 rounded-full shrink-0" />
            <div className="flex flex-col gap-1.5">
              <Bone className="w-28 h-3.5 rounded" />
              <Bone className="w-20 h-2.5 rounded" />
            </div>
          </div>

          {/* Job Title */}
          <Bone className="w-24 h-3.5 rounded" />

          {/* Date */}
          <Bone className="w-20 h-3 rounded" />

          {/* Status Badge */}
          <Bone className="w-20 h-6 rounded-full" />

          {/* Action Button */}
          <Bone className="w-16 h-8 rounded-xl" />
        </div>
      ))}
    </div>
  );
}
