import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AuthService - Login', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn().mockResolvedValue({
                id: 1,
                email: 'test@test.com',
                password: await bcrypt.hash('password123', 10),
              }),
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
  });

  it('should return token', async () => {
    const result = await service.login('test@test.com', 'password123');
    expect(result).toHaveProperty('access_token');
  });

  it('should throw error if user not exist', async () => {
    jest
      .spyOn(service['prisma'].user, 'findUnique')
      .mockResolvedValueOnce(null);

    await expect(
      service.login('notfound@test.com', 'password123'),
    ).rejects.toThrow('User was not found');
  });
});
