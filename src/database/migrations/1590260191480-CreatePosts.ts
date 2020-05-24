import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePosts1590260191480 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'posts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'mensage',
            type: 'varchar',
          },
          {
            name: 'contact',
            type: 'varchar',
          },
          {
            name: 'owner_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'category_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'posts',
      new TableForeignKey({
        columnNames: ['owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'PostUser',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
    await queryRunner.createForeignKey(
      'posts',
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        name: 'PostCategory',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('posts', 'PostUser');
    await queryRunner.dropForeignKey('posts', 'PostCategory');
    await queryRunner.dropTable('posts');
  }
}
