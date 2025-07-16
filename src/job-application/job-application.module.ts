import { Module } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { JobApplicationController } from './job-application.controller';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from 'firebase/auth.module';
@Module({
  imports: [AuthModule],
  controllers: [JobApplicationController],
  providers: [JobApplicationService, PrismaService],
})
export class JobApplicationModule {}
