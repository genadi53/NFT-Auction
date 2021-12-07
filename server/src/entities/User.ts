import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Bid } from "./Bid";
import { NFT } from "./NFT";
// import { UserAction } from "./UserActions";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column({ nullable: true })
  avatar!: string;

  @Column()
  password!: string;

  @Field()
  @Column({ default: false })
  verified!: boolean;

  @Field()
  @Column({ default: 0 })
  nftsCount!: number;

  @Field()
  @Column({ default: false })
  isAdmin!: boolean;

  // @Field(() => NFT)
  @OneToMany(() => NFT, (nft) => nft.owner)
  nfts: NFT[];

  // @Field(() => Bid)
  @OneToMany(() => Bid, (bid) => bid.user)
  bids: Bid[];

  // @Field(() => [UserAction], { nullable: true })
  // @OneToMany(() => UserAction, (action) => action.user)
  // actions: UserAction[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
