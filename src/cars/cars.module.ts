import { DbModule } from '@lib/db';
import { Car } from '@lib/db/schemas/cars.schema';
import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';

@Module({
  imports: [DbModule.forFeature([Car])],
  controllers: [CarsController],
})
export class CarsModule {}
