import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async upsertProfile(userId: string, dto: UpdateProfileDto) {
    return this.prisma.profile.upsert({
      where: { userId },

      update: {
        name: dto.name,
        phone: dto.phone,
        summary: dto.summary,
        experience: dto.experience,
        skills: dto.skills,
        shifts: dto.shifts,
        availability: dto.availability,
        resumeUrl: dto.resumeUrl,
        avatarUrl: dto.avatarUrl,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
      },

      create: {
        userId,
        name: dto.name ?? 'New User',
        phone: dto.phone,
        summary: dto.summary,
        experience: dto.experience ?? [],
        skills: dto.skills ?? [],
        shifts: dto.shifts ?? [],
        availability: dto.availability ?? [],
        resumeUrl: dto.resumeUrl,
        avatarUrl: dto.avatarUrl,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
      },
    });
  }
}
