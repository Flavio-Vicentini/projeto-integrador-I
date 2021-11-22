import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAddress1637535068122 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "address",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "id_client",
            type: "uuid",
          },
          {
            name: "type",
            type: "varchar",
          },
          {
            name: "street_address",
            type: "varchar",
          },
          {
            name: "number",
            type: "varchar",
          },
          {
            name: "district",
            type: "varchar",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "zip_code",
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
            name: "FKClient_Address",
            referencedTableName: "clients",
            referencedColumnNames: ["id"],
            columnNames: ["id_client"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("address");
  }
}
