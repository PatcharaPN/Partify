import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  companyName!: string;

  @IsOptional()
  @IsUrl()
  companyImageURL?: string;

  @IsOptional()
  @IsString()
  companyBio?: string;

  @IsOptional()
  @IsString()
  companySize?: string;
}
