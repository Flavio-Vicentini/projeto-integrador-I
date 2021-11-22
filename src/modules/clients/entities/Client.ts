import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Address } from "./Address";

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

  @OneToMany((type) => Address, (address) => address.client)
  @JoinColumn()
  address: Address[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Client };
