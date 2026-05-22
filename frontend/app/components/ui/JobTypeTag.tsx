import { Icon } from "@iconify/react";
import React from "react";

export type JobType = "FULLTIME" | "PARTTIME" | "CONTRACT" | "FREELANCE";

type JobTypeTagProps = {
  jobType: JobType;
};

const jobTypeLabel: Record<JobType, string> = {
  FULLTIME: "เต็มเวลา",
  PARTTIME: "พาร์ทไทม์",
  CONTRACT: "สัญญาจ้าง",
  FREELANCE: "ฟรีแลนซ์",
};

const jobTypeStyle: Record<JobType, string> = {
  FULLTIME: "bg-blue-50 text-blue-700 border border-blue-200",

  PARTTIME: "bg-green-50 text-green-700 border border-green-200",

  CONTRACT: "bg-orange-50 text-orange-700 border border-orange-200",

  FREELANCE: "bg-purple-50 text-purple-700 border border-purple-200",
};

const JobTypeTag = ({ jobType }: JobTypeTagProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${jobTypeStyle[jobType]}`}
    >
      <Icon icon="mingcute:time-line" className="w-2.5 h-2.5" />

      {jobTypeLabel[jobType]}
    </span>
  );
};

export default JobTypeTag;
