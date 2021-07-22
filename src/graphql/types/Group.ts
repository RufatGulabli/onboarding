import { Field, ID, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { StudentInputType } from "../input-types/InputTypes";
import { Student } from "./Student";

@ObjectType()
@Entity()
export class Group extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 255, unique: true })
  name: string;

  @Field()
  @Column({ unique: true })
  code: string;

  @Field(() => [Student], { nullable: true })
  @ManyToMany(() => Student)
  @JoinTable()
  students: Student[];
}
