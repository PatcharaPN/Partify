import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto, @Req() req) {
    return this.companyService.upsertCompany(req.user.sub, createCompanyDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  getCompany(@Req() req) {
    return this.companyService.getCompany(req.user.sub);
  }
}
