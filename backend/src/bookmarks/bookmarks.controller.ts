import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { BookmarksService } from './bookmarks.service';

@UseGuards(AuthGuard)
@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post(':jobId')
  addBookmark(@Param('jobId') jobId: string, @Request() req) {
    console.log('user', req.user);
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
