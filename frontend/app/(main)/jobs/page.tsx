"use client";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function JobList() {
  const [salary, setSalary] = useState(0);
  return (
    <div className="flex justify-center items-center pt-10">
      <main className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold">Curated Opportunities</h1>
        <p className="max-w-2xl pt-2 text-md text-neutral-500">
          Discover premium part-time roles that fit your lifestyle, hand-picked
          for professionals who value flexibility without compromising
          excellence.
        </p>

        <div className="flex items-center shadow-md rounded-2xl bg-white p-2 gap-2 w-full mt-5">
          <div className="flex items-center gap-2 flex-2 px-3">
            <span className="text-gray-400">
              <Icon icon={"mingcute:search-line"} />
            </span>
            <input
              type="text"
              placeholder="Job title or keyword"
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
              <p className="text-primary">Clear all</p>
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
                defaultValue={0}
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
                ].map((label, i) => (
                  <li key={i}>
                    <label className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition">
                      {" "}
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
          <div className=""></div>
        </div>
      </main>
    </div>
  );
}
