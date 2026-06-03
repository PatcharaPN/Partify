import {
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CompanyRole } from '@prisma/client';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class CompanyService {
  constructor(
    readonly prisma: PrismaService,
    private notificationService: NotificationService,
  ) {}
  async upsertCompany(userId: string, dto: CreateCompanyDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });

      if (!user) throw new NotFoundException('User was not found');
      if (user.role !== 'EMPLOYER') {
        throw new ForbiddenException('Only employer can access company');
      }

      return await this.prisma.company.upsert({
        where: {
          createdBy: userId,
        },
        create: {
          ...dto,
          createdBy: userId,
        },
        update: {
          ...dto,
        },
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Failed to upsert company');
    }
  }

  async getAllMembers(userId: string) {
    const member = await this.prisma.companyMember.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!member) throw new ForbiddenException('No access');

    if (!['OWNER', 'ADMIN'].includes(member.role)) {
    }

    const companyMember = await this.prisma.companyMember.findMany({
      where: { companyId: member.companyId },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    const pendingMemberInvite = await this.prisma.companyInvite.findMany({
      where: {
        companyId: member.companyId,
        status: 'PENDING',
      },
    });
    return { companyMember, pendingInvites: pendingMemberInvite };
  }

  async inviteMember(
    ownerId: string,
    dto: { email: string; role: CompanyRole },
  ) {
    const company = await this.prisma.company.findUnique({
      where: {
        createdBy: ownerId,
      },
    });
    if (!company) throw new NotFoundException('Company not found');

    const targetUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!targetUser) throw new NotFoundException('User not found');

    const invite = await this.prisma.companyInvite.create({
      data: {
        companyId: company.id,
        email: dto.email,
        role: dto.role,
      },
    });

    await this.notificationService.pushNotification(
      `คุณได้รับคำเชิญเข้าร่วมทีม ${company.companyName}`,
      'TEAM_INVITE_RECEIVED',
      targetUser.id,
      undefined,
      invite.id,
      'TEAM',
    );
    return invite;
  }
  async acceptInvite(email: string, userId: string, inviteId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });

    const exist = await this.prisma.companyInvite.findFirst({
      where: {
        email: email,
        status: 'PENDING',
      },
    });
    const owner = await this.prisma.companyMember.findFirst({
      where: {
        companyId: exist?.companyId,
        role: 'OWNER',
      },
    });
    if (!exist) {
      throw new NotFoundException('Invite not found');
    }

    await this.prisma.$transaction([
      this.prisma.companyInvite.update({
        where: {
          id: exist.id,
        },
        data: {
          status: 'ACCEPTED',
        },
      }),
      this.prisma.companyMember.create({
        data: {
          userId: userId,
          companyId: exist.companyId,
          role: exist.role,
        },
      }),
      this.prisma.notification.updateMany({
        where: {
          inviteId,
          userId,
        },
        data: {
          type: 'TEAM_INVITE_ACCEPTED',
          category: 'TEAM',
          isRead: true,
        },
      }),
    ]);
    if (!owner) {
      throw new NotFoundException('Company owner not found');
    }
    await this.prisma.notification.create({
      data: {
        userId: owner?.userId,
        senderId: userId,
        type: 'TEAM_INVITE_ACCEPTED',
        message: `${user?.profile?.firstName} ได้ตอบรับคำเชิญเข้าร่วมทีมแล้ว`,
      },
    });

    return { message: 'Accepted successfully' };
  }

  async rejectInvite(email: string, userId: string, inviteId: string) {
    const exist = await this.prisma.companyInvite.findFirst({
      where: {
        email: email,
        status: 'PENDING',
      },
    });
    if (!exist) {
      throw new NotFoundException('Invite not found');
    }

    await this.prisma.companyInvite.update({
      where: {
        id: exist.id,
      },
      data: {
        status: 'DECLINED',
      },
    });
    await this.prisma.notification.updateMany({
      where: { inviteId, userId },
      data: { isRead: true },
    });
    return { message: 'Invite declined' };
  }

  async changeUserRole(
    userId: string,
    dto: { email: string; role: CompanyRole },
  ) {
    const canChange = await this.prisma.companyMember.findFirst({
      where: {
        userId: userId,
        role: {
          in: ['OWNER', 'ADMIN'],
        },
      },
    });
    if (!canChange) {
      throw new ForbiddenException('access denied');
    }
    const targetMember = await this.prisma.companyMember.findFirst({
      where: {
        companyId: canChange.companyId,
        user: {
          email: dto.email,
        },
      },
    });
    if (!targetMember) {
      throw new NotFoundException('ไม่พบสมาชิกในบริษัท');
    }
    const updated = this.prisma.companyMember.update({
      where: {
        id: targetMember.id,
      },
      data: {
        role: dto.role,
      },
    });
    return updated;
  }

  async removeMember(userId: string, email: string) {
    const canChange = await this.prisma.companyMember.findFirst({
      where: {
        userId: userId,
        role: {
          in: ['OWNER', 'ADMIN'],
        },
      },
    });
    if (!canChange) {
      throw new ForbiddenException('access denied');
    }
    const targetMember = await this.prisma.companyMember.findFirst({
      where: {
        companyId: canChange.companyId,
        user: {
          email: email,
        },
      },
    });
    if (!targetMember) {
      throw new NotFoundException('ไม่พบสมาชิกในบริษัท');
    }
    const deleted = this.prisma.companyMember.delete({
      where: {
        id: targetMember.id,
      },
    });
    return deleted;
  }
  async getCompany(userId: string) {
    const company = await this.prisma.company.findFirst({
      where: {
        OR: [{ createdBy: userId }, { members: { some: { userId } } }],
      },
      include: {
        members: {
          include: { company: true },
        },
      },
    });

    if (!company) throw new NotFoundException('Company not found');
    return company;
  }
}
