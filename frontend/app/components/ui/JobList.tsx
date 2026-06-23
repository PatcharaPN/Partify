import { Job } from "@/app/types/job.type";
import { Icon } from "@iconify/react";
import Link from "next/link";
import JobTypeTag, { JobType, UrgentType } from "./JobTypeTag";

type JobListProps = {
  keywords: string[];
  jobs: Job;
};

const JobList = ({ jobs, keywords }: JobListProps) => {
  const displayKeyword = jobs.skills.filter(
    (skills) =>
      keywords.length === 0 ||
      keywords.some((k) => skills.toLowerCase().includes(k.toLowerCase())),
  );

  return (
    <Link href={`/jobs/${jobs.id}`} className="block my-2">
      <div className="bg-white border border-neutral-200/70 rounded-2xl p-4 flex flex-col gap-3 hover:border-neutral-300 hover:bg-neutral-50/50 transition-all">
        <div className="flex gap-3 items-start">
          <img
            src={jobs.company.companyImageURL ?? ""}
            alt={jobs.company.companyName ?? ""}
            className="w-11 h-11 rounded-[10px] object-cover border border-neutral-100 shrink-0 bg-neutral-50"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <p className="text-sm font-semibold text-gray-800 leading-snug">
                {jobs.title}
              </p>

              <JobTypeTag urgency={jobs.urgency as UrgentType} />
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5">
              <span className="flex items-center gap-1 text-xs text-neutral-500">
                <Icon
                  icon="mingcute:building-2-line"
                  className="w-3 h-3 shrink-0"
                />
                {jobs.company.companyName}
              </span>
              <span className="flex items-center gap-1 text-xs text-neutral-500">
                <Icon
                  icon="mingcute:location-line"
                  className="w-3 h-3 shrink-0"
                />

                {[jobs.locationDetail, jobs.district, jobs.province]
                  .filter(Boolean)
                  .join(", ")}
              </span>
              <span className="flex items-center gap-1 text-xs text-neutral-500">
                <Icon icon="mingcute:time-line" className="w-3 h-3 shrink-0" />
                {jobs.workingHours}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
          {jobs.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {displayKeyword.map((skill) => {
            const isMatch = keywords.some((k) =>
              skill.toLowerCase().includes(k.toLowerCase()),
            );
            return (
              <span
                key={skill}
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  isMatch
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {skill}
              </span>
            );
          })}
        </div>
        <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100">
          <div>
            <p className="text-base font-semibold text-blue-600">
              {jobs.salaryMin} บ./ชม.
            </p>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              {jobs.workingDays}
            </p>
          </div>
          {jobs.isApplied ? (
            <button
              disabled
              className="text-xs font-medium px-4 py-2 rounded-xl bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-default"
            >
              สมัครแล้ว
            </button>
          ) : (
            <button className="text-xs font-medium px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all">
              สมัครเลย
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default JobList;
