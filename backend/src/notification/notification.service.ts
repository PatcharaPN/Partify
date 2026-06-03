import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ApplicationStatus,
  NotificationCategory,
  NotificationType,
} from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}
  async pushNotification(
    msgContext: string,
    applicationType: any,
    userId: string,
    jobId?: string,
    inviteId?: string,
    category?: NotificationCategory,
  ) {
    await this.validateReceiverAndThrowError(userId);
    return this.addNotification(
      msgContext,
      applicationType,
      userId,
      jobId,
      inviteId,
      category,
    );
  }

  async readNotification(userId: string, notificationId: string) {
    await this.validateReceiverAndThrowError(userId);

    return await this.prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId: userId,
      },
      data: {
        isRead: true,
      },
    });
  }
  async readAllNotifications(userId: string) {
    await this.validateReceiverAndThrowError(userId);

    return await this.prisma.notification.updateMany({
      where: {
        userId: userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
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
        inviteId: true,
        type: true,
        job: {
          select: {
            company: {
              select: {
                companyName: true,
                companyImageURL: true,
              },
            },
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
    notificationType: NotificationType,
    userId: string,
    jobId?: string,
    inviteId?: string,
    category?: NotificationCategory,
  ) {
    const notification = await this.prisma.notification.create({
      data: {
        message: msgContext,
        type: notificationType,
        userId: userId,
        jobId: jobId,
        inviteId,
        category: category,
      },
    });
    return notification;
  }
}
