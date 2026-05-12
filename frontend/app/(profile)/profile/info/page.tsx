"use client";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import { useAppDispatch } from "@/app/lib/hooks";
import { upsertProfile } from "@/app/store/slices/profileSlice";
import { useEffect, useState } from "react";

const PersonalInfoPage = () => {
  const { currentUser } = useCurrentUser();
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    if (currentUser?.profile) {
      setName(currentUser.profile.name || "");
      setPhone(currentUser.profile.phone || "");
      setBirthDate(currentUser.profile.birthDate?.split("T")[0] ?? "");
      setSummary(currentUser.profile.summary || "");
    }
  }, [currentUser?.profile]);

  const handleSave = async () => {
    await dispatch(
      upsertProfile({
        name,
        phone,
        birthDate: birthDate ? new Date(birthDate).toISOString() : undefined,
        summary,
      }),
    );
  };

  const handleCancel = () => {
    if (currentUser?.profile) {
      setName(currentUser.profile.name || "");
      setPhone(currentUser.profile.phone || "");
      setBirthDate(currentUser.profile.birthDate?.split("T")[0] ?? "");
      setSummary(currentUser.profile.summary || "");
    }
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-70px)] p-6 flex flex-col gap-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-[15px] font-medium text-gray-900">ข้อมูลส่วนตัว</h2>
        <div className="h-px bg-gray-100" />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500">
              ชื่อ-นามสกุล <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="เช่น สมชาย ใจดี"
              className="w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
            />
          </div>

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
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
        <div>
          <h2 className="text-[15px] font-medium text-gray-900">
            Professional summary
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

      <div className="flex justify-end gap-2">
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          บันทึก
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
