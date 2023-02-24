import { DbModule } from '@lib/db';
import { Customer } from '@lib/db/schemas/customer.schema';
import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';

@Module({
  imports: [DbModule.forFeature([Customer])],
  controllers: [CustomerController],
})
export class CustomerModule {}
