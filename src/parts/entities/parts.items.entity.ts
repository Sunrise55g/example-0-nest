import {
  Column, CreateDateColumn, Entity, JoinColumn,
  OneToMany, ManyToOne,
  PrimaryGeneratedColumn, Relation, UpdateDateColumn,
} from 'typeorm';


////
import { PartsCategories } from './parts.categories.entity';




@Entity('parts_items')
export class PartsItems {

  ////
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  ////
  @Column({ name: 'parts_category_id'})
  partsCategoryId: number;
  //
  @ManyToOne(() => PartsCategories, (parts_categories) => parts_categories.parts_items, {onDelete: "CASCADE"})
  @JoinColumn({ name: 'parts_category_id' })
  parts_categories: PartsCategories;

  
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

}
