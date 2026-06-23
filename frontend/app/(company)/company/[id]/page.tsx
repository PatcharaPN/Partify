"use client";
import RelatedJobCard from "@/app/components/ui/RelatedJobCard";
import { useCompany } from "@/app/hooks/useCompany";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import {
  fetchJobsByCompany,
  fetchRelatedJob,
} from "@/app/store/slices/jobSlice";
import { Icon } from "@iconify/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const CompanyPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { relatedJobs } = useAppSelector((state) => state.jobReducer);

  const { fetchCompanyById, isLoading, company } = useCompany();

  useEffect(() => {
    if (!id) return;
    fetchCompanyById(id as string);
    dispatch(fetchJobsByCompany(id as string));
  }, [id]);

  if (isLoading || !company) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-gray-400 text-sm">กำลังโหลด...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-8 px-4">
      <main className="w-full max-w-4xl border border-gray-200/60 rounded-2xl overflow-hidden bg-white shadow-sm">
        {/* Cover */}
        <div className="relative h-48 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <span className="absolute top-4 right-5 text-xs font-medium text-white/80 border border-white/20 bg-white/10 rounded-full px-3 py-1">
            {company.category || "บริษัท"}
          </span>
          {company.companyImageURL && (
            <div className="absolute left-7 -bottom-8 z-10">
              <img
                src={company.companyImageURL}
                className="w-16 h-16 rounded-xl border-[3px] border-white object-cover shadow-md bg-white"
              />
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-8 pt-12 pb-8">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {company.companyName}
              </h1>
              <p className="text-sm text-gray-500 mt-1 font-light leading-relaxed max-w-lg">
                {company.companyBio || "ยังไม่มีคำอธิบาย"}
              </p>
            </div>
            {/* <div className="flex gap-2 shrink-0">
              <button className="text-sm flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition">
                <Icon icon={`mdi:bookmark-outline`} />
                บันทึก
              </button>
            </div> */}
          </div>

          {/* Stats */}
          <div className="md:grid md:grid-cols-4 divide-x divide-gray-100 border border-gray-100 rounded-xl mb-6 overflow-hidden">
            {[
              { label: "พนักงาน", value: company.companySize ?? "-" },
              { label: "หมวดหมู่", value: company.category ?? "-" },

              {
                label: "เข้าร่วมเมื่อ",
                value: company.createdAt
                  ? new Date(company.createdAt).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "short",
                    })
                  : "-",
              },
              {
                label: "ตำแหน่งเปิดรับ",
                value: relatedJobs.length > 0 ? relatedJobs.length : "-",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-gray-50/60 py-4 px-5 text-center"
              >
                <p className="text-lg font-semibold text-gray-800">{s.value}</p>
                <p className="text-[11px] uppercase tracking-wider text-gray-400 mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <hr className="border-gray-100 mb-5" />

          <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-3">
            ประวัติและความเป็นมา
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            {company.companyBio || "ยังไม่มีข้อมูลประวัติบริษัท"}
          </p>
        </div>

        {/* Open Positions */}
        {relatedJobs.length > 0 ? (
          <div className="border-t border-gray-100 p-6">
            <div className=" flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-blue-600 rounded-full" />
              <h2 className="text-base font-semibold text-gray-900">
                ตำแหน่งงานที่เปิดรับ
              </h2>
              <span className="text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full">
                {relatedJobs.length} ตำแหน่ง
              </span>
            </div>
            <div className="flex items-center w-full gap-3 overflow-x-auto max-w-4xl">
              {relatedJobs.map((job, i) => (
                <RelatedJobCard job={job} key={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="border-t border-gray-100 p-8 text-center">
            <Icon
              icon="mdi:briefcase-outline"
              className="mx-auto text-gray-300 mb-2"
              width={36}
            />
            <p className="text-sm text-gray-400">
              ยังไม่มีตำแหน่งงานที่เปิดรับในขณะนี้
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CompanyPage;
