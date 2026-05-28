import { STATUS_CONFIGS } from "@/app/constants/jobLabels";
import { Application } from "@/app/types/job.type";
import { formatTimeAgo } from "@/app/utils/FormatTimeAgo";
import { Icon } from "@iconify/react";

type ApplicantRowProps = {
  applications: Application[];
  onSelect: (app: Application) => void;
};

const ApplicantRow = ({ applications, onSelect }: ApplicantRowProps) => {
  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-400 gap-2">
        <Icon icon="mdi:account-off-outline" className="w-8 h-8" />
        <p className="text-sm">ยังไม่มีผู้สมัคร</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {applications.map((app) => {
        const status = STATUS_CONFIGS[app.status];
        return (
          <div
            key={app.id}
            className="grid grid-cols-[2.5fr_1fr_1fr_1.2fr_90px] gap-3 px-6 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50"
          >
            {/* ชื่อผู้สมัคร */}
            <div className="flex items-center gap-3 min-w-0">
              {app.user?.profile?.avatarUrl ? (
                <img
                  src={app.user.profile.avatarUrl}
                  alt={app.user.profile.firstName}
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-500 text-sm font-semibold">
                  {app.user?.profile?.firstName?.[0] ?? "?"}
                </div>
              )}
              <p className="text-sm font-medium text-gray-800 truncate">
                {app.user?.profile?.firstName} {app.user?.profile?.lastName}
              </p>
            </div>

            {/* ตำแหน่งที่สมัคร */}
            <div className="flex items-center">
              <p className="text-xs text-gray-500 truncate">
                {app.job?.title ?? "ไม่ระบุตำแหน่ง"}
              </p>
            </div>

            {/* สมัครเมื่อ */}
            <div className="flex items-center">
              <span className="text-xs text-gray-400">
                {formatTimeAgo(app.createdAt)}
              </span>
            </div>

            {/* สถานะ */}
            <div className="flex items-center">
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${status.className}`}
              >
                {status.label}
              </span>
            </div>

            {/* การจัดการ */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => onSelect(app)}
                className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
              >
                ดูรายละเอียด
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ApplicantRow;
