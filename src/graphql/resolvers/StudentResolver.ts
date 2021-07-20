import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import Student from "../types/Student";
import { students } from "../../mock/data";
import { StudentInputType } from "../input-types/InputTypes";

@Resolver()
export default class StudentResolver {
  @Query(() => [Student], {
    description: "Returns back the list of students.",
  })
  students() {
    return students;
  }

  @Query(() => Student, {
    nullable: true,
    description: "Returns student by ID.",
  })
  student(@Arg("id", () => Int) id: number) {
    return students.find((s) => s.id === id);
  }

  @Mutation(() => Student || Error)
  createStudent(@Arg("body") body: StudentInputType): Student | Error {
    try {
      const newStudent = new Student();
      newStudent.id = Math.ceil(Math.random() * 100);
      newStudent.fullName = body.fullName;
      newStudent.email = body.email;
      newStudent.age = body.age;
      students.push(newStudent);
      return newStudent;
    } catch (err) {
      console.error(err);
      return new Error(err);
    }
  }

  @Mutation(() => Boolean || Error)
  deleteStudent(@Arg("id", () => Int) id: number): Boolean | Error {
    try {
      const studentIndex = students.findIndex((s) => s.id === id);
      if (studentIndex === -1) {
        return false;
      }
      students.splice(studentIndex, 1);
      return true;
    } catch (err) {
      console.error(err);
      return new Error(err);
    }
  }
}
