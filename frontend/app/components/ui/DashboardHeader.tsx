type DashboardHeaderProps = {
  title: string;
  name: string | undefined;
};

const DashboardHeader = ({ name, title }: DashboardHeaderProps) => {
  return (
    <>
      <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="relative z-0">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            ยินดีต้อนรับกลับ {name} นี่คือภาพรวมของประกาศงานที่คุณจัดการอยู่
          </p>
        </div>
        <div className="flex items-center gap-3"></div>
      </header>{" "}
    </>
  );
};

export default DashboardHeader;
