import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobOwnerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>() as any;
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException();
    }
    const jobId = request.params.id;

    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      select: { companyId: true },
    });
    if (!job) {
      throw new NotFoundException();
    }

    if (job.companyId !== user.id) {
      throw new ForbiddenException();
    }
    return true;
  }
}
