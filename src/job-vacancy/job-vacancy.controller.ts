import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JobVacancyService } from './job-vacancy.service';
import { CreateJobVacancyDto } from 'job-vacancy/dto/create-job-vacancy-dto';
import { AuthGuard } from 'firebase/auth.guard';
@Controller('job-vacancies')
export class JobVacancyController {
  constructor(private readonly jobVacancyService: JobVacancyService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createJobVacancyDto: CreateJobVacancyDto, @Req() req) {
    const dtoWithUser = {
      ...createJobVacancyDto,
      createdBy: req.user.uid,
    };

    return this.jobVacancyService.create(dtoWithUser);
  }

  @UseGuards(AuthGuard)
  @Get('vacancy')
  listVacanciesById(@Query('createdBy') createdBy?: string) {
    return this.jobVacancyService.listVacanciesById(createdBy);
  }

  @UseGuards(AuthGuard)
  @Get()
  listVacancies() {
    return this.jobVacancyService.listVacancies();
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.jobVacancyService.deleteVacancy(Number(id));
  }
}
