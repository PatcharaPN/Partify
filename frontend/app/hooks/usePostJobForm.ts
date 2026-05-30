import { useForm } from "react-hook-form";
import { PostJobFormData } from "../types/job.type";
import { useAppDispatch } from "../lib/hooks";
import { postJob, upsertJob } from "../store/slices/jobSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
type UsePostJobFormOptions = {
  mode?: "create" | "edit";
  jobId?: string;
  defaultValues?: Partial<PostJobFormData>;
};
export const usePostJobForm = ({
  defaultValues,
  jobId,
  mode,
}: UsePostJobFormOptions = {}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm<PostJobFormData>({
    defaultValues: {
      title: "",
      description: "",
      jobType: "",
      workStyle: "onsite",
      salaryNegotiable: false,
      salaryMin: 0,
      salaryMax: 0,
      workingHours: "",
      workingDays: "",
      benefits: [],
      closingDate: "",
      skills: [],
      location: "",
      district: "",
      overviewPictureURL: [],
      locationDetail: "",
      province: "",
      startDate: "",
      ...defaultValues,
    },
  });
  useEffect(() => {
    if (defaultValues) {
      form.reset({
        skills: [],
        workStyle: "onsite",
        benefits: [],
        overviewPictureURL: [],
        ...defaultValues,
      });
    }
  }, [JSON.stringify(defaultValues)]);
  const onSubmit = form.handleSubmit(async (data) => {
    const payload = {
      title: data.title,
      description: data.description,
      responsibilities: data.responsibilities,
      qualifications: data.qualifications,
      category: data.category,
      jobType: data.jobType,
      workStyle: data.workStyle,
      experienceLevel: data.experienceLevel,
      experienceYears: data.experienceYears,
      educationLevel: data.educationLevel,
      positions: data.positions,
      urgency: data.urgency,
      salaryMin: Number(data.salaryMin),
      salaryMax: Number(data.salaryMax),
      salaryNegotiable: data.salaryNegotiable,
      currency: data.currency,
      overviewPictureURL: data.overviewPictureURL
        .map((img) => img.preview)
        .filter((url) => url.startsWith("https")),
      workingHours: data.workingHours,
      workingDays: data.workingDays,
      startDate: data.startDate ? new Date(data.startDate).toISOString() : null,
      closingDate: data.closingDate
        ? new Date(data.closingDate).toISOString()
        : null,
      province: data.province,
      skills: data.skills,
      district: data.district,
      locationDetail: data.locationDetail,
      location: data.location,
      benefits: data.benefits,
    };

    await dispatch(upsertJob({ id: jobId, ...payload }));
    router.refresh();
  });

  return {
    ...form,
    onSubmit,
  };
};
