import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {BaseEntity} from '@base/schema/base.schema';
import {IBaseService} from '@base/interface/base-service.interface';
import {DeepPartial, FindManyOptions, FindOptionsWhere, Repository,} from 'typeorm';

@Injectable()
export class BaseService<Schema extends BaseEntity>
  implements IBaseService<Schema>
{
  protected readonly logger: Logger;

  constructor(
    protected readonly model: Repository<Schema>,
    protected readonly schemaName: string,
  ) {
    this.logger = new Logger(schemaName);
  }

  async createMany(
    createDto: DeepPartial<Schema>[],
    ..._: unknown[]
  ): Promise<Schema[]> {
    const documents = await this.model.create(createDto);
    this.logger.log(`created new ${this.schemaName}`);
    return documents;
  }

  async createOne(
    createDto: DeepPartial<Schema>,
    ..._: unknown[]
  ): Promise<Schema> {
    const documents = await this.model.create(createDto);
    await this.model.save(documents);
    this.logger.log(`Created new ${this.schemaName}`);

    return documents[0];
  }

  async find(
    filter: FindManyOptions<Schema> = {},
    ..._: unknown[]
  ): Promise<Schema[]> {
    return this.model.find(filter);
  }

  async findAll(..._: unknown[]): Promise<Schema[]> {
    return this.find();
  }

  async findOne(id: Schema['id'], ..._: unknown[]): Promise<Schema> {
    const document = await this.model.findOne({
      where: { id } as FindOptionsWhere<Schema>,
    });
    if (document === null)
      throw new NotFoundException(
        `No ${this.schemaName} was found with this id`,
      );
    return document;
  }

  async findOneBy(
    filter: FindManyOptions<Schema> = {},
    ..._: unknown[]
  ): Promise<Schema> {
    return await this.model.findOne(filter);
  }

  async update(
    document: Schema,
    updateDto: DeepPartial<Schema>,
    ..._: unknown[]
  ): Promise<Schema> {
    Object.assign(document, updateDto);
    await this.model.save(document);
    this.logger.log(`Successfully updated ${this.schemaName} ${document.id}`);
    return document;
  }

  async findOneAndUpdate(
    id: Schema['id'],
    updateDto: DeepPartial<Schema>,
    ..._: unknown[]
  ): Promise<Schema> {
    const document = await this.findOne(id);
    return await this.update(document, updateDto);
  }

  async remove(id: Schema['id'], ..._: unknown[]): Promise<{ count: number }> {
    const { affected } = await this.model.delete({
      id,
    } as FindOptionsWhere<Schema>);

    if (affected < 1)
      throw new NotFoundException(
        `No ${this.schemaName} was found with this id`,
      );
    this.logger.log(`Successfully deleted ${this.schemaName} ${id}`);
    return { count: affected };
  }

}
