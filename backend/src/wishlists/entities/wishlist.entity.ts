import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Wishlist extends BaseEntity {
  @ManyToOne(() => User, (user) => user.wishlists)
  user: User;

  @Column({ length: 250, nullable: false })
  name: string;

  @Column({ length: 1500 })
  description: string;

  @Column()
  image: string;

  @OneToMany(() => Wish, (wish) => wish.wishlist)
  items: Wish[];
}
