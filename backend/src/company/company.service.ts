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
          id: userId,
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
      'PENDING',
      targetUser.id,
      undefined,
      invite.id,
    );
    return invite;
  }

  async getCompany(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          role: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User was not found');
      }

      if (user.role !== 'EMPLOYER') {
        throw new ForbiddenException('Only employer can access company');
      }

      const company = await this.prisma.company.findFirst({
        where: {
          createdBy: userId,
        },
        select: {
          id: true,
          category: true,
          companyBio: true,
          companyImageURL: true,
          companyName: true,
          companySize: true,
        },
      });

      return company;
    } catch (error) {
      console.error(error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to get company');
    }
  }
}
