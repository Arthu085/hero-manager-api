import { MigrationInterface, QueryRunner } from "typeorm";

export class FixProjectColumnName1771077253387 implements MigrationInterface {
    name = 'FixProjectColumnName1771077253387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_75a2930e16b88b9ddcf5d8390c"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "projectStatus"`);
        await queryRunner.query(`DROP TYPE "public"."project_projectstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "completionPercentage"`);
        await queryRunner.query(`CREATE TYPE "public"."project_project_status_enum" AS ENUM('pending', 'in_progress', 'completed')`);
        await queryRunner.query(`ALTER TABLE "project" ADD "project_status" "public"."project_project_status_enum" NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`COMMENT ON COLUMN "project"."project_status" IS 'Status do projeto'`);
        await queryRunner.query(`ALTER TABLE "project" ADD "completion_percentage" numeric(5,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`COMMENT ON COLUMN "project"."completion_percentage" IS 'Porcentagem de conclusão do projeto'`);
        await queryRunner.query(`CREATE INDEX "IDX_b63b5da7da7eeff64e1a6a9b45" ON "project" ("name", "project_status") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_b63b5da7da7eeff64e1a6a9b45"`);
        await queryRunner.query(`COMMENT ON COLUMN "project"."completion_percentage" IS 'Porcentagem de conclusão do projeto'`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "completion_percentage"`);
        await queryRunner.query(`COMMENT ON COLUMN "project"."project_status" IS 'Status do projeto'`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "project_status"`);
        await queryRunner.query(`DROP TYPE "public"."project_project_status_enum"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "completionPercentage" numeric(5,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE TYPE "public"."project_projectstatus_enum" AS ENUM('pending', 'in_progress', 'completed')`);
        await queryRunner.query(`ALTER TABLE "project" ADD "projectStatus" "public"."project_projectstatus_enum" NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`CREATE INDEX "IDX_75a2930e16b88b9ddcf5d8390c" ON "project" ("name", "projectStatus") `);
    }

}
