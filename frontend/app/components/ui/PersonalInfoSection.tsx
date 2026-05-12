export type PersonalInfoSectionProps = {
  name: string;
  phone: string;
  birthDate: string;
  summary: string;

  setName: (v: string) => void;
  setPhone: (v: string) => void;
  setSummary: (v: string) => void;
  setBirthDate: (v: string) => void;
};

const PersonalInfoSection = ({
  birthDate,
  name,
  phone,
  summary,
  setSummary,
  setBirthDate,
  setName,
  setPhone,
}: PersonalInfoSectionProps) => {
  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 text-base mb-4">
          ข้อมูลส่วนตัว
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">
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

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">
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

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">
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
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 text-base mb-1">
          Professional Summary
        </h2>
        <p className="text-xs text-gray-400 mb-3">
          Briefly describe your editorial background, expertise, and what you're
          looking for in your next role.
        </p>
        <textarea
          className="w-full"
          rows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Write something about yourself..."
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;
