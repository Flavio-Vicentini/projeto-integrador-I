import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Client } from "../../clients/entities/Client";
import { User } from "../../users/entities/User";

@Entity("service_orders")
class ServiceOrder {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: "id_client" })
  client: Client;
  @Column()
  id_client: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_external_user" })
  external_user: User;
  @Column()
  id_external_user: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_open_so_user" })
  open_so_user: User;
  @Column()
  id_open_so_user: string;

  @Column()
  protocol: string;

  @Column()
  defect: string;

  @Column()
  status: string;

  @Column()
  open_date: Date;

  @Column()
  close_date: Date;

  @Column()
  requester_name: string;

  @Column()
  requester_phone: string;

  @Column()
  so_pdf: string;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { ServiceOrder };
