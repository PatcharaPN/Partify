import {
  BadRequestException,
  ConflictException,
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

  async approveApplication(applicationId: string, employerId: string) {
    const application = await this.findApplicationOrThrow(applicationId);
    this.validateOwnerShip(employerId, application);
    this.validateStatus(application);
    await this.findExistingEmployee(application);
    return await this.processApproval(applicationId, application);
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

  private async processApproval(applicationId: string, application: any) {
    const [updatedApplication, createdEmployee] =
      await this.prisma.$transaction([
        this.prisma.application.update({
          where: {
            id: applicationId,
          },
          data: {
            status: 'ACCEPTED',
          },
        }),
        this.prisma.employee.create({
          data: {
            userId: application.userId,
            companyId: application.job.companyId,
            jobId: application.jobId,
            status: 'ACTIVE',
          },
        }),
      ]);
    return { application: updatedApplication, employee: createdEmployee };
  }

  private async findApplicationOrThrow(applicationId: string) {
    const application = await this.prisma.application.findUnique({
      where: {
        id: applicationId,
      },
      include: { job: true },
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return application;
  }

  private validateOwnerShip(employerId: any, application: any) {
    if (employerId !== application?.job.companyId) {
      throw new ForbiddenException('Access denied');
    }
  }
  private validateStatus(application: any) {
    if (application.status !== 'PENDING') {
      throw new BadRequestException('Application has already been processed');
    }
  }
  private async findExistingEmployee(application: any) {
    const existingEmployee = await this.prisma.employee.findUnique({
      where: {
        userId_companyId: {
          companyId: application.job.companyId,
          userId: application.userId,
        },
      },
    });
    if (existingEmployee?.status === 'ACTIVE') {
      throw new ConflictException('User is already an active employee');
    }
  }
}
