import { PostJobFormData } from "@/app/types/job.type";
import { motion } from "framer-motion";
type StepWorkInfoProps = {
  step: number;
  updateField: <K extends keyof PostJobFormData>(
    key: K,
    value: PostJobFormData[K],
  ) => void;
  form: PostJobFormData;
};
const StepConditions = ({ form, step, updateField }: StepWorkInfoProps) => {
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
      <div className="w-full grid gap-5 grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
            เวลาทำงาน
          </label>
          <input
            type="text"
            value={form.workingHours}
            onChange={(e) => updateField("workingHours", e.target.value)}
            placeholder="เช่น 10:00-22:00"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
          />{" "}
          <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
            วันเริ่มงาน
          </label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => updateField("startDate", e.target.value)}
            placeholder="เช่น 5 วัน/สัปดาห์"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
          />{" "}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
            วันทำงาน
          </label>
          <input
            type="text"
            value={form.workingDays}
            onChange={(e) => updateField("workingDays", e.target.value)}
            placeholder="เช่น 5 วัน/สัปดาห์"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
          />{" "}
          <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
            วันปิดรับสมัคร
          </label>{" "}
          <input
            type="date"
            value={form.closingDate}
            onChange={(e) => updateField("closingDate", e.target.value)}
            placeholder="เช่น 5 วัน/สัปดาห์"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
          />{" "}
        </div>{" "}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          สถานที่
        </label>
        <input
          type="text"
          value={form.location}
          onChange={(e) => updateField("location", e.target.value)}
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
        />
      </div>
    </motion.div>
  );
};

export default StepConditions;
