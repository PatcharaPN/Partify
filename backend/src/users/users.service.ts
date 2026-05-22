import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      omit: {
        password: true,
      },
      include: {
        profile: true,
        company: {
          select: {
            companyImageURL: true,
            companyName: true,
            companyBio: true,
          },
        },
        resume: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async findAll() {
    const user = this.prisma.user.findMany({
      omit: {
        password: true,
      },
    });
    return user;
  }

  async updateUser(userId: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('User not found');

    return await this.prisma.user.update({
      where: { id: userId },
      omit: {
        password: true,
      },
      data: dto,
    });
  }
}
