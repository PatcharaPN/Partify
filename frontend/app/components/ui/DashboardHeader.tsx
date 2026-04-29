import { Icon } from "@iconify/react";
import React from "react";

type DashboardHeaderProps = {
  title: string;
  name: string | undefined;
};

const DashboardHeader = ({ name, title }: DashboardHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          ยินดีต้อนรับกลับ {name} นี่คือภาพรวมของประกาศงานที่คุณจัดการอยู่
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-150 shadow-sm">
          <Icon icon="mdi:plus" className="w-4 h-4" />
          ลงประกาศหางาน
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
