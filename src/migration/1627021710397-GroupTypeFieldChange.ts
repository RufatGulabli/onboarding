import { MigrationInterface, QueryRunner } from "typeorm";

export class GroupTypeFieldChange1627021710397 implements MigrationInterface {
  name = "GroupTypeFieldChange1627021710397";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group" RENAME COLUMN "name" TO "title"`
    );
    await queryRunner.query(
      `ALTER TABLE "group" RENAME CONSTRAINT "UQ_8a45300fd825918f3b40195fbdc" TO "UQ_326ae60c2267f5780f1ecc09fac"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "group" RENAME CONSTRAINT "UQ_326ae60c2267f5780f1ecc09fac" TO "UQ_8a45300fd825918f3b40195fbdc"`
    );
    await queryRunner.query(
      `ALTER TABLE "group" RENAME COLUMN "title" TO "name"`
    );
  }
}
