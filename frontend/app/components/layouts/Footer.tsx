export default function Footer() {
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="grid grid-cols-4 w-full max-w-350 mx-auto px-2 py-20 gap-5">
        <div>
          <h3 className="text-lg font-bold mb-10">Partify</h3>
          <p className="w-72 text-neutral-500">
            ผู้คัดสรรงานพาร์ทไทม์คุณภาพ
            เพราะเราเชื่อว่างานที่ดีไม่ควรถูกจำกัดด้วยจำนวนชั่วโมงการทำงาน
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-10">บริษัท</h3>
          <ul className="text-neutral-500 gap-5 flex flex-col">
            <li>เกี่ยวกับเรา</li>
            <li>ร่วมงานกับเรา</li>
            <li>บทความ</li>
            <li>ติดต่อเรา</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-10">แหล่งข้อมูล</h3>
          <ul className="text-neutral-500 gap-5 flex flex-col">
            <li>ค้นหางาน</li>
            <li>เคล็ดลับการทำงาน</li>
            <li>คู่มือการจ้างงาน</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-10">ข้อกฎหมาย</h3>
          <ul className="text-neutral-500 gap-5 flex flex-col">
            <li>นโยบายความเป็นส่วนตัว</li>
            <li>ข้อกำหนดการใช้งาน</li>
            <li>นโยบายคุกกี้</li>
          </ul>
        </div>
      </div>

      <div className="w-full max-w-350 h-[0.1] bg-neutral-400 mb-10"></div>

      <div className="flex justify-start items-start w-full max-w-350 gap-20">
        <p className="mb-10">© 2026 Partify. ผู้คัดสรรงานพาร์ทไทม์คุณภาพ</p>
      </div>
    </div>
  );
}
