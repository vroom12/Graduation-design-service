import { DbModule } from '@lib/db';
import { User } from '@lib/db/schemas/user.schema';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DbModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UserService, AuthService, JwtService],
  exports: [UserService],
})
export class UsersModule {}
