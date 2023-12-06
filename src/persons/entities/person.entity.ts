import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('persons')
export class Person {
  @PrimaryGeneratedColumn('increment')
  person_id: number;

  @Column({type: 'text'})
  first_name: string;

  @Column({type: 'text'})
  last_name: string;

  @Column({type: 'text'})
  phone: string;

  @Column({type: 'text'})
  email: string;

  @Column({type: 'text'})
  hashed_password: string;

  @Column({ default: false })
  is_admin: boolean;

  @Column({ default: false })
  is_block: boolean;
}