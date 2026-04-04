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
    return this.authService.register(body.email, body.password);
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
    const result = await this.authService.lineLogin(req.user);
    res.redirect(
      `http://localhost:3000/?token=${result.access_token}&isNew=${result.isNew}`,
    );
  }
}
