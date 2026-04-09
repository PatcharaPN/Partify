import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}
  async postJob(dto: CreateJobDto, companyId: string) {
    const existing = await this.prisma.job.findFirst({
      where: { title: dto.title, companyId },
    });
    if (existing) {
      throw new BadRequestException('งานนี้มีอยู่ในระบบแล้ว');
    }
    const { skills, ...jobData } = dto;
    return this.prisma.job.create({
      data: { ...jobData, companyId },
    });
  }
  async getJobs() {
    const jobs = await this.prisma.job.findMany({
      include: {
        skills: true,
      },
    });
    return jobs;
  }
  async getJobsByID(jobId: string) {
    const jobs = await this.prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });
    return jobs;
  }
}
