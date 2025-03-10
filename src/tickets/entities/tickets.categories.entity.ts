import {
  Column, CreateDateColumn, Entity, 
  JoinColumn, OneToMany, ManyToOne, 
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';


////
import { TicketsInvoices } from './tickets.invoices.entity';



@Entity('tickets_categories')
export class TicketsCategories {

  ////
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;


  ////
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  
  ////
  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;


  ////
  @OneToMany(() => TicketsInvoices, (ticketsInvoices) => ticketsInvoices.ticketsCategory)
  ticketsInvoices: TicketsInvoices[];
  
}
