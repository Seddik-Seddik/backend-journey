import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from '@user/user.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UpdateUserDto } from '@user/dto/update-user.dto';
import { User } from './schema/user.entity';
// import { UseJwtLoginAuth } from '@authentication/decorator/jwt-login.decorator';
// import { Role } from '@authorization/decorator/role.decorator';
// import { AuthenticatedUser } from '@authentication/decorator/authenticated-user.decorator';

@Controller('user')
// @UseJwtLoginAuth()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  search() {
    return this.service.search();
  }

  @Get(':userId')
  get(@Param('userId') userId: string) {
    return this.service.findOne(userId);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.service.createOne(dto);
  }

  @Patch()
  async update(
    @Body() dto: UpdateUserDto,
    user: User, // @AuthenticatedUser()
  ) {
    return await this.service.update(user, dto);
  }

  @Patch(':userId')
  // @Role(UserRole.admin)
  async updateUserById(
    @Body() updateUserdto: UpdateUserDto,
    @Param('userId') userId: string,
  ) {
    return await this.service.findOneAndUpdate(userId, updateUserdto);
  }

  @Delete(':userId')
  // @Role(UserRole.admin)
  async delete(@Param('userId') userId: string) {
    return await this.service.remove(userId);
  }
}
