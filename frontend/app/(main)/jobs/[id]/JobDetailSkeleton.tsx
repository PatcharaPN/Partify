function Bone({ className }: { className?: string }) {
  return (
    <div
      className={`bg-gray-200 rounded-lg animate-pulse ${className ?? ""}`}
    />
  );
}

export default function JobDetailSkeleton() {
  return (
    <div className="flex justify-center bg-gray-50 min-h-screen">
      <main className="w-full max-w-5xl mt-10 mb-20 px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex gap-2 mb-3">
            <Bone className="h-6 w-24 rounded-full" />
            <Bone className="h-6 w-28 rounded-full" />
          </div>
          <Bone className="h-10 w-2/3 mb-4" />
          <div className="flex gap-5">
            <Bone className="h-5 w-36" />
            <Bone className="h-5 w-32" />
            <Bone className="h-5 w-28" />
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Image grid */}
            <div className="grid grid-cols-2 gap-3 h-64">
              <Bone className="h-full rounded-2xl" />
              <div className="flex flex-col gap-3">
                <Bone className="flex-1 rounded-xl" />
                <Bone className="flex-1 rounded-xl" />
              </div>
            </div>

            {/* The Role */}
            <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-3">
              <Bone className="h-5 w-24" />
              <Bone className="h-4 w-full" />
              <Bone className="h-4 w-full" />
              <Bone className="h-4 w-5/6" />
              <Bone className="h-4 w-4/6" />
            </div>

            {/* Requirements & Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-3">
                <Bone className="h-5 w-32 mb-1" />
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Bone className="h-4 w-4 rounded-full shrink-0" />
                    <Bone className="h-4 flex-1" />
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
                <Bone className="h-5 w-24 mb-1" />
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Bone className="h-4 w-4 rounded-full shrink-0" />
                    <Bone className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Job Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <Bone className="h-5 w-28 mb-4" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <Bone className="h-3 w-16" />
                    <Bone className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">
            {/* Company Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Bone className="w-10 h-10 rounded-lg shrink-0" />
                <div className="flex flex-col gap-1.5 flex-1">
                  <Bone className="h-4 w-24" />
                  <Bone className="h-3 w-16" />
                </div>
              </div>
              <Bone className="h-3 w-full" />
              <Bone className="h-3 w-5/6" />
              <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Bone className="h-3 w-16" />
                    <Bone className="h-3 w-20" />
                  </div>
                ))}
              </div>
              <Bone className="h-10 w-full rounded-xl mt-1" />
              <Bone className="h-10 w-full rounded-xl" />
            </div>

            {/* Profile Match */}
            <div className="bg-blue-100 rounded-2xl p-5 flex flex-col gap-3 animate-pulse">
              <Bone className="h-3 w-24 bg-blue-200" />
              <Bone className="h-9 w-20 bg-blue-200" />
              <Bone className="h-1.5 w-full rounded-full bg-blue-200" />
              <Bone className="h-3 w-full bg-blue-200" />
              <Bone className="h-3 w-4/5 bg-blue-200" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
