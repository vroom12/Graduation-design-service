import { Prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export class Car {
  @Prop()
  @ApiProperty({ description: '车名' })
  name: string;
  @Prop()
  @ApiProperty({ description: '品牌' })
  brand: string;
  @Prop()
  @ApiProperty({ description: '价格' })
  price: number;
  @Prop()
  @ApiProperty({ description: '优惠价格' })
  discountPrice: number;
  @Prop()
  @ApiProperty({ description: '车型' })
  carType: string;
  @Prop()
  @ApiProperty({ description: '车牌号' })
  carNumber: string;
  @Prop()
  @ApiProperty({ description: '车颜色' })
  carColor: string;
  @Prop()
  @ApiProperty({ description: '车辆图片' })
  carImg: string;
}
