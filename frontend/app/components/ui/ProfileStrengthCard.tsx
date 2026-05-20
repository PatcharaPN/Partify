import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchProfile } from "@/app/store/slices/profileSlice";
import { Icon } from "@iconify/react";
import { useEffect } from "react";

const ProfileStrengthCard = () => {
  const { currentUser, isAuthenticated, isLoading } = useCurrentUser();
  const { profile, fetchLoading } = useAppSelector(
    (state) => state.profileReducer,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);
  const checklist = [
    {
      label: "เพิ่มรูปโปรไฟล์",
      sub: "ช่วยให้นายจ้างจดจำคุณได้",
      done: !!profile?.avatarUrl,
    },
    {
      label: "กรอกข้อมูลส่วนตัว",
      sub: "ชื่อ เบอร์โทร จังหวัด",
      done: !!profile?.firstName && !!profile?.phone && !!profile?.province,
    },
    {
      label: "เพิ่มทักษะ",
      sub: "ช่วยให้ระบบแนะนำงานได้ตรงขึ้น",
      done: (profile?.skills?.length ?? 0) > 0,
    },
    {
      label: "เขียน Bio",
      sub: "แนะนำตัวเองสั้นๆ",
      done: !!profile?.summary,
    },
    {
      label: "อัปโหลด Resume",
      sub: "เพิ่มโอกาสได้รับการติดต่อ",
      done: !!currentUser?.resume,
    },
  ];
  const strength = Math.round(
    (checklist.filter((c) => c.done).length / checklist.length) * 100,
  );
  if (strength === 100) {
    return (
      <div className="bg-white rounded-2xl h-fit border border-green-100 p-4 flex flex-col items-center text-center gap-2">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <Icon
            icon="material-symbols:check-rounded"
            width="22"
            height="22"
            color="#16A34A"
          />
        </div>
        <p className="text-sm font-semibold text-gray-900">
          โปรไฟล์สมบูรณ์แล้ว!
        </p>
        <p className="text-xs text-gray-400">
          นายจ้างจะเห็นโปรไฟล์คุณได้อย่างเต็มที่
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {/* Profile Strength */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-semibold text-gray-900">
            โปรไฟล์ของคุณ
          </span>
          <span className="text-sm font-semibold text-blue-600">
            {strength}%
          </span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full my-2 overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${strength}%` }}
          />
        </div>
        <p className="text-[11px] text-gray-400 mb-3">
          เติมข้อมูลอีกนิดเพื่อเพิ่มโอกาสในการได้งาน:
        </p>
        <div className="flex flex-col gap-2.5">
          {checklist.map((item) => (
            <div key={item.label} className="flex items-start gap-2">
              <div
                className={`w-4 h-4 rounded-full shrink-0 mt-0.5 flex items-center justify-center ${
                  item.done ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                {item.done ? (
                  <Icon
                    icon="material-symbols:check-rounded"
                    width="10"
                    height="10"
                    color="#16A34A"
                  />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                )}
              </div>
              <div>
                <div className="text-xs font-medium text-gray-800">
                  {item.label}
                </div>
                <div className="text-[11px] text-gray-400">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProfileStrengthCard;
