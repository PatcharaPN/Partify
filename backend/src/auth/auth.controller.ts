import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body) {
    return this.authService.register(body.email, body.password, body.role);
  }
  @Post('login')
  login(@Body() body) {
    return this.authService.login(body.email, body.password);
  }
  @Get('line')
  @UseGuards(AuthGuard('line'))
  lineLogin() {}

  @Get('line/callback')
  @UseGuards(AuthGuard('line'))
  async lineCallback(@Req() req, @Res() res) {
    const result = await this.authService.oauthLogin(req.user);
    res.redirect(
      `http://localhost:3000/callback?token=${result.access_token}&isNew=${result.isNew}`,
    );
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req, @Res() res) {
    const result = await this.authService.oauthLogin(req.user);

    res.redirect(
      `http://localhost:3000/callback?token=${result.access_token}&isNew=${result.isNew}`,
    );
  }
}
