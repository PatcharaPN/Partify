"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchJobById, fetchRelatedJob } from "@/app/store/slices/jobSlice";
import { Icon } from "@iconify/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import JobDetailSkeleton from "./JobDetailSkeleton";
import QuickApplyModal from "@/app/components/ui/ApplyModal";
import { fetchCurrentUser } from "@/app/store/slices/authSlice";
import {
  applyJob,
  fetchApplicationStatus,
} from "@/app/store/slices/applicationSlice";
import ProfileMatchScoreCard from "@/app/components/ui/ProfileMatchScoreCard";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import JobRow from "@/app/components/ui/JobRow";
import RelatedJobCard from "@/app/components/ui/RelatedJobCard";
import PopupContainer from "@/app/components/ui/PopupContainer";
import { PopupState } from "@/app/types/ui.type";
import { useCompany } from "@/app/hooks/useCompany";
import { useBookmarkToggle } from "@/app/hooks/useBookmark";
import { fetchBookmarks } from "@/app/store/slices/bookmarkSlice";

export default function JobDetail() {
  const router = useRouter();
  const { isAuthenticated } = useCurrentUser();
  const { currentUser } = useCurrentUser();
  const { members } = useCompany();

  const summary = currentUser?.profile?.summary;
  const [message, setMessage] = useState("");
  const [popUpState, setPopupState] = useState<PopupState>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { appliedStatus } = useAppSelector((state) => state.ApplicationReducer);
  const { user } = useAppSelector((state) => state.AuthReducer);
  const { relatedJobs, selectedJob, isLoading, error } = useAppSelector(
    (state) => state.jobReducer,
  );
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const {
    isBookmarked,
    toggle,
    loading: bookmarkLoading,
  } = useBookmarkToggle(id as string);
  const isCompanyMember = members.some((c) => c.userId === currentUser?.id);
  const isProfileValid =
    !!currentUser?.profile?.firstName &&
    !!currentUser?.profile?.lastName &&
    !!currentUser?.profile?.phone &&
    !!currentUser?.profile?.avatarUrl &&
    !!currentUser?.profile?.summary &&
    (currentUser?.profile?.skills?.length ?? 0) > 0 &&
    (currentUser?.profile?.preferredJobTypes?.length ?? 0) > 0 &&
    (currentUser?.profile?.availability?.length ?? 0) > 0;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id as string));
      dispatch(fetchRelatedJob(id as string));
      dispatch(fetchBookmarks());
    }
    dispatch(fetchCurrentUser()).unwrap();
  }, [id]);
  useEffect(() => {
    if (id && user?.id) {
      dispatch(
        fetchApplicationStatus({
          jobId: id as string,
          userId: user.id,
        }),
      );
    }
  }, [id, user]);

  useEffect(() => {
    if (!message && summary) {
      setMessage(summary);
    }
  }, [summary]);
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

  const handleApply = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const missingFields = [];
    if (!currentUser?.profile?.firstName) missingFields.push("ชื่อ");
    if (!currentUser?.profile?.lastName) missingFields.push("นามสกุล");
    if (!currentUser?.profile?.phone) missingFields.push("เบอร์โทร");
    if (!currentUser?.profile?.avatarUrl) missingFields.push("รูปโปรไฟล์");
    if (!currentUser?.profile?.summary) missingFields.push("Bio");
    if (!currentUser?.profile?.skills?.length) missingFields.push("ทักษะ");

    if (missingFields.length > 0) {
      setMessage(`โปรไฟล์ยังไม่ครบ: ${missingFields.join(", ")}`);
      setPopupState("error");
      setTimeout(() => setPopupState(null), 2000);
      return;
    }

    if (isCompanyMember) {
      setMessage("สมาชิกในองค์กรไม่สามารถยื่นสมัครได้ !");
      setPopupState("error");
      setTimeout(() => {
        setPopupState(null);
      }, 2000);
      return;
    }
    setIsModalOpen(false);
    setPopupState("loading");
    setMessage("กำลังส่งคำขอ...");
    try {
      await dispatch(
        applyJob({
          jobId: selectedJob.id,
          userId: user!.id,
          messageCtx: message,
        }),
      ).unwrap();
      setMessage("ส่งคำขอสมัครงานสำเร็จ !");
      setPopupState("success");

      setIsModalOpen(false);
    } catch (error: any) {
      const message = error?.response?.data?.message;

      if (message === "Already applied") {
        setIsModalOpen(false);
      }
    } finally {
      setIsModalOpen(false);

      setTimeout(() => {
        setPopupState(null);
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center bg-gray-50 min-h-screen">
      <main className="w-full max-w-5xl mt-10 mb-20 px-4">
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
                ตำแหน่งงานใหม่
              </span>
            )}
            {selectedJob.isActive === true ? (
              <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full uppercase tracking-wide">
                เปิดรับสมัคร
              </span>
            ) : (
              <div></div>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900">
            {selectedJob.title}
          </h1>

          <div className="flex justify-between items-center pt-4 gap-4 flex-wrap">
            <div className="flex items-center gap-5 flex-wrap">
              {selectedJob.province && (
                <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                  <Icon
                    icon="ep:location"
                    color="#004AC6"
                    width="20"
                    height="20"
                  />
                  {[
                    selectedJob.locationDetail,
                    selectedJob.district,
                    selectedJob.province,
                  ]
                    .filter(Boolean)
                    .join(", ")}
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
              <button
                onClick={toggle}
                disabled={bookmarkLoading}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition disabled:opacity-50"
              >
                {isBookmarked ? (
                  <Icon
                    icon="mdi:bookmark"
                    color="#004AC6"
                    width="20"
                    height="20"
                  />
                ) : (
                  <Icon
                    icon="mdi:bookmark-outline"
                    width="20"
                    height="20"
                    className="text-gray-500"
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
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
                <h2 className="text-lg font-bold text-gray-900">
                  รายละเอียดงาน
                </h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {selectedJob.description}
              </p>
              {selectedJob.responsibilities && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    หน้าที่และความรับผิดชอบ
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
                  คุณสมบัติที่ต้องการ
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
                  สวัสดิการ
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
                รายละเอียดงาน
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                {selectedJob.workStyle && (
                  <div>
                    <p className="text-gray-400 text-xs mb-1">รูปแบบการทำงาน</p>
                    <p className="font-medium text-gray-800">
                      {selectedJob.workStyle}
                    </p>
                  </div>
                )}
                {selectedJob.workingDays && (
                  <div>
                    <p className="text-gray-400 text-xs mb-1">วันทำงาน</p>
                    <p className="font-medium text-gray-800">
                      {selectedJob.workingDays}
                    </p>
                  </div>
                )}
                {selectedJob?.positions && selectedJob.positions > 0 && (
                  <div>
                    <p className="text-gray-400 text-xs mb-1">
                      จำนวนที่เปิดรับ
                    </p>
                    <p className="font-medium text-gray-800">
                      {selectedJob.positions}
                    </p>
                  </div>
                )}
                {formatDate(selectedJob.startDate) && (
                  <div>
                    <p className="text-gray-400 text-xs mb-1">วันที่เริ่มงาน</p>
                    <p className="font-medium text-gray-800">
                      {formatDate(selectedJob.startDate)}
                    </p>
                  </div>
                )}
                {formatDate(selectedJob.closingDate) && (
                  <div>
                    <p className="text-gray-400 text-xs mb-1">วันปิดรับสมัคร</p>
                    <p className="font-medium text-gray-800">
                      {formatDate(selectedJob.closingDate)}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-gray-400 text-xs mb-1">วันที่ประกาศ</p>
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
                  ทักษะที่ต้องการ
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill, i) => (
                    <span
                      key={`${skill}-${i}`}
                      className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
            {relatedJobs.length > 0 && (
              <section className="rounded-2xl p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  งานอื่นจากบริษัทนี้
                </h2>

                <div className="flex gap-3">
                  {relatedJobs.map((job, i) => (
                    <RelatedJobCard job={job} key={i} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                {selectedJob.company.companyImageURL ? (
                  <img
                    src={selectedJob.company.companyImageURL}
                    alt={selectedJob.company.companyName}
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {selectedJob.company.companyName?.charAt(0) ?? "C"}
                  </div>
                )}
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    {selectedJob.company.companyName}
                  </p>
                </div>
              </div>

              <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">
                {selectedJob.description}
              </p>

              <div className="flex flex-col gap-2 text-xs border-t border-gray-100 pt-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">ประเภทธุรกิจ</span>
                  <span className="font-medium text-gray-700">
                    {selectedJob.company.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">พนักงาน</span>
                  <span className="font-medium text-gray-700">
                    {selectedJob.company.companySize} คน
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">สมัครใช้งานเมื่อ</span>
                  <span className="font-medium text-gray-700">
                    2026 on Partify
                  </span>
                </div>
              </div>
              {selectedJob.isOwner === true ? (
                <div className="relative w-full" ref={menuRef}>
                  <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 transition"
                  >
                    <span>จัดการใบประกาศงาน</span>
                    <Icon
                      icon="mdi:chevron-down"
                      className={`transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>

                  {open && (
                    <div className="absolute top-full mt-1 w-full bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden z-10">
                      <button
                        onClick={() => {
                          router.push(`/dashboard/employer/applicants`);
                          setOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                      >
                        <Icon icon="mdi:account-group-outline" width={16} />
                        ดูผู้สมัคร
                      </button>
                      <button
                        onClick={() => {
                          /* close job */ setOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                      >
                        <Icon icon="mdi:close-circle-outline" width={16} />
                        ปิดรับสมัคร
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {appliedStatus === "PENDING" ? (
                    <button
                      disabled
                      className="w-full bg-yellow-400/40 text-yellow-800 py-2.5 rounded-xl"
                    >
                      รอการพิจารณา
                    </button>
                  ) : appliedStatus === "ACCEPTED" ? (
                    <button
                      disabled
                      className="w-full bg-green-600/40 text-green-800 py-2.5 rounded-xl"
                    >
                      ได้รับการตอบรับ
                    </button>
                  ) : appliedStatus === "REJECTED" ? (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full bg-red-500 text-white py-2.5 rounded-xl"
                    >
                      ยื่นสมัครอีกรอบ
                    </button>
                  ) : (
                    <button
                      onClick={handleApply}
                      className="w-full bg-blue-600 text-white py-2.5 rounded-xl"
                    >
                      ยื่นสมัคร
                    </button>
                  )}
                </div>
              )}
            </section>
            {/* Profile Match */}
            <ProfileMatchScoreCard job={selectedJob} />
          </div>
        </div>
      </main>{" "}
      {isModalOpen && (
        <QuickApplyModal
          isLoading={isLoading}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      <PopupContainer message={message} state={popUpState} />
    </div>
  );
}
