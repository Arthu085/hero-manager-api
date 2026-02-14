import { MigrationInterface, QueryRunner } from "typeorm";

export class FixProjectStatusEnum1771102462207 implements MigrationInterface {
    name = 'FixProjectStatusEnum1771102462207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_b63b5da7da7eeff64e1a6a9b45"`);
        await queryRunner.query(`ALTER TYPE "public"."project_project_status_enum" RENAME TO "project_project_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."project_project_status_enum" AS ENUM('PEDING', 'IN_PROGRESS', 'COMPLETED')`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "project_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "project_status" TYPE "public"."project_project_status_enum" USING "project_status"::"text"::"public"."project_project_status_enum"`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "project_status" SET DEFAULT 'PEDING'`);
        await queryRunner.query(`DROP TYPE "public"."project_project_status_enum_old"`);
        await queryRunner.query(`CREATE INDEX "IDX_b63b5da7da7eeff64e1a6a9b45" ON "project" ("name", "project_status") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_b63b5da7da7eeff64e1a6a9b45"`);
        await queryRunner.query(`CREATE TYPE "public"."project_project_status_enum_old" AS ENUM('pending', 'in_progress', 'completed')`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "project_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "project_status" TYPE "public"."project_project_status_enum_old" USING "project_status"::"text"::"public"."project_project_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "project_status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."project_project_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."project_project_status_enum_old" RENAME TO "project_project_status_enum"`);
        await queryRunner.query(`CREATE INDEX "IDX_b63b5da7da7eeff64e1a6a9b45" ON "project" ("name", "project_status") `);
    }

}
