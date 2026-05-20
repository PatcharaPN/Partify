import { PrismaClient, Role, ApplicationStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// ==================== SKILL MAP ====================
export const EXPERIENCE_SKILL_MAP: Record<string, string[]> = {
  บาริสต้า: [
    'การบริการลูกค้า',
    'การจัดการเงินสด',
    'ระบบ POS',
    'การชงกาแฟ',
    'การเตรียมเอสเปรสโซ',
    'ลาเต้อาร์ต',
    'การจัดการสินค้าคงคลัง',
    'การทำความสะอาด',
  ],
  พนักงานเสิร์ฟ: [
    'การบริการลูกค้า',
    'การรับออเดอร์',
    'ระบบ POS',
    'การจัดการเงินสด',
    'การสื่อสาร',
    'การบริการอาหาร',
    'การทำงานเป็นทีม',
  ],
  แคชเชียร์: [
    'การจัดการเงินสด',
    'ระบบ POS',
    'การบริการลูกค้า',
    'ความใส่ใจในรายละเอียด',
  ],
  พนักงานขาย: [
    'การขาย',
    'การเพิ่มยอดขาย',
    'การบริการลูกค้า',
    'การจัดการเงินสด',
    'ความรู้เกี่ยวกับสินค้า',
  ],
  การป้อนข้อมูล: [
    'การพิมพ์',
    'Microsoft Excel',
    'Google Sheets',
    'ความใส่ใจในรายละเอียด',
  ],
  นักเขียนคอนเทนต์: ['Content Writing', 'SEO', 'Copywriting', 'การเขียนบล็อก'],
  แอดมินโซเชียลมีเดีย: [
    'Social Media',
    'Content Strategy',
    'Instagram',
    'TikTok',
    'Facebook Ads',
  ],
  นักออกแบบกราฟิก: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'Figma'],
  'Frontend Developer': [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'React',
    'Tailwind CSS',
  ],
  'Backend Developer': [
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'REST API',
    'Docker',
  ],
  'Fullstack Developer': [
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'PostgreSQL',
    'Docker',
  ],
  'Software Engineer': ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Git'],
  Delivery: ['การขับรถ', 'การนำทาง', 'การบริการลูกค้า'],
};

// ฟังก์ชันสุ่ม Skills
function getRandomSkills(jobTitle: string): string[] {
  const titleLower = jobTitle.toLowerCase();

  for (const [key, skills] of Object.entries(EXPERIENCE_SKILL_MAP)) {
    if (titleLower.includes(key.toLowerCase())) {
      const count = Math.floor(Math.random() * 5) + 5; // 5-9 ทักษะ
      return [...skills].sort(() => 0.5 - Math.random()).slice(0, count);
    }
  }

  return [
    'การสื่อสาร',
    'การทำงานเป็นทีม',
    'ความรับผิดชอบ',
    'เรียนรู้เร็ว',
    'การบริการลูกค้า',
  ];
}

