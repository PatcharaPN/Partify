"use client";
import { upsertProfile } from "@/app/store/slices/profileSlice";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchProfile } from "@/app/store/slices/profileSlice";
import { axiosInstance } from "@/app/lib/axiosInstance";
import BuildProfileSkeleton from "../../(main)/profile/edit/skeletonEditProfile";
import { EXPERIENCE_SKILL_MAP } from "@/app/constants/skillOption";
import ProfileForm from "@/app/components/ui/ProfileFormView";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
type ProfileFormProps = {
  mode?: "setup" | "edit";
  title?: string;
  subtitle?: string;
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
  onSuccess?: () => void;
};
export default function BuildProfilePage({ mode }: ProfileFormProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [experienceSearch, setExperienceSearch] = useState("");
  const [selectedExpereince, setSelectedExpereince] = useState<string[]>([]);
  const [skillSearch, setSkillSearch] = useState("");
  const [activeDays, setActiveDays] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const avatarUrlRef = useRef("");
  const dispatch = useAppDispatch();
  const { profile, fetchLoading, upsertLoading } = useAppSelector(
    (state) => state.profileReducer,
  );

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setPhone(profile.phone || "");
      setBirthDate(profile.birthDate ? profile.birthDate.split("T")[0] : "");
      setSummary(profile.summary || "");
      setActiveDays(profile.availability);
      setSelectedExpereince(profile.experience || []);
      setSelectedSkills(profile.skills);
      setPhotoPreview(profile.avatarUrl || "");
    }
  }, [profile]);

  const handleUploadImage = async (file: File) => {
    if (!file) return;
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
      const imageUrl = data.secure_url;

      setAvatarUrl(imageUrl);
      avatarUrlRef.current = imageUrl;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else if (selectedSkills.length < 6) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const toggleExperience = (skill: string) => {
    if (selectedExpereince.includes(skill)) {
      setSelectedExpereince(selectedExpereince.filter((s) => s !== skill));
    } else if (selectedExpereince.length < 6) {
      setSelectedExpereince([...selectedExpereince, skill]);
    }
  };

  const toggleDay = (day: string) => {
    setActiveDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleSave = async () => {
    const finalAvatarUrl = avatarUrlRef.current || profile?.avatarUrl || "";

    const payload = {
      name,
      phone,
      birthDate: birthDate ? new Date(birthDate).toISOString() : undefined,
      summary,
      skills: selectedSkills,
      experience: selectedExpereince,
      availability: activeDays,
      avatarUrl: finalAvatarUrl,
    };

    const result = await dispatch(upsertProfile(payload));
    if (upsertProfile.fulfilled.match(result)) {
    } else {
      console.error("❌ Failed:", result.payload);
    }
  };
  if (fetchLoading) {
    return <BuildProfileSkeleton />;
  }
  return (
    <ProfileForm
      mode={mode}
      state={{
        name,
        phone,
        birthDate,
        summary,
        skills: selectedSkills,
        experience: selectedExpereince,
        availability: activeDays,
        avatarUrl,
        avatarPreview: (previewUrl || photoPreview) ?? undefined,
        skillSearch,
        experienceSearch,
      }}
      actions={{
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
        setAvatarPreview: setPreviewUrl,
        uploadAvatar: handleUploadImage,
        save: handleSave,
      }}
    />
  );
}
