"use client";

import { Job } from "@/app/types/job.type";
import { useState } from "react";

// type Job = {
//   id: string;
//   title: string;
//   description: string | null;
//   responsibilities: string | null;
//   qualifications: string | null;
//   category: string;
//   salaryMin: number;
//   salaryMax: number;
//   salaryNegotiable: boolean;
//   jobType: string;
//   workStyle: string;
//   experienceLevel: string | null;
//   experienceYears: number | null;
//   educationLevel: string | null;
//   positions: number;
//   workingHours: string;
//   workingDays: string;
//   startDate: string;
//   closingDate: string;
//   benefits: string[];
//   province: string | null;
//   district: string | null;
//   locationDetail: string | null;
//   urgency: string;
// };

type EditableFields = Partial<
  Pick<
    Job,
    | "description"
    | "responsibilities"
    | "qualifications"
    | "benefits"
    | "province"
    | "district"
    | "locationDetail"
    | "experienceLevel"
    | "experienceYears"
    | "educationLevel"
    | "salaryMin"
    | "salaryMax"
    | "salaryNegotiable"
    | "workingHours"
    | "workingDays"
    | "urgency"
  >
>;

type JobEditPanelProps = {
  job: Job;
  isOwner: boolean;
};

// ---- helpers ----
const isMissing = (v: unknown): boolean => {
  if (v === null || v === undefined) return true;
  if (typeof v === "string" && v.trim() === "") return true;
  if (Array.isArray(v) && v.length === 0) return true;
  return false;
};

const MISSING_LABELS: Record<string, string> = {
  description: "คำอธิบายงาน",
  responsibilities: "หน้าที่ความรับผิดชอบ",
  qualifications: "คุณสมบัติที่ต้องการ",
  benefits: "สวัสดิการ",
  province: "จังหวัด",
  district: "เขต / อำเภอ",
  locationDetail: "รายละเอียดสถานที่",
  experienceLevel: "ระดับประสบการณ์",
  experienceYears: "ประสบการณ์ขั้นต่ำ (ปี)",
  educationLevel: "วุฒิการศึกษา",
};

const URGENCY_OPTIONS = ["LOW", "MEDIUM", "HIGH"];
const URGENCY_LABELS: Record<string, { label: string; cls: string }> = {
  LOW: { label: "ปกติ", cls: "bg-green-50 text-green-700 border-green-200" },
  MEDIUM: {
    label: "ค่อนข้างด่วน",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
  },
  HIGH: { label: "ด่วนมาก", cls: "bg-red-50 text-red-700 border-red-200" },
};

