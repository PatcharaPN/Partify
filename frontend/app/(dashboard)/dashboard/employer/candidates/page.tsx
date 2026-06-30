"use client";
import CandidateCard from "@/app/components/ui/CandidateCard";
import { DndContext } from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Icon } from "@iconify/react";
import { useState } from "react";

type TabMenuType = "Overview" | "Application" | "Setting";

const tabMenuConfig: Record<TabMenuType, { label: string; icon: string }> = {
  Application: { label: "Application", icon: "mdi:file-document" },
  Overview: { label: "Overview", icon: "mdi:eye" },
  Setting: { label: "Setting", icon: "mdi:cog" },
};

export default function OpenPositionList() {
  const [selectedTab, setSelectedTab] = useState<TabMenuType>("Application");
  const { setNodeRef, isDragging } = useDraggable({
    id: "candidateCard",
  });
  return (
    <div className="flex h-[calc(100vh-70px)] bg-gray-50 font-sans text-gray-900 antialiased overflow-hidden">
      <main className="flex-1 overflow-auto">
        <div className="px-8 py-6 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
            {/* Header Section */}
            <div className="flex flex-col px-6 py-4 gap-4 border-b border-gray-50">
              {/* Title */}
              <div className="flex items-center gap-2">
                <Icon icon="mdi:briefcase" width={28} />
                <h1 className="font-bold text-2xl">
                  Senior Frontend Developer
                </h1>
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

            {/* Content Section */}
            <div className="flex-1 p-6 overflow-auto">
              {selectedTab === "Application" && (
                <DndContext>
                  {" "}
                  <div className="space-y-6">
                    {/* Pipeline Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      {[
                        "สมัครแล้ว",
                        "คัดกรอง",
                        "สัมภาษณ์",
                        "ต่อรอง",
                        "จ้างงาน",
                      ].map((stage) => (
                        <div key={stage} className="rounded-xl p-4 border ">
                          <h3 className="font-semibold text-sm">{stage}</h3>
                          <p className="text-2xl font-bold ">0</p>
                          <CandidateCard />
                        </div>
                      ))}
                    </div>
                  </div>{" "}
                </DndContext>
              )}

              {selectedTab === "Overview" && <div>Overview content</div>}
              {selectedTab === "Setting" && <div>Setting content</div>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
