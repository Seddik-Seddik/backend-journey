import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@config/config.service';
import { SignInDto } from '@auth/dto/signin.dto';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "@user/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(
    doc: SignInDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { email, password } = doc;
    const user = await this.usersService.findOneBy({where: {email}})

    if (!user) {
      throw new UnauthorizedException();
    }
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.name };
    return await this.loadTokens(payload);
  }

  priv
  private async loadTokens(payload: { sub: string; username: string }) {
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getAuthConfig().refresh.maxAge,
      secret: this.configService.getAuthConfig().refresh.secret,
    })
    const user = await this.usersService.findOne(payload.sub)
    if(!user) {
        throw new UnauthorizedException({message: "User not found"});
    }

    await this.usersService.update(user, {refreshToken: refresh_token})
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.getAuthConfig().login.maxAge,
        secret: this.configService.getAuthConfig().login.secret,
      }),
      refresh_token: refresh_token,
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const {password, email} = createUserDto;
    const user = await this.usersService.findOneBy({where: {email}});

    if(user) {
      throw new UnauthorizedException({message: "User already exists"});
    }
    createUserDto.password = bcrypt.hashSync(password, 10);

    await this.usersService.createOne(createUserDto);
    const payload = { sub: createUserDto.id, username: createUserDto.firstName };
    return this.loadTokens(payload);

  }

  async refresh(refreshToken: string) {
    try {
      // console.log('refreshToken', refreshToken)
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.getAuthConfig().refresh.secret,
      });

      // console.log('payload', payload)
      const user = await this.usersService.findOne(payload.sub);

      if (!user) {
        throw new UnauthorizedException({message: "User not found"});
      }
      const newPayload = { sub: user.id, username: user.name };
      return this.loadTokens(newPayload);

    } catch {
      throw new UnauthorizedException();
    }
  }

}
