import { Icon } from "@iconify/react";
import Link from "next/link";
import Button from "../components/ui/Button";
import CountUp from "../components/ui/CountUp";

export default function Home() {
  const categories = [
    {
      title: "สายครีเอทีฟ",
      sub: "ดีไซน์, คอนเทนต์, ตัดต่อวิดีโอ",
      img: "./images/bg/creative.jpg",
    },
    {
      title: "ค้าปลีก",
      sub: "สินค้าแบรนด์เนม, บูติก",
      img: "./images/bg/retail.jpg",
    },
    {
      title: "ขนส่งและเดลิเวอรี่",
      sub: "โลจิสติกส์, ส่งของในเมือง",
      img: "./images/bg/delivery.jpg",
    },
  ];
  return (
    <main className="flex flex-col items-center min-h-[calc(100vh-56px)] px-8">
      <div className="grid grid-cols-2 gap-10 py-50">
        <div className="flex flex-col gap-5">
          <h1 className="text-7xl font-bold">
            <span className="py-4 block">ค้นหางาน</span>
            <span className="text-primary font-bold">
              พาร์ทไทม์
            </span> ที่ใช่ <br />
            สำหรับคุณ
          </h1>
          {/* Filter Box / Location */}
          <div className="flex items-center shadow-xl rounded-2xl bg-white p-5 gap-2 w-full">
            <div className="flex items-center gap-2 flex-1 px-3">
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
                placeholder="เมืองหรือรีโมท"
                className="w-full outline-none text-sm text-gray-600"
              />
            </div>
            <button className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-semibold">
              Search
            </button>
          </div>
          <div className="flex gap-5 pt-5">
            <div>
              <h1 className="text-4xl font-bold">10,000+</h1>
              <p className="text-neutral-400">งานที่เปิดรับ</p>
            </div>
            <div className="w-px h-15 bg-gray-200" />
            <div>
              <h1 className="text-4xl font-bold">ยืนยันแล้ว</h1>
              <p className="text-neutral-400">นายจ้างคุณภาพ</p>
            </div>
          </div>
        </div>
        {/* Working Pic */}
        <div className="relative">
          <img
            src="./images/bg/workingPic.webp"
            className="rounded-4xl w-2xl rotate-4"
            alt="working-part-time-pic"
          />
          <div className="absolute bottom-[-20] shadow-xl bg-white/40 border-2 border-white/40 backdrop-blur-xl rounded-2xl w-70 h-40 p-5">
            <div>
              {" "}
              <div className="flex gap-5">
                <div className="bg-primary w-12 h-12 rounded-full flex justify-center items-center">
                  <Icon
                    width={30}
                    icon={"boxicons:seal-check"}
                    color="#ffffff"
                  />
                </div>
                <div>
                  <p className="text-sm">โปรไฟล์ของคุณตรงกับงานนี้</p>
                  <p className="text-xl font-bold">
                    {" "}
                    <CountUp max={98}></CountUp>% Fit Score
                  </p>
                </div>{" "}
              </div>
            </div>{" "}
            <p className="text-sm text-neutral-700 mt-3">
              ตำแหน่ง Creative Director นี้ตรงกับตารางงาน 20
              ชม./สัปดาห์ที่คุณต้องการ
            </p>
          </div>
        </div>
      </div>
      {/* หมวดหมู่งานที่หาบ่อย */}
      <div className="pt-30 w-full max-w-350">
        <div className="flex w-full justify-between">
          {" "}
          <div className="flex items-start flex-col gap-4">
            <h1 className="text-4xl font-bold">หมวดหมู่งานคัดสรร</h1>
            <p className="w-md text-neutral-600">
              เราไม่ได้แค่ลิสต์งาน
              แต่คัดสรรงานพาร์ทไทม์คุณภาพสูงในหมวดหมู่เหล่านี้
            </p>
          </div>{" "}
          <div className="text-md flex items-end gap-2 ">
            {" "}
            <Link className="text-primary font-bold" href={"/"}>
              ดูทุกหมวดหมู่
            </Link>
            <Icon color="004AC6" icon={"maki:arrow"} />
          </div>
        </div>

        <div className="pt-20 grid grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-64 object-cover brightness-60 group-hover:brightness-90 transition"
              />
              <div className="absolute bottom-0 left-0 p-5 text-white">
                <h2 className="text-2xl font-bold">{cat.title}</h2>
                <p className="text-sm text-gray-300">{cat.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="relative rounded-2xl overflow-hidden cursor-pointer group my-5">
          <img
            src={"./images/bg/education.jpg"}
            alt="Tutoring Language Coaching"
            className="w-full h-64 object-cover brightness-60 group-hover:brightness-90 transition"
          />{" "}
          <div className="absolute bottom-0 left-0 p-5 text-white">
            <h2 className="text-2xl font-bold">การศึกษา</h2>
            <p className="text-sm text-gray-300">
              ติวเตอร์, สอนออนไลน์, สอนภาษา
            </p>
          </div>
        </div>
      </div>
      {/* Explain Process ลูกจ้าง นายจ้าง CTA */}
      <div className="flex flex-col rounded-4xl w-full max-w-350 justify-center items-center bg-primary p-5 h-80">
        <h1 className="text-white font-bold text-5xl w-160 text-center">
          พร้อมหางานที่เหมาะกับคุณแล้วหรือยัง?
        </h1>
        <Button
          variant="custom"
          classname="bg-white text-primary font-extrabold text-xl mt-10 p-4 cursor-pointer hover:bg-gray-200"
        >
          เริ่มต้นฟรี
        </Button>
      </div>
    </main>
  );
}
