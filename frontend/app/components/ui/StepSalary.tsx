import { PostJobFormData } from "@/app/types/job.type";
import { motion } from "framer-motion";

type StepSalaryProps = {
  step: number;
  updateField: <K extends keyof PostJobFormData>(
    key: K,
    value: PostJobFormData[K],
  ) => void;
  form: PostJobFormData;
};

const CURRENCIES = [
  { value: "THB", label: "THB — บาท" },
  { value: "USD", label: "USD — ดอลลาร์" },
  { value: "JPY", label: "JPY — เยน" },
];

const WORKING_DAYS_OPTIONS = [
  "จันทร์–ศุกร์",
  "จันทร์–เสาร์",
  "อังคาร–อาทิตย์",
  "ทุกวัน",
  "ยืดหยุ่น",
];

const StepSalary = ({ form, step, updateField }: StepSalaryProps) => {
  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="px-6 py-5 flex flex-col gap-5"
    >
      {/* Currency */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          สกุลเงิน
        </label>
        <div className="flex gap-2">
          {CURRENCIES.map((c) => (
            <button
              key={c.value}
              onClick={() => updateField("currency", c.value)}
              className={`flex-1 py-2 text-xs font-medium rounded-xl border transition-all ${
                (form.currency ?? "THB") === c.value
                  ? "bg-blue-50 text-blue-600 border-blue-200"
                  : "bg-neutral-50 text-neutral-500 border-neutral-200 hover:border-neutral-300"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Salary Min / Max */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          ช่วงเงินเดือน (ต่อชั่วโมง)
        </label>
        <div className="w-full grid gap-3 grid-cols-2">
          <div>
            <label className="text-[11px] text-neutral-400 mb-1 block">
              ขั้นต่ำ
            </label>
            <input
              value={form.salaryMin}
              onChange={(e) => updateField("salaryMin", e.target.value)}
              type="number"
              placeholder="65"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
            />
          </div>
          <div>
            <label className="text-[11px] text-neutral-400 mb-1 block">
              สูงสุด
            </label>
            <input
              type="number"
              value={form.salaryMax}
              onChange={(e) => updateField("salaryMax", e.target.value)}
              placeholder="90"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Salary Negotiable */}
      <div className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50">
        <span className="text-sm text-gray-700">ต่อรองเงินเดือนได้</span>
        <button
          type="button"
          onClick={() =>
            updateField("salaryNegotiable", !form.salaryNegotiable)
          }
          className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
            form.salaryNegotiable ? "bg-blue-600" : "bg-neutral-300"
          }`}
        >
          <span
            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
              form.salaryNegotiable ? "translate-x-[18px]" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      {/* Working Hours */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          ชั่วโมงทำงาน
        </label>
        <input
          type="text"
          value={form.workingHours ?? ""}
          onChange={(e) => updateField("workingHours", e.target.value)}
          placeholder="เช่น 09:00–17:00, กะเช้า 06:00–14:00"
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
        />
      </div>

      {/* Working Days */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          วันทำงาน
        </label>
        <div className="flex flex-wrap gap-2">
          {WORKING_DAYS_OPTIONS.map((d) => (
            <button
              key={d}
              onClick={() => updateField("workingDays", d)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                form.workingDays === d
                  ? "bg-blue-50 text-blue-600 border-blue-200"
                  : "bg-neutral-50 text-neutral-500 border-neutral-200 hover:border-neutral-300"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        {/* Custom input */}
        <input
          type="text"
          value={
            WORKING_DAYS_OPTIONS.includes(form.workingDays ?? "")
              ? ""
              : (form.workingDays ?? "")
          }
          onChange={(e) => updateField("workingDays", e.target.value)}
          placeholder="หรือระบุเอง เช่น พุธ–อาทิตย์"
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
        />
      </div>

      {/* Start Date + Closing Date */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
            วันเริ่มงาน
          </label>
          <input
            type="date"
            value={
              form.startDate
                ? new Date(form.startDate).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => updateField("startDate", e.target.value)}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
            ปิดรับสมัคร
          </label>
          <input
            type="date"
            value={
              form.closingDate
                ? new Date(form.closingDate).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => updateField("closingDate", e.target.value)}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StepSalary;
