import { Company } from "@/app/types/job.type";
import { Icon } from "@iconify/react";
import React from "react";

type CompanySectionProps = {
  company: Company;

  setCompanyState: React.Dispatch<React.SetStateAction<Company>>;
  uploadCompanyImage: (file: File) => Promise<void>;
};

const CompanySection = ({
  company,
  setCompanyState,
  uploadCompanyImage,
}: CompanySectionProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
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

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-[10px] border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
            {company.companyImageURL ? (
              <img
                src={company.companyImageURL}
                alt="company logo"
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
                  await uploadCompanyImage(file);
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

        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">
            ชื่อบริษัท <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={company.companyName ?? ""}
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

        <div>
          <label className="text-xs font-semibold text-gray-500 mb-2 block">
            ขนาดบริษัท
          </label>
          <div className="flex flex-wrap gap-2">
            {["1–10", "11–50", "51–200", "200+"].map((size) => (
              <button
                key={size}
                onClick={() =>
                  setCompanyState((prev) => ({
                    ...prev,
                    companySize: size,
                  }))
                }
                className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                  company.companySize === size
                    ? "bg-blue-50 text-blue-600 border-blue-200"
                    : "bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300"
                }`}
              >
                {size} คน
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">
            เกี่ยวกับบริษัท
          </label>
          <textarea
            rows={3}
            value={company.companyBio ?? ""}
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
    </div>
  );
};

export default CompanySection;
