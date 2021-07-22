import { createUnionType } from "type-graphql";
import Group from "./Group";
import Student from "./Student";

export const GroupOrStudentUnionType = createUnionType({
  name: "GroupOrStudentUnionType",
  types: () => [Group, Student] as const,
  resolveType: (value) => {
    if ("code" in value) {
      return Group;
    }
    if ("fullname" in value) {
      return Student;
    }
    return undefined;
  },
});
