import { Field, ID, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Student extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "varchar", length: 128 })
  fullname: string;

  @Field()
  @Column({ unique: true, length: 256 })
  email: string;

  @Field(() => Int)
  @Column({ type: "int" })
  age: number;
}
