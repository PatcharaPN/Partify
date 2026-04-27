import { IsString } from 'class-validator';

export class ApplyJobDto {
  @IsString()
  jobId!: string;

  @IsString()
  userId!: string;
}
