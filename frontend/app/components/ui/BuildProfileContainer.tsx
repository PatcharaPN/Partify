"use client";

import { upsertProfile } from "@/app/store/slices/profileSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchProfile } from "@/app/store/slices/profileSlice";
import { axiosInstance } from "@/app/lib/axiosInstance";
import BuildProfileSkeleton from "../../(main)/profile/edit/skeletonEditProfile";
import ProfileForm from "@/app/components/ui/ProfileFormView";
import { Company } from "@/app/types/job.type";
import { getCompany, upsertCompany } from "@/app/store/slices/companySlice";

type ProfileFormProps = {
  mode?: "setup" | "edit";
};

export default function BuildProfilePage({ mode }: ProfileFormProps) {
  const dispatch = useAppDispatch();

  const { profile, fetchLoading } = useAppSelector(
    (state) => state.profileReducer,
  );

  const { company } = useAppSelector((state) => state.CompanyReducer);

  const user = useAppSelector((state) => state.AuthReducer.user);

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedExpereince, setSelectedExpereince] = useState<string[]>([]);
  const [activeDays, setActiveDays] = useState<string[]>([]);

  const [experienceSearch, setExperienceSearch] = useState("");
  const [skillSearch, setSkillSearch] = useState("");

  const [summary, setSummary] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [companyState, setCompanyState] = useState<Company>({
    companyName: "",
    companyImageURL: "",
    companyBio: "",
    companySize: "",
  });

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(getCompany());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setPhone(profile.phone || "");
      setBirthDate(profile.birthDate ? profile.birthDate.split("T")[0] : "");

      setSummary(profile.summary || "");
      setActiveDays(profile.availability || []);
      setSelectedExpereince(profile.experience || []);
      setSelectedSkills(profile.skills || []);

      setAvatarPreview(profile.avatarUrl || "");
      setAvatarUrl(profile.avatarUrl || "");
    }
  }, [profile]);

  useEffect(() => {
    if (company) {
      setCompanyState({
        companyName: company.companyName || "",
        companyImageURL: company.companyImageURL || "",
        companyBio: company.companyBio || "",
        companySize: company.companySize || "",
      });
    }
  }, [company]);

  const handleUploadImage = async (file: File) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "partify-upload");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dk094vv12/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      return data.secure_url;
    } catch (error) {
      console.error(error);
      return "";
    } finally {
      setLoading(false);
    }
  };

  const handleUploadAvatar = async (file: File) => {
    if (!file) return;

    const imageUrl = await handleUploadImage(file);

    if (!imageUrl) return;

    setAvatarPreview(imageUrl);
    setAvatarUrl(imageUrl);
  };

  const handleUploadCompanyImage = async (file: File) => {
    if (!file) return;

    const imageUrl = await handleUploadImage(file);

    if (!imageUrl) return;

    setCompanyState((prev) => ({
      ...prev,
      companyImageURL: imageUrl,
    }));
  };

  const handleUploadResume = async (file: File) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      await axiosInstance.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResumeFile(file);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills((prev) => prev.filter((s) => s !== skill));
    } else if (selectedSkills.length < 6) {
      setSelectedSkills((prev) => [...prev, skill]);
    }
  };

  const toggleExperience = (skill: string) => {
    if (selectedExpereince.includes(skill)) {
      setSelectedExpereince((prev) => prev.filter((s) => s !== skill));
    } else if (selectedExpereince.length < 6) {
      setSelectedExpereince((prev) => [...prev, skill]);
    }
  };

  const toggleDay = (day: string) => {
    setActiveDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleSave = async () => {
    const profilePayload = {
      name,
      phone,
      birthDate: birthDate ? new Date(birthDate).toISOString() : undefined,
      summary,
      skills: selectedSkills,
      experience: selectedExpereince,
      availability: activeDays,
      avatarUrl: avatarUrl || profile?.avatarUrl || "",
    };

    if (companyState.companyName.trim()) {
      await dispatch(upsertCompany(companyState));
    }

    await dispatch(upsertProfile(profilePayload));
  };

  const handleRemoveResume = () => {};

  if (fetchLoading || loading) {
    return <BuildProfileSkeleton />;
  }
  return (
    <ProfileForm
      mode={mode}
      state={{
        role: user?.role,
        company: companyState,
        name,
        phone,
        birthDate,
        resumeFile,
        summary,
        skills: selectedSkills,
        experience: selectedExpereince,
        availability: activeDays,
        avatarUrl,
        avatarPreview: avatarPreview ?? undefined,
        skillSearch,
        experienceSearch,
      }}
      actions={{
        uploadCompanyImage: handleUploadCompanyImage,
        setCompanyState,
        uploadResume: handleUploadResume,
        removeResume: handleRemoveResume,
        setName,
        setPhone,
        setBirthDate,
        setSummary,
        setSkills: setSelectedSkills,
        setExperience: setSelectedExpereince,
        setAvailability: setActiveDays,
        toggleSkill,
        toggleExperience,
        toggleDay,
        setSkillSearch,
        setExperienceSearch,
        setAvatarPreview,
        uploadAvatar: handleUploadAvatar,
        save: handleSave,
      }}
    />
  );
}
