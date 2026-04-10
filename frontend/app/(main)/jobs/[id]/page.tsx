"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchJobById } from "@/app/store/slices/jobSlice";
import { Icon } from "@iconify/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import JobDetailSkeleton from "./JobDetailSkeleton";

export default function JobDetail() {
  const { id } = useParams();
  const { selectedJob, isLoading, error } = useAppSelector(
    (state) => state.jobReducer,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id as string));
    }
  }, [id]);

  if (isLoading) {
    return <JobDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!selectedJob) return null;

  const salaryLabel =
    selectedJob.salaryMin && selectedJob.salaryMax
      ? `${selectedJob.salaryMin.toLocaleString()} - ${selectedJob.salaryMax.toLocaleString()} ${
          selectedJob.currency === "THB" ? "บาท" : (selectedJob.currency ?? "")
        }/ชม.`
      : selectedJob.salaryNegotiable
        ? "เงินเดือนต่อรองได้"
        : "ไม่ระบุ";

  const formatDate = (dateStr?: string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("th-TH", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;

  return (
    <div className="flex justify-center bg-gray-50 min-h-screen">
      <main className="w-full max-w-5xl mt-10 mb-20 px-4">
        {/* ── Header ── */}
        <div className="mb-6">
          <div className="flex gap-2 mb-3 flex-wrap">
            {selectedJob.jobType && (
              <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wide">
                {selectedJob.jobType}
              </span>
            )}
            {selectedJob.urgency === "urgent" && (
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                <Icon icon="mdi:fire" width="13" height="13" />
                New Position
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900">
            {selectedJob.title}
          </h1>

          <div className="flex justify-between items-center pt-4 gap-4 flex-wrap">
            <div className="flex items-center gap-5 flex-wrap">
              {selectedJob.location && (
                <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                  <Icon
                    icon="ep:location"
                    color="#004AC6"
                    width="20"
                    height="20"
                  />
                  <span>{selectedJob.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                <Icon
                  icon="ph:money-wavy"
                  color="#004AC6"
                  width="20"
                  height="20"
                />
                <span>{salaryLabel}</span>
              </div>
              {selectedJob.workingHours && (
                <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                  <Icon
                    icon="ri:time-line"
                    color="#004AC6"
                    width="20"
                    height="20"
                  />
                  <span>{selectedJob.workingHours}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition">
                <Icon
                  icon="mdi:share-variant-outline"
                  width="20"
                  height="20"
                  className="text-gray-500"
                />
              </button>
              <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition">
                <Icon
                  icon="mdi:bookmark-outline"
                  width="20"
                  height="20"
                  className="text-gray-500"
                />
              </button>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left Column ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Overview Images */}
            {selectedJob.overviewPictureURL &&
              selectedJob.overviewPictureURL.length > 0 && (
                <div className="grid grid-cols-2 gap-3 rounded-2xl overflow-hidden">
                  {/* รูปซ้าย */}
                  <img
                    src={selectedJob.overviewPictureURL[0]}
                    className="w-full h-full object-cover rounded-2xl "
                  />

                  {/* รูปขวา */}
                  <div
                    className="grid gap-3"
                    style={{
                      gridTemplateRows: `repeat(${selectedJob.overviewPictureURL.slice(1, 3).length}, 1fr)`,
                    }}
                  >
                    {selectedJob.overviewPictureURL
                      .slice(1, 3)
                      .map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt={`Job overview ${i + 2}`}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ))}
                  </div>
                </div>
              )}

            {/* The Role */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-blue-600 rounded-full" />
                <h2 className="text-lg font-bold text-gray-900">The Role</h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {selectedJob.description}
              </p>
              {selectedJob.responsibilities && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Responsibilities
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                    {selectedJob.responsibilities}
                  </p>
                </div>
              )}
            </section>

            {/* Requirements & Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Requirements */}
              <section className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-bold text-gray-900 mb-4">
                  Requirements
                </h2>
                <ul className="flex flex-col gap-3">
                  {selectedJob.qualifications
                    ?.split("\n")
                    .filter(Boolean)
                    .map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <Icon
                          icon="mdi:check-circle"
                          className="text-blue-600 mt-0.5 shrink-0"
                          width="18"
                          height="18"
                        />
                        <span>{item.replace(/^[-•]\s*/, "")}</span>
                      </li>
                    ))}
                  {selectedJob.experienceLevel && (
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <Icon
                        icon="mdi:check-circle"
                        className="text-blue-600 mt-0.5 shrink-0"
                        width="18"
                        height="18"
                      />
                      <span>
                        ระดับประสบการณ์: {selectedJob.experienceLevel}
                        {selectedJob.experienceYears
                          ? ` (${selectedJob.experienceYears} ปี)`
                          : ""}
                      </span>
                    </li>
                  )}
                  {selectedJob.educationLevel && (
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <Icon
                        icon="mdi:check-circle"
                        className="text-blue-600 mt-0.5 shrink-0"
                        width="18"
                        height="18"
                      />
                      <span>การศึกษา: {selectedJob.educationLevel}</span>
                    </li>
                  )}
                </ul>
              </section>

              {/* Benefits */}
              <section className="bg-blue-50 rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-bold text-gray-900 mb-4">
                  Benefits
                </h2>
                <ul className="flex flex-col gap-3">
                  {selectedJob.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <Icon
                        icon="mdi:gift-outline"
                        className="text-blue-600 mt-0.5 shrink-0"
                        width="18"
                        height="18"
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Job Details */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-4">
                Job Details
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                {selectedJob.workStyle && (
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Work Style</p>
                    <p className="font-medium text-gray-800">
                      {selectedJob.workStyle}
                    </p>
                  </div>
                )}
                {selectedJob.workingDays && (
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Working Days</p>
                    <p className="font-medium text-gray-800">
                      {selectedJob.workingDays}
                    </p>
                  </div>
                )}
                {selectedJob.positions > 0 && (
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Open Positions</p>
                    <p className="font-medium text-gray-800">
                      {selectedJob.positions}
                    </p>
                  </div>
                )}
                {formatDate(selectedJob.startDate) && (
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Start Date</p>
                    <p className="font-medium text-gray-800">
                      {formatDate(selectedJob.startDate)}
                    </p>
                  </div>
                )}
                {formatDate(selectedJob.closingDate) && (
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Closing Date</p>
                    <p className="font-medium text-gray-800">
                      {formatDate(selectedJob.closingDate)}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-gray-400 text-xs mb-1">Posted</p>
                  <p className="font-medium text-gray-800">
                    {formatDate(selectedJob.createdAt)}
                  </p>
                </div>
              </div>
            </section>

            {/* Skills */}
            {selectedJob.skills && selectedJob.skills.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-bold text-gray-900 mb-4">
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full font-medium"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── Right Column ── */}
          <div className="flex flex-col gap-4">
            {/* Company Card */}
            <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                {selectedJob.companyImageURL ? (
                  <img
                    src={selectedJob.companyImageURL}
                    alt={selectedJob.companyName}
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {selectedJob.companyName?.charAt(0) ?? "C"}
                  </div>
                )}
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    {selectedJob.companyName}
                  </p>
                  <p className="text-yellow-500 text-xs">
                    ★ 4.8 (2.4k reviews)
                  </p>
                </div>
              </div>

              <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">
                {selectedJob.description}
              </p>

              <div className="flex flex-col gap-2 text-xs border-t border-gray-100 pt-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Industry</span>
                  <span className="font-medium text-gray-700">
                    Food &amp; Beverage
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Size</span>
                  <span className="font-medium text-gray-700">
                    10,000+ Employees
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Hiring since</span>
                  <span className="font-medium text-gray-700">
                    2018 on Partify
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold py-2.5 rounded-xl transition">
                  Apply Now
                </button>
                <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 text-sm font-semibold py-2.5 rounded-xl transition">
                  View Company Profile
                </button>
              </div>
            </section>

            {/* Profile Match */}
            <section className="bg-blue-600 rounded-2xl p-5 shadow-sm text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-1">
                Profile Match
              </p>
              <p className="text-4xl font-bold mb-2">94%</p>
              <div className="w-full bg-blue-400/40 rounded-full h-1.5 mb-3">
                <div
                  className="bg-white rounded-full h-1.5"
                  style={{ width: "94%" }}
                />
              </div>
              <p className="text-xs text-blue-100 leading-relaxed">
                Your previous experience in customer service and availability
                for morning shifts make you a top candidate!
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
