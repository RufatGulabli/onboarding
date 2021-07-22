import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import Student from "../types/Student";
import { StudentInputType } from "../input-types/InputTypes";
import pool from "../../db/connection";
import { studentMapper } from "../../utils/StudentMapper";

@Resolver()
export default class StudentResolver {
  @Query(() => [Student], {
    description: "Returns back the list of students.",
  })
  async students() {
    try {
      const { rows } = await pool.query(
        "SELECT Std.id, Std.fullName, Std.email, Std.age FROM students as Std;"
      );
      return rows.map(studentMapper);
    } catch (err) {
      console.error(err);
      return new Error(err);
    }
  }

  @Query(() => Student, {
    nullable: true,
    description: "Returns student by ID.",
  })
  async student(@Arg("id", () => Int) id: number) {
    try {
      const { rows } = await pool.query("SELECT * from students WHERE id=$1", [
        id,
      ]);
      return rows.map(studentMapper)[0];
    } catch (err) {
      console.error(err);
      return new Error(err);
    }
  }

  @Mutation(() => Boolean || Error)
  async createStudent(
    @Arg("body") body: StudentInputType
  ): Promise<Boolean | Error> {
    try {
      await pool.query(
        "INSERT INTO students(fullName, email, age) VALUES($1, $2, $3)",
        [body.fullname, body.email, body.age]
      );
      return true;
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
      await pool.query("DELETE FROM students WHERE id=$1", [id]);
      return true;
    } catch (err) {
      console.error(err);
      return new Error(err);
    }
  }
}
