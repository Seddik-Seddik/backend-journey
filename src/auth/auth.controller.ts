import {Body, Controller, Post, HttpCode, HttpStatus, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {SignInDto} from "@auth/dto/signin.dto";
import {CreateUserDto} from "@user/dto/create-user.dto";
import {RefreshTokenGuard} from "@auth/guards/refresh-token.guard";


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('signup')
    signUp(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
        return this.authService.signUp(createUserDto);
    }
    @Post('refresh')
    @UseGuards(RefreshTokenGuard)
    refresh(@Body("refresh") refreshToken: string) {
        return this.authService.refresh(refreshToken);
    }
}
