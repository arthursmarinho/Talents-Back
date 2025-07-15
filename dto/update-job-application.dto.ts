import { IsEnum, IsInt } from 'class-validator';
import { ApplicationStatus } from '@prisma/client';

export class UpdateJobApplicationDto {
  @IsInt()
  id: number;

  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}
