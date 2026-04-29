import { Job } from "@/app/types/job.type";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
import AvatarStack from "./AvatarStack";

type JobRowProps = {
  job: Job;
  href?: string | null;
};

const JobRow = ({ href, job }: JobRowProps) => {
  const content = (
    <div className="grid grid-cols-[2.5fr_1fr_1fr_1.2fr_90px] px-6 py-4 border-b border-gray-50 last:border-0 items-center hover:bg-gray-50/50 transition-colors group">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 shrink-0 group-hover:border-gray-200 transition-colors">
          <Icon icon="mdi:briefcase-outline" className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">{job.title}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {job.companyName} · {job.location}
          </p>
        </div>
      </div>
      <div>
        {job.status === "active" ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            Closed
          </span>
        )}
      </div>
      {/* Applicants */}
      <div>
        <AvatarStack
          count={job.applications.length}
          avatars={job.applications
            .slice()
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((a) => a.user!.profile?.avatarUrl)
            .filter((url): url is string => Boolean(url))}
        />
      </div>
      {/* Date */}
      <p className="text-sm text-gray-400">
        {new Date(job.createdAt).toLocaleDateString("th-TH", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
      {/* Action */}
      <div>
        {job.status === "active" ? (
          <button className="text-sm font-semibold text-gray-600 border border-gray-200 px-4 py-1.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all">
            Edit
          </button>
        ) : (
          <button className="text-sm font-semibold text-blue-600 border border-blue-200 px-3 py-1.5 rounded-xl hover:bg-blue-50 active:scale-95 transition-all">
            Reopen
          </button>
        )}
      </div>
    </div>
  );
  if (href) {
    return (
      <Link key={job.id} href={href}>
        {content}
      </Link>
    );
  }
  return content;
};

export default JobRow;
