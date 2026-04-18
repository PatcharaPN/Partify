import { Bone } from "../../jobs/JobListSkeleton";

function BuildProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <Bone className="h-8 w-64" />
          <Bone className="h-4 w-96" />
        </div>

        <div className="grid grid-cols-[200px_1fr] gap-6">
          {/* Left */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-5 flex flex-col items-center gap-3">
              <Bone className="w-20 h-20 rounded-full" />
              <Bone className="h-4 w-24" />
              <Bone className="h-3 w-32" />
              <Bone className="h-8 w-full rounded-lg" />
            </div>

            <div className="bg-blue-50 rounded-2xl p-4 space-y-2">
              <Bone className="h-3 w-20" />
              <Bone className="h-3 w-full" />
              <Bone className="h-3 w-4/5" />
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-5">
            {/* Summary */}
            <div className="bg-white rounded-2xl p-6 space-y-3">
              <Bone className="h-5 w-40" />
              <Bone className="h-3 w-64" />
              <Bone className="h-24 w-full" />
            </div>

            {/* Experience */}
            <div className="bg-white rounded-2xl p-6 space-y-3">
              <Bone className="h-5 w-40" />
              <Bone className="h-3 w-64" />

              <div className="flex gap-2 flex-wrap">
                <Bone className="h-6 w-20 rounded-full" />
                <Bone className="h-6 w-24 rounded-full" />
                <Bone className="h-6 w-16 rounded-full" />
              </div>

              <Bone className="h-10 w-full rounded-xl" />
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl p-6 space-y-3">
              <Bone className="h-5 w-40" />
              <Bone className="h-3 w-64" />

              <div className="flex gap-2 flex-wrap">
                <Bone className="h-6 w-20 rounded-full" />
                <Bone className="h-6 w-24 rounded-full" />
                <Bone className="h-6 w-16 rounded-full" />
              </div>

              <Bone className="h-10 w-full rounded-xl" />
            </div>

            {/* Availability */}
            <div className="bg-white rounded-2xl p-6 space-y-4">
              <Bone className="h-5 w-48" />
              <Bone className="h-3 w-64" />

              <div className="flex justify-between">
                {Array.from({ length: 7 }).map((_, i) => (
                  <Bone key={i} className="w-9 h-9 rounded-full" />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Bone className="h-12 w-full rounded-xl" />
                <Bone className="h-12 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-8">
          <Bone className="h-12 w-32 rounded-xl" />
        </div>
      </main>
    </div>
  );
}
export default BuildProfileSkeleton;
