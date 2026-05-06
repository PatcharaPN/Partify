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
  ) {
    await this.validateReceiverAndThrowError(userId);
    return this.addNotification(msgContext, applicationType, userId);
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
  ) {
    const notification = await this.prisma.notification.create({
      data: {
        message: msgContext,
        type: applicationType,
        userId: userId,
      },
    });
    return notification;
  }
}
