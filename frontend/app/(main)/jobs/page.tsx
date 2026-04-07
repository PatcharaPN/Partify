"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchJobs } from "@/app/store/slices/jobSlice";
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";

export default function JobList() {
  const dispatch = useAppDispatch();
  const [sortedBy, setSortedBy] = useState("newest");
  const [salary, setSalary] = useState(0);

  const { jobs, isLoading, error } = useAppSelector(
    (state) => state.jobReducer,
  );
  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  const filteredJob = useMemo(() => {
    let result =
      salary === 0 ? jobs : jobs.filter((j) => Number(j.salary) >= salary);

    if (sortedBy === "salary_desc")
      return [...result].sort((a, b) => Number(b.salary) - Number(a.salary));

    if (sortedBy === "salary_asc")
      return [...result].sort((a, b) => Number(a.salary) - Number(b.salary));

    return [...result].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [jobs, salary, sortedBy]);

  return (
    <div className="flex justify-center items-center pt-10">
      <main className="w-full max-w-280">
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
              type="text"
              placeholder="ชื่อตำแหน่งหรือคำค้นหา"
              className="w-full outline-none text-sm text-gray-600"
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
          <button className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-semibold">
            Search Jobs
          </button>
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
          <div className="flex flex-col gap-5 w-full p-5">
            <div className="w-full flex justify-between">
              <span>{filteredJob.length} งานที่แสดง</span>
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
              {filteredJob.map((j) => (
                <div
                  key={j.id}
                  className="bg-white py-5 mb-5 px-6 grid grid-cols-[1.5fr_7fr_2fr] rounded-2xl shadow w-full border border-neutral-400/10 items-center"
                >
                  {/* Logo */}
                  <div className="flex items-center justify-center">
                    <img
                      src={j.companyImageURL ?? ""}
                      className="w-16 h-16 rounded-xl object-cover border border-neutral-200"
                      alt={j.companyName ?? ""}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-lg">{j.title}</p>
                    <div className="flex items-center gap-4 text-sm text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Icon icon="mingcute:building-2-line" />
                        {j.companyName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon icon="mingcute:location-line" />
                        {j.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon icon="mingcute:time-line" />
                        {j.workingHours}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
                      {j.description}
                    </p>
                  </div>

                  {/* Salary + Apply */}
                  <div className="border-l border-neutral-100 flex flex-col items-end gap-3">
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">
                        {j.salary} บ./ชม.
                      </p>
                      <p className="text-xs text-neutral-400">
                        {j.workingDays}
                      </p>
                    </div>
                    <button className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
                      สมัครเลย
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
