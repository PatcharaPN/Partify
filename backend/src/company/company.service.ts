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

@Injectable()
export class CompanyService {
  constructor(readonly prisma: PrismaService) {}
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
        where: { userId },
        create: {
          ...dto,
          userId,
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

      const company = await this.prisma.company.findUnique({
        where: {
          userId,
        },
        select: {
          id: true,
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
