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
import { CreateJobVacancyDto } from 'dto/create-job-vacancy-dto';

@Controller('job-vacancies')
export class JobVacancyController {
  constructor(private readonly jobVacancyService: JobVacancyService) {}

  @Post()
  async create(@Body() createJobVacancyDto: CreateJobVacancyDto) {
    return this.jobVacancyService.create(createJobVacancyDto);
  }

  @Get('vacancy')
  listVacancies(@Query('createdBy') createdBy?: string) {
    return this.jobVacancyService.listVacancies(createdBy);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.jobVacancyService.deleteVacancy(Number(id));
  }
}
