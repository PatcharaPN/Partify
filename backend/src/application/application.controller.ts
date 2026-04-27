import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplyJobDto } from './dto/apply-job.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}
  @Post()
  applyJob(@Body() body: ApplyJobDto) {
    return this.applicationService.applyJob(body.jobId, body.userId);
  }
  @Get('/:jobId/applications')
  application(@Param('jobId') jobId: string) {
    return this.applicationService.application(jobId);
  }
  @Get('status')
  getStatus(@Query('jobId') jobId: string, @Query('userId') userId: string) {
    return this.applicationService.getStatus(jobId, userId);
  }
}
