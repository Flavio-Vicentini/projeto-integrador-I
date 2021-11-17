import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("clients")
class Client {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  cpf_cnpj: string;

  @Column()
  telephone: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Client };
