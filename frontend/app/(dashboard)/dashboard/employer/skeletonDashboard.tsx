"use client";

import { Bone } from "@/app/(main)/jobs/JobListSkeleton";

export default function SkeletonDashboard() {
  return (
    <div className="flex h-[calc(100vh-70px)] bg-gray-50 font-sans text-gray-900 antialiased overflow-hidden">
      <main className="flex-1 overflow-auto">
        {/* DashboardHeader */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 sticky top-0 z-10">
          <Bone className="w-52 h-5 rounded-lg" />
          <Bone className="w-36 h-3 rounded mt-2" />
        </div>

        <div className="px-8 py-6 space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              "bg-violet-500",
              "bg-orange-400",
              "bg-blue-500",
              "bg-yellow-400",
            ].map((accent, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-5 relative overflow-hidden"
              >
                <div
                  className={`absolute top-0 left-0 w-1 h-full ${accent} rounded-l-2xl`}
                />
                <div className="flex items-start justify-between mb-3">
                  <Bone className="w-9 h-9 rounded-xl" />
                </div>
                <Bone className="w-24 h-3 rounded" />
                <Bone className="w-16 h-6 rounded mt-2" />
              </div>
            ))}
          </div>

          {/* Main Grid: job table + recent applicants */}
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-[2fr_1fr] gap-6">
              {/* Left — Job Table */}
              <div className="bg-white p-2 rounded-2xl">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                  <Bone className="w-36 h-5 rounded-lg" />
                  <Bone className="w-44 h-9 rounded-xl" />
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
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 last:border-0"
                  >
                    <Bone className="w-5 h-5 rounded shrink-0" />
                    <div className="flex items-center gap-3 w-48 shrink-0">
                      <Bone className="w-9 h-9 rounded-lg shrink-0" />
                      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <Bone className="w-24 h-3.5 rounded" />
                        <Bone className="w-16 h-2.5 rounded" />
                      </div>
                    </div>
                    <div className="flex gap-1.5 flex-1">
                      <Bone className="w-14 h-5 rounded-full" />
                      <Bone className="w-18 h-5 rounded-full" />
                    </div>
                    <Bone className="w-12 h-4 rounded" />
                    <Bone className="w-20 h-3.5 rounded" />
                    <Bone className="w-18 h-6 rounded-full" />
                    <Bone className="w-8 h-8 rounded-lg shrink-0" />
                  </div>
                ))}

                {/* View all link */}
                <div className="flex justify-end p-2 border-t border-gray-100">
                  <Bone className="w-16 h-4 rounded" />
                </div>
              </div>

              {/* Right — Recent Applicants */}
              <div className="bg-white rounded-2xl border border-gray-100 p-4">
                {/* Header */}
                <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-3">
                  <Bone className="w-28 h-4 rounded" />
                  <Bone className="w-16 h-4 rounded" />
                </div>

                {/* Applicant rows */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0"
                  >
                    <Bone className="w-9 h-9 rounded-full shrink-0" />
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      <Bone className="w-28 h-3.5 rounded" />
                      <Bone className="w-20 h-2.5 rounded" />
                    </div>
                    <Bone className="w-16 h-5 rounded-full shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
