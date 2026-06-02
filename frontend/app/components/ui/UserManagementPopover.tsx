import { Icon } from "@iconify/react";
import { label } from "framer-motion/client";
import React from "react";

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
    <div className="absolute z-50 rounded-lg w-40 top-6 right-6 bg-white shadow">
      {items.map((i) => (
        <button
          key={i.label}
          className={`flex p-5 gap-2 w-full text-sm py-2 items-center  hover:bg-black/20 ${i.danger ? "text-red-300" : "text-black"}`}
          onClick={i.onClick}
        >
          <Icon icon={i.icon} />
          <span>{i.label}</span>
        </button>
      ))}
    </div>
  );
};

export default UserManagementPopover;
