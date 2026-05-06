import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthGuard)
  @Post()
  async pushNotification(
    @Param('id') userId: string,
    @Body() body: CreateNotificationDto,
  ) {
    return this.notificationService.pushNotification(
      body.message,
      body.type,
      userId,
      body.jobId,
    );
  }
  @UseGuards(AuthGuard)
  @Get()
  async getUserNotification(@Req() req) {
    return this.notificationService.getUserNotification(req.user.sub);
  }
}
