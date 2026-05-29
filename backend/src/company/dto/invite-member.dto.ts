import { IsEmail, IsEnum } from 'class-validator';
import { CompanyRole } from '@prisma/client';

export class InviteMemberDto {
  @IsEmail()
  email!: string;

  @IsEnum(CompanyRole)
  role!: CompanyRole;
}
