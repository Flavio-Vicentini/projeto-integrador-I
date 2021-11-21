import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { ServiceOrder } from "./ServiceOrder";

@Entity("notes")
class Note {
  @PrimaryColumn()
  id: string;

  @ManyToOne((type) => ServiceOrder, (order) => order.notes)
  @JoinColumn({ name: "id_order" })
  order: ServiceOrder;
  @Column()
  id_order: string;

  @Column()
  observations: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Note };
