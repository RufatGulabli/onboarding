import { Arg, Query } from "type-graphql";
import { GroupOrStudentUnionType } from "../types/GroupOrStudent";
import { groups, students } from "../../mock/data";
import pool from "../../db/connection";
import { studentMapper } from "../../utils/StudentMapper";
import { groupMapper } from "../../utils/GroupMapper";

export default class UnionResolver {
  @Query(() => [GroupOrStudentUnionType] || Error)
  async getRandomStudentOrGroup(
    @Arg("name") name: string
  ): Promise<Array<typeof GroupOrStudentUnionType> | Error> {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM students WHERE fullname ILIKE $1",
        [name]
      );
      const matchedStudents = rows.map(studentMapper);
      const { rows: result } = await pool.query(
        "SELECT * FROM groups WHERE name ILIKE $1",
        [name]
      );
      const matchedGroups = result.map(groupMapper);
      return [...matchedStudents, ...matchedGroups];
    } catch (err) {
      console.error(err);
      return new Error(err);
    }
  }
}
