import { PrismaClient, Role, ApplicationStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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
          summary:
            'นักศึกษาปี 3 สาขาวิทยาการคอมพิวเตอร์ มีประสบการณ์งานพาร์ทไทม์ 1 ปี',
          province: 'กรุงเทพมหานคร',
          district: 'บางรัก',
          skills: ['JavaScript', 'React', 'Node.js', 'CSS'],
          shifts: ['เช้า', 'บ่าย'],
          availability: ['จันทร์', 'พุธ', 'ศุกร์'],
          preferredJobTypes: ['Part-time', 'Freelance'],
          preferredCategories: ['IT', 'Digital Marketing'],
          expectedSalary: 400,
          gender: 'ชาย',
          nationality: 'ไทย',
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
          summary: 'บัณฑิตใหม่ สาขาบริหารธุรกิจ พร้อมทำงานทุกวัน',
          province: 'กรุงเทพมหานคร',
          district: 'ลาดพร้าว',
          skills: ['การขาย', 'บริการลูกค้า', 'Microsoft Office', 'ภาษาอังกฤษ'],
          shifts: ['บ่าย', 'ดึก'],
          availability: ['อังคาร', 'พฤหัสบดี', 'เสาร์', 'อาทิตย์'],
          preferredJobTypes: ['Part-time'],
          preferredCategories: ['Retail', 'Food & Beverage'],
          expectedSalary: 350,
          gender: 'หญิง',
          nationality: 'ไทย',
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
          summary: 'นักศึกษาโท สาขาการตลาด ชอบงานสร้างสรรค์',
          province: 'เชียงใหม่',
          district: 'เมือง',
          skills: [
            'Photoshop',
            'Illustrator',
            'Content Writing',
            'Social Media',
          ],
          shifts: ['เช้า'],
          availability: ['เสาร์', 'อาทิตย์'],
          preferredJobTypes: ['Part-time', 'Freelance'],
          preferredCategories: ['Creative', 'Marketing'],
          expectedSalary: 450,
          gender: 'ชาย',
          nationality: 'ไทย',
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
      companyBio:
        'บริษัทเทคโนโลยีชั้นนำที่มุ่งเน้นการพัฒนา software สำหรับธุรกิจ SME',
      companySize: '50-200',
    },
  });

  const company2 = await prisma.company.create({
    data: {
      companyName: 'Café Delight',
      userId: employer2.id,
      companyImageURL: 'https://picsum.photos/seed/cafe/200',
      companyBio: 'ร้านกาแฟ specialty coffee บรรยากาศดีใจกลางเมือง',
      companySize: '10-50',
    },
  });

  // ── Jobs ──────────────────────────────────────────────────
  const job1 = await prisma.job.create({
    data: {
      title: 'Frontend Developer (Part-time)',
      description:
        'พัฒนา UI สำหรับระบบ internal ของบริษัท ใช้ React และ TypeScript',
      responsibilities: 'พัฒนา component, เชื่อมต่อ API, ทำ responsive design',
      qualifications: 'มีความรู้ React, TypeScript, Tailwind CSS',
      category: 'IT',
      salaryMin: 400,
      salaryMax: 600,
      salaryNegotiable: true,
      currency: 'THB',
      status: 'OPEN',
      jobType: 'Part-time',
      workStyle: 'Hybrid',
      experienceLevel: 'Junior',
      experienceYears: 0,
      positions: 2,
      workingHours: '4 ชั่วโมง/วัน',
      workingDays: 'จันทร์-ศุกร์',
      benefits: ['ค่าเดินทาง', 'ประกันอุบัติเหตุ'],
      location: 'สีลม กรุงเทพฯ',
      province: 'กรุงเทพมหานคร',
      district: 'บางรัก',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Git'],
      companyId: company1.id,
    },
  });

  const job2 = await prisma.job.create({
    data: {
      title: 'Backend Developer (Part-time)',
      description: 'พัฒนา REST API ด้วย NestJS สำหรับระบบ e-commerce',
      responsibilities: 'ออกแบบ API, เชื่อมต่อฐานข้อมูล, เขียน unit test',
      qualifications: 'มีความรู้ NestJS, PostgreSQL, Prisma',
      category: 'IT',
      salaryMin: 450,
      salaryMax: 650,
      salaryNegotiable: false,
      currency: 'THB',
      status: 'OPEN',
      jobType: 'Part-time',
      workStyle: 'Remote',
      experienceLevel: 'Junior',
      experienceYears: 1,
      positions: 1,
      workingHours: '5 ชั่วโมง/วัน',
      workingDays: 'จันทร์-พุธ-ศุกร์',
      benefits: ['Work from home', 'อุปกรณ์จาก บ.'],
      location: 'Remote',
      province: 'กรุงเทพมหานคร',
      district: 'สาทร',
      skills: ['NestJS', 'PostgreSQL', 'Prisma', 'Docker'],
      companyId: company1.id,
    },
  });

  const job3 = await prisma.job.create({
    data: {
      title: 'บาริสต้า Part-time',
      description: 'ชงกาแฟและให้บริการลูกค้าในร้านบรรยากาศดี',
      responsibilities: 'ชงกาแฟ, ดูแลความสะอาด, รับออเดอร์',
      qualifications: 'ยิ้มแย้มแจ่มใส บริการดี ไม่จำเป็นต้องมีประสบการณ์',
      category: 'Food & Beverage',
      salaryMin: 300,
      salaryMax: 350,
      salaryNegotiable: false,
      currency: 'THB',
      status: 'OPEN',
      jobType: 'Part-time',
      workStyle: 'On-site',
      experienceLevel: 'Entry',
      experienceYears: 0,
      positions: 3,
      workingHours: '8 ชั่วโมง/วัน',
      workingDays: 'เสาร์-อาทิตย์',
      benefits: ['อาหารฟรี', 'เครื่องดื่มฟรี'],
      location: 'สยาม กรุงเทพฯ',
      province: 'กรุงเทพมหานคร',
      district: 'ปทุมวัน',
      skills: ['บริการลูกค้า', 'ทำงานเป็นทีม'],
      companyId: company2.id,
    },
  });

  const job4 = await prisma.job.create({
    data: {
      title: 'Social Media Coordinator',
      description: 'ดูแลและสร้าง content สำหรับช่องทาง social media ของร้าน',
      responsibilities: 'ถ่ายรูป, ตัดต่อ, โพสต์ content, ตอบ comment',
      qualifications:
        'มีความสามารถด้าน content creation, ใช้ Instagram/TikTok เป็น',
      category: 'Marketing',
      salaryMin: 350,
      salaryMax: 500,
      salaryNegotiable: true,
      currency: 'THB',
      status: 'OPEN',
      jobType: 'Part-time',
      workStyle: 'Hybrid',
      experienceLevel: 'Entry',
      experienceYears: 0,
      positions: 1,
      workingHours: '3 ชั่วโมง/วัน',
      workingDays: 'ทุกวัน',
      benefits: ['กาแฟฟรี', 'Flexible hours'],
      location: 'สยาม กรุงเทพฯ',
      province: 'กรุงเทพมหานคร',
      district: 'ปทุมวัน',
      skills: ['Photoshop', 'Instagram', 'TikTok', 'Content Writing'],
      companyId: company2.id,
    },
  });

  // ── Resumes ───────────────────────────────────────────────
  await prisma.resume.create({
    data: {
      userId: candidate1.id,
      fileName: 'resume_somchai.pdf',
      url: 'https://example.com/resumes/resume_somchai.pdf',
    },
  });

  await prisma.resume.create({
    data: {
      userId: candidate2.id,
      fileName: 'resume_suda.pdf',
      url: 'https://example.com/resumes/resume_suda.pdf',
    },
  });

  // ── Applications ──────────────────────────────────────────
  const app1 = await prisma.application.create({
    data: {
      jobId: job1.id,
      userId: candidate1.id,
      status: ApplicationStatus.PENDING,
    },
  });

  const app2 = await prisma.application.create({
    data: {
      jobId: job2.id,
      userId: candidate1.id,
      status: ApplicationStatus.INTERVIEW,
    },
  });

  const app3 = await prisma.application.create({
    data: {
      jobId: job3.id,
      userId: candidate2.id,
      status: ApplicationStatus.ACCEPTED,
    },
  });

  const app4 = await prisma.application.create({
    data: {
      jobId: job4.id,
      userId: candidate3.id,
      status: ApplicationStatus.REJECTED,
    },
  });

  const app5 = await prisma.application.create({
    data: {
      jobId: job1.id,
      userId: candidate3.id,
      status: ApplicationStatus.PENDING,
    },
  });

  // ── Bookmarks ─────────────────────────────────────────────
  await prisma.bookmark.create({
    data: { userId: candidate1.id, jobId: job3.id },
  });
  await prisma.bookmark.create({
    data: { userId: candidate2.id, jobId: job1.id },
  });
  await prisma.bookmark.create({
    data: { userId: candidate3.id, jobId: job2.id },
  });

  // ── Employees ─────────────────────────────────────────────
  await prisma.employee.create({
    data: {
      userId: candidate2.id,
      companyId: company2.id,
      jobId: job3.id,
      status: 'ACTIVE',
    },
  });

  // ── Notifications ─────────────────────────────────────────
  await prisma.notification.create({
    data: {
      userId: candidate1.id,
      senderId: employer1.id,
      message:
        'ใบสมัครของคุณสำหรับตำแหน่ง Frontend Developer กำลังได้รับการพิจารณา',
      type: ApplicationStatus.PENDING,
      jobId: job1.id,
      isRead: false,
    },
  });

  await prisma.notification.create({
    data: {
      userId: candidate1.id,
      senderId: employer1.id,
      message: 'คุณได้รับเชิญเข้าสัมภาษณ์สำหรับตำแหน่ง Backend Developer',
      type: ApplicationStatus.INTERVIEW,
      jobId: job2.id,
      isRead: false,
    },
  });

  await prisma.notification.create({
    data: {
      userId: candidate2.id,
      senderId: employer2.id,
      message: 'ยินดีด้วย! ใบสมัครของคุณได้รับการอนุมัติสำหรับตำแหน่ง บาริสต้า',
      type: ApplicationStatus.ACCEPTED,
      jobId: job3.id,
      isRead: true,
    },
  });

  await prisma.notification.create({
    data: {
      userId: candidate3.id,
      senderId: employer2.id,
      message:
        'ขออภัย ใบสมัครของคุณสำหรับตำแหน่ง Social Media Coordinator ไม่ผ่านการคัดเลือก',
      type: ApplicationStatus.REJECTED,
      jobId: job4.id,
      isRead: false,
    },
  });

  console.log('✅ Seed completed!');
  console.log(`
  📊 Summary:
  - Users: 5 (1 admin, 2 employers, 3 candidates)
  - Companies: 2
  - Jobs: 4
  - Applications: 5
  - Bookmarks: 3
  - Employees: 1
  - Notifications: 4
  - Resumes: 2

  🔑 Test accounts (password: password123):
  - admin@partify.com        → ADMIN
  - employer1@techcorp.com   → EMPLOYER
  - employer2@cafebrand.com  → EMPLOYER
  - john@example.com         → CANDIDATE
  - jane@example.com         → CANDIDATE
  - tom@example.com          → CANDIDATE
  `);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
