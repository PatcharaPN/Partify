"use client";

import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { formatDate } from "@/app/lib/formatDate";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";

interface QuickApplyModalProps {
  isOpen?: boolean;
  message?: string;
  onSetMessage?: (value: string) => void;
  isLoading: boolean;
  onApply?: () => void;
  onClose?: () => void;
}

export default function QuickApplyModal({
  isOpen = true,
  onClose,
  onApply,
  message,
  isLoading,
  onSetMessage,
}: QuickApplyModalProps) {
  const { currentUser } = useCurrentUser();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                สมัครแบบรวดเร็ว
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
                <img src={currentUser?.profile?.avatarUrl} alt="" />
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
                {currentUser?.profile?.firstName ?? "Unknown Applicant"}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Icon
                  icon="mdi:file-document-outline"
                  width={12}
                  height={12}
                  className="text-blue-500"
                />
                <span className="text-xs text-blue-600 font-medium">
                  {currentUser?.resume ? "อัพโหลดเรซูเม่แล้ว" : "No Resume"}
                </span>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-400">
                  ล่าสุด {formatDate(currentUser?.profile?.updatedAt)}
                </span>
              </div>
            </div>
          </div>

          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Edit
          </button>
        </div>

        {/* Say Hello */}
        <div className="mx-6 mb-5">
          <label className="block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
            แนะนำตัว
            <span className="text-gray-300 font-normal normal-case tracking-normal">
              (ไม่บังคับ)
            </span>
          </label>
          <textarea
            value={message}
            onChange={(e) => onSetMessage?.(e.target.value)}
            rows={3}
            placeholder="Add a quick note about why you're interested..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
          />
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            type="button"
            onClick={onApply}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 rounded-xl transition-colors duration-150"
          >
            ยืนยันการสมัคร
            <Icon icon="mdi:arrow-right" width={16} height={16} />
          </button>
          <p className="mt-3 text-center text-xs text-gray-400">
            เมื่อสมัครงาน คุณยอมรับ, Partify's{" "}
            <a
              href="#"
              className="underline hover:text-gray-600 transition-colors"
            >
              ข้อกำหนดในการให้บริการ
            </a>{" "}
            และ{" "}
            <a
              href="#"
              className="underline hover:text-gray-600 transition-colors"
            >
              นโยบายการแบ่งปันข้อมูล
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
