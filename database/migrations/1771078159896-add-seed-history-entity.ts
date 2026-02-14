import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSeedHistoryEntity1771078159896 implements MigrationInterface {
    name = 'AddSeedHistoryEntity1771078159896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "seed_history" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "executed_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_3593e1c2b96d3b0a2d31cafba11" UNIQUE ("name"), CONSTRAINT "PK_9a24c20ee229927ee9b92baf4f9" PRIMARY KEY ("id")); COMMENT ON COLUMN "seed_history"."name" IS 'Nome da seed executada'; COMMENT ON COLUMN "seed_history"."executed_at" IS 'Data de execução da seed'`);
        await queryRunner.query(`COMMENT ON TABLE "seed_history" IS 'Tabela para controle de execução de seeds'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON TABLE "seed_history" IS NULL`);
        await queryRunner.query(`DROP TABLE "seed_history"`);
    }

}
