import { Icon } from "@iconify/react";
import React from "react";

export type JobType = "FULLTIME" | "PARTTIME" | "CONTRACT" | "FREELANCE";
export type UrgentType = "LOW" | "MEDIUM" | "HIGH";

type UrgentStyle = {
  label: string;
  class: string;
};
type UrgentTypeTagProps = {
  urgency: UrgentType;
};

const urgentStyle: Record<UrgentType, UrgentStyle> = {
  LOW: {
    label: "ปกติ",
    class: "bg-green-50 text-green-700 border-green-200",
  },

  MEDIUM: {
    label: "ค่อนข้างด่วน",
    class: "bg-amber-50 text-amber-700 border-amber-200",
  },

  HIGH: {
    label: "ด่วนมาก",
    class: "bg-red-50 text-red-700 border-red-200",
  },
};

const JobTypeTag = ({ urgency }: UrgentTypeTagProps) => {
  console.log(urgency);

  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${urgentStyle[urgency].class}`}
    >
      <Icon icon="mingcute:time-line" className="w-2.5 h-2.5" />

      {urgentStyle[urgency].label}
    </span>
  );
};

export default JobTypeTag;
