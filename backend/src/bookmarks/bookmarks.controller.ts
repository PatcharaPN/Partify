import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post(':jobId')
  addBookmark(@Param('jobId') jobId: string, @Request() req) {
    return this.bookmarksService.addBookmarks(req.user.sub, jobId);
  }

  @Get()
  getAllBookmarks(@Request() req) {
    return this.bookmarksService.getAllBookmarks(req.user.sub);
  }

  @Delete(':jobId')
  removeBookmark(@Param('jobId') jobId: string, @Request() req) {
    return this.bookmarksService.removeBookmark(req.user.sub, jobId);
  }
}
