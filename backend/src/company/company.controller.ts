import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { AuthGuard } from '../auth/auth.guard';
import { InviteMemberDto } from './dto/invite-member.dto';
import { CompanyRole } from '@prisma/client';
import { Request } from 'express';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto, @Req() req) {
    return this.companyService.upsertCompany(req.user.sub, createCompanyDto);
  }

  @UseGuards(AuthGuard)
  @Get('/members')
  getAllMember(@Req() req) {
    return this.companyService.getAllMembers(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('invite')
  inviteMember(@Req() req, @Body() dto: InviteMemberDto) {
    return this.companyService.inviteMember(req.user.sub, dto);
  }

  @UseGuards(AuthGuard)
  @Get()
  getCompany(@Req() req) {
    return this.companyService.getCompany(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch('member/role')
  async changeMemberRole(
    @Req() req,
    @Body() dto: { email: string; role: CompanyRole },
  ) {
    return this.companyService.changeUserRole(req.user.sub, dto);
  }

  @UseGuards(AuthGuard)
  @Delete('member/delete')
  deleteMember(@Req() req, @Body('email') email: string) {
    return this.companyService.removeMember(req.user.sub, email);
  }

  @UseGuards(AuthGuard)
  @Post('invite/:inviteId/accept')
  acceptInvite(@Req() req, @Param('inviteId') inviteId: string) {
    return this.companyService.acceptInvite(
      req.user.email,
      req.user.sub,
      inviteId,
    );
  }

  @UseGuards(AuthGuard)
  @Post('invite/:inviteId/decline')
  rejectInvite(@Req() req, @Param('inviteId') inviteId: string) {
    return this.companyService.rejectInvite(
      req.user.email,
      req.user.sub,
      inviteId,
    );
  }
}
