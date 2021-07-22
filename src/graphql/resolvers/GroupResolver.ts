import { Arg, Int, Mutation, Query } from "type-graphql";
import { GroupInputType } from "../input-types/InputTypes";
import { Group } from "../types/Group";
import { Student } from "../types/Student";

export default class GroupResolver {
  @Query(() => [Group] || Error, {
    nullable: true,
    description: "Return back list of groups.",
  })
  async groups(): Promise<Group[] | Error> {
    try {
      const students = await Group.find({ relations: ["students"] });
      return students;
    } catch (err) {
      console.error(err);
      return new Error(err);
    }
  }

  @Query(() => Group || Error, {
    nullable: true,
    description: "Returns group by ID.",
  })
  async group(@Arg("id", (type) => Int) id: number): Promise<Group | Error> {
    try {
      const group = await Group.find({ id });
      return group[0];
    } catch (err) {
      console.error(err);
      return new Error(err);
    }
  }

  @Mutation(() => Group || Error)
  async createGroup(@Arg("body") body: GroupInputType): Promise<Group | Error> {
    try {
      const { name, code, students = [] } = body;
      return await Group.create({ name, code, students }).save();
    } catch (err) {
      console.log(err);
      return new Error(err);
    }
  }

  @Mutation(() => Boolean || Error)
  async deleteGroup(
    @Arg("id", () => Int) id: number
  ): Promise<Boolean | Error> {
    try {
      const { affected } = await Group.delete({ id });
      if (affected !== 1) {
        return new Error("Group Not Found");
      }
      return true;
    } catch (err) {
      console.error(err);
      return new Error(err);
    }
  }
}
