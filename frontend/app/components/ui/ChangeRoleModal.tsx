"use client";
import { CompanyMember, CompanyRole } from "@/app/types/job.type";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Button from "./Button";
import { ROLES } from "@/app/constants/jobLabels";

type ChangeRoleModalProps = {
  member: CompanyMember;
  onConfirm: (email: string, role: CompanyRole) => void;
  onClose: () => void;
  isLoading?: boolean;
};

const ChangeRoleModal = ({
  member,
  onClose,
  onConfirm,
}: ChangeRoleModalProps) => {
  const [selectedRole, setSelectedRole] = useState<CompanyRole>(member.role);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:edit" className="text-blue-600" width={20} />
              <h2 className="text-base font-bold text-gray-900">จัดการสถานะ</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition"
            >
              <Icon icon="mdi:close" width={16} />
            </button>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500">
              ผู้ใช้ <span className="text-red-400">*</span>
            </label>
            <div className="flex items-center gap-3 min-w-0">
              {member.user?.profile?.avatarUrl ? (
                <img
                  src={member.user.profile.avatarUrl}
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-500 text-sm font-semibold">
                  {member.user?.profile?.firstName?.[0] ?? "?"}
                </div>
              )}
              <p className="text-sm font-medium text-gray-800 truncate">
                {member.user?.profile?.firstName}{" "}
                {member.user?.profile?.lastName}
              </p>
            </div>
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500">บทบาท</label>
            <div className="relative">
              <Icon
                icon="mdi:account-outline"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                width={15}
              />
              <select
                onChange={(e) => setSelectedRole(e.target.value as CompanyRole)}
                value={selectedRole}
                className="pl-9 w-full py-2 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition bg-white appearance-none"
              >
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
              <Icon
                icon="mdi:chevron-down"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                width={15}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <Button
              onClick={onClose}
              variant="outlined"
              className="py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              ยกเลิก
            </Button>
            <button
              onClick={() => {
                onConfirm(member.user?.email as string, selectedRole);
              }}
            >
              เปลี่ยนสถานะ
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChangeRoleModal;
