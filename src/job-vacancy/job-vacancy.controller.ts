import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { JobVacancyService } from './job-vacancy.service';
import { CreateJobVacancyDto } from 'job-vacancy/dto/create-job-vacancy-dto';

@Controller('job-vacancies')
export class JobVacancyController {
  constructor(private readonly jobVacancyService: JobVacancyService) {}

  @Post()
  async create(@Body() createJobVacancyDto: CreateJobVacancyDto) {
    return this.jobVacancyService.create(createJobVacancyDto);
  }

  @Get('vacancy')
  listVacanciesById(@Query('createdBy') createdBy?: string) {
    return this.jobVacancyService.listVacanciesById(createdBy);
  }

  @Get()
  listVacancies() {
    return this.jobVacancyService.listVacancies();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.jobVacancyService.deleteVacancy(Number(id));
  }
}
