"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { searchJob } from "@/app/store/slices/jobSlice";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useSearch = (
  category?: string | null,
  initialSearch?: string | null,
  jobType?: string[],
) => {
  const dispatch = useAppDispatch();

  const categoryMap: Record<string, string[]> = {
    creative: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Figma",
      "Canva",
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "DaVinci Resolve",
      "Typography",
      "Branding",
      "Motion Graphics",
      "Video Editing",
      "Photography",
      "Videography",
      "Layout Design",
      "Logo Design",
    ],
    retail: [
      "การขาย",
      "การบริการลูกค้า",
      "การจัดการเงินสด",
      "ระบบ POS",
      "การเพิ่มยอดขาย",
      "การจัดการสินค้าคงคลัง",
      "ความรู้เกี่ยวกับสินค้า",
      "การปิดการขาย",
      "การสื่อสาร",
    ],
    delivery: [
      "การขับรถ",
      "การวางแผนเส้นทาง",
      "การนำทาง",
      "การบริหารเวลา",
      "การดูแลรักษายานพาหนะ",
      "การบริการลูกค้า",
    ],
    food: [
      "การทำอาหาร",
      "การเตรียมอาหาร",
      "ความปลอดภัยด้านอาหาร",
      "การชงกาแฟ",
      "ลาเต้อาร์ต",
      "การผสมเครื่องดื่ม",
      "การบริการอาหาร",
      "การรับออเดอร์",
      "ระบบ POS",
      "การวางแผนเมนู",
      "การควบคุมต้นทุน",
      "ทักษะการใช้มีด",
    ],
    it: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "Python",
      "SQL",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Kubernetes",
      "Git",
      "REST API",
      "CI/CD",
      "AWS",
      "Linux",
      "System Design",
      "Manual Testing",
      "Automation Testing",
      "Tailwind CSS",
    ],
    marketing: [
      "SEO Strategy",
      "Google Ads",
      "Facebook Ads",
      "TikTok",
      "Content Strategy",
      "Email Marketing",
      "Google Analytics 4",
      "Keyword Research",
      "Copywriting",
      "Social Media",
      "Community Management",
      "Analytics",
      "Backlink Building",
    ],
    education: [
      "การสอน",
      "การวางแผนบทเรียน",
      "การบริหารจัดการชั้นเรียน",
      "การนำเสนอ",
      "ความอดทน",
      "ความรู้ในวิชา",
      "การสื่อสาร",
    ],
    beauty: [
      "การแต่งหน้า",
      "การทำเล็บ",
      "การนวด",
      "การดูแลผิว",
      "การบริการลูกค้า",
      "การสื่อสาร",
    ],
    construction: [
      "AutoCAD",
      "การก่อสร้าง",
      "Site Inspection",
      "Structural Analysis",
      "Technical Drawing",
      "การซ่อมบำรุง",
      "เครื่องมือช่าง",
      "ไฟฟ้าเบื้องต้น",
      "การบำรุงรักษา",
    ],
    finance: [
      "การทำบัญชี",
      "Microsoft Excel",
      "การรายงานทางการเงิน",
      "การยื่นภาษี",
      "การจัดทำงบประมาณ",
      "Financial Modeling",
      "งบการเงิน",
      "การพยากรณ์",
      "Valuation",
      "QuickBooks",
    ],
    health: [
      "การดูแลผู้ป่วย",
      "Medical Records",
      "Medication Administration",
      "การเฝ้าระวังอาการ",
      "Medication Knowledge",
      "การกายภาพบำบัด",
      "Patient Care",
      "First Aid",
      "Anatomy Knowledge",
    ],
    hotel: [
      "การบริการลูกค้า",
      "การรับสาย",
      "การจัดตารางเวลา",
      "งานธุรการ",
      "Microsoft Office",
      "การสื่อสาร",
      "การบริหารร้าน",
      "การจัดการพนักงาน",
    ],
    warehouse: [
      "การผลิต",
      "การควบคุมคุณภาพ",
      "การใช้เครื่องจักร",
      "การจัดการคลังสินค้า",
      "Inventory Management",
      "Supply Chain",
      "ERP System",
      "การปฏิบัติตามมาตรฐาน",
    ],
    fitness: [
      "การฝึกสอน",
      "การออกแบบโปรแกรมออกกำลังกาย",
      "Nutrition Knowledge",
      "First Aid",
      "การสื่อสาร",
      "การบริการลูกค้า",
      "Exercise Prescription",
    ],
    event: [
      "การประสานงาน",
      "การบริการลูกค้า",
      "การติดตั้งจัดเตรียม",
      "Crowd Management",
      "การแก้ไขปัญหา",
      "Photography",
      "Videography",
      "การสื่อสาร",
    ],
    care: [
      "การดูแลผู้ป่วย",
      "การสื่อสาร",
      "ความอดทน",
      "First Aid",
      "Patient Care",
      "การเฝ้าระวังอาการ",
    ],
    legal: [
      "กฎหมายแรงงาน",
      "การจัดการเอกสาร",
      "การสื่อสาร",
      "การวิจัย",
      "กฎหมายอสังหาฯ",
      "การเจรจา",
    ],
    agriculture: [
      "การเกษตร",
      "การจัดการดิน",
      "การชลประทาน",
      "การดูแลพืช",
      "การจัดการสิ่งแวดล้อม",
      "การบำรุงรักษา",
    ],
    automotive: [
      "การซ่อมรถ",
      "การตรวจสภาพรถ",
      "เครื่องมือช่าง",
      "ความรู้เกี่ยวกับเครื่องยนต์",
      "การดูแลรักษายานพาหนะ",
      "การแก้ไขปัญหา",
    ],
    travel: [
      "การบริการลูกค้า",
      "การสื่อสาร",
      "ความรู้ด้านท่องเที่ยว",
      "การวางแผนทริป",
      "ภาษาต่างประเทศ",
      "การประสานงาน",
      "การนำทาง",
    ],
  };

  const mappedCategory = category ? categoryMap[category] || [] : [];
  const { searchResults, isLoading, total, totalPages, currentPage } =
    useAppSelector((state) => state.jobReducer);

  const [searchChips, setSearchChips] = useState<string[]>(mappedCategory);

  const [search, setSearch] = useState(initialSearch ?? "");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(
      searchJob({
        search: debouncedSearch,
        skills: [...selectedTags, ...searchChips],
        page,
        jobType,
      }),
    );
  }, [debouncedSearch, selectedTags, searchChips, page, jobType]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const addChip = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) return;

    setSearchChips((prev) => {
      if (prev.includes(trimmed)) return prev;

      return [...prev, trimmed];
    });

    handleSearch("");
    setPage(1);
  };

  const removeChip = (chip: string) => {
    setSearchChips((prev) => prev.filter((c) => c !== chip));
    setPage(1);
  };

  return {
    search,
    handleSearch,
    selectedTags,
    toggleTag,
    page,
    setPage,
    searchResults,
    isLoading,
    total,
    totalPages,
    currentPage,
    searchChips,
    addChip,
    removeChip,
  };
};
