"use client";
import ApplicantDetailModal from "@/app/components/ui/ApplicantDetailModal";
import CandidateCard from "@/app/components/ui/CandidateCard";
import StageColumn from "@/app/components/ui/StageColumn";
import { useApplicant } from "@/app/hooks/useJobApplications";
import { formatDate } from "@/app/lib/formatDate";
import { Application } from "@/app/types/job.type";
import { formatTimeAgo } from "@/app/utils/FormatTimeAgo";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Icon } from "@iconify/react";
import { useParams } from "next/navigation";
import { useState } from "react";

type TabMenuType = "Overview" | "Application" | "Schedule";
enum ApplicationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  INTERVIEW = "INTERVIEW",
  OFFER = "OFFER",
}
const stageConfig: Record<ApplicationStatus, { label: string; color: string }> =
  {
    [ApplicationStatus.PENDING]: { label: "สมัครแล้ว", color: "bg-gray-400" },
    [ApplicationStatus.INTERVIEW]: { label: "สัมภาษณ์", color: "bg-blue-400" },
    [ApplicationStatus.OFFER]: { label: "ยื่นข้อเสนอ", color: "bg-amber-400" },
    [ApplicationStatus.ACCEPTED]: { label: "จ้างงาน", color: "bg-green-500" },
    [ApplicationStatus.REJECTED]: { label: "ปฏิเสธ", color: "bg-red-400" },
  };
const stages = Object.keys(stageConfig) as ApplicationStatus[];
const tabMenuConfig: Record<TabMenuType, { label: string; icon: string }> = {
  Application: { label: "ใบสมัคร", icon: "tabler:file-text" },
  Overview: { label: "เกี่ยวกับงาน", icon: "tabler:eye" },
  Schedule: { label: "ตารางเวลานัด", icon: "tabler:calendar" },
};

export default function OpenPositionList() {
  const { id } = useParams();
  const {
    jobDetail,
    ownerApplications,
    loading,
    interviewApplication,
    approveApplication,
    rejectApplication,
    offerApplication,
  } = useApplicant(id as string);
  const [activeCandidate, setActiveCandidate] = useState<Application | null>(
    null,
  );
  const [selectedTab, setSelectedTab] = useState<TabMenuType>("Application");
  function handleDragStart(event: DragStartEvent) {
    const candidate = jobDetail?.applications.find(
      (c) => c.id === event.active.id,
    );
    setActiveCandidate(candidate ?? null);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveCandidate(null);

    if (!over) return;

    const applicationId = active.id as string;
    const newStatus = over.id as ApplicationStatus;

    const candidate = jobDetail?.applications.find(
      (c) => c.id === applicationId,
    );
    if (!candidate || candidate.status === newStatus) return;

    try {
      if (newStatus === ApplicationStatus.ACCEPTED) {
        await approveApplication(applicationId);
      } else if (newStatus === ApplicationStatus.REJECTED) {
        await rejectApplication(applicationId);
      } else if (newStatus === ApplicationStatus.INTERVIEW) {
        await interviewApplication(applicationId);
      } else if (newStatus === ApplicationStatus.OFFER) {
        await offerApplication(applicationId);
      }
    } catch (err) {
      console.error("อัปเดตสถานะไม่สำเร็จ", err);
    }
  }
  return (
    <div className="flex h-[calc(100vh-70px)] bg-gray-50 font-sans text-gray-900 antialiased overflow-hidden">
      <main className="flex-1 overflow-auto">
        <div className="px-8 py-6 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
            {/* Header Section */}
            <div className="flex flex-col px-6 py-4 gap-4 border-b border-gray-50">
              {/* Title */}
              <div>
                <div className="flex items-center gap-2 ">
                  <h1 className="font-bold text-2xl">{jobDetail?.title}</h1>{" "}
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      jobDetail?.isActive
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-gray-100 text-gray-500 border border-gray-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        jobDetail?.isActive ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                    {jobDetail?.isActive
                      ? "กำลังเปิดรับสมัคร"
                      : "ปิดรับสมัครแล้ว"}
                  </span>
                </div>
                <span className="text-sm font-medium opacity-40">
                  เปิดรับสมัครเมื่อ {formatTimeAgo(jobDetail?.createdAt ?? "")}
                </span>
              </div>

              {/* Tab Menu */}
              <div className="flex border-t-2 border-transparent">
                {(Object.keys(tabMenuConfig) as TabMenuType[]).map((item) => (
                  <button
                    onClick={() => setSelectedTab(item)}
                    key={item}
                    className={`flex items-center gap-2 px-4 py-3 font-medium transition-all border-t-2 cursor-pointer ${
                      selectedTab === item
                        ? "border-t-blue-600 text-blue-600"
                        : "border-t-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Icon icon={tabMenuConfig[item].icon} width={18} />
                    <span>{tabMenuConfig[item].label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 p-6 overflow-auto">
              {selectedTab === "Application" && (
                <DndContext
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  {" "}
                  <div className="space-y-6">
                    <div className="flex gap-4 overflow-x-auto pb-3 kanban-scroll">
                      {stages.map((stage) => (
                        <div key={stage} className="shrink-0 w-72">
                          <StageColumn
                            label={stageConfig[stage].label}
                            stageId={stage}
                            color={stageConfig[stage].color}
                            candidates={jobDetail?.applications.filter(
                              (c) => c.status === stage,
                            )}
                          />
                        </div>
                      ))}
                    </div>{" "}
                    <DragOverlay>
                      {activeCandidate ? (
                        <CandidateCard candidate={activeCandidate} isOverlay />
                      ) : null}
                    </DragOverlay>
                  </div>{" "}
                </DndContext>
              )}

              {selectedTab === "Overview" && <div>Overview content</div>}
              {selectedTab === "Schedule" && <div>Setting content</div>}
            </div>
            {activeCandidate && (
              <ApplicantDetailModal
                applicants={activeCandidate}
                onClose={() => setActiveCandidate(null)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
