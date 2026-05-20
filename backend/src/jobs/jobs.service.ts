import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

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
        skills: skills,
      },
    });
  }
  async fetchRelatedJobs(jobId: string) {
    const currentJob = await this.prisma.job.findUnique({
      where: {
        id: jobId,
      },
      include: {
        company: {
          include: {
            jobs: {
              where: {
                id: {
                  not: jobId,
                },
                status: 'OPEN',
              },
              take: 3,
              orderBy: {
                createdAt: 'desc',
              },
              include: {
                company: true,
              },
            },
          },
        },
      },
    });
    if (!currentJob) {
      throw new NotFoundException();
    }
    return currentJob?.company.jobs;
  }
  async getJobs(userId?: string) {
    const jobs = await this.prisma.job.findMany({
      include: {
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
            category: true,
            companyBio: true,
            companyImageURL: true,
            companyName: true,
            companyProfileURL: true,
            companySize: true,
          },
        },
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
        skills: skills ?? undefined,
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
          hasSome: userSkills,
        },
        applications: {
          none: {
            userId: userId,
          },
        },
      },
      include: {
        company: true,
      },
      take: 10,
    });
    return jobs;
  }
  async searchJob(keyword: string[], page: number = 1, search?: string) {
    const limit = 5;
    const skip = (page - 1) * limit;

    const where = {
      AND: [
        keyword.length > 0 ? { skills: { hasSome: keyword } } : {},
        search
          ? {
              OR: [
                {
                  title: {
                    contains: search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  company: {
                    companyName: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                },
              ],
            }
          : {},
      ],
    };

    const [jobs, total] = await this.prisma.$transaction([
      this.prisma.job.findMany({
        where,
        take: limit,
        skip,
        include: {
          company: true,
        },
      }),
      this.prisma.job.count({ where }),
    ]);

    return {
      data: jobs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
