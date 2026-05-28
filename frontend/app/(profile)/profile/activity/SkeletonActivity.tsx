"use client";

import { Bone } from "@/app/(main)/jobs/JobListSkeleton";

export default function SkeletonCandidateDashboard() {
  return (
    <div className="bg-gray-50 p-6 flex flex-col gap-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-5">
          <div className="grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 px-4 py-3 text-center flex flex-col items-center gap-1.5"
              >
                <Bone className="w-10 h-7 rounded" />
                <Bone className="w-16 h-2.5 rounded" />
              </div>
            ))}
          </div>

          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-full">
            {[...Array(3)].map((_, i) => (
              <Bone key={i} className="flex-1 h-9 rounded-lg" />
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-4">
            <Bone className="w-12 h-2.5 rounded" />

            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Bone className="w-9 h-9 rounded-full shrink-0" />
                <div className="flex flex-col gap-1.5 flex-1">
                  <Bone className="w-3/4 h-3 rounded" />
                  <Bone className="w-1/2 h-2.5 rounded" />
                </div>
                <Bone className="w-12 h-2.5 rounded shrink-0" />
              </div>
            ))}

            <Bone className="w-16 h-2.5 rounded mt-2" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Bone className="w-9 h-9 rounded-full shrink-0" />
                <div className="flex flex-col gap-1.5 flex-1">
                  <Bone className="w-2/3 h-3 rounded" />
                  <Bone className="w-1/3 h-2.5 rounded" />
                </div>
                <Bone className="w-12 h-2.5 rounded shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
