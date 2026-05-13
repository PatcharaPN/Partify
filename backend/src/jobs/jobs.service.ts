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
  async postJob(dto: CreateJobDto, userId: string) {
    const company = await this.prisma.company.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!company) {
      throw new BadRequestException('Employer must create company first');
    }

    const { skills, ...jobData } = dto;

    return this.prisma.job.create({
      data: {
        ...jobData,

        companyId: company.id,
        status: 'active',
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
        company: true,
        bookmarks: userId
          ? { where: { userId }, select: { id: true } }
          : { select: { id: true } },
        ...(userId && {
          applications: {
            where: { userId },
            select: { id: true },
          },
        }),
      },
    });

    return jobs.map(({ applications = [], bookmarks, ...job }) => ({
      ...job,
      isBookmarked: bookmarks.length > 0,
      isApplied: applications.length > 0,
    }));
  }
  async getJobsByID(jobId: string, user: any) {
    const jobs = await this.prisma.job.findUnique({
      where: {
        id: jobId,
      },
      include: {
        company: {
          select: {
            userId: true,
            companyBio: true,
            companyImageURL: true,
            companyName: true,
            companyProfileURL: true,
            companySize: true,
          },
        },
        skills: true,
      },
    });
    if (!jobs) {
      throw new NotFoundException();
    }
    console.log('user:', user);
    return {
      ...jobs,
      isOwner: user ? jobs.company.userId === user.sub : false,
    };
  }
  async getJobsByOwnerId(ownerId: string) {
    const jobs = await this.prisma.job.findMany({
      where: {
        company: {
          userId: ownerId,
        },
      },
      include: {
        company: true,
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
