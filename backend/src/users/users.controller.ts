import {
  Body,
  Controller,
  Get,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get('/me')
  getProfile(@Request() req) {
    return this.usersService.getProfile(req.user.sub);
  }
  @Put('/edit')
  updateUser(@Request() req, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(req.user.sub, dto);
  }
}
