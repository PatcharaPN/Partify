import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
