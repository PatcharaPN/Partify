import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { create } from 'node:domain';

describe('AuthService - Login', () => {
  let service: AuthService;
  let prisma: any;

  beforeEach(async () => {
    const mockUser = {
      id: 1,
      email: 'test@test.com',
      password: await bcrypt.hash('password123', 10),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn().mockResolvedValue(mockUser),
              create: jest.fn().mockResolvedValue(mockUser),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mock_token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('AuthService - Login', () => {
    it('should return token', async () => {
      const result = await service.login('test@test.com', 'password123');
      expect(result).toHaveProperty('access_token');
    });

    it('should throw error if user not exist', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(null);

      await expect(
        service.login('notfound@test.com', 'password123'),
      ).rejects.toThrow('User was not found');
    });
    it('should throw error if password incorrect', async () => {
      await expect(
        service.login('test@test.com', 'password1234'),
      ).rejects.toThrow('Password Incorrect');
    });
  });
  // register test

  describe('AuthService - Register', () => {
    it('should register and return token', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(null);
      const result = await service.register('test@test.com', 'password123');
      expect(result).toHaveProperty('access_token');
    });
    it('should throw error if user already exist', async () => {
      await expect(
        service.register('test@test.com', 'password1234'),
      ).rejects.toThrow('User already exist');
    });
  });
});