// ==================== MAIN ====================
async function main() {
  console.log('🌱 Seeding database...');

  // ── Clean up ──────────────────────────────────────────────
  await prisma.notification.deleteMany();
  await prisma.application.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.resume.deleteMany();
  await prisma.job.deleteMany();
  await prisma.company.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  // ── Users ─────────────────────────────────────────────────
  const admin = await prisma.user.create({
    data: {
      email: 'admin@partify.com',
      password: hashedPassword,
      role: Role.ADMIN,
      profile: {
        create: {
          firstName: 'Admin',
          lastName: 'Partify',
          phone: '090-000-0000',
          avatarUrl: 'https://i.pravatar.cc/150?img=1',
        },
      },
    },
  });

  const employer1 = await prisma.user.create({
    data: {
      email: 'employer1@techcorp.com',
      password: hashedPassword,
      role: Role.EMPLOYER,
      profile: {
        create: {
          firstName: 'สมศักดิ์',
          lastName: 'วงศ์ใหญ่',
          phone: '081-234-5678',
          avatarUrl: 'https://i.pravatar.cc/150?img=2',
        },
      },
    },
  });

  const employer2 = await prisma.user.create({
    data: {
      email: 'employer2@cafebrand.com',
      password: hashedPassword,
      role: Role.EMPLOYER,
      profile: {
        create: {
          firstName: 'วิภา',
          lastName: 'สุขใจ',
          phone: '082-345-6789',
          avatarUrl: 'https://i.pravatar.cc/150?img=3',
        },
      },
    },
  });

  const employer3 = await prisma.user.create({
    data: {
      email: 'hr@retailthai.com',
      password: hashedPassword,
      role: Role.EMPLOYER,
      profile: {
        create: {
          firstName: 'อรุณ',
          lastName: 'ค้าขาย',
          phone: '089-111-2222',
          avatarUrl: 'https://i.pravatar.cc/150?img=7',
        },
      },
    },
  });

  const employer4 = await prisma.user.create({
    data: {
      email: 'recruit@logistics.co.th',
      password: hashedPassword,
      role: Role.EMPLOYER,
      profile: {
        create: {
          firstName: 'วิชัย',
          lastName: 'ขนส่ง',
          phone: '088-222-3333',
          avatarUrl: 'https://i.pravatar.cc/150?img=8',
        },
      },
    },
  });

  const candidate1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      password: hashedPassword,
      role: Role.CANDIDATE,
      profile: {
        create: {
          firstName: 'สมชาย',
          lastName: 'ใจดี',
          phone: '083-456-7890',
          summary: 'นักศึกษาปี 3 สาขาวิทยาการคอมพิวเตอร์',
          province: 'กรุงเทพมหานคร',
          district: 'บางรัก',
          skills: ['JavaScript', 'React', 'Node.js'],
          avatarUrl: 'https://i.pravatar.cc/150?img=4',
        },
      },
    },
  });

  const candidate2 = await prisma.user.create({
    data: {
      email: 'jane@example.com',
      password: hashedPassword,
      role: Role.CANDIDATE,
      profile: {
        create: {
          firstName: 'สุดา',
          lastName: 'รักงาน',
          phone: '084-567-8901',
          summary: 'บัณฑิตใหม่ สาขาบริหารธุรกิจ',
          province: 'กรุงเทพมหานคร',
          district: 'ลาดพร้าว',
          skills: ['การขาย', 'การบริการลูกค้า'],
          avatarUrl: 'https://i.pravatar.cc/150?img=5',
        },
      },
    },
  });

  const candidate3 = await prisma.user.create({
    data: {
      email: 'tom@example.com',
      password: hashedPassword,
      role: Role.CANDIDATE,
      profile: {
        create: {
          firstName: 'ธนกร',
          lastName: 'มีแสง',
          phone: '085-678-9012',
          summary: 'นักศึกษาโท สาขาการตลาด',
          province: 'เชียงใหม่',
          district: 'เมือง',
          skills: ['Photoshop', 'Content Writing'],
          avatarUrl: 'https://i.pravatar.cc/150?img=6',
        },
      },
    },
  });

  // ── Companies ─────────────────────────────────────────────
  const company1 = await prisma.company.create({
    data: {
      companyName: 'TechCorp Thailand',
      userId: employer1.id,
      companyImageURL: 'https://picsum.photos/seed/techcorp/200',
      companyBio: 'บริษัทเทคโนโลยีชั้นนำ',
      companySize: '50-200',
    },
  });

  const company2 = await prisma.company.create({
    data: {
      companyName: 'Café Delight',
      userId: employer2.id,
      companyImageURL: 'https://picsum.photos/seed/cafe/200',
      companyBio: 'ร้านกาแฟ specialty',
      companySize: '10-50',
    },
  });

  const company3 = await prisma.company.create({
    data: {
      companyName: 'BigMart Thailand',
      userId: employer3.id,
      companyImageURL: 'https://picsum.photos/seed/bigmart/200',
      companyBio: 'เครือร้านค้าปลีก',
      companySize: '500+',
    },
  });

  const company4 = await prisma.company.create({
    data: {
      companyName: 'FastMove Logistics',
      userId: employer4.id,
      companyImageURL: 'https://picsum.photos/seed/logistics/200',
      companyBio: 'บริษัทขนส่ง',
      companySize: '200-500',
    },
  });

  // ── Jobs ──────────────────────────────────────────────────
  const jobsData = [
    {
      title: 'Frontend Developer (Part-time)',
      companyId: company1.id,
      category: 'IT',
      salaryMin: 400,
      salaryMax: 600,
      jobType: 'Part-time',
      workStyle: 'Hybrid',
      location: 'สีลม',
    },
    {
      title: 'Backend Developer (Part-time)',
      companyId: company1.id,
      category: 'IT',
      salaryMin: 450,
      salaryMax: 650,
      jobType: 'Part-time',
      workStyle: 'Remote',
      location: 'Remote',
    },
    {
      title: 'Fullstack Developer',
      companyId: company1.id,
      category: 'IT',
      salaryMin: 600,
      salaryMax: 900,
      jobType: 'Freelance',
      workStyle: 'Remote',
      location: 'Remote',
    },
    {
      title: 'บาริสต้า Part-time',
      companyId: company2.id,
      category: 'Food & Beverage',
      salaryMin: 300,
      salaryMax: 350,
      jobType: 'Part-time',
      workStyle: 'On-site',
      location: 'สยาม',
    },
    {
      title: 'พนักงานเสิร์ฟ Part-time',
      companyId: company2.id,
      category: 'Food & Beverage',
      salaryMin: 280,
      salaryMax: 320,
      jobType: 'Part-time',
      workStyle: 'On-site',
      location: 'สยาม',
    },
    {
      title: 'พนักงานขาย Part-time',
      companyId: company3.id,
      category: 'Retail',
      salaryMin: 280,
      salaryMax: 350,
      jobType: 'Part-time',
      workStyle: 'On-site',
      location: 'MBK Center',
    },
    {
      title: 'แคชเชียร์ Part-time',
      companyId: company3.id,
      category: 'Retail',
      salaryMin: 300,
      salaryMax: 360,
      jobType: 'Part-time',
      workStyle: 'On-site',
      location: 'เซ็นทรัลเวิลด์',
    },
    {
      title: 'พนักงานคลังสินค้า Part-time',
      companyId: company4.id,
      category: 'Logistics',
      salaryMin: 300,
      salaryMax: 380,
      jobType: 'Part-time',
      workStyle: 'On-site',
      location: 'บางบัวทอง',
    },
    {
      title: 'Delivery Rider',
      companyId: company4.id,
      category: 'Logistics',
      salaryMin: 400,
      salaryMax: 600,
      jobType: 'Part-time',
      workStyle: 'On-site',
      location: 'กรุงเทพฯ',
    },
    {
      title: 'Social Media Coordinator',
      companyId: company2.id,
      category: 'Marketing',
      salaryMin: 350,
      salaryMax: 500,
      jobType: 'Part-time',
      workStyle: 'Hybrid',
      location: 'สยาม',
    },
  ];

  for (const job of jobsData) {
    const skills = getRandomSkills(job.title);
    await prisma.job.create({
      data: {
        ...job,
        description: `รับสมัครตำแหน่ง ${job.title}`,
        responsibilities: 'ปฏิบัติงานตามที่บริษัทกำหนด',
        qualifications: 'มีความรับผิดชอบ เรียนรู้เร็ว',
        status: 'OPEN',
        salaryNegotiable: true,
        currency: 'THB',
        experienceLevel: 'Entry',
        positions: Math.floor(Math.random() * 3) + 1,
        workingHours: '4-8 ชั่วโมง/วัน',
        skills,
        province: 'กรุงเทพมหานคร',
      },
    });
  }

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
