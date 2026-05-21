import { Icon } from "@iconify/react";

function TabButton({
  active,
  onClick,
  icon,
  label,
  count,
  countColor,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  count: number;
  countColor: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? "bg-white text-gray-900 shadow-sm"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      <Icon icon={icon} width="16" />
      {label}
      {count > 0 && (
        <span
          className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${countColor}`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
export default TabButton;
