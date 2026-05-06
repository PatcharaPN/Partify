import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from '../prisma/prisma.service';

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
      data: {
        ...jobData,
        companyId,
        skills: skills?.length
          ? {
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
  async getJobsByID(jobId: string, user: any) {
    const jobs = await this.prisma.job.findUnique({
      where: {
        id: jobId,
      },
      include: {
        skills: true,
      },
    });
    if (!jobs) {
      throw new NotFoundException();
    }
    console.log('user:', user);
    return {
      ...jobs,
      isOwner: user ? jobs.companyId === user.sub : false,
    };
  }
  async getJobsByOwnerId(ownerId: string) {
    const jobs = await this.prisma.job.findMany({
      where: {
        company: {
          id: ownerId,
        },
      },
      include: {
        applications: {
          include: {
            user: {
              include: {
                profile: true,
              },
            },
          },
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

  async recomandJobsBySkills(userId: string) {
    const skills = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });
    const userSkills = skills?.profile?.skills || [];

    const jobs = await this.prisma.job.findMany({
      where: {
        skills: {
          some: {
            name: {
              in: userSkills,
            },
          },
        },
        applications: {
          none: {
            userId: userId,
          },
        },
      },
      include: {
        skills: true,
      },
      take: 10,
    });
    return jobs;
  }
}
