import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { User } from '@lib/db/schemas/user.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/auth/auth.local.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/auth/auth.jwt.guard';
// const token = 'token';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(User.name) private readonly userModel: ReturnModelType<typeof User>,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    const user = await this.userService.findOneById(id);
    return {
      code: 200,
      data: user,
      message: 'success',
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user._doc);
  }

  @Post('register')
  async register(@Body() body: User) {
    const user = await this.userService.register(body);
    return {
      code: 200,
      data: user,
      message: 'success',
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: User) {
    const user = await this.userService.update(id, body);
    return {
      code: 200,
      data: user,
      message: 'success',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const user = await this.userService.delete(id);
    return {
      code: 200,
      data: user,
      message: 'success',
    };
  }
}
