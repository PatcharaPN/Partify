import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto, SkillDto } from './create-job.dto';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateJobDto extends PartialType(CreateJobDto) {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  responsibilities?: string;

  @IsOptional()
  @IsString()
  qualifications?: string;

  // Salary
  @IsOptional()
  @IsNumber()
  @Min(0)
  salaryMin?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  salaryMax?: number;

  @IsOptional()
  @IsBoolean()
  salaryNegotiable?: boolean;

  @IsOptional()
  @IsString()
  currency?: string;

  // Job Info
  @IsOptional()
  @IsString()
  jobType?: string;

  @IsOptional()
  @IsString()
  workStyle?: string;

  @IsOptional()
  @IsString()
  experienceLevel?: string;

  @IsOptional()
  @IsNumber()
  experienceYears?: number;

  @IsOptional()
  @IsString()
  educationLevel?: string;

  @IsOptional()
  @IsNumber()
  positions?: number;

  // Schedule
  @IsOptional()
  @IsString()
  workingHours?: string;

  @IsOptional()
  @IsString()
  workingDays?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  closingDate?: Date;

  // Benefits
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  benefits?: string[];

  // Location
  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  urgency?: string;

  // Company
  @IsString()
  companyId!: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  companyImageURL?: string;

  // Skills
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  skills?: SkillDto[];
}
