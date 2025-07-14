import { Test, TestingModule } from '@nestjs/testing';
import { JobVacancyController } from './job-vacancy.controller';

describe('JobVacancyController', () => {
  let controller: JobVacancyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobVacancyController],
    }).compile();

    controller = module.get<JobVacancyController>(JobVacancyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
