import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('increment')
  book_id: number;

  @Column({type: 'text'})
  name: string;

  @Column()
  pages: number;

  @Column()
  year: number;

  @Column()
  price: number;

  @Column({type: 'text'})
  country: string;

  @Column({ type: 'text' })
  author: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  category: string;

  @Column({ type: 'text' })
  nashriyot: string;

  @Column({ type: 'text' })
  img_url: string;
}