import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface CreateApplicationDto {
  jobId: number;
  candidateId: number;
  resumeBuffer: Buffer;
}

@Injectable()
export class JobApplicationService {
  constructor(private prisma: PrismaService) {}

  async createApplication(data: CreateApplicationDto) {
    const jobExists = await this.prisma.jobVacancy.findUnique({
      where: { id: data.jobId },
    });

    if (!jobExists) {
      throw new BadRequestException('Vaga não encontrada');
    }

    return this.prisma.jobApplication.create({
      data: {
        jobId: data.jobId,
        candidateId: data.candidateId,
        resumeData: data.resumeBuffer,
      },
    });
  }
}
