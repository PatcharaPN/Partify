import Link from "next/link";

const footerSections = [
  {
    title: "บริษัท",
    links: [
      { label: "เกี่ยวกับเรา", href: "/about" },
      { label: "ร่วมงานกับเรา", href: "/careers" },
      { label: "บทความ", href: "/blogs" },
      { label: "ติดต่อเรา", href: "/contact" },
    ],
  },
  {
    title: "แหล่งข้อมูล",
    links: [
      { label: "ค้นหางาน", href: "/jobs" },
      { label: "เคล็ดลับการทำงาน", href: "/tips" },
      { label: "คู่มือการจ้างงาน", href: "/hiring-guide" },
    ],
  },
  {
    title: "ข้อกฎหมาย",
    links: [
      { label: "นโยบายความเป็นส่วนตัว", href: "/privacy" },
      { label: "ข้อกำหนดการใช้งาน", href: "/terms" },
      { label: "นโยบายคุกกี้", href: "/cookies" },
    ],
  },
];
export default function Footer() {
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full max-w-350 mx-auto px-2 py-20 gap-5">
        {footerSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-lg font-bold mb-10">{section.title}</h3>

            <ul className="text-neutral-500 gap-5 flex flex-col">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-black transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="w-full max-w-350 h-[0.1] bg-neutral-400 mb-10"></div>

      <div className="flex justify-start items-start w-full max-w-350 gap-20">
        <p className="mb-10">© 2026 Partify. ผู้คัดสรรงานพาร์ทไทม์คุณภาพ</p>
      </div>
    </div>
  );
}
