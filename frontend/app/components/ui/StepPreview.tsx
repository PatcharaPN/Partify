import { PostJobFormData } from "@/app/types/job.type";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

type StepDetailsProps = {
  step: number;
  updateField: <K extends keyof PostJobFormData>(
    key: K,
    value: PostJobFormData[K],
  ) => void;
  form: PostJobFormData;
};

const SUGGESTED_BENEFITS = [
  "ประกันสังคม",
  "ค่าล่วงเวลา OT",
  "อาหารกลางวัน",
  "ยูนิฟอร์มฟรี",
  "โบนัสประจำปี",
  "วันหยุดพักร้อน",
  "ค่าเดินทาง",
  "ประกันสุขภาพ",
];

const StepDetails = ({ step, form, updateField }: StepDetailsProps) => {
  const benefits: string[] = form.benefits ?? [];

  const toggleBenefit = (b: string) => {
    updateField(
      "benefits",
      benefits.includes(b) ? benefits.filter((x) => x !== b) : [...benefits, b],
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
      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          รายละเอียดงาน
        </label>
        <textarea
          value={form.description ?? ""}
          onChange={(e) => updateField("description", e.target.value)}
          rows={4}
          placeholder="อธิบายลักษณะงาน บรรยากาศการทำงาน และสิ่งที่ผู้สมัครจะได้รับ..."
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all resize-none"
        />
      </div>

      {/* Responsibilities */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          หน้าที่ความรับผิดชอบ
        </label>
        <textarea
          value={form.responsibilities ?? ""}
          onChange={(e) => updateField("responsibilities", e.target.value)}
          rows={3}
          placeholder="- รับออเดอร์และเสิร์ฟอาหาร&#10;- ดูแลความเรียบร้อยภายในร้าน..."
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all resize-none"
        />
      </div>

      {/* Qualifications */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          คุณสมบัติที่ต้องการ
        </label>
        <textarea
          value={form.qualifications ?? ""}
          onChange={(e) => updateField("qualifications", e.target.value)}
          rows={3}
          placeholder="- อายุ 18 ปีขึ้นไป&#10;- มีความรับผิดชอบ ตรงต่อเวลา&#10;- ยินดีรับนักศึกษา..."
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all resize-none"
        />
      </div>

      {/* Benefits */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          สวัสดิการ
        </label>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_BENEFITS.map((b) => (
            <button
              key={b}
              onClick={() => toggleBenefit(b)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all flex items-center gap-1.5 ${
                benefits.includes(b)
                  ? "bg-blue-50 text-blue-600 border-blue-200"
                  : "bg-neutral-50 text-neutral-500 border-neutral-200 hover:border-neutral-300"
              }`}
            >
              {benefits.includes(b) && (
                <Icon icon="mdi:check" className="w-3 h-3" />
              )}
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          สถานที่ทำงาน
        </label>
        <div className="relative">
          <Icon
            icon="mdi:map-marker-outline"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
          />
          <input
            type="text"
            value={form.location ?? ""}
            onChange={(e) => updateField("location", e.target.value)}
            placeholder="เช่น สยาม กรุงเทพฯ, ถ.นิมมานเหมินทร์ เชียงใหม่"
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StepDetails;
