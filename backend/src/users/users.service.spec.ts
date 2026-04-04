import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'generated/prisma/enums';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
            },
            profile: {
              upsert: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return user when user id valid', async () => {
    const mockUser = {
      id: '33ebf804',
      email: 'test@test.com',
      password: '1234',
      role: Role.CANDIDATE,
      createdAt: new Date(),
    };
    jest
      .spyOn(service['prisma'].user, 'findUnique')
      .mockResolvedValueOnce(mockUser);
    const result = await service.getProfile('33ebf804');

    expect(result).toEqual(mockUser);
  });

  it('should throw error when user Id Invalid', async () => {
    jest
      .spyOn(service['prisma'].user, 'findUnique')
      .mockResolvedValueOnce(null);

    await expect(service.getProfile('invalid-id')).rejects.toThrow(
      'User not found',
    );
  });
});
