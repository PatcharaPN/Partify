import { useMatchScore } from "@/app/hooks/useMatchScore";
import { useProfile } from "@/app/hooks/useProfile";
import { Job } from "@/app/types/job.type";
import Link from "next/link";
import React from "react";

type RelatedJobCardProps = {
  job: Job;

  match?: number;
  rate?: number;
};

const RelatedJobCard = ({ job, rate = 5 }: RelatedJobCardProps) => {
  const match = useMatchScore(job);
  return (
    <div className="bg-white w-70 rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-24  relative">
        <img
          src={
            job.overviewPictureURL?.[0] ??
            "https://placehold.co/600x400?text=No+Image"
          }
          className="absolute inset-0 w-full h-full object-cover"
          alt={job.title}
        />

        <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
          {match}% Match
        </span>
      </div>

      <div className="p-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-sm font-medium text-gray-900 line-clamp-1">
            {job.title}
          </span>

          {/* <span className="text-xs font-semibold text-green-600 shrink-0">
            {rate}
          </span> */}
        </div>

        <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
          {job.company?.companyName} • {job.location}
        </div>

        <Link href={`/jobs/${job.id}`}>
          <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 rounded-lg transition-colors">
            Apply Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RelatedJobCard;
