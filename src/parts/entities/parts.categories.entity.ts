import {
  Column, CreateDateColumn, Entity, 
  JoinColumn, OneToMany, ManyToOne, 
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';


////
import { PartsItems } from './parts.items.entity';



@Entity('parts_categories')
export class PartsCategories {

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
  @OneToMany(() => PartsItems, (partsItems) => partsItems.partsCategory)
  partsItems: PartsItems[];
  
}
