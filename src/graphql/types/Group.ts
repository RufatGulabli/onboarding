import { Field, ID, ObjectType } from "type-graphql";
import Student from "./Student";

@ObjectType()
export default class Group {
  @Field((type) => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field((type) => [Student])
  students: Student[];
}
