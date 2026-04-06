import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Home() {
  const categories = [
    {
      title: "Creative",
      sub: "Design, Copywriting, Video Editing",
      img: "./images/bg/creative.jpg",
    },
    {
      title: "Retail",
      sub: "Luxury Goods, Boutiques",
      img: "./images/bg/retail.jpg",
    },
    {
      title: "Delivery",
      sub: "Logistics, Local Fleet",
      img: "./images/bg/delivery.jpg",
    },
  ];
  return (
    <main className="flex flex-col items-center min-h-[calc(100vh-56px)] px-8">
      <div className="grid grid-cols-2 gap-10 py-50">
        <div className="flex flex-col gap-5">
          <h1 className="text-7xl font-bold">
            <span className="py-4 block">Find the best</span>
            <span className="text-primary font-bold">part-time</span> jobs{" "}
            <br />
            for your lifestyle
          </h1>
          {/* Filter Box / Location */}
          <div className="flex items-center shadow-xl rounded-2xl bg-white p-5 gap-2 w-full">
            <div className="flex items-center gap-2 flex-1 px-3">
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
              Search
            </button>
          </div>
          <div className="flex gap-5 pt-5">
            <div>
              <h1 className="text-4xl font-bold">10,000+</h1>
              <p className="text-neutral-400">ACTIVE JOBS</p>
            </div>
            <div className="w-px h-15 bg-gray-200" />
            <div>
              <h1 className="text-4xl font-bold">Verified</h1>
              <p className="text-neutral-400">TOP EMPLOYERS</p>
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
                  <p className="text-md"> Profile Match</p>
                  <p className="text-xl font-bold"> 98 % Fit Score</p>
                </div>{" "}
              </div>
            </div>{" "}
            <p className="text-sm text-neutral-700 mt-3">
              This Creative Director role matches your preferred 20h/week
              schedule.
            </p>
          </div>
        </div>
      </div>

      {/* หมวดหมู่งานที่หาบ่อย */}

      <div className="pt-30 w-full max-w-350">
        <div className="flex w-full justify-between">
          {" "}
          <div className="flex items-start flex-col gap-4">
            <h1 className="text-4xl font-bold">Curated Categories</h1>
            <p className="w-md text-neutral-600">
              We don't just list jobs; we curate the highest quality part-time
              opportunities in these key sectors.
            </p>
          </div>{" "}
          <div className="text-md flex items-end gap-2 ">
            {" "}
            <Link className="text-primary font-bold" href={"/"}>
              Browse all categories
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
            <h2 className="text-2xl font-bold">Education</h2>
            <p className="text-sm text-gray-300">
              Tutoring, Online Instruction, Language Coaching
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
