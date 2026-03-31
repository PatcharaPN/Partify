import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  public saltRate = 10;
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async register(email: string, password: string) {
    const hash = await bcrypt.hash(password, this.saltRate);

    return this.prisma.user.create({
      data: {
        email,
        password: hash,
      },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new Error('User was not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Password Incorrect');

    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwt.sign(payload) };
  }
}
