export interface IUser {
  phone: string;
  firstName: string;
  lastName: string;
  cin: string;
  birthDate?: Date;
  address?: string;

  get name(): string;
}
