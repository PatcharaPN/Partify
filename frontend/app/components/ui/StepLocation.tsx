"use client";

import { PROVINCES_DISTRICTS } from "@/app/constants/jobLabels";
import { PostJobFormData } from "@/app/types/job.type";
import { useState, useEffect } from "react";

type WorkModel = "onsite" | "hybrid" | "remote";

export type LocationFormData = {
  workStyle: WorkModel;
  province: string;
  district: string;
  locationDetail: string;
};

type StepLocationProps = {
  form: PostJobFormData;
  updateField: <K extends keyof PostJobFormData>(
    key: K,
    value: PostJobFormData[K],
  ) => void;
};

const WORK_MODELS: { value: WorkModel; label: string }[] = [
  { value: "onsite", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
  { value: "remote", label: "Remote" },
];

const StepLocation = ({ form, updateField }: StepLocationProps) => {
  const [districts, setDistricts] = useState<string[]>([]);

  useEffect(() => {
    if (form.province && PROVINCES_DISTRICTS[form.province]) {
      setDistricts(PROVINCES_DISTRICTS[form.province]);
    } else {
      setDistricts([]);
    }
    updateField("district", "");
  }, [form.province]);

  const isRemote = form.workStyle === "remote";

  return (
    <div className="px-6 py-5 flex flex-col gap-5">
      {/* Work Model */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          รูปแบบงาน
        </label>
        <div className="flex bg-neutral-100 rounded-xl p-0.5 gap-0.5">
          {WORK_MODELS.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => updateField("workStyle", m.value)}
              className={`flex-1 py-2 text-xs font-medium rounded-[10px] transition-all ${
                form.workStyle === m.value
                  ? "bg-white text-blue-600 border border-neutral-200 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location fields — hidden when remote */}
      {isRemote ? (
        <div className="flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-blue-500 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <p className="text-xs text-blue-600">งาน Remote ไม่ต้องระบุสถานที่</p>
        </div>
      ) : (
        <>
          {/* Province + District */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
                จังหวัด
              </label>
              <div className="relative">
                <select
                  value={form.province}
                  onChange={(e) => updateField("province", e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-700 appearance-none focus:outline-none focus:border-blue-400 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="">เลือกจังหวัด</option>
                  {Object.keys(PROVINCES_DISTRICTS).map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <ChevronIcon />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
                เขต / อำเภอ
              </label>
              <div className="relative">
                <select
                  value={form.district}
                  onChange={(e) => updateField("district", e.target.value)}
                  disabled={districts.length === 0}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-700 appearance-none focus:outline-none focus:border-blue-400 focus:bg-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <option value="">เลือกเขต / อำเภอ</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <ChevronIcon />
              </div>
            </div>
          </div>

          {/* Location detail */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
              รายละเอียดสถานที่
            </label>
            <input
              type="text"
              value={form.locationDetail}
              onChange={(e) => updateField("locationDetail", e.target.value)}
              placeholder="เช่น Siam Center ชั้น 2 ใกล้ BTS สยาม"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
            />
          </div>
        </>
      )}
    </div>
  );
};

// ---- helper ----
const ChevronIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default StepLocation;
