import { Arg, ID, Int, Mutation, ObjectType, Query } from "type-graphql";
import pool from "../../db/connection";
import { groups, students } from "../../mock/data";
import { groupMapper } from "../../utils/GroupMapper";
import { GroupInputType } from "../input-types/InputTypes";
import Group from "../types/Group";

export default class GroupResolver {
  @Query(() => [Group] || Error, {
    nullable: true,
    description: "Return back list of groups.",
  })
  async groups(): Promise<Group[] | Error> {
    try {
      const { rows } = await pool.query(
        "SELECT g.id, g.name, g.code FROM groups as g;"
      );
      return rows.map(groupMapper);
    } catch (err) {
      console.error(err);
      return new Error(err);
    }
  }

  @Query(() => Group || Error, {
    nullable: true,
    description: "Returns group by ID.",
  })
  async group(@Arg("id", (type) => Int) id: number) {
    try {
      const { rows } = await pool.query(
        "SELECT g.id, g.name, g.code FROM groups g WHERE id=$1",
        [id]
      );
      return rows.map(groupMapper)[0];
    } catch (err) {
      console.error(err);
      return new Error(err);
    }
  }

  @Mutation(() => Int || Error)
  async createGroup(@Arg("body") body: GroupInputType) {
    try {
      await pool.query("BEGIN");
      const { rows } = await pool.query(
        "INSERT INTO groups(name, code) VALUES($1, $2) RETURNING id",
        [body.name, body.code]
      );
      if (body.students.length) {
        for (const studentId of body.students) {
          /* 
            Here I have to check incoming studentId on the DB if it exists or not,
            but for the sake of simplicity I ignored it.
          */
          await pool.query(
            "INSERT INTO groups_students(group_id, student_id) VALUES($1, $2)",
            [rows[0].id, studentId]
          );
        }
      }
      await pool.query("COMMIT");
      return rows[0].id;
    } catch (err) {
      await pool.query("ROLLBACK");
      console.log(err);
      return new Error(err);
    }
  }

  @Mutation(() => Boolean || Error)
  async deleteGroup(
    @Arg("id", () => Int) id: number
  ): Promise<Boolean | Error> {
    try {
      const { rowCount } = await pool.query("DELETE FROM groups WHERE id=$1", [
        id,
      ]);
      if (rowCount !== 1) {
        return new Error("Group Not Found.");
      }
      return true;
    } catch (err) {
      console.error(err);
      return new Error(err);
    }
  }
}
