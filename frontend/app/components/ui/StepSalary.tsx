import { CURRENCIES, WORKING_DAYS_OPTIONS } from "@/app/constants/jobLabels";
import { PostJobFormData } from "@/app/types/job.type";
import { motion } from "framer-motion";
import {
  Control,
  Controller,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

type StepSalaryProps = {
  step: number;
  register: UseFormRegister<PostJobFormData>;
  control: Control<PostJobFormData, PostJobFormData>;
  watch: UseFormWatch<PostJobFormData>;
};

const StepSalary = ({ step, register, control, watch }: StepSalaryProps) => {
  const currency = watch("currency");
  const workingDays = watch("workingDays");

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="px-6 py-5 flex flex-col gap-5"
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          สกุลเงิน
        </label>
        <Controller
          control={control}
          name="currency"
          render={({ field }) => (
            <div className="flex gap-2">
              {CURRENCIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => field.onChange(c.value)}
                  className={`flex-1 py-2 text-xs font-medium rounded-xl border transition-all ${
                    (currency ?? "THB") === c.value
                      ? "bg-blue-50 text-blue-600 border-blue-200"
                      : "bg-neutral-50 text-neutral-500 border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
        />
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
              {...register("salaryMin")}
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
              {...register("salaryMax")}
              type="number"
              placeholder="90"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Salary Negotiable */}
      <div className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50">
        <span className="text-sm text-gray-700">ต่อรองเงินเดือนได้</span>
        <Controller
          control={control}
          name="salaryNegotiable"
          render={({ field }) => (
            <button
              type="button"
              onClick={() => field.onChange(!field.value)}
              className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
                field.value ? "bg-blue-600" : "bg-neutral-300"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                  field.value ? "translate-x-4.5" : "translate-x-0.5"
                }`}
              />
            </button>
          )}
        />
      </div>

      {/* Working Hours */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          ชั่วโมงทำงาน
        </label>
        <input
          {...register("workingHours")}
          type="text"
          placeholder="เช่น 09:00–17:00, กะเช้า 06:00–14:00"
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
        />
      </div>

      {/* Working Days */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
          วันทำงาน
        </label>
        <Controller
          control={control}
          name="workingDays"
          render={({ field }) => {
            return (
              <div className="flex flex-wrap gap-2">
                {WORKING_DAYS_OPTIONS.map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => field.onChange(d)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                      field.value === d
                        ? "bg-blue-50 text-blue-600 border-blue-200"
                        : "bg-neutral-50 text-neutral-500 border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    {d}
                  </button>
                ))}{" "}
                <input
                  onChange={(e) => field.onChange(e.target.value)}
                  type="text"
                  value={
                    WORKING_DAYS_OPTIONS.includes(workingDays ?? "")
                      ? ""
                      : (workingDays ?? "")
                  }
                  placeholder="หรือระบุเอง เช่น พุธ–อาทิตย์"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                />
              </div>
            );
          }}
        />
        {/* Custom input */}
      </div>

      {/* Start Date + Closing Date */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
            วันเริ่มงาน
          </label>
          <input
            {...register("startDate")}
            type="date"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
            ปิดรับสมัคร
          </label>
          <input
            {...register("closingDate")}
            type="date"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StepSalary;
