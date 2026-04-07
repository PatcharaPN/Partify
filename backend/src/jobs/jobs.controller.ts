import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}
  @Post('/add')
  postJob(@Body() dto: CreateJobDto, @Req() req) {
    return this.jobsService.postJob(dto, req.user.sub);
  }
  @Get()
  getJobs(@Req() req) {
    return this.jobsService.getJobs();
  }
}
