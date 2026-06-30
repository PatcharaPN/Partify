import { useDraggable } from "@dnd-kit/core";
import React from "react";

interface CandidateCardProps {
  id: number;
  name: string;
  email?: string;
  rating?: number;
}

const CandidateCard = ({
  id = 1,
  name = "Albert",
  email = "candidate@example.com",
  rating = 4,
}: CandidateCardProps) => {
  const { setNodeRef, transform, isDragging, attributes, listeners } =
    useDraggable({
      id: id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };
  return (
    <div>
      <div
        key={id}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={`
       h-20 shadow border-neutral-500/80 p-2 w-full  rounded cursor-grab
        ${isDragging ? "opacity-50" : ""}
      `}
      >
        <p>{name}</p>
      </div>
    </div>
  );
};

export default CandidateCard;
