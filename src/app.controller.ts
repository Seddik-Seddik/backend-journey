import {Controller, Get, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {AuthGuard} from "@nestjs/passport";
import {AccessTokenGuard} from "@auth/guards/access-token.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  getHello(): string {
    return this.appService.getHello();

  }
}
