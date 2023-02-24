import { Customer } from '@lib/db/schemas/customer.schema';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';

type pageType = {
  page: number;
  pageSize: number;
};

@Controller('customer')
export class CustomerController {
  constructor(
    @Inject(Customer.name)
    private readonly customerModel: ReturnModelType<typeof Customer>,
  ) {}

  @Get()
  async findAll() {
    const customers = await this.customerModel.find();
    return {
      code: 200,
      data: customers,
      message: 'success',
    };
  }

  @Get('page')
  async findPage2(@Body() body: pageType) {
    const { page, pageSize } = body;
    const customers = await this.customerModel
      .find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    const total = await this.customerModel.countDocuments();
    const totalPage = Math.ceil(total / pageSize);
    return {
      code: 200,
      data: {
        total, // 总数
        totalPage, // 总页数
        page, // 当前页
        pageSize, // 每页条数
        customers, // 当前页数据
      },
      message: 'success',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const customer = await this.customerModel.findById(id);
    return {
      code: 200,
      data: customer,
      message: 'success',
    };
  }

  @Post('insert')
  async create(@Body() body: Customer) {
    const createdCustomer = await this.customerModel.create({ ...body });
    return {
      code: 200,
      data: createdCustomer,
      message: 'success',
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: Customer) {
    const updatedCustomer = await this.customerModel.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
      },
    );
    return {
      code: 200,
      data: updatedCustomer,
      message: 'success',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedCustomer = await this.customerModel.findByIdAndDelete(id);
    return {
      code: 200,
      data: deletedCustomer,
      message: 'success',
    };
  }
}
