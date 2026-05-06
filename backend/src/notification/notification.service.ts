import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplicationStatus } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}
  async pushNotification(
    msgContext: string,
    applicationType: any,
    userId: string,
    jobId?: string,
  ) {
    await this.validateReceiverAndThrowError(userId);
    return this.addNotification(msgContext, applicationType, userId, jobId);
  }

  async getUserNotification(userId: string) {
    return await this.prisma.notification.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        message: true,
        isRead: true,
        createdAt: true,
        jobId: true,
        type: true,
        job: {
          select: {
            companyName: true,
            companyImageURL: true,
          },
        },
      },
    });
  }

  private async validateReceiverAndThrowError(userId: string) {
    const user = await this.prisma.user.count({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  private async addNotification(
    msgContext: string,
    applicationType: ApplicationStatus,
    userId: string,
    jobId?: string,
  ) {
    const notification = await this.prisma.notification.create({
      data: {
        message: msgContext,
        type: applicationType,
        userId: userId,
        jobId: jobId,
      },
    });
    return notification;
  }
}
