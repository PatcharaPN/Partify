import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [JwtModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
