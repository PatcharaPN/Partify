import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import { Job } from "@/app/types/job.type";
import { Icon } from "@iconify/react";

type ProfileMatchScoreCardProps = {
  job: Job;
};

const ProfileMatchScoreCard = ({ job }: ProfileMatchScoreCardProps) => {
  const { currentUser } = useCurrentUser();
  const userSkills = currentUser?.profile?.skills.map(
    (s) => s.toLowerCase() || [],
  );

  const calculateMatchPercent = () => {
    if (!currentUser?.profile?.skills?.length || !job.skills?.length) return 0;

    const jobSkills = job.skills.map((s) => s.toLowerCase());
    const matched = jobSkills.filter((s) => userSkills?.includes(s));
    return Math.round((matched.length / jobSkills.length) * 100);
  };

  const getMissingSkills = () => {
    return job.skills.filter((s) => !userSkills?.includes(s.toLowerCase()));
  };

  const percent = calculateMatchPercent();
  const missingSkills = getMissingSkills();
  const getMatchMessage = (percent: number, missingSkills: string[]) => {
    if (percent === 100) return "ทักษะของคุณตรงกับที่งานนี้ต้องการทุกข้อ";
    if (percent >= 80)
      return "โปรไฟล์ของคุณตรงกับงานนี้ในระดับสูง มีโอกาสได้รับการพิจารณาเป็นอย่างมาก";
    if (percent >= 50)
      return `คุณมีพื้นฐานที่ดีสำหรับตำแหน่งนี้ การเพิ่ม ${missingSkills.slice(0, 2).join(" และ ")} จะช่วยเพิ่มโอกาสของคุณได้อีก`;
    if (percent > 0)
      return `ทักษะบางส่วนยังไม่ครบตามที่งานต้องการ แนะนำให้เพิ่ม ${missingSkills.slice(0, 2).join(" และ ")} ก่อนสมัคร`;
    return "เพิ่มทักษะในโปรไฟล์เพื่อให้ระบบประเมินความเหมาะสมกับงานนี้ได้";
  };
  return (
    <section className="bg-white border border-gray-100 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
            <Icon icon="mdi:target" width="16" className="text-blue-600" />
          </div>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            ทักษะที่ตรงกัน
          </span>
        </div>
        <span className="text-xl font-medium text-gray-900">{percent}%</span>
      </div>

      <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-xs text-gray-500 leading-relaxed mb-4">
        {getMatchMessage(percent, missingSkills)}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {job.skills.map((skill) => {
          const matched = userSkills?.includes(skill.toLowerCase());
          return (
            <span
              key={skill}
              className={`text-xs px-2.5 py-1 rounded-full border ${
                matched
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-gray-50 text-gray-400 border-gray-200"
              }`}
            >
              {skill}
              {matched ? " ✓" : ""}
            </span>
          );
        })}
      </div>
    </section>
  );
};
export default ProfileMatchScoreCard;
