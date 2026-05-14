import { BadRequestException, Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { error } from 'console';
import type { Multer } from 'multer';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class ResumeService {
  private supabase;
  constructor(private prisma: PrismaService) {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!,
    );
  }

  async uploadResume(file: Express.Multer.File, userId: string) {
    const fileName = `${userId}_${Date.now()}_${file.originalname}`;

    const { error } = await this.supabase.storage
      .from('resume')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) throw new BadRequestException(error.message);

    const { data } = this.supabase.storage
      .from('resume')
      .getPublicUrl(fileName);

    const resume = await this.prisma.resume.create({
      data: {
        userId: userId,
        url: data.publicUrl,
        fileName: fileName,
      },
    });

    return resume;
  }

  async removeResume(resumeId: string, userId: string) {
    const resume = await this.prisma.resume.findUnique({
      where: {
        id: resumeId,
      },
    });
    if (!resume || resume.userId !== userId) {
      throw new BadRequestException('Resume not found');
    }
    const { error } = await this.supabase.storage
      .from('resume')
      .remove([resume.fileName]);

    if (error) throw new BadRequestException(error.message);

    await this.prisma.resume.delete({
      where: { id: resumeId },
    });
    return { message: 'Resume removed successfully' };
  }
}
