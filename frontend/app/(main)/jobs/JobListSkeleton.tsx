function Bone({ className }: { className?: string }) {
  return (
    <div
      className={`bg-gray-200 rounded-lg animate-pulse ${className ?? ""}`}
    />
  );
}

function JobCardSkeleton() {
  return (
    <div className="bg-white py-8 mb-5 px-6 grid grid-cols-[1.5fr_7fr_2fr] rounded-2xl shadow w-full border border-neutral-400/10 items-center">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <Bone className="w-16 h-16 rounded-xl" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2">
        <Bone className="h-5 w-48" />
        <div className="flex gap-4">
          <Bone className="h-4 w-24" />
          <Bone className="h-4 w-20" />
          <Bone className="h-4 w-16" />
        </div>
        <Bone className="h-4 w-full mt-1" />
        <Bone className="h-4 w-4/5" />
      </div>

      {/* Salary + Button */}
      <div className="border-l border-neutral-100 flex flex-col items-end gap-3">
        <div className="flex flex-col items-end gap-1.5">
          <Bone className="h-6 w-24" />
          <Bone className="h-3 w-16" />
        </div>
        <Bone className="h-10 w-24 rounded-xl" />
      </div>
    </div>
  );
}

export default function JobListSkeleton() {
  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
}
