import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          include: {
            resume: true,
            notifications: {
              select: {
                isRead: true,
                message: true,
                sender: true,
                type: true,
                createdAt: true,
              },
            },
          },
        },
      },
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
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        summary: dto.summary,
        workingHours: dto.workingHours,
        workingDays: dto.workingDays,
        province: dto.province,
        district: dto.district,
        skills: dto.skills,
        shifts: dto.shifts,
        availability: dto.availability,
        preferredJobTypes: dto.preferredJobTypes,
        preferredCategories: dto.preferredCategories,
        expectedSalary: dto.expectedSalary,
        experience: dto.experience,
        gender: dto.gender,
        nationality: dto.nationality,
        resumeUrl: dto.resumeUrl,
        avatarUrl: dto.avatarUrl,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
      },

      create: {
        userId,
        firstName: dto.firstName ?? 'New User',
        lastName: dto.lastName,
        phone: dto.phone,
        summary: dto.summary,
        workingHours: dto.workingHours,
        province: dto.province,
        district: dto.district,
        skills: dto.skills ?? [],
        shifts: dto.shifts ?? [],
        availability: dto.availability ?? [],
        preferredJobTypes: dto.preferredJobTypes ?? [],
        preferredCategories: dto.preferredCategories ?? [],
        expectedSalary: dto.expectedSalary,
        experience: dto.experience ?? [],
        gender: dto.gender,
        nationality: dto.nationality,
        resumeUrl: dto.resumeUrl,
        avatarUrl: dto.avatarUrl,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
      },
    });
  }
}
