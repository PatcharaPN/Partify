import { PostJobFormData } from "@/app/types/job.type";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
type WorkModel = "onsite" | "hybrid" | "remote";
const CATEGORIES = [
  "ร้านอาหาร & เครื่องดื่ม",
  "ค้าปลีก & แฟชั่น",
  "บริการลูกค้า",
  "คลังสินค้า & โลจิสติกส์",
  "IT & เทคโนโลยี",
  "อื่นๆ",
];
type StepBasicInfoProps = {
  step: number;
  updateField: <K extends keyof PostJobFormData>(
    key: K,
    value: PostJobFormData[K],
  ) => void;
  form: PostJobFormData;
};

const StepBasicInfo = ({ step, form, updateField }: StepBasicInfoProps) => {
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
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          ชื่อตำแหน่งงาน
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
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
            <select className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-700 appearance-none focus:outline-none focus:border-blue-400 focus:bg-white transition-all cursor-pointer">
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
                onClick={() => updateField("workStyle", m)}
                className={`flex-1 py-2 text-xs font-medium rounded-[10px] transition-all ${
                  form.workStyle === m
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
    </motion.div>
  );
};
export default StepBasicInfo;
