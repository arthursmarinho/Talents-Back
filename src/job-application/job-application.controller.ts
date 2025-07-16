import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
  Get,
  Param,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JobApplicationService } from './job-application.service';
import { File as MulterFile } from 'multer';
import { UpdateJobApplicationDto } from 'job-application/dto/update-job-application.dto';
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

  @Get('job/:jobId')
  async getApplicationsByJobId(@Param('jobId', ParseIntPipe) jobId: number) {
    return this.jobApplicationService.listApplicationsByJobId(jobId);
  }

  @Patch(':id/status')
  async updateApplicationStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJobApplicationDto: UpdateJobApplicationDto,
  ) {
    return this.jobApplicationService.updateApplicationStatus(
      id,
      updateJobApplicationDto.status,
    );
  }

  @Get('status/:jobId/:candidateId')
  async getApplicationStatus(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Param('candidateId') candidateId: string,
  ) {
    return this.jobApplicationService.getApplicationStatusForCandidate(
      jobId,
      candidateId,
    );
  }
}
