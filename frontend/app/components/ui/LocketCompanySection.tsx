import { Icon } from "@iconify/react";
import React from "react";

const LocketCompanySection = () => {
  return (
    <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-5 flex items-center gap-3 opacity-60">
      <Icon
        icon="mdi:lock-outline"
        className="w-5 h-5 text-gray-400 shrink-0"
      />
      <div>
        <p className="text-sm font-medium text-gray-500">ข้อมูลบริษัท</p>
        <p className="text-xs text-gray-400 mt-0.5">
          เฉพาะบัญชี Employer เท่านั้น
        </p>
      </div>
    </div>
  );
};

export default LocketCompanySection;
