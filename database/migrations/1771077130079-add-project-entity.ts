import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjectEntity1771077130079 implements MigrationInterface {
    name = 'AddProjectEntity1771077130079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."project_status_enum" AS ENUM('ATIVO', 'INATIVO')`);
        await queryRunner.query(`CREATE TYPE "public"."project_projectstatus_enum" AS ENUM('pending', 'in_progress', 'completed')`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "public"."project_status_enum" NOT NULL DEFAULT 'ATIVO', "name" character varying(200) NOT NULL, "description" text NOT NULL, "projectStatus" "public"."project_projectstatus_enum" NOT NULL DEFAULT 'pending', "agility" integer NOT NULL DEFAULT '0', "enchantment" integer NOT NULL DEFAULT '0', "efficiency" integer NOT NULL DEFAULT '0', "excellence" integer NOT NULL DEFAULT '0', "transparency" integer NOT NULL DEFAULT '0', "ambition" integer NOT NULL DEFAULT '0', "completionPercentage" numeric(5,2) NOT NULL DEFAULT '0', "user_id" integer, CONSTRAINT "UQ_bcbc9244374131f3ccb908aa616" UNIQUE ("uuid"), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")); COMMENT ON COLUMN "project"."id" IS 'Identificador único da entidade'; COMMENT ON COLUMN "project"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "project"."created_at" IS 'Data de criação da entidade'; COMMENT ON COLUMN "project"."updated_at" IS 'Data de atualização da entidade'; COMMENT ON COLUMN "project"."deleted_at" IS 'Data de exclusão da entidade'; COMMENT ON COLUMN "project"."status" IS 'Status da entidade'; COMMENT ON COLUMN "project"."name" IS 'Nome do projeto'; COMMENT ON COLUMN "project"."description" IS 'Descrição do projeto'; COMMENT ON COLUMN "project"."projectStatus" IS 'Status do projeto'; COMMENT ON COLUMN "project"."agility" IS 'Agilidade do projeto'; COMMENT ON COLUMN "project"."enchantment" IS 'Encantamento do projeto'; COMMENT ON COLUMN "project"."efficiency" IS 'Eficiência do projeto'; COMMENT ON COLUMN "project"."excellence" IS 'Excelência do projeto'; COMMENT ON COLUMN "project"."transparency" IS 'Transparência do projeto'; COMMENT ON COLUMN "project"."ambition" IS 'Ambição do projeto'; COMMENT ON COLUMN "project"."completionPercentage" IS 'Porcentagem de conclusão do projeto'; COMMENT ON COLUMN "project"."user_id" IS 'Identificador único da entidade'`);
        await queryRunner.query(`CREATE INDEX "IDX_bcbc9244374131f3ccb908aa61" ON "project" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_57856cedbec1fbed761154d162" ON "project" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_dedfea394088ed136ddadeee89" ON "project" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_75a2930e16b88b9ddcf5d8390c" ON "project" ("name", "projectStatus") `);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_1cf56b10b23971cfd07e4fc6126" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_1cf56b10b23971cfd07e4fc6126"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_75a2930e16b88b9ddcf5d8390c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dedfea394088ed136ddadeee89"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_57856cedbec1fbed761154d162"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bcbc9244374131f3ccb908aa61"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TYPE "public"."project_projectstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."project_status_enum"`);
    }

}
