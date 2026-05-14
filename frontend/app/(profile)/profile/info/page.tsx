"use client";
import { PROVINCES_DISTRICTS } from "@/app/constants/jobLabels";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import { useAppDispatch } from "@/app/lib/hooks";
import { upsertProfile } from "@/app/store/slices/profileSlice";
import { useEffect, useState } from "react";

const GENDERS = [
  { label: "ชาย", value: "MALE" },
  { label: "หญิง", value: "FEMALE" },
  { label: "ไม่ระบุ", value: "OTHER" },
];

const PersonalInfoPage = () => {
  const [initialized, setInitialized] = useState(false);
  const { currentUser } = useCurrentUser();
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [summary, setSummary] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [workingHours, setWorkingHours] = useState("");

  useEffect(() => {
    const profile = currentUser?.profile;
    if (!profile || initialized) return;

    setFirstName(profile.firstName || "");
    setLastName(profile.lastName || "");
    setPhone(profile.phone || "");
    setBirthDate(profile.birthDate?.split("T")[0] ?? "");
    setSummary(profile.summary || "");
    setGender(profile.gender || "");
    setNationality(profile.nationality || "");
    setProvince(profile.province || "");
    setDistrict(profile.district || "");
    setWorkingHours(profile.workingHours || "");

    setInitialized(true);
  }, [currentUser?.profile, initialized]);

  const handleSave = async () => {
    await dispatch(
      upsertProfile({
        firstName,
        lastName,
        phone,
        birthDate: birthDate ? new Date(birthDate).toISOString() : undefined,
        summary,
        gender,
        nationality,
        province,
        district,
        workingHours,
      }),
    );
  };

  const handleCancel = () => {
    const profile = currentUser?.profile;
    if (!profile) return;
    setFirstName(profile.firstName || "");
    setLastName(profile.lastName || "");
    setPhone(profile.phone || "");
    setBirthDate(profile.birthDate?.split("T")[0] ?? "");
    setSummary(profile.summary || "");
    setGender(profile.gender || "");
    setNationality(profile.nationality || "");
    setProvince(profile.province || "");
    setDistrict(profile.district || "");
    setWorkingHours(profile.workingHours || "");
  };

  const provinces = Object.keys(PROVINCES_DISTRICTS);
  const districts = province ? (PROVINCES_DISTRICTS[province] ?? []) : [];
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-70px)] p-6 flex flex-col gap-4">
      {/* ── ข้อมูลส่วนตัว ── */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-[15px] font-medium text-gray-900">ข้อมูลส่วนตัว</h2>
        <div className="h-px bg-gray-100" />

        <div className="flex flex-col gap-4">
          {/* ชื่อ - นามสกุล */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500">
                ชื่อ <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="เช่น สมชาย"
                className="w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500">
                นามสกุล
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="เช่น ใจดี"
                className="w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>
          </div>

          {/* เบอร์โทร - วันเกิด */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500">
                เบอร์โทรศัพท์
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="เช่น 081-234-5678"
                className="w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500">
                วันเกิด
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>
          </div>

          {/* เพศ - สัญชาติ */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500">เพศ</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition bg-white"
              >
                <option value="">เลือกเพศ</option>
                {GENDERS.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500">
                สัญชาติ
              </label>
              <input
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                placeholder="เช่น ไทย"
                className="w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── ที่อยู่ ── */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-[15px] font-medium text-gray-900">ที่อยู่</h2>
        <div className="h-px bg-gray-100" />
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500">
              จังหวัด
            </label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition bg-white"
            >
              <option value="">เลือกจังหวัด</option>
              {provinces.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500">
              เขต/อำเภอ
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={!province}
              className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition bg-white disabled:opacity-40"
            >
              <option value="">เลือกเขต/อำเภอ</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── การทำงาน ── */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-[15px] font-medium text-gray-900">การทำงาน</h2>
        <div className="h-px bg-gray-100" />
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500">
            ชั่วโมงทำงานที่ต้องการ
          </label>
          <input
            type="text"
            value={workingHours}
            onChange={(e) => setWorkingHours(e.target.value)}
            placeholder="เช่น จันทร์-ศุกร์ 9:00-18:00"
            className="w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
          />
        </div>
      </div>

      {/* ── Professional Summary ── */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
        <div>
          <h2 className="text-[15px] font-medium text-gray-900">
            Professional Summary
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Briefly describe your background, expertise, and what you're looking
            for.
          </p>
        </div>
        <div className="h-px bg-gray-100" />
        <div className="flex flex-col gap-1">
          <textarea
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            maxLength={500}
            placeholder="Write something about yourself..."
            className="w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition resize-none"
          />
          <p className="text-[11px] text-gray-300 text-right">
            {summary.length} / 500
          </p>
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="flex justify-end gap-2">
        <button
          onClick={handleCancel}
          className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          ยกเลิก
        </button>
        <button
          onClick={handleSave}
          disabled={!firstName.trim()}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          บันทึก
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
