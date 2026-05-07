"use client";

import { Icon } from "@iconify/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const CATEGORIES = [
  "ร้านอาหาร & เครื่องดื่ม",
  "ค้าปลีก & แฟชั่น",
  "บริการลูกค้า",
  "คลังสินค้า & โลจิสติกส์",
  "IT & เทคโนโลยี",
  "อื่นๆ",
];

type WorkModel = "onsite" | "hybrid" | "remote";
const STEP_LABELS = ["ข้อมูลเบื้องต้น", "รายละเอียด", "เงื่อนไข", "ตรวจสอบ"];
const PostJobForm = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("modal") === "post-job";

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [workModel, setWorkModel] = useState<WorkModel>("onsite");

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
        {step === 1 && (
          <div className="px-6 py-5 flex flex-col gap-5">
            {/* Job Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
                ชื่อตำแหน่งงาน
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="เช่น พนักงานชงกาแฟ, แคชเชียร์, พนักงานเสิร์ฟ"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
                  หมวดหมู่
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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

              {/* Work Model */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
                  รูปแบบงาน
                </label>
                <div className="flex bg-neutral-100 rounded-xl p-0.5 gap-0.5">
                  {(["onsite", "hybrid", "remote"] as WorkModel[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setWorkModel(m)}
                      className={`flex-1 py-2 text-xs font-medium rounded-[10px] transition-all ${
                        workModel === m
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
          </div>
        )}
        {step === 2 && (
          <div className="px-6 py-5 flex flex-col gap-5">
            {/* Job Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
                รายละเอียดงาน
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="เช่น พนักงานชงกาแฟ, แคชเชียร์, พนักงานเสิร์ฟ"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
                  หมวดหมู่
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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

              {/* Work Model */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
                  รูปแบบงาน
                </label>
                <div className="flex bg-neutral-100 rounded-xl p-0.5 gap-0.5">
                  {(["onsite", "hybrid", "remote"] as WorkModel[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setWorkModel(m)}
                      className={`flex-1 py-2 text-xs font-medium rounded-[10px] transition-all ${
                        workModel === m
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
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-100">
          <button className="text-sm font-medium text-neutral-400 hover:text-neutral-600 transition-colors">
            บันทึกแบบร่าง
          </button>
          <button
            onClick={handleNextStep}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl active:scale-95 transition-all"
          >
            {step < 4 ? `ถัดไป ${STEP_LABELS[step - 1]}` : `ลงประกาศหางาน`}
            <Icon icon="mdi:arrow-right" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostJobForm;
