import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

type popOverType = {
  label: string;
  icon: string;
  danger?: boolean;
  onClick: () => void;
};

type popOverProps = {
  items: popOverType[];
};

const UserManagementPopover = ({ items }: popOverProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute right-5 top-5 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-50"
    >
      {items.map((i) => (
        <button
          key={i.label}
          className={`flex p-2 gap-2 py-2 w-full text-sm items-center hover:bg-black/10 rounded-lg ${i.danger ? "text-red-300" : "text-black"}`}
          onClick={i.onClick}
        >
          <Icon icon={i.icon} />
          <span>{i.label}</span>
        </button>
      ))}
    </motion.div>
  );
};

export default UserManagementPopover;
