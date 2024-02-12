import { IUser } from '@user/interface/user.interface';
import {
  IsDate,
  IsEmail, IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  MaxDate,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import {PrimaryColumn} from "typeorm";

export class CreateUserDto implements IUser {
  @PrimaryColumn()
    id: string;


  @IsEmail()
  email: string;

  @IsPhoneNumber('TN', { message: 'invalid phone number' })
  phone: string;

  @IsString()
  @MaxLength(32, { message: 'first name must be at most 32 characters long' })
  firstName: string;

  @IsString()
  @MaxLength(32, { message: 'last name must be at most 32 characters long' })
  lastName: string;

  @IsOptional()
  @IsNumberString()
  @Length(8, 8, { message: 'CIN must have exactly 8 digits' })
  cin: string;

  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date(Date.now() - 18 * 365 * 24 * 3600 * 1000), {
    message: 'you must be at least 18 years old in order to participate',
  })
  @IsOptional()
  birthDate?: Date;

  @IsString()
  @IsOptional()
  address?: string;


  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  password: string;

  constructor(
    email: string,
    phone: string,
    firstName: string,
    lastName: string,
    cin: string,
    birthDate: Date,
    address: string,
    password: string,

  ) {
    this.email = email;
    this.phone = phone;
    this.firstName = firstName;
    this.lastName = lastName;
    this.cin = cin;
    this.birthDate = birthDate;
    this.address = address;
    this.password = password;

  }

  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
