"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { User } from "@/app/types/job.type";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { applyJob } from "@/app/store/slices/applicationSlice";
import { useParams } from "next/navigation";

interface QuickApplyModalProps {
  isOpen?: boolean;
  jobId: string;
  onClose?: () => void;
}

export default function QuickApplyModal({
  isOpen = true,
  onClose,
  jobId,
}: QuickApplyModalProps) {
  const [note, setNote] = useState("");
  const { user, isLoading } = useAppSelector((state) => state.AuthReducer);
  const dispatch = useAppDispatch();

  const handleApply = async () => {
    console.log(jobId);
    console.log(user!.id);
    try {
      await dispatch(
        applyJob({
          jobId,
          userId: user!.id,
        }),
      ).unwrap();
      onClose?.();
    } catch (error) {
      console.log(error);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                Quick Apply
              </h2>
              <p className="mt-0.5 text-sm text-gray-500">
                Review your details for{" "}
                <span className="text-blue-600 font-medium">
                  Senior Barista @ The Roastery
                </span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Icon icon="mdi:close" width={18} height={18} />
            </button>
          </div>
        </div>

        {/* Applicant Card */}
        <div className="mx-6 mb-4 flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                {/* Simple avatar illustration */}
                <img src={user?.profile?.avatarUrl} alt="" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                <Icon
                  icon="mdi:check-circle"
                  width={10}
                  height={10}
                  className="text-white"
                />
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                {user?.profile?.name ?? "Unknown Applicant"}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Icon
                  icon="mdi:file-document-outline"
                  width={12}
                  height={12}
                  className="text-blue-500"
                />
                <span className="text-xs text-blue-600 font-medium">
                  {user?.profile?.resumeUrl ? "Resume Uploaded" : "No Resume"}
                </span>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-400">Updated 2d ago</span>
              </div>
            </div>
          </div>

          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Edit
          </button>
        </div>

        {/* Schedule Match Card */}
        <div className="mx-6 mb-4 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3.5">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Icon
                icon="mdi:calendar-check"
                width={16}
                height={16}
                className="text-blue-600"
              />
            </div>
            <p className="text-sm font-semibold text-gray-900">
              Perfect Schedule Match
            </p>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Based on your profile, you match the{" "}
            <span className="font-semibold text-gray-900">
              Tue/Thu 4pm – 10pm
            </span>{" "}
            shift schedule perfectly.
          </p>
          <div className="flex gap-2">
            {["Tuesday", "Thursday"].map((day) => (
              <span
                key={day}
                className="text-xs font-bold tracking-wide bg-blue-600 text-white px-3 py-1 rounded-full uppercase"
              >
                {day}
              </span>
            ))}
          </div>
        </div>

        {/* Say Hello */}
        <div className="mx-6 mb-5">
          <label className="block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
            Say Hello{" "}
            <span className="text-gray-300 font-normal normal-case tracking-normal">
              (Optional)
            </span>
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Add a quick note about why you're interested..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
          />
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={handleApply}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 rounded-xl transition-colors duration-150"
          >
            Confirm Application
            <Icon icon="mdi:arrow-right" width={16} height={16} />
          </button>
          <p className="mt-3 text-center text-xs text-gray-400">
            By applying, you agree to Partify's{" "}
            <a
              href="#"
              className="underline hover:text-gray-600 transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline hover:text-gray-600 transition-colors"
            >
              Data Sharing Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
