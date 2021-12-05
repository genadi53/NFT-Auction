import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  // Double,
} from "typeorm";
import { Bid } from "./Bid";
import { Currency } from "./Currency";
import { User } from "./User";

@ObjectType()
@Entity()
export class NFT extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field()
  @Column({ type: "float" })
  price!: number;

  @Field(() => Currency)
  @ManyToOne(() => Currency)
  currency!: Currency;

  @Field()
  @Column()
  mediaUrl!: string;

  @Field()
  @Column()
  details!: string;

  @Field()
  @Column({ default: 0 })
  likes!: number;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.nfts)
  owner: User;

  // @Field(() => Bid, { nullable: true })
  @OneToMany(() => Bid, (bid) => bid.nft)
  bids: Bid[];

  @Field()
  @Column({ default: false })
  featured!: boolean;

  @Field()
  @Column({ default: false })
  isLive!: boolean;

  //auction_end
  //   @Column({ type: "date" })
  //   date_only: string;

  //   @Column({ type: "timestamptz" }) // Recommended
  //   date_time_with_timezone: Date;

  //   @Column({ type: "timestamp" }) // Not recommended
  //   date_time_without_timezone: Date;

  @Field(() => String)
  @Column()
  auction_end: Date;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
