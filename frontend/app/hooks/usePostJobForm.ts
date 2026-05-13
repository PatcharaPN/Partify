import { useForm } from "react-hook-form";
import { PostJobFormData } from "../types/job.type";

export const usePostJobForm = () => {
  const form = useForm<PostJobFormData>({
    defaultValues: {
      title: "",
      description: "",
      benefits: [],
      salaryMin: "",
      salaryMax: "",
    },
  });

  const onSubmit = async (data: PostJobFormData) => {
    const payload = {
      ...data,
      salaryMin: Number(data.salaryMin),
      salaryMax: Number(data.salaryMax),
    };
  };

  return {
    ...form,
    onSubmit,
  };
};
