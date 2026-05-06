import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users/me/profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getMyProfile(@Req() req) {
    const userId = req.user.sub;
    return this.profileService.getMe(userId);
  }

  @Patch()
  async upsertProfile(@Body() dto: UpdateProfileDto, @Req() req) {
    return this.profileService.upsertProfile(req.user.sub, dto);
  }
}
