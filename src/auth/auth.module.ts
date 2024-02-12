import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@config/config.service';
import {JwtStrategy} from "@auth/strategy/jwt.strategy";
import {RefreshTokenStrategy} from "@auth/strategy/refresh-token.strategy";

@Module({
  controllers: [AuthController],

  imports: [
    UserModule,
    JwtModule.register({
      global: true,
    }),
  ],

  providers: [AuthService, ConfigService, JwtStrategy,RefreshTokenStrategy],
})
export class AuthModule {}
