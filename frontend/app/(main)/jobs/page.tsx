"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchJobs } from "@/app/store/slices/jobSlice";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import JobListSkeleton from "./JobListSkeleton";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import JobList from "@/app/components/ui/JobList";
import { useSearch } from "@/app/hooks/useSearch";
import Button from "@/app/components/ui/Button";
import { useParams, useSearchParams } from "next/navigation";

const TAGS = [
  "React",
  "Node.js",
  "ขับรถ",
  "บัญชี",
  "ดูแลเด็ก",
  "IT Support",
  "งานออฟฟิศ",
];
export default function JobPage() {
  const searchParams = useSearchParams();
  const searchjobs = searchParams.get("searchjobs");
  const category = searchParams.get("category");
  const dispatch = useAppDispatch();
  const {
    search,
    handleSearch,
    selectedTags,
    toggleTag,
    page,
    setPage,
    searchResults,
    isLoading,
    total,
    totalPages,
    searchChips,
    addChip,
    removeChip,
  } = useSearch(category, searchjobs);
  const [sortedBy, setSortedBy] = useState("newest");
  const [salary, setSalary] = useState(0);
  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  const displayJobs = useMemo(() => {
    let result =
      salary === 0
        ? searchResults
        : searchResults.filter((j) => Number(j.salaryMin) >= salary);

    if (sortedBy === "salary_desc")
      return [...result].sort(
        (a, b) => Number(b.salaryMin) - Number(a.salaryMin),
      );
    if (sortedBy === "salary_asc")
      return [...result].sort(
        (a, b) => Number(a.salaryMin) - Number(b.salaryMin),
      );

    return result;
  }, [searchResults, salary, sortedBy]);
  return (
    <div className="flex justify-center items-center pt-10">
      <main className="w-full max-w-290">
        <h1 className="text-3xl font-bold">งานที่คัดสรรมาเพื่อคุณ</h1>
        <p className="max-w-2xl pt-2 text-md text-neutral-500">
          ค้นหางานพาร์ทไทม์คุณภาพที่เหมาะกับไลฟ์สไตล์ของคุณ
          คัดสรรมาอย่างดีสำหรับคนที่อยากได้งานยืดหยุ่นโดยไม่ลดคุณภาพ
        </p>
        <div className="flex items-center shadow-md rounded-2xl bg-white p-2 gap-2 w-full mt-5">
          <div className="flex items-center gap-2 flex-2 px-3">
            <span className="text-gray-400">
              <Icon icon={"mingcute:search-line"} />
            </span>
            <input
              className="outline-none"
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addChip(search)}
              placeholder="ชื่อตำแหน่งหรือคำค้นหา"
            />
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="flex items-center gap-2 flex-1 px-3">
            <span className="text-gray-400">
              <Icon icon={"mingcute:location-line"} />
            </span>
            <input
              type="text"
              placeholder="City or remote"
              className="w-full outline-none text-sm text-gray-600"
            />
          </div>
          <Button onClick={() => addChip(search)}>ค้นหางาน</Button>
        </div>{" "}
        <div className="flex gap-2 overflow-x-auto pb-1 mt-4 scrollbar-hide">
          {searchChips.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-2">
              {searchChips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {chip}
                  <button onClick={() => removeChip(chip)}>
                    <Icon icon="mingcute:close-line" className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-cols-[0.5fr_2fr] gap-5 pt-10">
          <div className="w-full ">
            <div className="flex justify-between bg-neutral">
              <p className="font-bold">ฟิลเตอร์</p>
              <p
                className="text-primary cursor-pointer"
                onClick={() => setSalary(0)}
              >
                Clear all
              </p>
            </div>
            {/* Salary range slider */}
            <div className="bg-neutral-200/50 p-5 rounded-2xl mt-5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="default-range"
                  className="block mb-2.5 text-sm font-bold text-heading"
                >
                  อัตราค่าจ้าง
                </label>
                <span>{salary} บาท</span>
              </div>
              <input
                onChange={(e) => setSalary(Number(e.target.value))}
                id="default-range"
                min={0}
                step={50}
                max={600}
                value={salary}
                type="range"
                className="w-full h-2 bg-neutral-quaternary rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm">100/ชม.</span>
                <span className="text-sm">600/ชม.</span>
              </div>
            </div>
            {/* JOB TYPE */}
            <div className="mt-10">
              {" "}
              <span className="font-bold">ลักษณะงาน</span>
              <ul className="mt-2 ">
                {[
                  "เต็มเวลา",
                  "สัญญาจ้าง",
                  "พาร์ทไทม์",
                  "วันหยุดเท่านั้น",
                  "ฟรีแลนซ์",
                ].map((label) => (
                  <li key={label}>
                    <label className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition">
                      <input
                        className="w-4 h-4 accent-blue-600"
                        type="checkbox"
                        name=""
                        id=""
                      />
                      <span className="text-sm text-zinc-700">{label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2 mt-5">
              <p className="text-sm text-zinc-700 font-bold">วันที่เปิดรับ</p>
              <select className="w-full p-2.5 rounded-lg bg-neutral-200/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">ทั้งหมด</option>
                <option value="today">วันนี้</option>
                <option value="3days">3 วันที่ผ่านมา</option>
                <option value="7days">7 วันที่ผ่านมา</option>
                <option value="14days">14 วันที่ผ่านมา</option>
                <option value="30days">30 วันที่ผ่านมา</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full px-5">
            <div className="w-full flex justify-between">
              <span>{displayJobs.length} งานที่แสดง</span>
              <span>
                เรียงตาม:{" "}
                <select className="outline-none text-sm ml-1 bg-transparent">
                  <option value="newest">ล่าสุด</option>
                  <option value="salary_desc">เงินเดือนสูง-ต่ำ</option>
                  <option value="salary_asc">เงินเดือนต่ำ-สูง</option>
                </select>
              </span>
            </div>
            <div>
              {isLoading ? (
                <JobListSkeleton />
              ) : (
                displayJobs.map((j) => {
                  return (
                    <JobList jobs={j} keywords={selectedTags} key={j.id} />
                  );
                })
              )}
            </div>
            <div className="flex gap-2 justify-center mt-5">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
                ก่อนหน้า
              </button>
              <span>
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                ถัดไป
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
