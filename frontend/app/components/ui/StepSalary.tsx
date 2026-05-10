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
const StepSalary = ({ form, step, updateField }: StepSalaryProps) => {
  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      className="px-6 py-5 flex flex-col gap-5"
    >
      {/* Job Title */}
      <div className="flex flex-col gap-1.5">
        <div className="w-full grid gap-5 grid-cols-2">
          <div>
            <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
              ค่าจ้างขั้นต่ำ (บาท/ชม)
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
            <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
              รายได้สูงสุด (บาท/ชม)
            </label>
            <input
              type="number"
              value={form.salaryMax}
              onChange={(e) => updateField("salaryMax", e.target.value)}
              placeholder="90"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
            />
          </div>
        </div>{" "}
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
                form.salaryNegotiable ? "translate-x-0.2" : "-translate-x-4"
              }`}
            />
          </button>
        </div>
        <div className="flex gap-5"></div>
      </div>
    </motion.div>
  );
};
export default StepSalary;
