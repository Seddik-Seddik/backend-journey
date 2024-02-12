import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { User } from '@user/schema/user.entity';
import { BaseService } from '@base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends BaseService<User> {
  protected readonly logger: Logger;

  constructor(
    @InjectRepository(User)
    protected model: Repository<User>,
  ) {
    super(model, User.name);
  }

  search() {
    // TODO: Add pagination & search
    return this.findAll()
  }
}
