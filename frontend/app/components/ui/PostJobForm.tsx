"use client";

import { PostJobFormData, WorkModel } from "@/app/types/job.type";
import { Icon } from "@iconify/react";
import { AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import StepBasicInfo from "./StepBasicInfo";
import StepSalary from "./StepSalary";
import { fetchJobById } from "@/app/store/slices/jobSlice";
import { STEP_LABELS } from "@/app/constants/jobLabels";
import StepLocation from "./StepLocation";
import StepDetails from "./StepDetail";
import { usePostJobForm } from "@/app/hooks/usePostJobForm";
import StepPreview from "./StepPreview";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import StepSkill from "./StepSkill";

const PostJobForm = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId") ?? undefined;
  const isOpen = searchParams.get("modal") === "post-job";

  const [step, setStep] = useState(1);
  const router = useRouter();

  const existingJob = useAppSelector((state) =>
    state.jobReducer.selectedJob?.id === jobId
      ? state.jobReducer.selectedJob
      : state.jobReducer.jobs.find((j) => j.id === jobId),
  );
  const defaultValues: Partial<PostJobFormData> | undefined = existingJob
    ? {
        ...existingJob,
        workStyle: (existingJob.workStyle as WorkModel) ?? "onsite",
        overviewPictureURL: (existingJob.overviewPictureURL ?? []).map(
          (url) => ({
            preview: url,
          }),
        ),
        workingHours: existingJob.workingHours ?? "",
        workingDays: existingJob.workingDays ?? "",
        startDate: existingJob.startDate
          ? new Date(existingJob.startDate).toISOString().split("T")[0]
          : "",
        closingDate: existingJob.closingDate
          ? new Date(existingJob.closingDate).toISOString().split("T")[0]
          : "",
        province: existingJob.province ?? "",
        district: existingJob.district ?? "",
        locationDetail: existingJob.locationDetail ?? "",
        location: existingJob.location ?? "",
      }
    : undefined;

  const { reset, onSubmit, register, control, watch, setValue } =
    usePostJobForm({
      mode: jobId ? "edit" : "create",
      jobId,
      defaultValues,
    });
  useEffect(() => {
    if (jobId && !existingJob) {
      dispatch(fetchJobById(jobId));
    }
  }, [jobId]);
  useEffect(() => {
    if (existingJob) {
      reset(defaultValues);
    }
  }, [existingJob]);
  const formValues = watch();
  const handleNextStep = () => {
    if (step === 6) {
      window.alert("Posted Job");
    }
    if (step >= 6) return;

    setStep((prev) => prev + 1);
  };
  const handlePrevious = () => {
    if (step <= 1) return;

    setStep((prev) => prev - 1);
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg flex flex-col max-h-[85vh] border border-neutral-200/60">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-neutral-100 shrink-0">
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

        <div className="px-6 py-4 border-b border-neutral-100 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium tracking-wide text-blue-600 uppercase">
              ขั้นตอนที่ {step} จาก {STEP_LABELS.length} —{" "}
              {STEP_LABELS[step - 1]}
            </span>
            <span className="text-xs text-neutral-400">
              {Math.round((step / STEP_LABELS.length) * 100)}%
            </span>
          </div>
          <div className="h-0.5 bg-neutral-100 rounded-full overflow-hidden">
            <div
              style={{ width: `${(step / STEP_LABELS.length) * 100}%` }}
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
            />
          </div>
          <div className="flex gap-1.5 mt-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`flex-1 h-0.5 rounded-full ${i === 0 ? "bg-blue-600" : "bg-neutral-100"}`}
              />
            ))}
          </div>
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-1">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <StepBasicInfo
                step={step}
                register={register}
                control={control}
                watch={watch}
              />
            )}
            {step === 2 && (
              <StepSalary
                step={step}
                register={register}
                control={control}
                watch={watch}
              />
            )}{" "}
            {step === 3 && (
              <StepLocation
                step={step}
                setValue={setValue}
                register={register}
                control={control}
                watch={watch}
              />
            )}
            {step === 4 && (
              <StepDetails
                register={register}
                step={step}
                control={control}
                watch={watch}
              />
            )}
            {step === 5 && (
              <StepSkill
                setValue={setValue}
                register={register}
                step={step}
                control={control}
                watch={watch}
              />
            )}
            {step === 6 && <StepPreview step={step} form={formValues} />}
          </AnimatePresence>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-100">
          <button className="text-sm font-medium text-neutral-400 hover:text-neutral-600 transition-colors">
            บันทึกแบบร่าง
          </button>{" "}
          <div className="flex items-center gap-5">
            <button
              onClick={handlePrevious}
              className="inline-flex items-center gap-2 text-blue-600 border-2 border-blue-600 hover:bg-blue-700 hover:text-white text-sm font-semibold px-5 py-2.5 rounded-xl active:scale-95 transition-all"
            >
              <Icon icon="mdi:arrow-left" className="w-4 h-4" />
              <span>ย้อนกลับ</span>
            </button>
            <button
              onClick={
                step < 6
                  ? handleNextStep
                  : () => {
                      onSubmit();
                      router.push("?");
                    }
              }
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl active:scale-95 transition-all"
            >
              {step < 6 ? `ถัดไป ${STEP_LABELS[step - 1]}` : `ลงประกาศหางาน`}
              <Icon icon="mdi:arrow-right" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobForm;
