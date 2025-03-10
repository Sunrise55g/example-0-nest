import {
  Column, CreateDateColumn, Entity, JoinColumn,
  OneToMany, ManyToOne,
  PrimaryGeneratedColumn, Relation, UpdateDateColumn,
} from 'typeorm';


////
import { ProfileUsers } from 'src/profile/entities/profile.users.entity';
import { PartsItems } from 'src/parts/entities/parts.items.entity';


////
import { TicketsCategories } from './tickets.categories.entity';
import { TicketsItems } from './tickets.items.entity';


export enum InvoiceStatusEnum {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  CANCELED = 'CANCELED',
}

@Entity('tickets_invoices')
export class TicketsInvoices {

  ////
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;


  ////
  @Column({ name: 'tickets_category_id'})
  ticketsCategoryId: number;
  //
  @ManyToOne(() => TicketsCategories, (ticketsCategory) => ticketsCategory.ticketsInvoices, {onDelete: "CASCADE"})
  @JoinColumn({ name: 'tickets_category_id' })
  ticketsCategory: TicketsCategories;


  ////
  @Column({ name: 'customer_user_id'})
  customerUserId: number;
  //
  @ManyToOne(() => ProfileUsers, {onDelete: "CASCADE"})
  @JoinColumn({ name: 'customer_user_id' })
  customerUser: ProfileUsers;

  ////
  @Column({ name: 'employer_user_id', nullable: true })
  employerUserId: number;
  //
  @ManyToOne(() => ProfileUsers, {onDelete: "CASCADE"})
  @JoinColumn({ name: 'employer_user_id' })
  employerUser: ProfileUsers;

  
  ////
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  
  ////
  @Column({ type: 'enum', enum: InvoiceStatusEnum, default: InvoiceStatusEnum.OPEN })
  status: InvoiceStatusEnum;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  ////
  @OneToMany(() => TicketsItems, (ticketsItems) => ticketsItems.ticketsInvoice)
  ticketsItems: TicketsItems[];

}
