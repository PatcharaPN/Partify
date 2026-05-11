export const JOB_TYPE_LABELS: Record<string, { label: string; color: string }> =
  {
    FULLTIME: {
      label: "Full-time",
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    PARTTIME: {
      label: "Part-time",
      color: "bg-green-50 text-green-700 border-green-200",
    },
    FREELANCE: {
      label: "Freelance",
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    INTERNSHIP: {
      label: "Internship",
      color: "bg-amber-50 text-amber-700 border-amber-200",
    },
  };

export const CURRENCIES = [
  { value: "THB", label: "THB — บาท" },
  { value: "USD", label: "USD — ดอลลาร์" },
  { value: "JPY", label: "JPY — เยน" },
];

export const WORKING_DAYS_OPTIONS = [
  "จันทร์–ศุกร์",
  "จันทร์–เสาร์",
  "อังคาร–อาทิตย์",
  "ทุกวัน",
  "ยืดหยุ่น",
];

export const SUGGESTED_BENEFITS = [
  "ประกันสังคม",
  "ค่าล่วงเวลา OT",
  "อาหารกลางวัน",
  "ยูนิฟอร์มฟรี",
  "โบนัสประจำปี",
  "วันหยุดพักร้อน",
  "ค่าเดินทาง",
  "ประกันสุขภาพ",
];
export const CATEGORIES = [
  "ร้านอาหาร & เครื่องดื่ม",
  "ค้าปลีก & แฟชั่น",
  "บริการลูกค้า",
  "คลังสินค้า & โลจิสติกส์",
  "IT & เทคโนโลยี",
  "อื่นๆ",
];

export const EDUCATION_LEVELS = [
  { value: "NONE", label: "ไม่ระบุ" },
  { value: "HIGH_SCHOOL", label: "มัธยมปลาย / ปวช." },
  { value: "VOCATIONAL", label: "ปวส." },
  { value: "BACHELOR", label: "ปริญญาตรี" },
  { value: "MASTER", label: "ปริญญาโท" },
  { value: "DOCTORAL", label: "ปริญญาเอก" },
];
export const STEP_LABELS = ["ข้อมูลเบื้องต้น", "รายละเอียด", "ตรวจสอบ"];

export type WorkModel = "onsite" | "hybrid" | "remote";
export type JobType = "FULLTIME" | "PARTTIME" | "FREELANCE" | "INTERNSHIP";
export type ExperienceLevel = "ENTRY" | "JUNIOR" | "MID" | "SENIOR";
export type UrgencyLevel = "LOW" | "MEDIUM" | "HIGH";

export const SHIFT_LABEL: Record<string, string> = {
  MORNING: "เช้า",
  AFTERNOON: "บ่าย",
  EVENING: "เย็น",
  NIGHT: "กลางคืน",
};
