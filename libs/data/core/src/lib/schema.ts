import { appSchema, Model, tableSchema } from '@nozbe/watermelondb';
import {
  date,
  field,
  readonly
} from '@nozbe/watermelondb/decorators';
import {
  createTable,
  schemaMigrations
} from '@nozbe/watermelondb/Schema/migrations';

export const schemaAndMigrations = {
  schema: appSchema({
    version: 3,
    tables: [
      tableSchema({
        name: 'communities',
        columns: [
          { name: 'name', type: 'string' },
          { name: 'deleted', type: 'boolean' },
          { name: 'created_at', type: 'number' },
          { name: 'updated_at', type: 'number' }
        ]
      }),
      tableSchema({
        name: 'deleted',
        columns: [
          { name: 'deleted_id', type: 'string' },
          { name: 'created_at', type: 'number' }
        ]
      })
    ]
  }),
  migrations: schemaMigrations({
    migrations: [
      {
        toVersion: 2,
        steps: [
          createTable({
            name: 'communities',
            columns: [
              { name: 'name', type: 'string' },
              { name: 'created', type: 'number' }
            ]
          })
        ]
      },
      {
        toVersion: 3,
        steps: [
          createTable({
            name: 'deleted',
            columns: [
              { name: 'deleted_id', type: 'string' },
              { name: 'created', type: 'number' }
            ]
          })
        ]
      }
    ]
  })
};

export class Community extends Model {
  static table = 'communities';
  @field('name') name: string;
  @field('deleted') deleted: boolean;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}

export class Deleted extends Model {
  static table = 'deleted';
  @field('deleted_id') deletedId: string;
  @readonly @date('created_at') createdAt;
}