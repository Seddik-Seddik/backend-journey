import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {ConfigService} from "@config/config.service";
import {UserService} from "@user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(private configService: ConfigService,
               private usersRepository: UserService) {
       super( { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: configService.getAuthConfig().login.secret });
   }

    async validate(payload) {
        console.log('payload',payload)
        const { id } = payload;

        const user = await this.usersRepository.findOneBy({
            where: {
                id: id,
            },
        });

        if (!user) {
            throw new UnauthorizedException('Login first to access this endpoint.');
        }

        return user;
    }
}