import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  public saltRate = 10;
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async register(email: string, password: string) {
    const isExist = await this.prisma.user.findUnique({
      where: { email },
    });
    if (isExist) throw new BadRequestException('User already exist');

    const hash = await bcrypt.hash(password, this.saltRate);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hash,
      },
    });

    return { access_token: this.jwt.sign({ sub: user.id, email: user.email }) };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new UnauthorizedException('User was not found');

    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) throw new UnauthorizedException('Password Incorrect');

    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwt.sign(payload) };
  }

  async lineLogin(lineUser: {
    lineId: string;
    displayName: string;
    pictureUrl: string;
  }) {
    let user = await this.prisma.user.findUnique({
      where: { lineId: lineUser.lineId },
    });
    const isNew = !user;
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          lineId: lineUser.lineId,
        },
      });
      await this.prisma.profile.create({
        data: {
          name: lineUser.displayName,
          avatarUrl: lineUser.pictureUrl,
          userId: user.id,
        },
      });
    }
    const token = this.jwt.sign({ sub: user.id });
    return {
      access_token: token,
      isNew,
    };
  }
}
