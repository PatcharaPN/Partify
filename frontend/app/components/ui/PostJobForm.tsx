"use client";

import { PostJobFormData } from "@/app/types/job.type";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import StepBasicInfo from "./StepBasicInfo";
import StepSalary from "./StepSalary";
import StepConditions from "./StepWorkInfo";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@reduxjs/toolkit/query";
import { postJob } from "@/app/store/slices/jobSlice";

const STEP_LABELS = ["ข้อมูลเบื้องต้น", "รายละเอียด", "เงื่อนไข", "ตรวจสอบ"];
const PostJobForm = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("modal") === "post-job";
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<PostJobFormData>({
    title: "",

    description: "",

    jobType: "",

    workStyle: "onsite",

    salaryNegotiable: false,

    salaryMin: "",
    salaryMax: "",

    workingHours: "",
    workingDays: "",

    benefits: [],

    closingDate: "",

    location: "",

    startDate: "",
  });
  const updateField = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  if (!isOpen) return null;
  const handleNextStep = () => {
    if (step === 4) {
      window.alert("Posted Job");
    }
    if (step >= 4) return;

    setStep((prev) => prev + 1);
  };
  const handlePrevious = () => {
    if (step <= 1) return;

    setStep((prev) => prev - 1);
  };
  const handlePostJob = async () => {
    const payload = {
      ...form,
      salaryMin: Number(form.salaryMin),
      salaryMax: Number(form.salaryMax),
    };

    await dispatch(postJob(payload));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden border border-neutral-200/60">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-neutral-100">
          <h2 className="text-lg font-semibold text-gray-900">
            ลงประกาศงานพาร์ทไทม์
          </h2>
          <button
            onClick={() => router.push("?")}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 hover:bg-neutral-50 transition-colors"
          >
            <Icon icon="mdi:close" className="w-4 h-4" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium tracking-wide text-blue-600 uppercase">
              ขั้นตอนที่ {step} จาก 4 — {STEP_LABELS[step - 1]}
            </span>
            <span className="text-xs text-neutral-400">
              {(step / 4) * 100}%
            </span>
          </div>
          <div className="h-0.5 bg-neutral-100 rounded-full overflow-hidden">
            <div
              style={{ width: `${(step / 4) * 100}%` }}
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
            />
          </div>
          <div className="flex gap-1.5 mt-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex-1 h-0.5 rounded-full ${i === 0 ? "bg-blue-600" : "bg-neutral-100"}`}
              />
            ))}
          </div>
        </div>

        {/* Body */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <StepBasicInfo step={step} updateField={updateField} form={form} />
          )}
          {step === 2 && (
            <StepSalary step={step} updateField={updateField} form={form} />
          )}

          {step === 3 && (
            <StepConditions step={step} updateField={updateField} form={form} />
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-100">
          <button className="text-sm font-medium text-neutral-400 hover:text-neutral-600 transition-colors">
            บันทึกแบบร่าง
          </button>{" "}
          <div className="flex items-center gap-5">
            <button
              onClick={handlePrevious}
              className="inline-flex items-center gap-2 text-blue-600 border-2 border-blue-600 hover:bg-blue-700 hover:text-white text-sm font-semibold px-5 py-2.5 rounded-xl active:scale-95 transition-all"
            >
              <Icon icon="mdi:arrow-left" className="w-4 h-4" />
              <span>ย้อนกลับ</span>
            </button>
            <button
              onClick={step < 4 ? handleNextStep : handlePostJob}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl active:scale-95 transition-all"
            >
              {step < 4 ? `ถัดไป ${STEP_LABELS[step - 1]}` : `ลงประกาศหางาน`}
              <Icon icon="mdi:arrow-right" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobForm;
