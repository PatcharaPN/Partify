// prisma/seed.ts
import { PrismaClient, Role, JobType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clean
  await prisma.notification.deleteMany();
  await prisma.application.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.job.deleteMany();
  await prisma.company.deleteMany();
  await prisma.companyMember.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  const employer1 = await prisma.user.create({
    data: {
      email: 'employer1@syntech.com',
      password: hashedPassword,
      role: Role.EMPLOYER,
      profile: {
        create: {
          firstName: 'Michael',
          lastName: 'Anderson',
          phone: '081-234-5678',
          avatarUrl:
            'https://images.unsplash.com/photo-1740252117013-4fb21771e7ca?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      },
    },
  });

  const company1 = await prisma.company.create({
    data: {
      id: '992c1b21-cf3d-48d9-8929-954afa7bf7f9',
      companyName: 'Syntech Corporation',
      category: 'Technology',
      createdBy: employer1.id,
      companyImageURL:
        'https://static.vecteezy.com/system/resources/previews/043/269/413/non_2x/tech-logo-technology-logo-vector.jpg',
      companyBio: 'A startup tech consulting',
      companySize: '200+',
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
      id: '13179860-d40e-41cb-83fe-641629f5b50d',
      title: 'Backend Developer',
      description: 'รับสมัครตำแหน่ง Backend Developer (Part-time)',
      responsibilities: 'ปฏิบัติงานตามที่บริษัทกำหนด',
      qualifications: 'มีความรับผิดชอบ เรียนรู้เร็ว',
      category: 'IT & เทคโนโลยี',
      salaryMin: 45,
      salaryMax: 65,
      salaryNegotiable: true,
      currency: 'THB',
      status: 'OPEN',

      jobType: JobType.PARTTIME,
      workStyle: 'onsite',
      experienceLevel: 'JUNIOR',
      experienceYears: 1,
      positions: 1,
      isActive: true,
      workingHours: '5-6 ชั่วโมง/วัน',
      workingDays: 'ทุกวัน',
      startDate: new Date('2026-06-29T00:00:00.000Z'),
      closingDate: new Date('2026-06-27T00:00:00.000Z'),
      overviewPictureURL: [
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
      benefits: [
        'ประกันสังคม',
        'ค่าล่วงเวลา OT',
        'อาหารกลางวัน',
        'ยูนิฟอร์มฟรี',
        'โบนัสประจำปี',
        'วันหยุดพักร้อน',
        'ค่าเดินทาง',
        'ประกันสุขภาพ',
      ],
      location: 'Remote',
      urgency: 'LOW',
      province: 'กรุงเทพมหานคร',
      district: 'สาทร',
      locationDetail: '',
      skills: ['NestJS', 'Node.js', 'PostgreSQL', 'Docker', 'REST API'],
    },
    {
      id: '451eb1de-c548-4091-9ef3-dc38e0556aab',
      title: 'Frontend Developer (Part-time)',
      description: 'รับสมัครตำแหน่ง Frontend Developer (Part-time)',
      responsibilities: 'ปฏิบัติงานตามที่บริษัทกำหนด',
      qualifications: 'มีความรับผิดชอบ เรียนรู้เร็ว',
      category: 'IT & เทคโนโลยี',
      salaryMin: 40,
      salaryMax: 60,
      salaryNegotiable: true,
      currency: 'THB',
      status: 'OPEN',
      jobType: JobType.PARTTIME,
      workStyle: 'onsite',
      experienceLevel: 'JUNIOR',
      experienceYears: 1,
      positions: 2,
      isActive: true,
      workingHours: '7-8 ชั่วโมง/วัน',
      workingDays: 'จันทร์–ศุกร์',
      startDate: new Date('2026-06-30T00:00:00.000Z'),
      closingDate: new Date('2026-06-29T00:00:00.000Z'),
      overviewPictureURL: [
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
      benefits: [
        'ประกันสังคม',
        'ค่าล่วงเวลา OT',
        'อาหารกลางวัน',
        'ยูนิฟอร์มฟรี',
        'โบนัสประจำปี',
        'วันหยุดพักร้อน',
        'ค่าเดินทาง',
        'ประกันสุขภาพ',
      ],
      location: 'สีลม',
      urgency: 'MEDIUM',
      province: 'กรุงเทพมหานคร',
      district: 'จตุจักร',
      locationDetail: '',
      skills: [
        'JavaScript',
        'Tailwind CSS',
        'React',
        'CSS',
        'TypeScript',
        'HTML',
      ],
    },
    {
      id: '364b08f6-5a78-43f4-99c6-fd291372a1d2',
      title: 'Fullstack Developer',
      description: 'รับสมัครตำแหน่ง Fullstack Developer',
      responsibilities: 'ปฏิบัติงานตามที่บริษัทกำหนด',
      qualifications: 'มีความรับผิดชอบ เรียนรู้เร็ว',
      category: 'IT',
      salaryMin: 60,
      salaryMax: 90,
      salaryNegotiable: true,
      currency: 'THB',
      status: 'OPEN',
      jobType: JobType.FULLTIME,
      workStyle: 'Remote',
      experienceLevel: 'Entry',
      experienceYears: null,
      positions: 2,
      isActive: true,
      workingHours: '4-8 ชั่วโมง/วัน',
      workingDays: '',
      startDate: null,
      closingDate: null,
      overviewPictureURL: [
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
      benefits: [
        'ประกันสังคม',
        'ค่าล่วงเวลา OT',
        'อาหารกลางวัน',
        'ยูนิฟอร์มฟรี',
        'โบนัสประจำปี',
        'วันหยุดพักร้อน',
        'ค่าเดินทาง',
        'ประกันสุขภาพ',
      ],
      location: 'Remote',
      urgency: 'HIGH',
      province: 'กรุงเทพมหานคร',
      district: '',
      locationDetail: '',
      skills: ['Docker', 'TypeScript', 'React', 'Node.js', 'Next.js'],
    },
  ];

  for (const job of jobsData) {
    await prisma.job.create({
      data: {
        id: job.id,
        companyId: company1.id,
        title: job.title,
        description: job.description,
        responsibilities: job.responsibilities,
        qualifications: job.qualifications,
        category: job.category,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        salaryNegotiable: job.salaryNegotiable,
        currency: job.currency,
        status: job.status,
        jobType: job.jobType,
        workStyle: job.workStyle,
        experienceLevel: job.experienceLevel,
        experienceYears: job.experienceYears,
        positions: job.positions,
        isActive: job.isActive,
        workingHours: job.workingHours,
        workingDays: job.workingDays,
        startDate: job.startDate,
        closingDate: job.closingDate,
        overviewPictureURL: job.overviewPictureURL,
        benefits: job.benefits,
        location: job.location,
        urgency: job.urgency,
        province: job.province,
        district: job.district,
        locationDetail: job.locationDetail,
        skills: job.skills,
      },
    });
  }

  console.log('✅ Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
