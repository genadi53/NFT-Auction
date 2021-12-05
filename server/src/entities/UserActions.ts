import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

export enum ActionTypes {
  BUY = "Buy",
  LIKE = "Like",
  BID = "Bid",
  SELL = "Sell",
}

@ObjectType()
@Entity()
export class UserAction extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.actions)
  user: User;

  @Field()
  @Column({
    type: "enum",
    enum: ActionTypes,
  })
  actions: ActionTypes;
}
