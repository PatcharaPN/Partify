import { Icon } from "@iconify/react";
import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import { sort } from "next/dist/build/webpack/loaders/css-loader/src/utils";

type Props = {
  onClose?: () => void;
  onApply?: (filters: FilterValues) => void;
};

export type FilterValues = {
  sortBy: "newest" | "oldest";
  role: string;
};

const MemberFilterContainer = ({ onClose, onApply }: Props) => {
  const [filters, setFilters] = React.useState<FilterValues>({
    sortBy: "newest",
    role: "",
  });

  const handleReset = () => {
    const defaultFilters = { sortBy: "newest" as const, role: "" };
    setFilters(defaultFilters);
    onApply?.(defaultFilters);
  };

  const handleApply = () => {
    onApply?.(filters);
    onClose?.();
  };

  return (
    <motion.div
      className="absolute z-50 right-0 mt-2 w-72 bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-black/10">
          <Icon icon="mynaui:filter-solid" width={18} />
          <h1 className="font-semibold text-sm">ฟิลเตอร์</h1>
        </div>

        <div className="flex flex-col gap-4 px-4">
          {/* เรียงตาม */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-neutral-500 font-medium">
              เรียงตาม
            </label>
            <div className="relative">
              <Icon
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                icon="mdi:sort-calendar-descending"
                width={15}
              />
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    sortBy: e.target.value as FilterValues["sortBy"],
                  })
                }
                className="pl-8 w-full px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition bg-white"
              >
                <option value="newest">วันที่เข้าร่วม: ใหม่สุด</option>
                <option value="oldest">วันที่เข้าร่วม: เก่าสุด</option>
              </select>
            </div>
          </div>

          {/* บทบาท */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-neutral-500 font-medium">
              บทบาท
            </label>
            <div className="relative">
              <Icon
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                icon="mdi:account-outline"
                width={15}
              />
              <select
                value={filters.role}
                onChange={(e) =>
                  setFilters({ ...filters, role: e.target.value })
                }
                className="pl-8 w-full px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition bg-white"
              >
                <option value="">ทั้งหมด</option>
                <option value="OWNER">นายจ้าง</option>
                <option value="ADMIN">แอดมิน</option>
                <option value="MEMBER">สมาชิก</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-3 grid grid-cols-2 gap-2 border-t border-gray-100">
          <Button variant="outlined" onClick={handleReset}>
            ล้าง
          </Button>
          <Button variant="primary" onClick={handleApply}>
            กรองผลลัพธ์
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MemberFilterContainer;
