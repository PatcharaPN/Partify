"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchJobById } from "@/app/store/slices/jobSlice";
import { Icon } from "@iconify/react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function JobDetail() {
  const { id } = useParams();
  const { selectedJob, isLoading, error } = useAppSelector(
    (state) => state.jobReducer,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id as string));
    }
  }, [id]);

  console.log(selectedJob);
  return (
    <div className="flex justify-center">
      <main className="w-full max-w-350 mt-15">
        <div>
          <h1 className="text-4xl font-bold">{selectedJob?.title}</h1>
          <div className="flex justify-between pt-5 gap-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Icon
                  icon="ep:location"
                  color="004AC6"
                  width="25"
                  height="25"
                />
                <p>{selectedJob?.location}</p>
              </div>{" "}
              <div className="flex items-center gap-2">
                <Icon
                  icon="ph:money-wavy"
                  color="004AC6"
                  width="25"
                  height="25"
                />
                <p>
                  {selectedJob?.salaryMin} - {selectedJob?.salaryMax}
                  {selectedJob?.currency === "THB"
                    ? " บาท"
                    : selectedJob?.currency}
                  /ชม.
                </p>
              </div>{" "}
              <div className="flex items-center gap-2">
                <Icon
                  icon="ri:time-line"
                  width="25"
                  color="004AC6"
                  height="25"
                />
                <p>{selectedJob?.workingHours}</p>
              </div>
            </div>
            <div>{/* Share Btn */}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
