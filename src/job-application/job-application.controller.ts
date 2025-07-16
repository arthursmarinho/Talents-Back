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
import { UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from 'firebase/auth.guard';
@Controller('job-applications')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('resume'))
  async uploadResume(
    @UploadedFile() file: MulterFile,
    @Body() body: { jobId: string; candidateId: string },
    @Req() req,
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

  @UseGuards(AuthGuard)
  @Get('job/:jobId')
  async getApplicationsByJobId(@Param('jobId', ParseIntPipe) jobId: number) {
    return this.jobApplicationService.listApplicationsByJobId(jobId);
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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
