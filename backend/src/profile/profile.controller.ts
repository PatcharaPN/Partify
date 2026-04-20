import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users/me/profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  getMyProfile(@Req() req) {
    const userId = req.user.sub;
    return this.profileService.getMe(userId);
  }

  @Patch()
  updateMyProfile(@Req() req, @Body() dto: UpdateProfileDto) {
    const userId = req.user.sub;
    return this.profileService.upsertProfile(userId, dto);
  }
}
