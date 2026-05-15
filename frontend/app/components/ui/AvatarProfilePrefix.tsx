import React from "react";

type AvatarProfilePrefixProps = {
  firstName: string;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: { container: "w-9 h-9", text: "text-sm" },
  md: { container: "w-16 h-16", text: "text-xl" },
  lg: { container: "w-20 h-20", text: "text-2xl" },
};
const getAvatarColor = (name: string) => {
  const colors = [
    "bg-blue-500",
    "bg-violet-500",
    "bg-pink-500",
    "bg-emerald-500",
    "bg-orange-500",
    "bg-cyan-500",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const AvatarProfilePrefix = ({
  firstName,
  size = "sm",
}: AvatarProfilePrefixProps) => {
  const displayPrefix = firstName.charAt(0).toUpperCase();
  const colorClass = getAvatarColor(firstName);
  const { container, text } = sizeMap[size];
  return (
    <div
      className={`${colorClass} ${container} ${text} w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold`}
    >
      {displayPrefix}
    </div>
  );
};
export default AvatarProfilePrefix;
