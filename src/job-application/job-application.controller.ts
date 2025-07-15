import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JobApplicationService } from './job-application.service';
import { File as MulterFile } from 'multer';

@Controller('job-applications')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('resume'))
  async uploadResume(
    @UploadedFile() file: MulterFile,
    @Body() body: { jobId: string; candidateId: string },
  ) {
    if (!file) {
      throw new BadRequestException('Arquivo não enviado');
    }

    const jobIdNum = Number(body.jobId);

    if (isNaN(jobIdNum)) {
      throw new BadRequestException('jobId inválido');
    }

    return await this.jobApplicationService.createApplication({
      jobId: jobIdNum,
      candidateId: body.candidateId,
      resumeBuffer: file.buffer,
    });
  }
}
