"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { getCompany, upsertCompany } from "@/app/store/slices/companySlice";
import { Company } from "@/app/types/job.type";

const CompanySectionPage = () => {
  const dispatch = useAppDispatch();
  const { company } = useAppSelector((state) => state.CompanyReducer);

  const [companyState, setCompanyState] = useState<Company>({
    companyName: "",
    companyImageURL: "",
    companyBio: "",
    companySize: "",
  });

  const initialized = useRef(false);

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  useEffect(() => {
    if (company?.companyName && !initialized.current) {
      setCompanyState({
        companyName: company.companyName || "",
        companyImageURL: company.companyImageURL || "",
        companyBio: company.companyBio || "",
        companySize: company.companySize || "",
      });
      initialized.current = true;
    }
  }, [company]);

  const handleUploadImage = async (file: File) => {
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
    return data.secure_url as string;
  };

  const handleSave = async () => {
    if (!companyState.companyName.trim()) return;
    await dispatch(upsertCompany(companyState));
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-70px)] p-6 flex flex-col gap-4">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900 text-base">
              ข้อมูลบริษัท
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              ข้อมูลนี้จะแสดงในประกาศรับสมัครงานของคุณ
            </p>
          </div>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest border border-blue-200 bg-blue-50 px-2 py-0.5 rounded-full">
            Employer
          </span>
        </div>

        <div className="h-px bg-gray-100" />

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-[10px] border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
            {companyState.companyImageURL ? (
              <img
                src={companyState.companyImageURL}
                alt="logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon
                icon="mdi:office-building-outline"
                className="w-6 h-6 text-gray-300"
              />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700 mb-1">
              โลโก้บริษัท
            </p>
            <label className="cursor-pointer inline-block">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const preview = URL.createObjectURL(file);
                  setCompanyState((prev) => ({
                    ...prev,
                    companyImageURL: preview,
                  }));
                  const url = await handleUploadImage(file);
                  setCompanyState((prev) => ({
                    ...prev,
                    companyImageURL: url,
                  }));
                }}
              />
              <span className="text-xs font-medium text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition">
                อัปโหลดโลโก้
              </span>
            </label>
            <p className="text-[11px] text-gray-400 mt-1">
              PNG, JPG ขนาดไม่เกิน 2MB
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500">
            ชื่อบริษัท <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={companyState.companyName}
            onChange={(e) =>
              setCompanyState((prev) => ({
                ...prev,
                companyName: e.target.value,
              }))
            }
            placeholder="เช่น The Coffee Lab Co., Ltd."
            className="w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-500">
            ขนาดบริษัท
          </label>
          <div className="flex flex-wrap gap-2">
            {["1–10", "11–50", "51–200", "200+"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() =>
                  setCompanyState((prev) => ({ ...prev, companySize: size }))
                }
                className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                  companyState.companySize === size
                    ? "bg-blue-50 text-blue-600 border-blue-200"
                    : "bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300"
                }`}
              >
                {size} คน
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500">
            เกี่ยวกับบริษัท
          </label>
          <textarea
            rows={4}
            value={companyState.companyBio}
            onChange={(e) =>
              setCompanyState((prev) => ({
                ...prev,
                companyBio: e.target.value,
              }))
            }
            placeholder="แนะนำบริษัทของคุณสั้นๆ เช่น ประเภทธุรกิจ บรรยากาศการทำงาน..."
            className="w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition resize-none"
          />
        </div>

        <div className="flex gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3.5 py-2.5">
          <Icon
            icon="mdi:alert-circle-outline"
            className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"
          />
          <p className="text-xs text-amber-700 leading-relaxed">
            ต้องกรอก <span className="font-semibold">ชื่อบริษัท</span>{" "}
            ก่อนถึงจะลงประกาศงานได้
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={!companyState.companyName.trim()}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          บันทึก
        </button>
      </div>
    </div>
  );
};

export default CompanySectionPage;
