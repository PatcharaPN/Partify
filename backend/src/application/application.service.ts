import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}
  async applyJob(jobId: string, userId: string) {
    const existing = await this.prisma.application.findUnique({
      where: {
        jobId_userId: {
          jobId,
          userId,
        },
      },
    });
    if (existing) {
      throw new Error('Already applied');
    }
    return await this.prisma.application.create({
      data: {
        jobId,
        userId,
      },
    });
  }
  async getStatus(jobId: string, userId: string) {
    return this.prisma.application.findUnique({
      where: {
        jobId_userId: {
          jobId,
          userId,
        },
      },
      select: {
        status: true,
      },
    });
  }
  async application(jobId: string) {
    return this.prisma.application.findMany({
      where: {
        jobId,
      },
      include: {
        user: {
          omit: {
            email: true,
            password: true,
          },
          include: { profile: true, jobs: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async getJobWithApplications(jobId: string, userId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: {
        applications: {
          include: {
            user: {
              select: {
                id: true,
                profile: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.companyId !== userId) {
      throw new ForbiddenException('You are not the owner');
    }

    return job;
  }
  async candidateApplication(userId: string) {
    return this.prisma.application.findMany({
      where: {
        userId,
      },
      include: {
        job: true,
      },
    });
  }
  async getApplicationsByOwner(ownerId: string) {
    return this.prisma.application.findMany({
      where: {
        job: {
          companyId: ownerId,
        },
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        job: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
