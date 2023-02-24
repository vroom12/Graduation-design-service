import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@lib/db/schemas/user.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
@Injectable()
export class AuthService {
  constructor(
    @Inject(User.name) private readonly userModel: ReturnModelType<typeof User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const i = user.find((v) => v.username === username);
    if (i) {
      const isMatch = await bcrypt.compare(password, i.password);
      if (isMatch) {
        const { password, ...result } = i;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }
}
