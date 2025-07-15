import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobApplicationDto } from 'dto/create-job-application-dto';
import { UpdateJobApplicationDto } from 'dto/update-job-application.dto';
import { ApplicationStatus } from '@prisma/client';

interface CreateApplicationServiceDto {
  jobId: number;
  candidateId: string;
  resumeBuffer: Buffer;
}

@Injectable()
export class JobApplicationService {
  constructor(private prisma: PrismaService) {}

  async createApplication(data: CreateApplicationServiceDto) {
    const jobExists = await this.prisma.jobVacancy.findUnique({
      where: { id: data.jobId },
    });

    if (!jobExists) {
      throw new BadRequestException('Vaga não encontrada');
    }

    const existingApplication = await this.prisma.jobApplication.findUnique({
      where: {
        jobId_candidateId: {
          jobId: data.jobId,
          candidateId: data.candidateId,
        },
      },
    });

    if (existingApplication) {
      throw new BadRequestException('Você já se candidatou para esta vaga.');
    }

    return this.prisma.jobApplication.create({
      data: {
        jobId: data.jobId,
        candidateId: data.candidateId,
        resumeData: data.resumeBuffer,
        status: ApplicationStatus.PENDING,
      },
    });
  }

  async listApplicationsByJobId(jobId: number) {
    const jobExists = await this.prisma.jobVacancy.findUnique({
      where: { id: jobId },
    });

    if (!jobExists) {
      throw new NotFoundException('Vaga não encontrada');
    }

    const applications = await this.prisma.jobApplication.findMany({
      where: { jobId },
      orderBy: { createdAt: 'desc' },
    });

    return applications.map((app) => ({
      ...app,
      resumeData: app.resumeData ? Array.from(app.resumeData) : null,
    }));
  }

  async updateApplicationStatus(id: number, status: ApplicationStatus) {
    const applicationExists = await this.prisma.jobApplication.findUnique({
      where: { id },
    });

    if (!applicationExists) {
      throw new NotFoundException('Candidatura não encontrada');
    }

    return this.prisma.jobApplication.update({
      where: { id },
      data: { status },
    });
  }

  async getApplicationStatusForCandidate(jobId: number, candidateId: string) {
    return this.prisma.jobApplication.findUnique({
      where: {
        jobId_candidateId: {
          jobId: jobId,
          candidateId: candidateId,
        },
      },
      select: {
        id: true,
        status: true,
      },
    });
  }
}
