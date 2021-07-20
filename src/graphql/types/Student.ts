import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
export default class Student {
  @Field((type) => ID)
  id: number;

  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field((type) => Int)
  age: number;
}
