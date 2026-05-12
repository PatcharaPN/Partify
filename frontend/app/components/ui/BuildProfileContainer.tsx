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
import { Company } from "@/app/types/job.type";
import { getCompany, upsertCompany } from "@/app/store/slices/companySlice";

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
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const { company } = useAppSelector((state) => state.CompanyReducer);
  const [companyState, setCompanyState] = useState<Company>({
    companyName: "",
    companyImageURL: "",
    companyBio: "",
    companySize: "",
  });
  const dispatch = useAppDispatch();
  const { profile, fetchLoading } = useAppSelector(
    (state) => state.profileReducer,
  );
  const user = useAppSelector((state) => state.AuthReducer.user);

  const initializedCompany = useRef(false);
  const userTouchedCompany = useRef(false);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(getCompany()).then((res) => {
      console.log("getCompany result:", res);
    });
  }, [dispatch]);

  useEffect(() => {
    if (company?.companyName && !initializedCompany.current) {
      setCompanyState({
        companyName: company.companyName || "",
        companyImageURL: company.companyImageURL || "",
        companyBio: company.companyBio || "",
        companySize: company.companySize || "",
      });

      initializedCompany.current = true;
    }
  }, [company]);
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setPhone(profile.phone || "");
      setBirthDate(profile.birthDate ? profile.birthDate.split("T")[0] : "");
      setSummary(profile.summary || "");
      setActiveDays(profile.availability);
      setSelectedExpereince(profile.experience || []);
      setSelectedSkills(profile.skills);
      setAvatarPreview(profile.avatarUrl || "");
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

      return imageUrl;
    } catch (error) {
      console.error(error);
      return "";
    } finally {
      setLoading(false);
    }
  };

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
  const handleUploadResume = async (file: File) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await axiosInstance.post("/resume/upload", formData, {
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
  const handleSave = async () => {
    const finalAvatarUrl = avatarUrl || profile?.avatarUrl || "";

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
    if (companyState.companyName.trim() && userTouchedCompany.current) {
      await dispatch(upsertCompany(companyState));
    }
    const result = await dispatch(upsertProfile(payload));
    if (upsertProfile.fulfilled.match(result)) {
    } else {
      console.error("❌ Failed:", result.payload);
    }
  };

  const handleUploadCompanyImage = async (file: File) => {
    if (!file) return;
    const imageurl = await handleUploadImage(file);
    setCompanyState((prev) => ({
      ...prev,
      companyImageURL: imageurl,
    }));
  };
  const handleUploadAvatar = async (file: File) => {
    if (!file) return;
    const imageurl = await handleUploadImage(file);
    setAvatarPreview(imageurl);
    setAvatarUrl(imageurl);
  };
  const handleRemoveResume = () => {};
  if (fetchLoading) {
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
