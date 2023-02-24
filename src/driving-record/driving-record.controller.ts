import { Customer, drivingRecordType } from '@lib/db/schemas/customer.schema';
import { Controller, Post, Inject, Body, Delete, Patch } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';

@Controller('driving-record')
export class DrivingRecordController {
  constructor(
    @Inject(Customer.name)
    private readonly customerModel: ReturnModelType<typeof Customer>,
  ) {}

  @Post('findOne')
  async findOne(@Body() body: { id: string }) {
    const i = await this.customerModel.findById(body.id);
    return {
      code: 200,
      data: i.drivingRecord,
      message: 'success',
    };
  }

  // 清空该用户的驾驶记录
  @Post('clear')
  async clear(@Body() body: { id: string }) {
    const i = await this.customerModel.findById(body.id);
    i.drivingRecord.length = 0;
    await i.save();
    return {
      code: 200,
      data: true,
      message: 'success',
    };
  }

  // 添加一条驾驶记录
  @Post('add')
  async add(@Body() body: { id: string; drivingRecord: drivingRecordType[] }) {
    const i = await this.customerModel.findById(body.id);
    i.drivingRecord.push(...body.drivingRecord);
    await i.save();
    return {
      code: 200,
      data: true,
      message: 'success',
    };
  }

  // 删除一条驾驶记录
  @Delete('delete')
  async delete(@Body() body: { id: string; carNumber: string }) {
    const i = await this.customerModel.findById(body.id);
    i.drivingRecord = i.drivingRecord.filter(
      (v) => v.carNumber !== body.carNumber,
    );
    await i.save();
    return {
      code: 200,
      data: true,
      message: 'success',
    };
  }

  // 修改一条驾驶记录
  @Patch('update')
  async update(
    @Body()
    body: {
      id: string;
      carNumber: string;
      drivingRecord: drivingRecordType;
    },
  ) {
    const i = await this.customerModel.findById(body.id);
    i.drivingRecord = i.drivingRecord.map((v) => {
      if (v.carNumber === body.carNumber) {
        return body.drivingRecord;
      }
      return v;
    });
    await i.save();
    return {
      code: 200,
      data: true,
      message: 'success',
    };
  }

  // 修改多条驾驶记录
  @Patch('updateMany')
  async updateMany(
    @Body() body: { id: string; drivingRecord: drivingRecordType[] },
  ) {
    const i = await this.customerModel.findById(body.id);
    i.drivingRecord = body.drivingRecord;
    await i.save();
    return {
      code: 200,
      data: true,
      message: 'success',
    };
  }

  // 根据传入的字段动态查询驾驶记录
  @Post('find')
  async find(@Body() body: { id: string; query: any }) {
    const i = await this.customerModel.findById(body.id);
    const { query } = body;
    const drivingRecord = i.drivingRecord.filter((v) => {
      for (const key in query) {
        if (v[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
    return {
      code: 200,
      data: drivingRecord,
      message: 'success',
    };
  }
}
