import { IsOptional, IsString, IsArray, isArray } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  experience?: string[];

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsArray()
  skills?: string[];

  @IsOptional()
  @IsArray()
  shifts?: string[];

  @IsOptional()
  @IsArray()
  availability?: string[];

  @IsOptional()
  @IsString()
  resumeUrl?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  birthDate?: string;
}
