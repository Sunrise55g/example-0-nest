import {
  Column, CreateDateColumn, Entity, 
  JoinColumn, OneToMany, ManyToOne, 
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';


////
import { ProfileUsers } from './profile.users.entity';



@Entity('profile_roles')
export class ProfileRoles {

  ////
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;


  ////
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false })
  administrator: boolean;

  @Column({ default: false })
  moderator: boolean;


  ////
  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;


  ////
  @OneToMany(() => ProfileUsers, (profileUsers) => profileUsers.profileRole)
  profileUsers: ProfileUsers[];
  
}
