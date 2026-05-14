type Role = "ADMIN" | "CANDIDATE" | "EMPLOYER";

const DISPLAY_ROLE: Record<Role, string> = {
  ADMIN: "แอดมิน",
  CANDIDATE: "ผู้สมัครงาน",
  EMPLOYER: "นายจ้าง",
};

export const getRoleLabel = (role: Role | undefined) => {
  if (!role) return "ไม่ทราบสิทธิ์";
  return DISPLAY_ROLE[role];
};