// ---- main component ----
export const JobEditPanel = ({ job, isOwner }: JobEditPanelProps) => {
  const [form, setForm] = useState<EditableFields>({
    description: job.description ?? "",
    responsibilities: job.responsibilities ?? "",
    qualifications: job.qualifications ?? "",
    benefits: job.benefits ?? [],
    province: job.province ?? "",
    district: job.district ?? "",
    locationDetail: job.locationDetail ?? "",
    experienceLevel: job.experienceLevel ?? "",
    experienceYears: job.experienceYears ?? undefined,
    educationLevel: job.educationLevel ?? "",
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    salaryNegotiable: job.salaryNegotiable,
    workingHours: job.workingHours,
    workingDays: job.workingDays,
    urgency: job.urgency,
  });

  const [benefitInput, setBenefitInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(true);

  // detect missing fields จาก job จริง
  const missingFields = Object.keys(MISSING_LABELS).filter((k) =>
    isMissing(job[k as keyof Job]),
  );
  const hasMissing = missingFields.length > 0;

  if (!isOwner) return null;

  const update = <K extends keyof EditableFields>(
    key: K,
    value: EditableFields[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const addBenefit = () => {
    const val = benefitInput.trim();
    if (!val) return;
    update("benefits", [...(form.benefits ?? []), val]);
    setBenefitInput("");
  };

  const removeBenefit = (i: number) => {
    update(
      "benefits",
      (form.benefits ?? []).filter((_, idx) => idx !== i),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setSaving(false);
    setSaved(true);
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-neutral-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <PencilIcon className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">
              แก้ไขประกาศงาน
            </p>
            {hasMissing && (
              <p className="text-xs text-amber-600 mt-0.5">
                ⚠ ข้อมูลขาดหาย {missingFields.length} รายการ
              </p>
            )}
          </div>
        </div>
        <ChevronIcon
          className={`w-4 h-4 text-neutral-400 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {/* Missing fields banner */}
      {hasMissing && expanded && (
        <div className="mx-5 mb-4 px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl">
          <p className="text-xs font-medium text-amber-700 mb-2">
            ข้อมูลที่ยังขาดหาย
          </p>
          <div className="flex flex-wrap gap-1.5">
            {missingFields.map((f) => (
              <span
                key={f}
                className="text-[11px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded-md border border-amber-200"
              >
                {MISSING_LABELS[f]}
              </span>
            ))}
          </div>
        </div>
      )}

      {expanded && (
        <div className="px-5 pb-5 flex flex-col gap-5">
          {/* Description */}
          <Section label="คำอธิบายงาน" missing={isMissing(job.description)}>
            <textarea
              rows={4}
              value={form.description ?? ""}
              onChange={(e) => update("description", e.target.value)}
              placeholder="อธิบายลักษณะงาน บรรยากาศ และสิ่งที่พนักงานจะได้รับ..."
              className={inputCls("textarea")}
            />
          </Section>

          {/* Responsibilities */}
          <Section
            label="หน้าที่ความรับผิดชอบ"
            missing={isMissing(job.responsibilities)}
          >
            <textarea
              rows={4}
              value={form.responsibilities ?? ""}
              onChange={(e) => update("responsibilities", e.target.value)}
              placeholder="- รับออเดอร์และเสิร์ฟอาหาร&#10;- ดูแลความเรียบร้อยในร้าน&#10;- ..."
              className={inputCls("textarea")}
            />
          </Section>

          {/* Qualifications */}
          <Section
            label="คุณสมบัติที่ต้องการ"
            missing={isMissing(job.qualifications)}
          >
            <textarea
              rows={3}
              value={form.qualifications ?? ""}
              onChange={(e) => update("qualifications", e.target.value)}
              placeholder="- อายุ 18 ปีขึ้นไป&#10;- สื่อสารภาษาไทยได้ดี&#10;- ..."
              className={inputCls("textarea")}
            />
          </Section>

          {/* Benefits */}
          <Section label="สวัสดิการ" missing={isMissing(job.benefits)}>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addBenefit())
                }
                placeholder="เช่น ประกันสังคม, ค่าอาหาร, โบนัส..."
                className={inputCls("input") + " flex-1"}
              />
              <button
                type="button"
                onClick={addBenefit}
                className="px-3 py-2.5 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition-colors"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(form.benefits ?? []).map((b, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full"
                >
                  {b}
                  <button
                    type="button"
                    onClick={() => removeBenefit(i)}
                    className="hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </Section>

          {/* Location */}
          <Section
            label="สถานที่"
            missing={isMissing(job.province) || isMissing(job.district)}
          >
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className={labelCls}>จังหวัด</label>
                <input
                  type="text"
                  value={form.province ?? ""}
                  onChange={(e) => update("province", e.target.value)}
                  placeholder="เช่น กรุงเทพมหานคร"
                  className={inputCls("input")}
                />
              </div>
              <div>
                <label className={labelCls}>เขต / อำเภอ</label>
                <input
                  type="text"
                  value={form.district ?? ""}
                  onChange={(e) => update("district", e.target.value)}
                  placeholder="เช่น บางรัก"
                  className={inputCls("input")}
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>รายละเอียดสถานที่</label>
              <input
                type="text"
                value={form.locationDetail ?? ""}
                onChange={(e) => update("locationDetail", e.target.value)}
                placeholder="เช่น ชั้น 3 ห้าง Siam Paragon"
                className={inputCls("input")}
              />
            </div>
          </Section>

          {/* Experience + Education */}
          <Section
            label="ประสบการณ์ & วุฒิการศึกษา"
            missing={
              isMissing(job.experienceLevel) || isMissing(job.educationLevel)
            }
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>ระดับประสบการณ์</label>
                <select
                  value={form.experienceLevel ?? ""}
                  onChange={(e) => update("experienceLevel", e.target.value)}
                  className={inputCls("select")}
                >
                  <option value="">ไม่ระบุ</option>
                  {[
                    ["ENTRY", "ไม่มีประสบการณ์"],
                    ["JUNIOR", "Junior (1-2 ปี)"],
                    ["MID", "Mid (3-5 ปี)"],
                    ["SENIOR", "Senior (5+ ปี)"],
                  ].map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>ประสบการณ์ขั้นต่ำ (ปี)</label>
                <input
                  type="number"
                  min={0}
                  value={form.experienceYears ?? ""}
                  onChange={(e) =>
                    update("experienceYears", Number(e.target.value))
                  }
                  placeholder="0"
                  className={inputCls("input")}
                />
              </div>
              <div className="col-span-2">
                <label className={labelCls}>วุฒิการศึกษา</label>
                <select
                  value={form.educationLevel ?? ""}
                  onChange={(e) => update("educationLevel", e.target.value)}
                  className={inputCls("select")}
                >
                  <option value="">ไม่ระบุ</option>
                  {[
                    ["ANY", "ไม่กำหนด"],
                    ["HIGH_SCHOOL", "มัธยมปลาย / ปวช."],
                    ["DIPLOMA", "ปวส. / อนุปริญญา"],
                    ["BACHELOR", "ปริญญาตรี"],
                    ["MASTER", "ปริญญาโท"],
                  ].map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Section>

          {/* Salary */}
          <Section label="เงินเดือน / ค่าจ้าง">
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="negotiable"
                checked={form.salaryNegotiable ?? false}
                onChange={(e) => update("salaryNegotiable", e.target.checked)}
                className="w-4 h-4 rounded border-neutral-300 text-blue-600"
              />
              <label htmlFor="negotiable" className="text-sm text-gray-700">
                ต่อรองได้
              </label>
            </div>
            {!form.salaryNegotiable && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>ขั้นต่ำ (บาท/ชม.)</label>
                  <input
                    type="number"
                    value={form.salaryMin ?? ""}
                    onChange={(e) =>
                      update("salaryMin", Number(e.target.value))
                    }
                    placeholder="65"
                    className={inputCls("input")}
                  />
                </div>
                <div>
                  <label className={labelCls}>สูงสุด (บาท/ชม.)</label>
                  <input
                    type="number"
                    value={form.salaryMax ?? ""}
                    onChange={(e) =>
                      update("salaryMax", Number(e.target.value))
                    }
                    placeholder="90"
                    className={inputCls("input")}
                  />
                </div>
              </div>
            )}
          </Section>

          {/* Working Hours / Days */}
          <Section label="เวลาและวันทำงาน">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>เวลาทำงาน</label>
                <input
                  type="text"
                  value={form.workingHours ?? ""}
                  onChange={(e) => update("workingHours", e.target.value)}
                  placeholder="08:00-17:00"
                  className={inputCls("input")}
                />
              </div>
              <div>
                <label className={labelCls}>วันทำงาน</label>
                <input
                  type="text"
                  value={form.workingDays ?? ""}
                  onChange={(e) => update("workingDays", e.target.value)}
                  placeholder="จันทร์–ศุกร์"
                  className={inputCls("input")}
                />
              </div>
            </div>
          </Section>

          {/* Urgency */}
          <Section label="ความเร่งด่วน">
            <div className="flex gap-2">
              {URGENCY_OPTIONS.map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => update("urgency", u)}
                  className={`flex-1 py-2 text-xs font-medium rounded-xl border transition-all ${
                    form.urgency === u
                      ? URGENCY_LABELS[u].cls
                      : "bg-neutral-50 text-neutral-500 border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  {URGENCY_LABELS[u].label}
                </button>
              ))}
            </div>
          </Section>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-all active:scale-[0.98]"
          >
            {saving
              ? "กำลังบันทึก..."
              : saved
                ? "✓ บันทึกแล้ว"
                : "บันทึกการแก้ไข"}
          </button>
        </div>
      )}
    </div>
  );
};

// ---- sub-components ----
const Section = ({
  label,
  missing,
  children,
}: {
  label: string;
  missing?: boolean;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
        {label}
      </span>
      {missing && (
        <span className="text-[10px] px-1.5 py-0.5 bg-amber-50 text-amber-600 border border-amber-200 rounded-md">
          ขาดหาย
        </span>
      )}
    </div>
    {children}
  </div>
);

// ---- style helpers ----
const labelCls =
  "text-[11px] font-medium text-neutral-400 uppercase tracking-widest block mb-1.5";

const inputCls = (type: "input" | "textarea" | "select") => {
  const base =
    "w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all";
  if (type === "textarea") return base + " resize-none";
  if (type === "select") return base + " appearance-none cursor-pointer";
  return base;
};

// ---- icons ----
const PencilIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
);

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default JobEditPanel;
