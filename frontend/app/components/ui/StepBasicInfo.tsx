import { CATEGORIES, EDUCATION_LEVELS } from "@/app/constants/jobLabels";
import { PostJobFormData } from "@/app/types/job.type";
import { ExperienceLevel, JobType, UrgencyLevel } from "@/app/types/ui.type";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import {
  Control,
  Controller,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

type StepBasicInfoProps = {
  step: number;
  register: UseFormRegister<PostJobFormData>;
  control: Control<PostJobFormData, PostJobFormData>;
  watch: UseFormWatch<PostJobFormData>;
};

const StepBasicInfo = ({ step, register, control }: StepBasicInfoProps) => {
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
          {...register("title")}
          placeholder="เช่น พนักงานชงกาแฟ, แคชเชียร์, พนักงานเสิร์ฟ"
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
        />
      </div>

      {/* Category + Work Model */}
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
            หมวดหมู่
          </label>
          <div className="relative">
            <select
              {...register("category")}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-700 appearance-none focus:outline-none focus:border-blue-400 focus:bg-white transition-all cursor-pointer"
            >
              <option>เลือกหมวดหมู่</option>
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
      </div>

      {/* Job Type */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          ประเภทงาน
        </label>
        <Controller
          control={control}
          name="jobType"
          render={({ field }) => {
            const labels: Record<JobType, string> = {
              FULLTIME: "ประจำ",
              PARTTIME: "พาร์ทไทม์",
              FREELANCE: "ฟรีแลนซ์",
              INTERNSHIP: "ฝึกงาน",
            };

            return (
              <div className="grid grid-cols-4 gap-1.5">
                {(
                  [
                    "FULLTIME",
                    "PARTTIME",
                    "FREELANCE",
                    "INTERNSHIP",
                  ] as JobType[]
                ).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => field.onChange(t)}
                    className={`py-2 text-xs font-medium rounded-xl border transition-all ${
                      field.value === t
                        ? "bg-blue-50 text-blue-600 border-blue-200"
                        : "bg-neutral-50 text-neutral-500 border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    {labels[t]}
                  </button>
                ))}
              </div>
            );
          }}
        />
      </div>

      {/* Experience Level + Years */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
            ระดับประสบการณ์
          </label>
          <div className="relative">
            <select
              {...register("experienceLevel")}
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
            {...register("experienceYears", { valueAsNumber: true })}
            type="number"
            min={0}
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
              {...register("educationLevel")}
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
            {...register("positions", { valueAsNumber: true })}
            type="number"
            min={1}
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
          <Controller
            control={control}
            name="urgency"
            render={({ field }) => {
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
                <div className="flex gap-2">
                  {(["LOW", "MEDIUM", "HIGH"] as UrgencyLevel[]).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => field.onChange(u)}
                      className={`flex-1 py-2 text-xs font-medium rounded-xl border transition-all ${
                        field.value === u
                          ? config[u].active
                          : "bg-neutral-50 text-neutral-500 border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      {config[u].label}
                    </button>
                  ))}
                </div>
              );
            }}
          />
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
