import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { User } from "./User";

export enum Roles {
  DEFAULT = "default",
  ADMIN = "admin",
}

@ObjectType()
@Entity()
export class UserRole extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToMany(() => User, (user) => user.role)
  user: User;

  @Field()
  @Column({
    type: "enum",
    enum: Roles,
  })
  role: Roles;
}
