import { Bone } from "@/app/(main)/jobs/JobListSkeleton";

function SetupProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col mt-10">
      {/* Progress */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Bone className="h-3 w-40" />
          <Bone className="flex-1 h-1 rounded-full max-w-xs" />
          <Bone className="h-3 w-20" />
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 grid grid-cols-1 md:grid-cols-[210px_1fr] gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-2xl  p-5 flex flex-col items-center gap-3">
          <Bone className="w-20 h-20 rounded-xl" />
          <Bone className="h-4 w-32" />
          <Bone className="h-3 w-40" />
          <Bone className="h-3 w-36" />
          <Bone className="h-3 w-24 mt-2" />
        </div>

        {/* Main */}
        <div className="flex flex-col gap-5">
          {/* Summary */}
          <div className="bg-white rounded-2xl  p-6">
            <Bone className="h-4 w-40 mb-4" />
            <Bone className="h-3 w-32 mb-2" />
            <Bone className="h-24 w-full rounded-xl" />
          </div>

          {/* Skills + Shifts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Skills */}
            <div className="bg-white rounded-2xl  p-6">
              <Bone className="h-4 w-32 mb-4" />
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <Bone key={i} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            </div>

            {/* Shifts */}
            <div className="bg-white rounded-2xl  p-6">
              <Bone className="h-4 w-32 mb-4" />
              <div className="grid grid-cols-2 gap-2">
                {[...Array(4)].map((_, i) => (
                  <Bone key={i} className="h-16 rounded-xl" />
                ))}
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-2xl  p-6">
            <Bone className="h-4 w-40 mb-5" />
            <div className="grid grid-cols-7 gap-2">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Bone className="h-3 w-6" />
                  <Bone className="w-full aspect-square rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="sticky bottom-0 bg-white border-t px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between">
          <Bone className="h-4 w-28" />
          <Bone className="h-10 w-40 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default SetupProfileSkeleton;
