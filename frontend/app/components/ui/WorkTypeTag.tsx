import { WorkModel } from "@/app/types/job.type";
import { Icon } from "@iconify/react";

type WorkTypeTagProps = {
  workType: WorkModel;
};
type WorkLabel = {
  className: string;
  label: string;
};

const workTypeClass: Record<WorkModel, WorkLabel> = {
  hybrid: {
    className: "bg-blue-50 text-blue-700 border border-blue-200",
    label: "Hybrid",
  },
  onsite: {
    className: "bg-orange-50 text-orange-700 border border-orange-200",
    label: "On-site",
  },
  remote: {
    className: "bg-purple-50 text-purple-700 border border-purple-200",
    label: "Remote",
  },
};
const WorkTypeTag = ({ workType }: WorkTypeTagProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${workTypeClass[workType].className}`}
    >
      <Icon icon="mingcute:time-line" className="w-2.5 h-2.5" />

      {workTypeClass[workType].label}
    </span>
  );
};

export default WorkTypeTag;
