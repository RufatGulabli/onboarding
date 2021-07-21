import { Arg, Query, createUnionType } from "type-graphql";
import Student from "../types/Student";
import Group from "../types/Group";
import { GroupOrStudentUnionType } from "../types/GroupOrStudent";
import { groups, students } from "../../mock/data";

export default class UnionResolver {
  @Query(() => [GroupOrStudentUnionType])
  getRandomStudentOrGroup(
    @Arg("name") name: string
  ): Array<typeof GroupOrStudentUnionType> {
    const matchedStudents = students.filter(
      (s) => s.fullName.toLowerCase() === name.toLowerCase()
    );
    const matchedGroups = groups.filter(
      (s) => s.name.toLowerCase() === name.toLowerCase()
    );
    return [...matchedStudents, ...matchedGroups];
  }
}
