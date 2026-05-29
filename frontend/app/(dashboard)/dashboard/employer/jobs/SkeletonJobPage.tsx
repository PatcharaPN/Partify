"use client";

import { Bone } from "@/app/(main)/jobs/JobListSkeleton";

export default function SkeletonJobList() {
  return (
    <div className="flex h-[calc(100vh-70px)] bg-gray-50 font-sans text-gray-900 antialiased overflow-hidden">
      <main className="flex-1 overflow-auto">
        <div className="px-8 py-6 space-y-6">
          {/* Manage Jobs Card */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              {/* Title */}
              <Bone className="w-36 h-5 rounded-lg" />

              {/* Search + Button */}
              <div className="flex items-center gap-2">
                <Bone className="w-48 h-9 rounded-xl" />
                <Bone className="w-36 h-9 rounded-xl" />
              </div>
            </div>

            {/* Table Header */}
            <div className="flex items-center gap-4 px-6 py-3 border-b border-gray-50">
              <Bone className="w-5 h-5 rounded" />
              <Bone className="w-40 h-3 rounded" />
              <Bone className="flex-1 h-3 rounded" />
              <Bone className="w-20 h-3 rounded" />
              <Bone className="w-20 h-3 rounded" />
              <Bone className="w-20 h-3 rounded" />
              <Bone className="w-16 h-3 rounded" />
            </div>

            {/* Job Rows */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 last:border-0"
              >
                {/* Checkbox */}
                <Bone className="w-5 h-5 rounded shrink-0" />

                {/* Logo + Title */}
                <div className="flex items-center gap-3 w-52 shrink-0">
                  <Bone className="w-9 h-9 rounded-lg shrink-0" />
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <Bone className="w-28 h-3.5 rounded" />
                    <Bone className="w-20 h-2.5 rounded" />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex gap-1.5 flex-1">
                  <Bone className="w-16 h-5 rounded-full" />
                  <Bone className="w-20 h-5 rounded-full" />
                </div>

                {/* Applicants */}
                <Bone className="w-14 h-4 rounded" />

                {/* Date */}
                <Bone className="w-20 h-3.5 rounded" />

                {/* Status badge */}
                <Bone className="w-20 h-6 rounded-full" />

                {/* Actions */}
                <Bone className="w-8 h-8 rounded-lg shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
