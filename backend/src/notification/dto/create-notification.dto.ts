import { ApplicationStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, IsOptional } from 'class-validator';
export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsEnum(ApplicationStatus)
  type!: ApplicationStatus;

  @IsString()
  @IsOptional()
  jobId: string;
}
