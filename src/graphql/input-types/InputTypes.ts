import { Field, ID, InputType, Int } from "type-graphql";
import Student from "../types/Student";

@InputType()
export class StudentInputType {
  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field((type) => Int)
  age: number;
}

@InputType()
export class GroupInputType {
  @Field({ description: "Name of the group" })
  name: string;

  @Field({ description: "Code of the group." })
  code: string;

  @Field((type) => [Int], { nullable: true })
  students?: [number];
}
