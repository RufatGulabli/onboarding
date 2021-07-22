import { Arg, Query } from "type-graphql";
import { GroupOrStudentUnionType } from "../types/GroupOrStudent";
import { Student } from "../types/Student";
import { Group } from "../types/Group";
import { getRepository } from "typeorm";
export default class UnionResolver {
  @Query(() => [GroupOrStudentUnionType] || Error)
  async getRandomStudentOrGroup(
    @Arg("name") name: string
  ): Promise<Array<typeof GroupOrStudentUnionType> | Error> {
    try {
      const students = await getRepository(Student)
        .createQueryBuilder("student")
        .where("student.fullname ilike :name", { name: `%${name}%` })
        .getMany();
      const groups = await getRepository(Group)
        .createQueryBuilder("group")
        .where("group.name ilike :name", { name: `%${name}%` })
        .getMany();
      return [...students, ...groups];
    } catch (err) {
      console.error(err);
      return new Error(err);
    }
  }
}
