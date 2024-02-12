import { BaseEntity } from '@base/schema/base.schema';
import { DeepPartial, FindManyOptions } from 'typeorm';

export interface IBaseService<Schema extends BaseEntity> {
  createOne(
    createDto: DeepPartial<Schema>,
    ...args: unknown[]
  ): Promise<Schema>;

  createMany(
    createDto: DeepPartial<Schema>[],
    ...args: unknown[]
  ): Promise<Schema[]>;

  find(filter: FindManyOptions<Schema>, ...args: unknown[]): Promise<Schema[]>;

  findAll(...args: unknown[]): Promise<Schema[]>;

  findOne(id: Schema['id'], ...args: unknown[]): Promise<Schema>;

  findOneBy(
    filter: FindManyOptions<Schema>,
    ...args: unknown[]
  ): Promise<Schema>;

  update(
    document: Schema,
    updateDto: DeepPartial<Schema>,
    ...args: unknown[]
  ): Promise<Schema>;

  findOneAndUpdate(
    id: Schema['id'],
    updateDto: DeepPartial<Schema>,
    ...args: unknown[]
  ): Promise<Schema>;

  remove(id: Schema['id'], ...args: unknown[]): Promise<{ count: number }>;

  // todo: add support for soft delete
  // restore(id: Schema['_id']): Promise<{ count: number }>;
}
