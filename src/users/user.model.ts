import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: '姓名' })
  name: string;
  @ApiProperty({ description: '邮箱' })
  email: string;
  @ApiProperty({ description: '密码', required: true })
  password: string;
  @ApiProperty({ description: '用户名', required: true })
  username: string;
  @ApiProperty({ description: '手机号' })
  phone: string;
}
