import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserFields1729458748869 implements MigrationInterface {
  name = 'AddUserFields1729458748869';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "firebaseUid" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD "displayName" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "displayName"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firebaseUid"`);
  }
}
