import { Icon } from "@iconify/react";
import React from "react";

type AvailabilitySectionProps = {
  availability: string[];

  toggleDay: (day: string) => void;
};
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const AvailabilitySection = ({
  availability,
  toggleDay,
}: AvailabilitySectionProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-semibold text-gray-900 text-base">
          Weekly Availability
        </h2>
        <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest border border-blue-200 bg-blue-50 px-2 py-0.5 rounded-full">
          Part-Time Preferred
        </span>
      </div>
      <p className="text-xs text-gray-400 mb-5">
        When are you typically available for assignments?
      </p>

      <div className="flex justify-between mb-5">
        {DAYS.map((day, i) => (
          <div key={day} className="flex flex-col items-center gap-1.5">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              {day}
            </span>
            <button
              onClick={() => toggleDay(day)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
                availability.includes(day)
                  ? "bg-[#2563EB] text-white shadow-blue-200"
                  : "bg-gray-100 text-gray-300 hover:bg-gray-200"
              }`}
            >
              {availability.includes(day) ? (
                <Icon icon="mdi:check" className="text-base" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-gray-300" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailabilitySection;
