import { Icon } from "@iconify/react";

export default function JobList() {
  return (
    <div className="flex justify-center items-center pt-10">
      <main className="w-full max-w-350">
        <h1 className="text-4xl font-bold">Curated Opportunities</h1>
        <p className="w-166 pt-2 text-md text-neutral-500">
          Discover premium part-time roles that fit your lifestyle, hand-picked
          for professionals who value flexibility without compromising
          excellence.
        </p>

        <div className="flex items-center shadow-md rounded-2xl bg-white p-5 gap-2 w-full mt-5">
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
      </main>
    </div>
  );
}
