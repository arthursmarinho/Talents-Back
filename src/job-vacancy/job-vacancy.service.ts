import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobVacancyDto } from 'dto/create-job-vacancy-dto';
@Injectable()
export class JobVacancyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createJobVacancyDto: CreateJobVacancyDto) {
    const vacancy = await this.prisma.jobVacancy.create({
      data: {
        jobName: createJobVacancyDto.jobName,
        jobDesc: createJobVacancyDto.jobDesc,
        jobReq: createJobVacancyDto.jobReq,
        createdBy: createJobVacancyDto.createdBy,
      },
    });
    return vacancy;
  }

  listVacancies(createdBy?: string) {
    const where = createdBy ? { createdBy } : {};
    return this.prisma.jobVacancy.findMany({
      where,
      include: {
        applications: true,
      },
    });
  }

  async deleteVacancy(id: number) {
    return this.prisma.jobVacancy.delete({ where: { id } });
  }
}
