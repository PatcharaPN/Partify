import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      omit: {
        password: true,
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

  async upsertProfile(userId: string, dto: UpdateProfileDto) {
    return await this.prisma.profile.upsert({
      where: { userId },
      update: dto,
      create: {
        userId,
        ...dto,
      },
    });
  }
}
