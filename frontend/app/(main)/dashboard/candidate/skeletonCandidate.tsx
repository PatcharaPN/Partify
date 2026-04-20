"use client";

import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchProfile } from "@/app/store/slices/profileSlice";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Bone } from "../../jobs/JobListSkeleton";

export default function SkeletonCandidate() {
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 antialiased overflow-hidden">
      <aside className="w-60 shrink-0 bg-white flex flex-col py-4 px-3">
        {[...Array(5)].map((_, i) => (
          <Bone key={i} className="h-8 w-full rounded-lg mt-2" />
        ))}
      </aside>

      {/* Main */}
      <main className="flex-1 px-6 py-7 overflow-auto">
        {/* Header */}
        <div className="mb-5">
          <Bone className="w-48 h-5" />
          <Bone className="w-72 h-3 my-2" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gray-500/10 animate-pulse rounded-l-2xl" />
            <div className="flex items-start justify-between mb-3">
              <Bone className="w-12 h-12" />
            </div>
            <Bone className="w-32 h-5 my-2" />
            <Bone className="w-20 h-4" />
          </div>

          {/* Applicants */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gray-500/10 animate-pulse rounded-l-2xl" />
            <div className="flex items-start justify-between mb-3">
              <Bone className="w-12 h-12" />
            </div>
            <Bone className="w-32 h-5 my-2" />
            <Bone className="w-20 h-4" />
          </div>

          {/* Hires */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gray-500/10 animate-pulse rounded-l-2xl" />
            <div className="flex items-start justify-between mb-3">
              <Bone className="w-12 h-12" />
            </div>
            <Bone className="w-32 h-5 my-2" />
            <Bone className="w-20 h-4" />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_400px] gap-4">
          {/* Left */}
          <div className="flex flex-col gap-4">
            {/* Application Progress */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <Bone className="w-32 h-5 mt-2" />
                <Bone className="w-17 h-3" />
              </div>
              <div className="flex flex-col divide-y divide-gray-50">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 py-3">
                    <Bone className="w-10 h-10 mt-2" />
                    <div className="flex-1 min-w-0">
                      <Bone className="w-22 h-4 mt-2" />
                      <Bone className="w-14 h-4 mt-2" />
                    </div>
                    <Bone className="w-22 h-4 mt-2" />
                    <Bone className="w-22 h-4 mt-2" />
                    <button className="text-gray-300 hover:text-gray-500 text-base leading-none">
                      ···
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended */}
            <div>
              <Bone className="w-48 h-2 my-5" />
              <div className="grid grid-cols-4 gap-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                  >
                    <div className={`h-24 bg-gray-200 animate-pulse relative`}>
                      <Bone className="absolute top-2 right-2 bg-gray-800/20 h-4 w-10 text-white text-[10px] font-medium px-2 py-0.5 rounded-full" />
                    </div>
                    <div className="p-3">
                      <div className="flex items-baseline justify-between">
                        <Bone className="w-48 h-3" />
                        <Bone className="w-10 h-3" />
                      </div>
                      <Bone className="w-30 h-3 my-2" />
                      <div className="flex gap-1.5 mt-2 mb-3">
                        {[...Array(2)].map((_, i) => (
                          <Bone key={i} className="w-20 h-5" />
                        ))}
                      </div>
                      <Bone className="w-full h-8" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-3">
            {/* Profile Strength */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-1">
                <Bone className="w-30 h-2 mt-2" />
                <Bone className="w-10 h-3 mt-2" />
              </div>
              <Bone className="w-72 h-3 mt-2" />
              <Bone className="w-52 h-3 my-2" />
              <div className="flex flex-col gap-2.5">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div
                      className={`w-4 h-4 rounded-full shrink-0 mt-0.5 flex items-center justify-center`}
                    >
                      <Bone className="w-72 h-3 mt-2" />
                    </div>
                    <div>
                      <Bone className="w-72 h-3 mt-2" />
                      <Bone className="w-72 h-3 mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Interview */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center gap-1.5 mb-2 text-[11px] text-gray-400 uppercase tracking-wider">
                <Bone className="w-3 h-3 mt-2" />
                <Bone className="w-35 h-3 mt-2" />
              </div>
              <Bone className="w-28 h-3 mt-2" />
              <Bone className="w-60 h-3 my-2" />
              <Bone className="w-72 h-3 mt-2" />
              <Bone className="w-72 h-8 mt-2" />
            </div>

            {/* Editorial Tip */}
            <Bone className="w-full h-20 mt-2" />
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-2xl border p-4 ${
        highlight
          ? "border-t-2 border-t-blue-600 border-x-gray-100 border-b-gray-100"
          : "border-gray-100"
      }`}
    >
      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 uppercase tracking-wider mb-2">
        <span className="w-3.5 h-3.5">{icon}</span>
        {label}
      </div>
      <div
        className={`text-3xl font-semibold ${highlight ? "text-blue-600" : "text-gray-900"}`}
      >
        {value}
      </div>
    </div>
  );
}

function Avatar({ initials, color }: { initials: string; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    green: "bg-green-50 text-green-600",
  };
  return (
    <div
      className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
        colors[color] || colors.blue
      }`}
    >
      {initials}
    </div>
  );
}

function StatusBadge({ status, color }: { status: string; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-700",
  };
  return (
    <span
      className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${colors[color] || colors.blue}`}
    >
      {status}
    </span>
  );
}
