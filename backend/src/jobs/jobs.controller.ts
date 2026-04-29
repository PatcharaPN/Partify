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
import { JobOwnerGuard } from './jobs-owner.guard';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}
  @UseGuards(AuthGuard)
  @Post('/add')
  postJob(@Body() dto: CreateJobDto, @Req() req) {
    return this.jobsService.postJob(dto, req.user.sub);
  }

  @Get()
  getJobs(@Req() req) {
    return this.jobsService.getJobs();
  }
  @UseGuards(AuthGuard)
  @Get('/owner/:id')
  getRelatedJobs(@Param('id') ownerId) {
    return this.jobsService.getJobsByOwnerId(ownerId);
  }

  @UseGuards(AuthGuard)
  @Get('/recommend')
  recomandJobsBySkills(@Req() req) {
    return this.jobsService.recomandJobsBySkills(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  getJobsByID(@Param('id') jobId, @Req() req) {
    return this.jobsService.getJobsByID(jobId, req.user);
  }

  @UseGuards(JobOwnerGuard)
  @Patch('/:id')
  upsertJobById(@Param('id') jobId, @Body() dto) {
    return this.jobsService.upsertJobById(jobId, dto);
  }
}
