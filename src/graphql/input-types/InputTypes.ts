import { Field, InputType, Int, ObjectType } from "type-graphql";
import { IsEmail, IsInt, Length, Max, Min } from "class-validator";
import { Student } from "../types/Student";

@InputType()
export class StudentInputType {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  @Length(5, 128, {
    message: () =>
      "$property length must be greater than $constraint1 and lower than $constraint2 symbols",
  })
  fullname: string;

  @Field()
  @IsEmail()
  email: string;

  @Field(() => Int)
  @IsInt()
  @Max(99)
  @Min(18)
  age: number;
}

@InputType()
export class GroupInputType {
  @Field({ description: "Name of the group" })
  @Length(3, 26)
  name: string;

  @Field({ description: "Code of the group." })
  @Length(3, 3)
  code: string;

  @Field(() => [StudentInputType], { nullable: true })
  students?: Student[];
}
