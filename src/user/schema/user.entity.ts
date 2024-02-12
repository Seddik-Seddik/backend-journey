import {IUser} from '@user/interface/user.interface';
import {BaseEntity} from '@base/schema/base.schema';
import {Column, Entity} from 'typeorm';

@Entity()
export class User extends BaseEntity implements IUser {
    @Column({unique: true, nullable: false})
    phone: string;

    @Column({nullable: false})
    firstName: string;


    @Column({nullable: false, unique: true,})
    email: string;

    @Column({nullable: false})
    lastName: string;

    @Column({unique: true, nullable: false, length: 8})
    cin: string;

    @Column({nullable: true})
    birthDate?: Date;

    @Column({nullable: true})
    address?: string;

    @Column({nullable: true})
    password: string;

    @Column({nullable: true})
    refreshToken: string;

    @Column({nullable: true})
    forgotPasswordToken: string;

    get name(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
