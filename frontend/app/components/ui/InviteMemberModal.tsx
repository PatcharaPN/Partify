"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { CompanyRole } from "@/app/types/job.type";
import Button from "./Button";

const ROLES: { value: CompanyRole; label: string }[] = [
  { value: "ADMIN", label: "แอดมิน" },
  { value: "HR", label: "HR" },
  { value: "RECRUITER", label: "รีครูตเตอร์" },
  { value: "VIEWER", label: "ผู้ชม" },
];

type InviteMemberModalProps = {
  onClose: () => void;
  onConfirm: (email: string, role: CompanyRole) => void;
  isLoading?: boolean;
  error?: string | null;
};

const InviteMemberModal = ({ onClose, onConfirm }: InviteMemberModalProps) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<CompanyRole>("HR");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:invite" className="text-blue-600" width={20} />
              <h2 className="text-base font-bold text-gray-900">เชิญสมาชิก</h2>
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
              อีเมล <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Icon
                icon="mdi:email-outline"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                width={15}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full pl-9 pr-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
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
                value={role}
                onChange={(e) => setRole(e.target.value as CompanyRole)}
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

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <Button
              variant="outlined"
              onClick={onClose}
              className="py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              ยกเลิก
            </Button>
            <Button
              variant="primary"
              onClick={() => onConfirm(email, role)}
              disabled={!email.trim()}
              className="py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              ส่งคำเชิญ
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InviteMemberModal;
