import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';

export class UpdateJobDto extends PartialType(CreateJobDto) {
  title?: string;
  description?: string;

  salary?: number;
  location?: string;

  workingHours?: string;
  workingDays?: string;
  startDate?: Date;
}
