"use client";

import { ImageSlot } from "@/app/types/job.type";
import { Icon } from "@iconify/react";

type JobImageUploadProps = {
  value: ImageSlot[];
  onChange: (slots: ImageSlot[]) => void;
  maxImages?: number;
};

const JobImageUpload = ({ value, maxImages = 3 }: JobImageUploadProps) => {
  const slots = Array.from({ length: maxImages });

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
        รูปสถานที่ทำงาน
      </label>
      <input type="file" accept="image/*" multiple className="hidden" />
      <div className="grid grid-cols-3 gap-2">
        {slots.map((_, i) => {
          const slot = value[i];
          const isEmpty = !slot;
          const isFirst = i === 0;

          if (!isEmpty) {
            return (
              <div
                key={i}
                draggable
                className={`relative rounded-xl overflow-hidden cursor-grab active:cursor-grabbing transition-all ${
                  isFirst ? "row-span-1" : ""
                }`}
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={slot.preview}
                  alt={`รูปที่ ${i + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />

                {/* overlay on hover */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all group flex items-center justify-center">
                  <button
                    type="button"
                    className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow"
                  >
                    <Icon
                      icon="material-symbols:upload"
                      width="24"
                      height="24"
                    />
                  </button>
                </div>

                {/* position badge */}
                <div className="absolute top-2 left-2 text-[10px] font-semibold px-1.5 py-0.5 bg-black/40 text-white rounded-md backdrop-blur-sm">
                  {i === 0 ? "หลัก" : `${i + 1}`}
                </div>
              </div>
            );
          }

          // empty slot
          return (
            <button
              key={i}
              type="button"
              disabled={value.length >= maxImages}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed transition-all  disabled:opacity-30 disabled:cursor-not-allowed`}
              style={{ aspectRatio: "4/3" }}
            >
              <Icon
                icon="material-symbols:image-outline-rounded"
                width="24"
                height="24"
              />
              <span className="text-[11px] text-neutral-300 font-medium">
                {i === 0 ? "รูปหลัก" : `รูป ${i + 1}`}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-neutral-300">
          ลากเพื่อเรียงลำดับ · รองรับ JPG, PNG, WEBP
        </p>
        <p className="text-[11px] text-neutral-400">
          {value.length}/{maxImages} รูป
        </p>
      </div>
    </div>
  );
};

export default JobImageUpload;
