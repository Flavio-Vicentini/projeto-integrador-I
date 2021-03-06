import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class CreateUsers1632166747257 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "is_admin",
        type: "boolean",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
    await queryRunner.dropColumn("users", "is_admin");
  }
}
