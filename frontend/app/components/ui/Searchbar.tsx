import { Icon } from "@iconify/react";

type SearchInputProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  return (
    <div className="flex items-center gap-2  rounded-xl px-3 ">
      <div className="flex items-center gap-2 border border-gray-100 rounded-2xl px-4 py-3 bg-white">
        <Icon icon="mdi:magnify" />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? "ค้นหางาน, บริษัท, หรือสถานที่..."}
          className="w-full outline-none"
        />
      </div>
    </div>
  );
};

export default SearchInput;
