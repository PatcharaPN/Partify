import { Application } from "@/app/types/job.type";
import { formatTimeAgo } from "@/app/utils/FormatTimeAgo";
import { useDraggable } from "@dnd-kit/core";
import { Icon } from "@iconify/react";
import React from "react";

interface CandidateCardProps {
  candidate: Application;
  onViewInfo: () => void;
  isOverlay?: boolean;
}

const CandidateCard = ({
  candidate,
  isOverlay,
  onViewInfo,
}: CandidateCardProps) => {
  const { setNodeRef, transform, isDragging, attributes, listeners } =
    useDraggable({
      id: candidate.id,
      disabled: isOverlay,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  const profile = candidate.user?.profile;
  const fullName = [profile?.firstName, profile?.lastName]
    .filter(Boolean)
    .join(" ");
  const skills = profile?.skills ?? [];
  const extraSkillsCount = skills.length - 3;

  return (
    <div
      ref={isOverlay ? undefined : setNodeRef}
      {...(isOverlay ? {} : attributes)}
      style={style}
      className={`
        bg-white shadow-sm hover:shadow-md border border-gray-200 
        p-3 w-full rounded-xl cursor-grab active:cursor-grabbing
        transition-shadow
        ${isDragging ? "opacity-50 rotate-2" : ""}
      `}
    >
      <div className="flex gap-3">
        {profile?.avatarUrl ? (
          <img
            className="rounded-full w-10 h-10 object-cover shrink-0"
            src={profile.avatarUrl}
            alt={fullName}
          />
        ) : (
          <div className="rounded-full w-10 h-10 shrink-0 bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold">
            {profile?.firstName?.[0]?.toUpperCase() ?? "?"}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex justify-between items-center text-gray-500">
            {" "}
            <p className="font-semibold text-sm text-gray-900 truncate">
              {fullName || "ไม่ระบุชื่อ"}
            </p>
            <div className="flex">
              <Icon
                onClick={onViewInfo}
                className="cursor-pointer"
                icon={"mdi:eye-outline"}
              />
              <Icon {...(isOverlay ? {} : listeners)} icon={"mdi:drag"} />
            </div>
          </div>

          <span className="text-black text-[12px] font-medium flex items-center gap-2 opacity-45">
            <Icon icon={"ph:bag-simple"} />
            ประสบการณ์ {candidate.yearExperience} ปี
          </span>
          <span className="text-[12px] font-medium flex items-center gap-2 opacity-45">
            <Icon icon={"ep:coin"} />
            {candidate.expectedSalary}
          </span>
        </div>
      </div>{" "}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-[11px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-md font-medium"
            >
              {skill}
            </span>
          ))}
          {extraSkillsCount > 0 && (
            <span className="text-[11px] text-gray-400 px-1 py-0.5">
              +{extraSkillsCount}
            </span>
          )}
        </div>
      )}
      <div className="flex items-center gap-1 mt-2 text-gray-400">
        <Icon icon="mdi:clock-outline" width={12} />
        <span className="text-[11px] font-medium">
          {formatTimeAgo(candidate.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default CandidateCard;
