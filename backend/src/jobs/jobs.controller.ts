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
import { JobOwnerGuard } from './jobs-owner.guard';
import { AuthGuard } from '../auth/auth.guard';
import { OptionalAuthGuard } from '../auth/optional-auth.guard';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}
  @UseGuards(AuthGuard)
  @Post('/add')
  postJob(@Body() dto: CreateJobDto, @Req() req) {
    return this.jobsService.postJob(dto, req.user.sub);
  }
  @UseGuards(OptionalAuthGuard)
  @Get()
  getJobs(@Req() req) {
    return this.jobsService.getJobs(req.user?.sub);
  }

  @Get('/related/:id')
  fetchRelatedJobs(@Param('id') jobId: string) {
    return this.jobsService.fetchRelatedJobs(jobId);
  }

  @UseGuards(AuthGuard)
  @Get('/owner/:id')
  getRelatedJobs(@Param('id') ownerId: string) {
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
