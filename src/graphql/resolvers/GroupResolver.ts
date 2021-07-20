import { Arg, Int, Mutation, Query } from "type-graphql";
import { groups, students } from "../../mock/data";
import { GroupInputType } from "../input-types/InputTypes";
import Group from "../types/Group";

export default class GroupResolver {
  @Query(() => [Group], {
    nullable: true,
    description: "Return back list of groups.",
  })
  groups() {
    return groups;
  }

  @Query(() => Group, {
    nullable: true,
    description: "Returns group by ID.",
  })
  group(@Arg("id", (type) => Int) id: number) {
    return groups.find((s) => s.id === id);
  }

  @Mutation(() => Group || Error)
  createGroup(@Arg("body") body: GroupInputType): Group | Error {
    try {
      const newGroup = new Group();
      newGroup.id = Math.floor(Math.random() * 100);
      newGroup.name = body.name;
      newGroup.code = body.code;
      const groupOfStudents = [];
      for (const item of body.students) {
        for (const student of students) {
          if (student.id === item) {
            groupOfStudents.push(student);
          }
        }
      }
      newGroup.students = groupOfStudents;
      groups.push(newGroup);
      return newGroup;
    } catch (err) {
      console.log(err);
      return new Error(err);
    }
  }

  @Mutation(() => Boolean || Error)
  deleteGroup(@Arg("id", () => Int) id: number): Boolean | Error {
    try {
      const groupIndex = groups.findIndex((s) => s.id === id);
      if (groupIndex === -1) {
        return false;
      }
      groups.splice(groupIndex, 1);
      return true;
    } catch (err) {
      return new Error(err);
    }
  }
}
