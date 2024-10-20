import type { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1728805307771 implements MigrationInterface {
  name = 'FirstMigration1728805307771';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "photo" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" text NOT NULL, "filename" character varying NOT NULL, "views" integer NOT NULL, "isPublished" boolean NOT NULL, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "aggregateId" character varying NOT NULL, "type" character varying NOT NULL, "payload" jsonb NOT NULL, "timestamp" TIMESTAMP NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "event"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "photo"`);
  }
}
