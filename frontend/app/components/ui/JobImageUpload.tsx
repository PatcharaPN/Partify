"use client";

import { useUploadImage } from "@/app/hooks/useUploadImage";
import { ImageSlot } from "@/app/types/job.type";
import { Icon } from "@iconify/react";
import { useRef } from "react";

type JobImageUploadProps = {
  value: ImageSlot[];
  onChange: (slots: ImageSlot[]) => void;
  maxImages?: number;
};

const JobImageUpload = ({
  value,
  onChange,
  maxImages = 3,
}: JobImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const slots = Array.from({ length: maxImages });
  const { uploadImage } = useUploadImage();
  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    const canAdd = 3 - value.length;
    if (canAdd <= 0) return;

    const selected = Array.from(files).slice(0, canAdd);

    const previews: ImageSlot[] = selected.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    onChange([...value, ...previews]);

    const uploaded = await Promise.all(
      selected.map(async (file) => {
        const url = await uploadImage(file);
        return { file, preview: url };
      }),
    );
    onChange([...value, ...uploaded]);
  };

  const removeSlot = (i: number) => {
    onChange(value.filter((_, idx) => idx !== i));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-medium tracking-widest text-neutral-400 uppercase">
        รูปสถานที่ทำงาน
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div className="grid grid-cols-3 gap-2">
        {slots.map((_, i) => {
          const slot = value[i];

          if (slot) {
            return (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden cursor-grab active:cursor-grabbing"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={slot.preview}
                  alt={`รูปที่ ${i + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />

                <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all group flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeSlot(i)} // ← ลบรูปได้
                    className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow"
                  >
                    <Icon icon="mdi:close" width="16" height="16" />
                  </button>
                </div>

                <div className="absolute top-2 left-2 text-[10px] font-semibold px-1.5 py-0.5 bg-black/40 text-white rounded-md backdrop-blur-sm">
                  {i === 0 ? "หลัก" : `${i + 1}`}
                </div>
              </div>
            );
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() => inputRef.current?.click()} // ← trigger input
              disabled={value.length >= maxImages}
              className="flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed transition-all disabled:opacity-30 disabled:cursor-not-allowed"
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
