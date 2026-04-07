import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateJobDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsNumber()
  salary?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  workingHours?: string;

  @IsOptional()
  @IsString()
  workingDays?: string;

  @IsOptional()
  startDate?: Date;
}
