import { Module } from '@nestjs/common';
import { DrivingRecordController } from './driving-record.controller';

@Module({
  controllers: [DrivingRecordController],
})
export class DrivingRecordModule {}
