import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ApplicationService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService,
  ) {}
  async applyJob(jobId: string, userId: string) {
    const existing = await this.prisma.application.findUnique({
      where: {
        jobId_userId: {
          jobId,
          userId,
        },
      },
    });
    if (existing && existing.status !== 'REJECTED') {
      throw new ConflictException('Already applied');
    }

    const application = await this.prisma.application.upsert({
      where: {
        jobId_userId: { jobId, userId },
      },
      update: {
        status: 'PENDING',
        createdAt: new Date(),
      },
      create: {
        jobId,
        userId,
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
    });

    await this.notificationService.pushNotification(
      `มีผู้สมัครใหม่สำหรับตำแหน่ง ${application.job.title} ที่ ${application.job.company.companyName} กรุณาตรวจสอบรายละเอียด`,
      'PENDING',
      application.job.company.userId,
      application.jobId,
    );
    return application;
  }

  async approveApplication(applicationId: string, employerId: string) {
    const application = await this.findApplicationOrThrow(applicationId);
    this.validateOwnerShip(employerId, application);
    this.validateStatus(application);
    await this.findExistingEmployee(application);
    return await this.processApproval(applicationId, application);
  }

  async rejectApplication(applicationId: string, employerId: string) {
    const application = await this.findApplicationOrThrow(applicationId);
    this.validateOwnerShip(employerId, application);
    this.validateStatus(application);
    await this.findExistingEmployee(application);
    return await this.processRejection(applicationId, application);
  }

  async interviewApplication(applicationId: string, employerId: string) {
    const application = await this.findApplicationOrThrow(applicationId);
    this.validateOwnerShip(employerId, application);
    this.validateStatus(application);
    await this.findExistingEmployee(application);
    return await this.processInterview(applicationId, application);
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
          include: { profile: true, company: true },
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
        company: true,
        applications: {
          include: {
            user: {
              select: {
                id: true,
                profile: true,
                resume: true,
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

    if (job.company.userId !== userId) {
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
        job: {
          include: {
            company: true,
          },
        },
      },
    });
  }
  async getApplicationsByOwner(ownerId: string) {
    return this.prisma.application.findMany({
      where: {
        job: {
          company: {
            userId: ownerId,
          },
        },
      },
      include: {
        user: {
          include: {
            profile: true,
            resume: true,
          },
        },
        job: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  private async processInterview(applicationId: string, application: any) {
    const updatedApplication = await this.prisma.application.update({
      where: { id: applicationId },
      data: {
        status: 'INTERVIEW',
      },
    });
    await this.notificationService.pushNotification(
      `ยินดีด้วย! คุณผ่านการคัดเลือกเบื้องต้นตำแหน่ง ${application.job.title} ที่ ${application.job.company.companyName} ทางบริษัทจะติดต่อกลับเพื่อนัดสัมภาษณ์เร็วๆ นี้`,
      'INTERVIEW',
      application.userId,
      application.jobId,
    );
    return updatedApplication;
  }

  private async processRejection(applicationId: string, application: any) {
    const updatedApplication = await this.prisma.application.update({
      where: { id: applicationId },
      data: {
        status: 'REJECTED',
      },
    });
    await this.notificationService.pushNotification(
      `ขออภัย คุณไม่ผ่านการคัดเลือกตำแหน่ง ${application.job.title} ที่ ${application.job.company.companyName}`,
      'REJECTED',
      application.userId,
      application.jobId,
    );
    return updatedApplication;
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
            companyId: application.job.company.id,
            jobId: application.jobId,
            status: 'ACTIVE',
          },
        }),
      ]);
    await this.notificationService.pushNotification(
      `คุณผ่านการคัดเลือกตำแหน่ง ${application.job.title} ที่ ${application.job.company.companyName} กรุณาตรวจสอบรายละเอียดเพิ่มเติม`,
      'ACCEPTED',
      application.userId,
      application.jobId,
    );
    return { application: updatedApplication, employee: createdEmployee };
  }

  private async findApplicationOrThrow(applicationId: string) {
    const application = await this.prisma.application.findUnique({
      where: {
        id: applicationId,
      },
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return application;
  }

  private validateOwnerShip(employerId: any, application: any) {
    if (employerId !== application?.job.company.userId) {
      throw new ForbiddenException('Access denied');
    }
  }
  private validateStatus(application: any) {
    if (
      application.status === 'ACCEPTED' ||
      application.status === 'REJECTED'
    ) {
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
