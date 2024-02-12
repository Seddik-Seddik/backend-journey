import { Module } from '@nestjs/common';
import { User } from '@user/schema/user.entity';
import { UserService } from '@user/user.service';
import { UserController } from '@user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
  ],
  exports: [UserService],
})
export class UserModule { }
