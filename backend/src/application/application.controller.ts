import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplyJobDto } from './dto/apply-job.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}
  @UseGuards(AuthGuard)
  @Post()
  applyJob(@Req() req, @Body() dto: ApplyJobDto) {
    return this.applicationService.applyJob(dto.jobId, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post(':id/approve')
  approveApplication(@Param('id') applicationId: string, @Req() req: any) {
    const employerId = req.user.id;

    return this.applicationService.approveApplication(
      applicationId,
      employerId,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/owner')
  getApplicationsByOwner(@Req() req) {
    return this.applicationService.getApplicationsByOwner(req.user.sub);
  }
  @Get()
  application(@Query('jobId') jobId: string) {
    return this.applicationService.application(jobId);
  }

  @UseGuards(AuthGuard)
  @Get('/jobs/:jobId')
  getApplication(@Param('jobId') jobId: string, @Req() req) {
    return this.applicationService.getJobWithApplications(jobId, req.user.sub);
  }
  // @Get('/:jobId/applications')
  // application(@Param('jobId') jobId: string) {
  //   return this.applicationService.application(jobId);
  // }
  @Get('status')
  getStatus(@Query('jobId') jobId: string, @Query('userId') userId: string) {
    return this.applicationService.getStatus(jobId, userId);
  }
  @UseGuards(AuthGuard)
  @Get('list-application')
  candidateApplication(@Req() req) {
    return this.applicationService.candidateApplication(req.user.sub);
  }
}
