"use client";

import { PostJobFormData } from "@/app/types/job.type";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useState } from "react";
import JobImageUpload from "./JobImageUpload";
import {
  Control,
  useController,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { inputCls, labelCls } from "@/app/types/ui.type";
import { charCount } from "./CharCount";

type StepDetailsProps = {
  step: number;
  register: UseFormRegister<PostJobFormData>;
  control: Control<PostJobFormData>;
  watch: UseFormWatch<PostJobFormData>;
};

const BENEFIT_SUGGESTIONS = [
  "ประกันสังคม",
  "ค่าอาหาร",
  "ค่าเดินทาง",
  "โบนัสประจำปี",
  "วันหยุดพักร้อน",
  "ประกันสุขภาพ",
  "OT",
  "เครื่องแบบ",
];

const StepDetails = ({ step, register, control, watch }: StepDetailsProps) => {
  const [benefitInput, setBenefitInput] = useState("");
  const { field: imageField } = useController({
    control,
    name: "overviewPictureURL",
  });
  const { field: benefitField } = useController({ control, name: "benefits" });

  const addBenefit = (val?: string) => {
    const v = (val ?? benefitInput).trim();
    if (!v || (benefitField.value ?? []).includes(v)) return;
    benefitField.onChange([...(benefitField.value ?? []), v]);
    setBenefitInput("");
  };

  const removeBenefit = (i: number) => {
    benefitField.onChange(
      (benefitField.value ?? []).filter((_, idx) => idx !== i),
    );
  };

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="px-6 py-5 flex flex-col gap-5"
    >
      <JobImageUpload
        maxImages={3}
        value={imageField.value}
        onChange={imageField.onChange}
      />

      {/* Benefits */}
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>สวัสดิการ</label>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-1.5 mb-1">
          {BENEFIT_SUGGESTIONS.filter(
            (s) => !(benefitField.value ?? []).includes(s),
          ).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addBenefit(s)}
              className="text-[11px] px-2.5 py-1 rounded-full border border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              + {s}
            </button>
          ))}
        </div>

        {/* Custom input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={benefitInput}
            onChange={(e) => setBenefitInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addBenefit();
              }
            }}
            placeholder="พิมพ์สวัสดิการอื่นๆ แล้วกด Enter"
            className={inputCls + " flex-1"}
          />
          <button
            type="button"
            onClick={() => addBenefit()}
            className="px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
          >
            +
          </button>
        </div>

        {/* Tags */}
        {(benefitField.value ?? []).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {(benefitField.value ?? []).map((b, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full"
              >
                {b}
                <button
                  type="button"
                  onClick={() => removeBenefit(i)}
                  className="hover:text-red-500 transition-colors leading-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Pro tip */}
      <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
        <Icon
          icon="mdi:lightbulb-outline"
          className="w-4 h-4 text-blue-500 shrink-0 mt-0.5"
        />
        <div>
          <p className="text-xs font-semibold text-blue-700">Pro tip</p>
          <p className="text-xs text-blue-600 mt-0.5 leading-relaxed">
            ประกาศที่มีคำอธิบายครบถ้วนได้รับผู้สมัครมากกว่า 3 เท่า
            และมักปิดรับเร็วกว่าปกติ
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StepDetails;
