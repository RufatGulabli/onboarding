import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Student } from "../types/Student";
import { StudentInputType } from "../input-types/InputTypes";

@Resolver()
export default class StudentResolver {
  @Query(() => [Student], {
    description: "Returns back the list of students.",
  })
  async students(): Promise<Student[] | Error> {
    try {
      const students = await Student.find();
      return students;
    } catch (err) {
      console.error(err);
      return new Error(err);
    }
  }

  @Query(() => Student || Error, {
    nullable: true,
    description: "Returns student by ID.",
  })
  async student(@Arg("id", () => Int) id: number): Promise<Student | Error> {
    try {
      const student = await Student.find({ id });
      return student[0];
    } catch (err) {
      console.error(err);
      return new Error(err);
    }
  }

  @Mutation(() => Student || Error)
  async createStudent(
    @Arg("body") body: StudentInputType
  ): Promise<Student | Error> {
    try {
      const { fullname, email, age } = body;
      return await Student.create({ fullname, email, age }).save();
    } catch (err) {
      console.error(err);
      return new Error(err);
    }
  }

  @Mutation(() => Boolean || Error)
  async deleteStudent(
    @Arg("id", () => Int) id: number
  ): Promise<Boolean | Error> {
    try {
      const { affected } = await Student.delete({ id });
      if (affected !== 1) {
        return new Error("Student Not Found");
      }
      return true;
    } catch (err) {
      console.error(err);
      return new Error(err);
    }
  }
}
