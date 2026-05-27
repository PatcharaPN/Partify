import { Icon } from "@iconify/react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

const SearchInput = ({ value, onChange, placeholder }: Props) => {
  return (
    <div className="flex items-center gap-2 border border-gray-100 rounded-xl px-3 py-2">
      <div className="flex items-center gap-2 border rounded-2xl px-4 py-3 bg-white">
        <Icon icon="mdi:magnify" />

        <input
          placeholder="ค้นหางาน, บริษัท, หรือสถานที่..."
          className="w-full outline-none"
        />
      </div>
    </div>
  );
};

export default SearchInput;
