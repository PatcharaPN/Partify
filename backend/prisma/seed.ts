import { PrismaClient, Role, ApplicationStatus, JobType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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
      email: 'employer1@syntech.com',
      password: hashedPassword,
      role: Role.EMPLOYER,
      profile: {
        create: {
          firstName: 'Ethan',
          lastName: 'Walker',
          phone: '081-234-5678',
          avatarUrl:
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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

  // ── Companies ─────────────────────────────────────────────
  const company1 = await prisma.company.create({
    data: {
      companyName: 'Syntech Corporation',
      category: 'Technology',
      createdBy: employer1.id,
      companyImageURL:
        'https://static.vecteezy.com/system/resources/previews/043/269/413/non_2x/tech-logo-technology-logo-vector.jpg',
      companyBio: 'A startup tech consulting',
      companySize: '50-200',
      members: {
        create: {
          role: 'OWNER',
          userId: employer1.id,
        },
      },
    },
  });

  const jobsData = [
    {
      title: 'Frontend Developer (Part-time)',
      companyId: company1.id,
      category: 'IT',
      salaryMin: 40,
      salaryMax: 60,
      jobType: 'PARTTIME',
      workStyle: 'Hybrid',
      location: 'สีลม',
    },
    {
      title: 'Backend Developer (Part-time)',
      companyId: company1.id,
      category: 'IT',
      salaryMin: 45,
      salaryMax: 65,
      jobType: 'PARTTIME',
      workStyle: 'Remote',
      location: 'Remote',
    },
    {
      title: 'Fullstack Developer',
      companyId: company1.id,
      category: 'IT',
      salaryMin: 60,
      salaryMax: 90,
      jobType: 'FULLTIME',
      workStyle: 'Remote',
      location: 'Remote',
    },
  ];

  function toJobType(value: string): JobType | null {
    const map: Record<string, JobType> = {
      'Part-time': JobType.PARTTIME,
      'Full-time': JobType.FULLTIME,
      Freelance: JobType.FREELANCE,
      Contract: JobType.CONTRACT,
    };
    return map[value] ?? null;
  }

  for (const job of jobsData) {
    const skills = getRandomSkills(job.title);
    const { jobType, ...rest } = job;
    await prisma.job.create({
      data: {
        ...rest,
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
        jobType: toJobType(jobType),
        isActive: true,
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
