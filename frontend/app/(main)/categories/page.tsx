import Link from "next/link";

const CategoryPage = () => {
  const categories = [
    {
      title: "สายครีเอทีฟ",
      sub: "ดีไซน์, คอนเทนต์, ตัดต่อวิดีโอ",
      img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      chip: "creative",
    },
    {
      title: "ค้าปลีก",
      sub: "สินค้าแบรนด์เนม, บูติก",
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      chip: "retail",
    },
    {
      title: "ขนส่งและเดลิเวอรี่",
      sub: "โลจิสติกส์, ส่งของในเมือง",
      img: "./images/bg/delivery.jpg",
      chip: "delivery",
    },
    {
      title: "ร้านอาหารและเครื่องดื่ม",
      sub: "เชฟ, บาริสต้า, พนักงานเสิร์ฟ",
      img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      chip: "food",
    },
    {
      title: "ไอทีและซอฟต์แวร์",
      sub: "Dev, DevOps, Data Engineer",
      img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
      chip: "it",
    },
    {
      title: "การตลาดและโฆษณา",
      sub: "SEO, Social Media, Ads",
      img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
      chip: "marketing",
    },
    {
      title: "การศึกษาและติวเตอร์",
      sub: "สอนพิเศษ, คอร์สออนไลน์",
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      chip: "education",
    },
    {
      title: "บิวตี้และสปา",
      sub: "ช่างแต่งหน้า, นวด, ทำเล็บ",
      img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
      chip: "beauty",
    },
    {
      title: "ก่อสร้างและช่างฝีมือ",
      sub: "ช่างไฟ, ช่างประปา, ก่อสร้าง",
      img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      chip: "construction",
    },
    {
      title: "การเงินและบัญชี",
      sub: "นักบัญชี, วิเคราะห์การเงิน",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
      chip: "finance",
    },
    {
      title: "สุขภาพและการแพทย์",
      sub: "พยาบาล, ผู้ช่วยแพทย์, ดูแลผู้สูงอายุ",
      img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
      chip: "health",
    },
    {
      title: "โรงแรมและที่พัก",
      sub: "แผนกต้อนรับ, แม่บ้าน, จัดการโรงแรม",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      chip: "hotel",
    },
    {
      title: "คลังสินค้าและโรงงาน",
      sub: "พนักงานไลน์ผลิต, คลังสินค้า",
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      chip: "warehouse",
    },
    {
      title: "กีฬาและฟิตเนส",
      sub: "เทรนเนอร์, โค้ช, อาจารย์โยคะ",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      chip: "fitness",
    },
    {
      title: "อีเวนต์และบันเทิง",
      sub: "MC, ช่างภาพ, จัดงาน",
      img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
      chip: "event",
    },
    {
      title: "ดูแลเด็กและผู้สูงอายุ",
      sub: "พี่เลี้ยงเด็ก, ดูแลผู้ป่วย",
      img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80",
      chip: "care",
    },
    {
      title: "กฎหมายและที่ปรึกษา",
      sub: "ทนายความ, ที่ปรึกษากฎหมาย",
      img: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&q=80",
      chip: "legal",
    },
    {
      title: "เกษตรกรรมและสิ่งแวดล้อม",
      sub: "เกษตรกร, ภูมิทัศน์, รีไซเคิล",
      img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80",
      chip: "agriculture",
    },
    {
      title: "ยานยนต์และซ่อมบำรุง",
      sub: "ช่างรถ, ตรวจสภาพ, ล้างรถ",
      img: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80",
      chip: "automotive",
    },
    {
      title: "ท่องเที่ยวและไกด์",
      sub: "ไกด์นำเที่ยว, วางแผนทริป",
      img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
      chip: "travel",
    },
  ];
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto gap-8 px-6 py-10">
      <h1 className="text-4xl font-bold">หมวดหมู่งานทั้งหมด</h1>

      <div className="grid  grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.chip}
            href={{ pathname: "/jobs", query: { category: cat.chip } }}
          >
            <div className="relative w-full rounded-2xl overflow-hidden cursor-pointer group">
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-52 object-cover brightness-60 group-hover:brightness-90 transition duration-300"
              />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h2 className="text-xl font-bold leading-tight">{cat.title}</h2>
                <p className="text-xs text-gray-300 mt-1">{cat.sub}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
