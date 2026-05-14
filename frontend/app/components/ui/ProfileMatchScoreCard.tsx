import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import { Job } from "@/app/types/job.type";

type ProfileMatchScoreCardProps = {
  job: Job;
};

const ProfileMatchScoreCard = ({ job }: ProfileMatchScoreCardProps) => {
  const { currentUser } = useCurrentUser();
  // TODO - Compare user profile skills with job required skills
  console.log("User Skills", currentUser?.profile?.skills);
  console.log("Job require Skill", job.skills);
  // TODO - Calculate profile match percentage based on matched skills
  // TODO - Add weighted scoring for experience, availability, and education
  // TODO - Show missing skills to help candidates improve profile matching
  // TODO - Consider AI-based semantic skill matching in future

  return (
    <section className="bg-linear-to-r from-blue-500 to-blue-300 rounded-2xl p-5 shadow-sm text-white">
      <p className="text-xs font-extrabold uppercase tracking-widest text-blue-200 mb-1">
        Profile Match
      </p>
      <p className="text-4xl font-bold mb-2">94%</p>
      <div className="w-full bg-blue-400/40 rounded-full h-1.5 mb-3">
        <div className="bg-white rounded-full h-1.5" style={{ width: "94%" }} />
      </div>
      <p className="text-xs text-blue-100 leading-relaxed">
        Your previous experience in customer service and availability for
        morning shifts make you a top candidate!
      </p>
    </section>
  );
};
export default ProfileMatchScoreCard;
