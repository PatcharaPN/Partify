import { Icon } from "@iconify/react";
import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

const SearchInput = ({ value, onChange, placeholder }: Props) => {
  return (
    <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 w-52">
      <Icon icon="mdi:magnify" className="w-3.5 h-3.5 text-gray-400 shrink-0" />
      <input
        type="text"
        placeholder={`${placeholder ? placeholder : "Search..."}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
      />
    </div>
  );
};

export default SearchInput;
