import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@config/config.service";
import {UserService} from "@user/user.service";
import {Injectable, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token') {
    constructor(private configService: ConfigService,
                private userService: UserService) {
        super( { jwtFromRequest: ExtractJwt.fromBodyField("refresh"), secretOrKey: configService.getAuthConfig().refresh.secret });
    }

    async validate(payload) {
        console.log('payload',payload)
        const { id } = payload;

        const user = await this.userService.findOneBy({
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