import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateServiceOrders1637184560715 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "service_orders",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "id_client",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "id_external_user",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "id_open_so_user",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "protocol",
            type: "varchar",
          },
          {
            name: "defect",
            type: "varchar",
          },
          {
            name: "status",
            type: "varchar",
          },
          {
            name: "open_date",
            type: "timestamp",
          },
          {
            name: "close_date",
            type: "timestamp",
          },
          {
            name: "requester_name",
            type: "varchar",
          },
          {
            name: "requester_phone",
            type: "varchar",
          },
          {
            name: "so_pdf",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKClient_SO",
            referencedTableName: "clients",
            referencedColumnNames: ["id"],
            columnNames: ["id_client"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKExternal_user_SO",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["id_external_user"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKOpen_so_user_SO",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["id_open_so_user"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("service_orders");
  }
}
