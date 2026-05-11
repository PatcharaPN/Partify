import { PostJobFormData } from "@/app/types/job.type";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

type WorkModel = "onsite" | "hybrid" | "remote";
type JobType = "FULLTIME" | "PARTTIME" | "FREELANCE" | "INTERNSHIP";
type ExperienceLevel = "ENTRY" | "JUNIOR" | "MID" | "SENIOR";
type UrgencyLevel = "LOW" | "MEDIUM" | "HIGH";

const CATEGORIES = [
  "ร้านอาหาร & เครื่องดื่ม",
  "ค้าปลีก & แฟชั่น",
  "บริการลูกค้า",
  "คลังสินค้า & โลจิสติกส์",
  "IT & เทคโนโลยี",
  "อื่นๆ",
];

const EDUCATION_LEVELS = [
  { value: "NONE", label: "ไม่ระบุ" },
  { value: "HIGH_SCHOOL", label: "มัธยมปลาย / ปวช." },
  { value: "VOCATIONAL", label: "ปวส." },
  { value: "BACHELOR", label: "ปริญญาตรี" },
  { value: "MASTER", label: "ปริญญาโท" },
  { value: "DOCTORAL", label: "ปริญญาเอก" },
];

type StepBasicInfoProps = {
  step: number;
  updateField: <K extends keyof PostJobFormData>(
    key: K,
    value: PostJobFormData[K],
  ) => void;
  form: PostJobFormData;
};

const StepBasicInfo = ({ step, form, updateField }: StepBasicInfoProps) => {
  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="px-6 py-5 flex flex-col gap-5"
    >
      {/* Job Title */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          ชื่อตำแหน่งงาน
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="เช่น พนักงานชงกาแฟ, แคชเชียร์, พนักงานเสิร์ฟ"
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
        />
      </div>

      {/* Category + Work Model */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
            หมวดหมู่
          </label>
          <div className="relative">
            <select
              value={form.category ?? ""}
              onChange={(e) => updateField("category", e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-700 appearance-none focus:outline-none focus:border-blue-400 focus:bg-white transition-all cursor-pointer"
            >
              <option value="">เลือกหมวดหมู่</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <Icon
              icon="mdi:chevron-down"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
            รูปแบบงาน
          </label>
          <div className="flex bg-neutral-100 rounded-xl p-0.5 gap-0.5">
            {(["onsite", "hybrid", "remote"] as WorkModel[]).map((m) => (
              <button
                key={m}
                onClick={() => updateField("workStyle", m)}
                className={`flex-1 py-2 text-xs font-medium rounded-[10px] transition-all ${
                  form.workStyle === m
                    ? "bg-white text-blue-600 border border-neutral-200"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                {m === "onsite"
                  ? "On-site"
                  : m === "hybrid"
                    ? "Hybrid"
                    : "Remote"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Job Type */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          ประเภทงาน
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {(
            ["FULLTIME", "PARTTIME", "FREELANCE", "INTERNSHIP"] as JobType[]
          ).map((t) => {
            const labels: Record<JobType, string> = {
              FULLTIME: "ประจำ",
              PARTTIME: "พาร์ทไทม์",
              FREELANCE: "ฟรีแลนซ์",
              INTERNSHIP: "ฝึกงาน",
            };
            return (
              <button
                key={t}
                onClick={() => updateField("jobType", t)}
                className={`py-2 text-xs font-medium rounded-xl border transition-all ${
                  form.jobType === t
                    ? "bg-blue-50 text-blue-600 border-blue-200"
                    : "bg-neutral-50 text-neutral-500 border-neutral-200 hover:border-neutral-300"
                }`}
              >
                {labels[t]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Experience Level + Years */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
            ระดับประสบการณ์
          </label>
          <div className="relative">
            <select
              value={form.experienceLevel ?? ""}
              onChange={(e) => updateField("experienceLevel", e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-700 appearance-none focus:outline-none focus:border-blue-400 focus:bg-white transition-all cursor-pointer"
            >
              <option value="">ไม่ระบุ</option>
              {(["ENTRY", "JUNIOR", "MID", "SENIOR"] as ExperienceLevel[]).map(
                (lvl) => {
                  const labels: Record<ExperienceLevel, string> = {
                    ENTRY: "ไม่มีประสบการณ์",
                    JUNIOR: "Junior (1-2 ปี)",
                    MID: "Mid (3-5 ปี)",
                    SENIOR: "Senior (5+ ปี)",
                  };
                  return (
                    <option key={lvl} value={lvl}>
                      {labels[lvl]}
                    </option>
                  );
                },
              )}
            </select>
            <Icon
              icon="mdi:chevron-down"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
            ประสบการณ์ขั้นต่ำ (ปี)
          </label>
          <input
            type="number"
            min={0}
            value={form.experienceYears ?? ""}
            onChange={(e) =>
              updateField("experienceYears", Number(e.target.value))
            }
            placeholder="0"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Education Level + Positions */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
            วุฒิการศึกษา
          </label>
          <div className="relative">
            <select
              value={form.educationLevel ?? ""}
              onChange={(e) => updateField("educationLevel", e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-700 appearance-none focus:outline-none focus:border-blue-400 focus:bg-white transition-all cursor-pointer"
            >
              {EDUCATION_LEVELS.map((e) => (
                <option key={e.value} value={e.value}>
                  {e.label}
                </option>
              ))}
            </select>
            <Icon
              icon="mdi:chevron-down"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
            จำนวนที่รับ (ตำแหน่ง)
          </label>
          <input
            type="number"
            min={1}
            value={form.positions ?? 1}
            onChange={(e) => updateField("positions", Number(e.target.value))}
            placeholder="1"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Urgency */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          ความเร่งด่วน
        </label>
        <div className="flex gap-2">
          {(["LOW", "MEDIUM", "HIGH"] as UrgencyLevel[]).map((u) => {
            const config: Record<
              UrgencyLevel,
              { label: string; active: string }
            > = {
              LOW: {
                label: "ปกติ",
                active: "bg-green-50 text-green-600 border-green-200",
              },
              MEDIUM: {
                label: "ค่อนข้างด่วน",
                active: "bg-amber-50 text-amber-600 border-amber-200",
              },
              HIGH: {
                label: "ด่วนมาก",
                active: "bg-red-50 text-red-600 border-red-200",
              },
            };
            return (
              <button
                key={u}
                onClick={() => updateField("urgency", u)}
                className={`flex-1 py-2 text-xs font-medium rounded-xl border transition-all ${
                  form.urgency === u
                    ? config[u].active
                    : "bg-neutral-50 text-neutral-500 border-neutral-200 hover:border-neutral-300"
                }`}
              >
                {config[u].label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pro Tip */}
      <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
        <Icon
          icon="mdi:lightbulb-outline"
          className="w-4 h-4 text-blue-500 shrink-0 mt-0.5"
        />
        <div>
          <p className="text-xs font-semibold text-blue-700">Pro tip</p>
          <p className="text-xs text-blue-600 mt-0.5 leading-relaxed">
            ตำแหน่งที่ระบุชั่วโมงทำงานชัดเจน
            ได้รับผู้สมัครที่ตรงกับความต้องการมากกว่า 40%
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StepBasicInfo;
