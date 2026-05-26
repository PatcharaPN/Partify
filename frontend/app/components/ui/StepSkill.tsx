import {
  CATEGORIES,
  CURRENCIES,
  WORKING_DAYS_OPTIONS,
  WORKING_HOURS,
} from "@/app/constants/jobLabels";
import { PostJobFormData } from "@/app/types/job.type";
import { ExperienceLevel, inputCls, labelCls } from "@/app/types/ui.type";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import {
  Control,
  Controller,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { charCount } from "./CharCount";
import React, { useState } from "react";
import { EXPERIENCE_SKILL_MAP } from "@/app/constants/skillOption";

type StepSkillProps = {
  step: number;
  register: UseFormRegister<PostJobFormData>;
  control: Control<PostJobFormData, PostJobFormData>;
  watch: UseFormWatch<PostJobFormData>;
  setValue: UseFormSetValue<PostJobFormData>;
};

const StepSkill = ({
  step,
  register,
  control,
  watch,
  setValue,
}: StepSkillProps) => {
  const [input, setInput] = useState("");
  const skills = watch("skills") ?? [];
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const qualifications = watch("qualifications") ?? "";
  const responsibilities = watch("responsibilities") ?? "";
  const skillFilter = [...new Set(Object.values(EXPERIENCE_SKILL_MAP).flat())];
  const handleOnChangeSkill = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="px-6 py-5 flex flex-col gap-5"
    >
      <div className="flex flex-col gap-1.5">
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
        {/* TODO : Implement Search + ย้าย ปีที่ต้องการ ประสบการณ์ */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col relative">
            <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
              ทักษะที่ต้องการ
            </label>{" "}
            <Controller
              control={control}
              name="skills"
              render={({ field }) => {
                const currentSkills = field.value ?? [];
                const addSkill = (skill: string) => {
                  const next = [...(field.value ?? []), skill];
                  console.log("addSkill →", next);
                  field.onChange(next);
                  setInput("");
                  setSuggestions([]);
                };
                return (
                  <>
                    <input
                      value={input}
                      onChange={(e) => {
                        const input = e.target.value;
                        setInput(input);
                        if (input.length > 0) {
                          setSuggestions(
                            skillFilter
                              .filter(
                                (s) =>
                                  s
                                    .toLowerCase()
                                    .includes(input.toLowerCase()) &&
                                  !currentSkills.includes(s),
                              )
                              .slice(0, 5),
                          );
                        } else {
                          setSuggestions([]);
                        }
                      }}
                      placeholder="พิมพ์เพื่อค้นหาทักษะ..."
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-700 appearance-none focus:outline-none focus:border-blue-400 focus:bg-white transition-all cursor-pointer"
                    />
                    {suggestions.length > 0 && (
                      <div className="absolute top-15 z-10 w-full mt-1 bg-white border border-neutral-200 rounded-xl overflow-hidden">
                        {suggestions.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => addSkill(s)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-50"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 my-2">
                      {currentSkills.map((s) => (
                        <span
                          key={s}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                        >
                          {s}
                          <button
                            type="button"
                            onClick={() =>
                              field.onChange(
                                currentSkills.filter((x) => x !== s),
                              )
                            }
                          >
                            <Icon icon="mdi:close" className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </>
                );
              }}
            />
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
                {...register("experienceLevel")}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-700 appearance-none focus:outline-none focus:border-blue-400 focus:bg-white transition-all cursor-pointer"
              >
                <option value="">ไม่ระบุ</option>
                {(
                  ["ENTRY", "JUNIOR", "MID", "SENIOR"] as ExperienceLevel[]
                ).map((lvl) => {
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
                })}
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
        </div>{" "}
        {/* Qualifications */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className={labelCls}>คุณสมบัติที่ต้องการ</label>
            {charCount(qualifications ?? "", 800)}
          </div>
          <textarea
            {...register("qualifications")}
            rows={3}
            maxLength={800}
            placeholder={`- อายุ 18 ปีขึ้นไป\n- สื่อสารภาษาไทยได้ดี\n- มีความรับผิดชอบและตรงต่อเวลา`}
            className={inputCls + " resize-none"}
          />
        </div>
        {/* Responsibilities */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className={labelCls}>หน้าที่ความรับผิดชอบ</label>
            {charCount(responsibilities ?? "", 1000)}
          </div>
          <textarea
            {...register("responsibilities")}
            rows={4}
            maxLength={1000}
            placeholder={`- รับออเดอร์และเสิร์ฟอาหารให้ลูกค้า\n- ดูแลความสะอาดและเรียบร้อยในร้าน\n- ประสานงานกับทีมครัว`}
            className={inputCls + " resize-none"}
          />
          <p className="text-[11px] text-neutral-300">
            แนะนำให้ขึ้นบรรทัดใหม่แต่ละข้อ เพื่อการแสดงผลที่ดี
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StepSkill;
