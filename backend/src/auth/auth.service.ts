import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, User } from '../../generated/prisma/client';

@Injectable()
export class AuthService {
  public saltRate = 10;
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async register(email: string, password: string, role: Role) {
    const isExist = await this.prisma.user.findUnique({
      where: { email },
    });
    if (isExist) throw new BadRequestException('User already exist');

    const hash = await bcrypt.hash(password, this.saltRate);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hash,
        role,
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

  async oauthLogin(input: {
    provider: 'google' | 'line';
    providerId: string;
    email?: string | null;
    name?: string;
    picture?: string;
  }) {
    // 1. หา account
    let account = await this.prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: input.provider,
          providerAccountId: input.providerId,
        },
      },
      include: { user: true },
    });

    if (account) {
      return this.generateToken(account.user, false);
    }

    // 2. หา user จาก email (merge)
    let user: User | null = null;

    if (input.email) {
      user = await this.prisma.user.findUnique({
        where: { email: input.email },
      });
    }

    // 3. create user ถ้าไม่มี
    let isNew = false;

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: input.email ?? null,
        },
      });

      isNew = true;

      // create profile
      await this.prisma.profile.create({
        data: {
          name: input.name ?? 'Unknown',
          avatarUrl: input.picture ?? null,
          userId: user!.id,
        },
      });
    }

    // 4. create account link
    await this.prisma.account.create({
      data: {
        provider: input.provider,
        providerAccountId: input.providerId,
        userId: user!.id,
      },
    });

    return this.generateToken(user, isNew);
  }
  private generateToken(user: any, isNew: boolean) {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = this.jwt.sign(payload);

    return {
      access_token: token,
      isNew,
    };
  }
}
