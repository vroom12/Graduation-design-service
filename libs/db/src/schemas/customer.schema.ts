import { Prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  options: { allowMixed: 0 },
})
export class Customer {
  @Prop()
  @ApiProperty({ description: '姓名' })
  name: string;
  @Prop()
  @ApiProperty({ description: '手机号码' })
  phone: string;
  @Prop()
  @ApiProperty({ description: '地址' })
  address: string;
  @Prop()
  @ApiProperty({ description: '驾驶记录', type: () => [drivingRecordType] })
  drivingRecord: drivingRecordType[];
}

export class drivingRecordType {
  @Prop()
  @ApiProperty({ description: '开始时间' })
  startTime: string;
  @Prop()
  @ApiProperty({ description: '结束时间' })
  endTime: string;
  @Prop()
  @ApiProperty({ description: '车型' })
  carType: string;
  @Prop()
  @ApiProperty({ description: '车牌号' })
  carNumber: string;
  @Prop()
  @ApiProperty({ description: '车颜色' })
  carColor: string;
}
