import { User } from '@lib/db/schemas/user.schema';
import { Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { ReturnModelType } from '@typegoose/typegoose';
import { mock } from 'mockjs';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @Inject(User.name) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  // 定时创建假数据
  // @Interval(100000)
  async createMock() {
    const mockData = mock({
      'list|2': [
        {
          name: '@cname',
          email: '@email',
          // 密码的长度为6-10位，且必须包含数字和字母
          password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/,
          // 用户名为0-10位的字母
          username: '@string("lower", 0, 10)',
          // 手机号为11位的数字
          phone: /^1[3456789]\d{9}$/,
          avatar: '',
        },
      ],
    });
    mockData.list.forEach(async (item: User) => {
      const random = mock('@integer(1, 1000)');
      item.avatar = `https://picsum.photos/id/${random}/200/200`;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(item.password, salt);
      item.password = hashPassword;
      await this.userModel.create(item);
    });
    console.log(mockData);
  }

  async findOneById(id: string) {
    return await this.userModel.findById(id);
  }

  async update(id: string, user: User) {
    const User = await this.userModel.findByIdAndUpdate(id, user);
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(user.password, salt);
      user.password = hashPassword;
      await User.save();
    }
    return User;
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async findOne(username: string) {
    return await this.userModel.find({ username });
  }

  async register(userDto: User) {
    return await this.userModel.create({
      ...userDto,
      password: await bcrypt.hash(userDto.password, 10),
    });
  }
}
