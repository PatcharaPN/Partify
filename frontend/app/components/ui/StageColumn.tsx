import { useDroppable } from "@dnd-kit/core";
import CandidateCard from "./CandidateCard";
import { Application } from "@/app/types/job.type";

interface StageColumnProp {
  stageId: string;
  label: string;
  color: string;
  candidates: Application[] | undefined;
  onViewInfo: (candidate: Application) => void;
}

const StageColumn = ({
  color,
  candidates,
  stageId,
  label,
  onViewInfo,
}: StageColumnProp) => {
  const { setNodeRef, isOver } = useDroppable({ id: stageId });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl p-4 border border-neutral-500/40 min-h-50 transition-colors ${
        isOver ? "bg-blue-50 border-blue-300" : ""
      }`}
    >
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-3">
          {" "}
          <span className={`w-2 h-2 rounded-full ${color}`} />
          <h3 className="font-semibold text-sm">{label}</h3>{" "}
        </div>
        <p className="text-2xl font-bold mt-1">{candidates?.length}</p>
      </div>

      <div className="mt-2 space-y-2">
        {candidates?.map((c) => (
          <CandidateCard
            key={c.id}
            candidate={c}
            onViewInfo={() => onViewInfo(c)}
          />
        ))}
      </div>
    </div>
  );
};
export default StageColumn;
