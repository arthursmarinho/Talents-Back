import { Module } from '@nestjs/common';
import { JobVacancyService } from './job-vacancy.service';
import { JobVacancyController } from './job-vacancy.controller';
import { AuthModule } from 'firebase/auth.module';
@Module({
  imports: [AuthModule],
  controllers: [JobVacancyController],
  providers: [JobVacancyService],
})
export class JobVacancyModule {}
