import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  // PrimaryColumn,
} from "typeorm";
import { Currency } from "./Currency";
import { User } from "./User";
import { NFT } from "./NFT";

@ObjectType()
@Entity()
export class Bid extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  amount!: number;

  // @Field(() => Currency)
  @ManyToOne(() => Currency)
  currency!: Currency;

  // @ManyToMany(() => Category)
  //   @JoinTable()
  //   categories: Category[];

  // @Field()
  // // @PrimaryColumn()
  // userId!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.bids)
  user: User;

  // @Field()
  // // @PrimaryColumn()
  // postId!: number;

  @Field(() => NFT)
  @ManyToOne(() => NFT, (nft) => nft.bids, {
    onDelete: "CASCADE",
  })
  nft: NFT;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
