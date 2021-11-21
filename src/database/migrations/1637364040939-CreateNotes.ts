import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNotes1637364040939 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "notes",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "id_order",
            type: "uuid",
          },
          {
            name: "observations",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKSO_Notes",
            referencedTableName: "service_orders",
            referencedColumnNames: ["id"],
            columnNames: ["id_order"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("notes");
  }
}
