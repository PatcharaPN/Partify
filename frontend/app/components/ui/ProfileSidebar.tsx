"use client";

import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import { getRoleLabel } from "@/app/helpers/getRoleLabel";
import AvatarProfilePrefix from "./AvatarProfilePrefix";
import { useUploadImage } from "@/app/hooks/useUploadImage";
import { useAppDispatch } from "@/app/lib/hooks";
import { upsertProfile } from "@/app/store/slices/profileSlice";
import { fetchCurrentUser } from "@/app/store/slices/authSlice";
import { useState } from "react";

const SIDEBAR_ELEMENTS = [
  {
    name: "ประวัติส่วนตัว",
    path: "/profile/info",
    icon: "mdi:account-outline",
    role: ["ADMIN", "CANDIDATE", "EMPLOYER"],
  },
  {
    name: "บริษัท",
    path: "/profile/company",
    icon: "mdi:office-building-outline",
    role: ["ADMIN", "EMPLOYER"],
  },
  {
    name: "เรซูเม่",
    path: "/profile/resume",
    icon: "mdi:file-document-outline",
    role: ["ADMIN", "CANDIDATE", "EMPLOYER"],
  },
  {
    name: "ประสบการณ์ทำงานและทักษะ",
    path: "/profile/experience",
    icon: "mdi:briefcase-outline",
    role: ["ADMIN", "CANDIDATE", "EMPLOYER"],
  },
];

export default function ProfileSidebar() {
  const dispatch = useAppDispatch();
  const { currentUser } = useCurrentUser();
  const pathname = usePathname();
  const router = useRouter();
  const visibleElements = SIDEBAR_ELEMENTS.filter((elements) =>
    elements.role.includes(currentUser?.role ?? ""),
  );
  const { uploadImage, isLoading } = useUploadImage();
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      if (!url) return;
      await dispatch(upsertProfile({ avatarUrl: url })).unwrap();
      await dispatch(fetchCurrentUser()).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col gap-6 w-64 p-5">
      <div className=" flex flex-col gap-2">
        <div className="relative w-16 h-16 group">
          <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
            {currentUser?.profile?.avatarUrl ? (
              <img
                src={currentUser.profile.avatarUrl}
                className="w-full h-full object-cover"
              />
            ) : (
              <AvatarProfilePrefix
                size="lg"
                firstName={currentUser?.profile?.firstName ?? "?"}
              />
            )}
          </div>
          <label className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            {isLoading ? (
              <Icon
                icon="line-md:loading-twotone-loop"
                className="text-white text-lg"
              />
            ) : (
              <Icon icon="mdi:camera-outline" className="text-white text-lg" />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUploadImage}
            />
          </label>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            {currentUser?.profile?.firstName} {currentUser?.profile?.lastName}
          </p>
          <p className="text-xs text-gray-400">
            {getRoleLabel(currentUser?.role)}
          </p>
        </div>
      </div>

      <div className="h-px bg-gray-100 w-full" />

      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-medium uppercase tracking-widest text-gray-400 px-2.5">
          บัญชี
        </span>
        <ul className="flex flex-col gap-0.5">
          {visibleElements.map((item) => {
            const active = pathname === item.path;

            return (
              <li
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer text-sm transition-all border
                  ${
                    active
                      ? "bg-gray-100 text-gray-900 font-medium border-gray-200"
                      : "text-gray-500 border-transparent hover:bg-gray-50 hover:text-gray-800"
                  }`}
              >
                <Icon
                  icon={item.icon}
                  className={`text-lg shrink-0 ${active ? "text-blue-500" : ""}`}
                />
                <span>{item.name}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
