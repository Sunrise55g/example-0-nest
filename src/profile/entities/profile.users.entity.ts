import {
  Column, CreateDateColumn, Entity, JoinColumn,
  OneToMany, ManyToOne,
  PrimaryGeneratedColumn, Relation, UpdateDateColumn,
} from 'typeorm';


////
import { ProfileRoles } from './profile.roles.entity';




@Entity('profile_users')
export class ProfileUsers {

  ////
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  ////
  @Column({ name: 'profile_role_id', nullable: true })
  profileRoleId: number;
  //
  @ManyToOne(() => ProfileRoles, (profileRole) => profileRole.profileUsers, {onDelete: "CASCADE"})
  @JoinColumn({ name: 'profile_role_id' })
  profileRole: ProfileRoles;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({name: 'password_hash', select: false, nullable: true })
  passwordHash: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  
  ////
  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

}
