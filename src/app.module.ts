import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JobVacancyController } from './job-vacancy/job-vacancy.controller';
import { JobVacancyService } from './job-vacancy/job-vacancy.service';
import { JobApplicationController } from './job-application/job-application.controller';
import { JobApplicationService } from './job-application/job-application.service';
import { JobApplicationModule } from './job-application/job-application.module';
import { JobVacancyModule } from 'job-vacancy/job-vacancy.module';
import { AuthModule } from 'firebase/auth.module';

@Module({
  imports: [PrismaModule, JobApplicationModule, JobVacancyModule, AuthModule],
  controllers: [AppController, JobVacancyController, JobApplicationController],
  providers: [AppService, JobVacancyService, JobApplicationService],
})
export class AppModule {}
