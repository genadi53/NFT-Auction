import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class Input {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  currency: string;

  @Field()
  mediaUrl: string;

  @Field()
  details: string;

  @Field()
  auction_end: Date;
}

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
