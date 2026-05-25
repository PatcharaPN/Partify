import { PostJobFormData } from "@/app/types/job.type";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

type StepPreviewProps = {
  step: number;
  form: PostJobFormData;
};

const JOB_TYPE_LABELS: Record<string, { label: string; color: string }> = {
  FULLTIME: {
    label: "Full-time",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  PARTTIME: {
    label: "Part-time",
    color: "bg-green-50 text-green-700 border-green-200",
  },
  FREELANCE: {
    label: "Freelance",
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
  INTERNSHIP: {
    label: "Internship",
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
};

const StepPreview = ({ step, form }: StepPreviewProps) => {
  const jobTypeConfig = form.jobType ? JOB_TYPE_LABELS[form.jobType] : null;

  const salaryText = (() => {
    if (form.salaryMin && form.salaryMax)
      return `${form.salaryMin} – ${form.salaryMax}`;
    if (form.salaryMin) return `${form.salaryMin}`;
    if (form.salaryMax) return `${form.salaryMax}`;
    return null;
  })();

  const hasContent = form.title || form.description || salaryText;

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="px-6 py-5 flex flex-col gap-4"
    >
      {/* Notice */}
      <div className="flex gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-3.5 py-2.5">
        <Icon
          icon="mdi:eye-outline"
          className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"
        />
        <p className="text-xs text-amber-700 leading-relaxed">
          ตัวอย่างที่ผู้สมัครจะเห็นในหน้าค้นหางาน
        </p>
      </div>

      {!hasContent ? (
        <div className="flex flex-col items-center gap-2 py-10 text-neutral-300">
          <Icon icon="mdi:card-search-outline" className="w-10 h-10" />
          <p className="text-sm">กรุณากรอกข้อมูลในขั้นตอนก่อนหน้า</p>
        </div>
      ) : (
        <>
          {/* === Job Card (mirrors JobList) === */}
          <div className="bg-white border border-neutral-200/70 rounded-2xl p-4 flex flex-col gap-3">
            {/* Top row */}
            <div className="flex gap-3 items-start">
              {/* Company logo placeholder */}
              <div className="w-11 h-11 rounded-[10px] border border-neutral-100 bg-neutral-100 shrink-0 flex items-center justify-center">
                <Icon
                  icon="mdi:office-building-outline"
                  className="w-5 h-5 text-neutral-400"
                />
              </div>

              <div className="min-w-0 flex-1">
                {/* Title + job type badge */}
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="text-sm font-semibold text-gray-800 leading-snug">
                    {form.title || (
                      <span className="text-neutral-300 font-normal">
                        ชื่อตำแหน่งงาน
                      </span>
                    )}
                  </p>
                  {jobTypeConfig && (
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${jobTypeConfig.color}`}
                    >
                      <Icon icon="mingcute:time-line" className="w-2.5 h-2.5" />
                      {jobTypeConfig.label}
                    </span>
                  )}
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                  <span className="flex items-center gap-1 text-xs text-neutral-500">
                    <Icon
                      icon="mingcute:building-2-line"
                      className="w-3 h-3 shrink-0"
                    />
                    {/* companyName จะมาจาก user session ตอน submit */}
                    <span className="text-neutral-300 italic">
                      ชื่อบริษัทของคุณ
                    </span>
                  </span>
                  {form.location && (
                    <span className="flex items-center gap-1 text-xs text-neutral-500">
                      <Icon
                        icon="mingcute:location-line"
                        className="w-3 h-3 shrink-0"
                      />
                      {form.location}
                    </span>
                  )}
                  {form.workingHours && (
                    <span className="flex items-center gap-1 text-xs text-neutral-500">
                      <Icon
                        icon="mingcute:time-line"
                        className="w-3 h-3 shrink-0"
                      />
                      {form.workingHours}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {form.description && (
              <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                {form.description}
              </p>
            )}

            {/* Bottom row */}
            <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100">
              <div>
                {salaryText ? (
                  <>
                    <p className="text-base font-semibold text-blue-600">
                      {salaryText} บ./ชม.
                    </p>
                    {form.salaryNegotiable && (
                      <p className="text-[11px] text-green-500 mt-0.5">
                        ต่อรองได้
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-neutral-300 italic">
                    ยังไม่ได้ระบุเงินเดือน
                  </p>
                )}
                {form.workingDays && (
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    {form.workingDays}
                  </p>
                )}
              </div>
              <button
                disabled
                className="text-xs font-medium px-4 py-2 rounded-xl bg-blue-600 text-white opacity-60 cursor-default"
              >
                สมัครเลย
              </button>
            </div>
          </div>

          {/* Extra details (ไม่แสดงใน card จริง แต่ช่วย review) */}
          {(form.responsibilities ||
            form.qualifications ||
            (form.benefits?.length ?? 0) > 0) && (
            <div className="flex flex-col gap-3 rounded-2xl border border-neutral-100 bg-neutral-50 px-4 py-4">
              <p className="text-[10px] font-semibold tracking-widest text-neutral-400 uppercase">
                รายละเอียดเพิ่มเติม
              </p>

              {form.responsibilities && (
                <div className="flex flex-col gap-1">
                  <p className="text-[11px] font-medium text-neutral-500">
                    หน้าที่
                  </p>
                  <p className="text-xs text-neutral-500 leading-relaxed whitespace-pre-line line-clamp-3">
                    {form.responsibilities}
                  </p>
                </div>
              )}

              {form.qualifications && (
                <div className="flex flex-col gap-1">
                  <p className="text-[11px] font-medium text-neutral-500">
                    คุณสมบัติ
                  </p>
                  <p className="text-xs text-neutral-500 leading-relaxed whitespace-pre-line line-clamp-3">
                    {form.qualifications}
                  </p>
                </div>
              )}

              {form.benefits && form.benefits.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <p className="text-[11px] font-medium text-neutral-500">
                    สวัสดิการ
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {form.benefits.map((b) => (
                      <span
                        key={b}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-neutral-600"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default StepPreview;
