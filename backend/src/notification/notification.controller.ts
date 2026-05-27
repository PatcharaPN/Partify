import { Controller, Get, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from '../auth/auth.guard';
import { JwtPayload } from '../types/jwt-payload.interface';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUserNotification(@Req() req: { user: JwtPayload }) {
    return this.notificationService.getUserNotification(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch('read-all')
  readAll(@Req() req: { user: JwtPayload }) {
    return this.notificationService.readAllNotifications(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/read')
  read(@Req() req: { user: JwtPayload }, @Param('id') notificationId: string) {
    return this.notificationService.readNotification(
      req.user.sub,
      notificationId,
    );
  }
}
