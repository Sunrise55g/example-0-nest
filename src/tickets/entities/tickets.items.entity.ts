import {
  Column, CreateDateColumn, Entity, JoinColumn,
  OneToMany, ManyToOne,
  PrimaryGeneratedColumn, Relation, UpdateDateColumn,
} from 'typeorm';


////
import { PartsItems } from 'src/parts/entities/parts.items.entity';


////
import { TicketsInvoices } from './tickets.invoices.entity';




@Entity('tickets_items')
export class TicketsItems {

  ////
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;


  ////
  @Column({ name: 'tickets_invoice_id'})
  ticketsInvoiceId: number;
  //
  @ManyToOne(() => TicketsInvoices, (ticketsInvoice) => ticketsInvoice.ticketsItems, {onDelete: "CASCADE"})
  @JoinColumn({ name: 'tickets_invoice_id' })
  ticketsInvoice: TicketsInvoices;


  ////
  @Column({ name: 'parts_item_id'})
  partsItemId: number;
  //
  @ManyToOne(() => PartsItems, {onDelete: "CASCADE"})
  @JoinColumn({ name: 'parts_item_id' })
  partsItem: PartsItems;


  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

}
