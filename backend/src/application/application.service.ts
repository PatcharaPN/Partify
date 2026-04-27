import { Injectable } from '@nestjs/common';
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
          include: { profile: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
