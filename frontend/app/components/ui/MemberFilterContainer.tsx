import { Icon } from "@iconify/react";
import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";

type Props = {};

const MemberFilterContainer = (props: Props) => {
  return (
    <motion.div
      className="absolute z-50 right-0 mt-2 w-80 bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-black/10">
          <Icon icon={"mynaui:filter-solid"} width={20} height={20} />{" "}
          <h1>ฟิลเตอร์</h1>
        </div>
        <div className="px-4">
          {" "}
          <label className="text-neutral-500 py-2">เรียงตาม</label>
          <div className="relative">
            <Icon
              className="absolute left-2.5 top-1/2 -translate-y-1/2"
              icon={"mdi:sort-calendar-descending"}
              width={15}
              height={15}
            />
            <select className="pl-8 w-full px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition bg-white">
              <option value="newest">ใหม่ที่สุด</option>
              <option value="oldest">เก่าที่สุด</option>
            </select>
          </div>
        </div>{" "}
        <div className="px-4">
          <label className="text-neutral-500 py-2">สถานะ</label>
          <div className="relative">
            <Icon
              className="absolute left-2.5 top-1/2 -translate-y-1/2"
              icon={"mdi:tag-outline"}
              width={15}
              height={15}
            />
            <select className="pl-8 w-full px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition bg-white">
              <option value="">ทั้งหมด</option>
              <option value="pending">รอการยืนยัน</option>
              <option value="accepted">ตอบรับ</option>
              <option value="rejected">ปฏิเสธ</option>
            </select>
          </div>
        </div>
        <div className="px-4">
          {" "}
          <label className="text-neutral-500 py-2">ตำแหน่งงาน</label>
          <div className="relative">
            <Icon
              className="absolute left-2.5 top-1/2 -translate-y-1/2"
              icon={"mdi:briefcase-outline"}
              width={15}
              height={15}
            />
            <select className="pl-8 w-full px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition bg-white">
              <option value="">ทั้งหมด</option>
              <option value="newest">ใหม่ที่สุด</option>
              <option value="oldest">เก่าที่สุด</option>
            </select>
          </div>
        </div>
        <div className="p-2 grid grid-cols-2 gap-5 items-center">
          <Button variant="outlined">ล้าง</Button>
          <Button variant="primary">กรองผลลัพธ์</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MemberFilterContainer;
