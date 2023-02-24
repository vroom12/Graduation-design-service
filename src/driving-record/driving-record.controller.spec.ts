import { Test, TestingModule } from '@nestjs/testing';
import { DrivingRecordController } from './driving-record.controller';

describe('DrivingRecordController', () => {
  let controller: DrivingRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrivingRecordController],
    }).compile();

    controller = module.get<DrivingRecordController>(DrivingRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
