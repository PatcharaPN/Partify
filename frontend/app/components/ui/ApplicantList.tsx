import { STATUS_CONFIGS } from "@/app/constants/jobLabels";
import { Application } from "@/app/types/job.type";
import { formatTimeAgo } from "@/app/utils/FormatTimeAgo";
import { Icon } from "@iconify/react";

type Props = {
  applications: Application[];
};

const ApplicantList = ({ applications }: Props) => {
  if (applications.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-10 text-gray-400 gap-2">
        <Icon icon="mdi:account-off-outline" className="w-8 h-8" />
        <p className="text-sm">ยังไม่มีผู้สมัคร</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-50">
      {applications.map((app) => {
        const status = STATUS_CONFIGS[app.status];
        return (
          <div
            key={app.id}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            {/* Avatar */}
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

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {app.user?.profile?.firstName} {app.user?.profile?.lastName}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {app.job?.title ?? "ไม่ระบุตำแหน่ง"}
              </p>
            </div>

            {/* Status + Time */}
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${status.className}`}
              >
                {status.label}
              </span>
              <span className="text-[11px] text-gray-400">
                {formatTimeAgo(app.createdAt)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ApplicantList;
