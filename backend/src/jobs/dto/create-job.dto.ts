import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  IsDate,
  ValidateNested,
  Min,
  MaxLength,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateJobDto {
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
  @IsBoolean()
  isActive?: boolean;

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

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  companyImageURL?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  overviewPictureURL?: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(0)
  @IsOptional()
  skills?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(100)
  province?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  district?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  locationDetail?: string;
}
