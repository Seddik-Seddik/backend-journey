import {
    IsEmail, IsNotEmpty,
} from 'class-validator';
import {Type} from 'class-transformer';

export class SignInDto {
    @Type(() => String)
    @IsEmail({}, {message: 'invalid email'})
    email: string;

    @Type(() => String)
    @IsNotEmpty({message: 'password is required'})
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
