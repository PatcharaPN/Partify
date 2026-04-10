import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarksService {
  constructor(private prisma: PrismaService) {}
  async addBookmarks(userId: string, jobId: string) {
    try {
      await this.prisma.bookmark.create({
        data: {
          userId,
          jobId,
        },
      });
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new ConflictException('Already bookmarked');
      }
      throw e;
    }
  }

  async getAllBookmarks(userId: string) {
    return await this.prisma.bookmark.findMany({
      where: {
        userId,
      },
      include: {
        job: true,
      },
    });
  }

  async removeBookmark(jobId: string, userId: string) {
    return await this.prisma.bookmark.deleteMany({
      where: { userId, jobId },
    });
  }
}
