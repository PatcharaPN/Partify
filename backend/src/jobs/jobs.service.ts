import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}
  async postJob(dto: CreateJobDto, companyId: string) {
    const existing = await this.prisma.job.findFirst({
      where: { title: dto.title, companyId },
    });
    if (existing) {
      throw new BadRequestException('งานนี้มีอยู่ในระบบแล้ว');
    }
    const { skills, ...jobData } = dto;
    return this.prisma.job.create({
      data: { ...jobData, companyId },
    });
  }
  async getJobs(userId?: string) {
    const jobs = await this.prisma.job.findMany({
      include: {
        skills: true,
        bookmarks: userId
          ? { where: { userId }, select: { id: true } }
          : { select: { id: true } },
      },
    });

    return jobs.map((job) => ({
      ...job,
      isBookmarked: job.bookmarks.length > 0,
      bookmarks: undefined,
    }));
  }
  async getJobsByID(jobId: string) {
    const jobs = await this.prisma.job.findUnique({
      where: {
        id: jobId,
      },
      include: {
        skills: true,
      },
    });
    return jobs;
  }
  async getJobsByOwnerId(ownerId: string) {
    const jobs = await this.prisma.job.findMany({
      where: {
        company: {
          id: ownerId,
        },
      },
    });
    return jobs;
  }
  async upsertJobById(jobId: string, dto: UpdateJobDto) {
    const { skills, ...jobData } = dto;

    const existing = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!existing) {
      throw new NotFoundException(`Job ${jobId} not found`);
    }

    return this.prisma.job.update({
      where: { id: jobId },
      data: {
        ...jobData,
        skills: skills
          ? {
              deleteMany: {},
              create: skills.map((skill) => ({
                name: skill.name,
              })),
            }
          : undefined,
      },
      include: {
        skills: true,
      },
    });
  }

  // async upsertJobById(jobId: string, dto: UpdateJobDto) {
  //   const { skills, ...jobData } = dto;
  //   const job = await this.prisma.job.upsert({
  //     where: { id: jobId },
  //     create: {
  //       ...jobData,
  //       skills: skills
  //         ? {
  //             create: skills.map((skill) => ({
  //               name: skill.name,
  //             })),
  //           }
  //         : undefined,
  //     },
  //     update: {
  //       ...jobData,
  //       skills: skills
  //         ? {
  //             deleteMany: {},
  //             create: skills.map((skill) => ({
  //               name: skill.name,
  //             })),
  //           }
  //         : undefined,
  //     },
  //   });
  //   return job;
  // }
}
