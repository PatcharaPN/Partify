export default function PersonaCard() {
  return (
    <div className="backdrop-blur-2xl w-full max-w-70 h-full min-h-35 rounded-2xl bg-white">
      {/* User Profile */}

      <div className="px-5 flex flex-col justify-center h-full">
        {/* Comment */}
        <p className="text-md italic text-neutral-500 py-2">
          "หางาน Part-time ได้ภายในอาทิตย์แรกเลย !"
        </p>
        <div className=" flex items-center justify-start gap-2">
          <div className="w-10 h-10 bg-indigo-500/40 font-bold text-xs rounded-full flex justify-center items-center text-indigo-900">
            TW
          </div>
          <div className="flex flex-col text-md">
            <p className="font-bold">Thanapat W.</p>
            <p className="text-xs">นักออกแบบ Freelance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
