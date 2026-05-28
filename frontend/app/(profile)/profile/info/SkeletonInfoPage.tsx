"use client";

import { Bone } from "@/app/(main)/jobs/JobListSkeleton";

export default function SkeletonPersonalInfoPage() {
  return (
    <div className="bg-gray-50 p-6 flex flex-col gap-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
        <Bone className="w-28 h-4 rounded" />
        <div className="h-px bg-gray-100" />
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <Bone className="w-16 h-3 rounded" />
                <Bone className="w-full h-9 rounded-xl" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <Bone className="w-20 h-3 rounded" />
                <Bone className="w-full h-9 rounded-xl" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <Bone className="w-12 h-3 rounded" />
                <Bone className="w-full h-9 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
        <Bone className="w-16 h-4 rounded" />
        <div className="h-px bg-gray-100" />
        <div className="grid grid-cols-2 gap-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <Bone className="w-20 h-3 rounded" />
              <Bone className="w-full h-9 rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
        <Bone className="w-40 h-3 rounded" />
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <Bone key={i} className="w-20 h-8 rounded-xl" />
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
        <Bone className="w-36 h-3 rounded" />
        <div className="flex flex-wrap gap-2">
          {[...Array(6)].map((_, i) => (
            <Bone key={i} className="w-24 h-8 rounded-xl" />
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Bone className="w-44 h-4 rounded" />
          <Bone className="w-72 h-3 rounded mt-1" />
        </div>
        <div className="h-px bg-gray-100" />
        <Bone className="w-full h-24 rounded-xl" />
        <Bone className="w-12 h-2.5 rounded self-end" />
      </div>

      <div className="flex justify-end gap-2">
        <Bone className="w-16 h-9 rounded-lg" />
        <Bone className="w-16 h-9 rounded-lg" />
      </div>
    </div>
  );
}
