const TableHeader = () => {
  return (
    <div className="grid grid-cols-[2.5fr_1fr_1fr_1.2fr_90px] px-6 py-2.5 bg-gray-50/60 border-b border-gray-50">
      {["ตำแหน่งงาน", "สถานะ", "ผู้สมัคร", "วันที่ประกาศ", "การจัดการ"].map(
        (h) => (
          <span
            key={h}
            className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold"
          >
            {h}
          </span>
        ),
      )}
    </div>
  );
};

export default TableHeader;
