import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobApplicationDto } from 'dto/create-job-application-dto';
@Injectable()
export class JobApplicationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createJobApplicationDto: CreateJobApplicationDto) {
    const application = await this.prisma.jobApplication.create({
      data: {
        jobId: createJobApplicationDto.jobId,
        candidateId: createJobApplicationDto.candidateId,
        resumeUrl: createJobApplicationDto.resumeUrl,
      },
    });
    return application;
  }

  async findAll() {
    return this.prisma.jobApplication.findMany();
  }
}
