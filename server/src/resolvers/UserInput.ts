import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class UserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  avatar: string;
}

@ObjectType()
export class UserFieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
