import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Client } from "./Client";

@Entity("address")
class Address {
  @PrimaryColumn()
  id: string;

  @ManyToOne((type) => Client, (client) => client.address)
  @JoinColumn({ name: "id_client" })
  client: Client;
  @Column()
  id_client: string;

  @Column()
  type: string;

  @Column()
  street_address: string;

  @Column()
  number: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  zip_code: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Address };
