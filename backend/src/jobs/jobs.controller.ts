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
  Query,
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

  @Get('search')
  seachJob(
    @Query('skills') skills?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('jobType') jobType?: string,
  ) {
    return this.jobsService.searchJob(
      skills ? skills.split(',') : [],
      Number(page) || 1,
      search,
      jobType,
    );
  }

  @Get('/related/:id')
  fetchRelatedJobs(@Param('id') jobId: string) {
    return this.jobsService.fetchRelatedJobs(jobId);
  }

  @UseGuards(AuthGuard)
  @Get('/owner')
  getJobsByOwner(@Req() req) {
    return this.jobsService.getJobsByOwnerId(req.user.sub);
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

  @UseGuards(AuthGuard, JobOwnerGuard)
  @Patch('/:id')
  upsertJobById(@Param('id') jobId, @Body() dto) {
    return this.jobsService.upsertJobById(jobId, dto);
  }
}
