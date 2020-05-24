import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Category from './Category';
import User from './User';

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  mensage: string;

  @Column()
  contact: string;

  @ManyToOne(() => User, user => user.post_owner, { eager: true })
  @JoinColumn({ name: 'owner_id' })
  user: User;

  @Column()
  owner_id: string;

  @ManyToOne(() => Category, category => category.post_category, {
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Post;
