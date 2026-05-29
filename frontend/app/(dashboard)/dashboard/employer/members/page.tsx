"use client";
import Button from "@/app/components/ui/Button";
import MemberFilterContainer from "@/app/components/ui/MemberFilterContainer";
import { Icon } from "@iconify/react";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { formatDate } from "@/app/lib/formatDate";
import { CompanyRole } from "@/app/types/job.type";
import { useCompany } from "@/app/hooks/useCompany";
import InviteMemberModal from "@/app/components/ui/InviteMemberModal";

const ROLE_CONFIG: Record<CompanyRole, { label: string; className: string }> = {
  OWNER: { label: "นายจ้าง", className: "bg-purple-50 text-purple-600" },
  ADMIN: { label: "แอดมิน", className: "bg-blue-50 text-blue-600" },
  HR: { label: "HR", className: "bg-green-50 text-green-600" },
  RECRUITER: {
    label: "รีครูตเตอร์",
    className: "bg-yellow-50 text-yellow-600",
  },
  VIEWER: { label: "ผู้ชม", className: "bg-gray-50 text-gray-500" },
};

const ROLE_PERMISSIONS: Record<CompanyRole, string[]> = {
  OWNER: ["ลงประกาศ", "จัดการผู้สมัคร", "จัดการสมาชิก"],
  ADMIN: ["ลงประกาศ", "จัดการผู้สมัคร", "จัดการสมาชิก"],
  HR: ["ลงประกาศ", "จัดการผู้สมัคร"],
  RECRUITER: ["จัดการผู้สมัคร"],
  VIEWER: ["ดูข้อมูล"],
};

const CompanyMember = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const { members, handleInviteMember, pendingInvites } = useCompany();
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const handleInvite = async (email: string, role: CompanyRole) => {
    setInviteLoading(true);
    setInviteError(null);
    try {
      await handleInviteMember(email, role);
      setInviteModal(false);
    } catch (error: any) {
      setInviteError(error?.message ?? "เกิดข้อผิดพลาด");
    } finally {
      setInviteLoading(false);
    }
  };
  return (
    <div className="flex h-[calc(100vh-70px)] bg-gray-50 font-sans text-gray-900 antialiased overflow-hidden">
      <main className="flex-1 overflow-auto">
        <div className="px-8 py-6 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h2 className="text-base font-bold text-gray-900">
                จัดการผู้ใช้ทั้งหมด
              </h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => setShowFilter(!showFilter)}
                    className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Icon icon="mdi:tune-vertical" className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {showFilter && <MemberFilterContainer />}
                  </AnimatePresence>
                </div>
                <Button
                  onClick={() => setInviteModal(!inviteModal)}
                  className="flex items-center gap-2"
                >
                  <Icon icon="mdi:invite" width={15} height={15} />
                  เชิญผู้ใช้
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-[1.5fr_1fr_1fr_1.2fr_1fr_90px] px-6 py-2.5 bg-gray-50/60 border-b border-gray-50">
              {[
                "ชื่อผู้ใช้",
                "อีเมล",
                "บทบาท",
                "สิทธิ์",
                "วันที่เข้าร่วม",
                "การจัดการ",
              ].map((h) => (
                <span
                  key={h}
                  className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold"
                >
                  {h}
                </span>
              ))}
            </div>

            <div className="flex flex-col divide-y divide-gray-50">
              {members.map((member) => {
                const role = ROLE_CONFIG[member.role];
                const permissions = ROLE_PERMISSIONS[member.role];
                return (
                  <div
                    key={member.id}
                    className="grid grid-cols-[1.5fr_1fr_1fr_1.2fr_1fr_90px] gap-3 px-6 py-3 hover:bg-gray-50 transition-colors"
                  >
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

                    <div className="flex items-center">
                      <p className="text-xs text-gray-500 truncate">
                        {member.user?.email}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${role.className}`}
                      >
                        {role.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 flex-wrap">
                      {permissions.map((p) => (
                        <span
                          key={p}
                          className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md"
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center">
                      <span className="text-xs text-gray-400">
                        {formatDate(member.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center justify-center">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                        <Icon icon="mdi:dots-horizontal" width={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {pendingInvites.map((invite) => (
              <div
                key={invite.id}
                className="grid grid-cols-[1.5fr_1fr_1fr_1.2fr_1fr_90px] gap-3 px-6 py-3 opacity-50"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-400">
                    <Icon icon="mdi:email-outline" width={16} />
                  </div>
                  <p className="text-sm font-medium text-gray-400 truncate">
                    รอการตอบรับ
                  </p>
                </div>

                <div className="flex items-center">
                  <p className="text-xs text-gray-400 truncate">
                    {invite.email}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
                    {ROLE_CONFIG[invite.role]?.label}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="text-[10px] bg-yellow-50 text-yellow-500 px-2 py-0.5 rounded-full border border-yellow-100">
                    รอการยืนยัน
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="text-xs text-gray-400">
                    {formatDate(invite.createdAt)}
                  </span>
                </div>

                {/* การจัดการ */}
                <div className="flex items-center justify-center">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                    <Icon icon="mdi:dots-horizontal" width={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {inviteModal && (
          <InviteMemberModal
            onClose={() => setInviteModal(false)}
            onConfirm={handleInvite}
            isLoading={inviteLoading}
            error={inviteError}
          />
        )}
      </main>
    </div>
  );
};

export default CompanyMember;
