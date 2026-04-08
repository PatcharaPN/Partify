"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchJobById } from "@/app/store/slices/jobSlice";
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
    <div className="">
      <main className="">
        <p>Job Detail here</p>
      </main>
    </div>
  );
}
