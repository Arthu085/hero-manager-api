import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserEntity1771076914837 implements MigrationInterface {
    name = 'AddUserEntity1771076914837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."role_status_enum" AS ENUM('ATIVO', 'INATIVO')`);
        await queryRunner.query(`CREATE TYPE "public"."role_name_enum" AS ENUM('ADMIN', 'USUARIO')`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "public"."role_status_enum" NOT NULL DEFAULT 'ATIVO', "name" "public"."role_name_enum" NOT NULL, CONSTRAINT "UQ_16fc336b9576146aa1f03fdc7c5" UNIQUE ("uuid"), CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")); COMMENT ON COLUMN "role"."id" IS 'Identificador único da entidade'; COMMENT ON COLUMN "role"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "role"."created_at" IS 'Data de criação da entidade'; COMMENT ON COLUMN "role"."updated_at" IS 'Data de atualização da entidade'; COMMENT ON COLUMN "role"."deleted_at" IS 'Data de exclusão da entidade'; COMMENT ON COLUMN "role"."status" IS 'Status da entidade'; COMMENT ON COLUMN "role"."name" IS 'Nome da função'`);
        await queryRunner.query(`CREATE INDEX "IDX_16fc336b9576146aa1f03fdc7c" ON "role" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_06ccdafcccf342078162c12753" ON "role" ("status") `);
        await queryRunner.query(`COMMENT ON TABLE "role" IS 'Tabela para cadastro de funções'`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('ATIVO', 'INATIVO')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "public"."user_status_enum" NOT NULL DEFAULT 'ATIVO', "name" character varying(200) NOT NULL, "email" character varying(250) NOT NULL, "password" character varying(300) NOT NULL, "character" character varying(200) NOT NULL, "role_id" integer, CONSTRAINT "UQ_a95e949168be7b7ece1a2382fed" UNIQUE ("uuid"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")); COMMENT ON COLUMN "user"."id" IS 'Identificador único da entidade'; COMMENT ON COLUMN "user"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "user"."created_at" IS 'Data de criação da entidade'; COMMENT ON COLUMN "user"."updated_at" IS 'Data de atualização da entidade'; COMMENT ON COLUMN "user"."deleted_at" IS 'Data de exclusão da entidade'; COMMENT ON COLUMN "user"."status" IS 'Status da entidade'; COMMENT ON COLUMN "user"."name" IS 'Nome do usuário'; COMMENT ON COLUMN "user"."email" IS 'Email do usuário'; COMMENT ON COLUMN "user"."password" IS 'Senha do usuário'; COMMENT ON COLUMN "user"."character" IS 'Personagem favorito do usuário'; COMMENT ON COLUMN "user"."role_id" IS 'Identificador único da entidade'`);
        await queryRunner.query(`CREATE INDEX "IDX_a95e949168be7b7ece1a2382fe" ON "user" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_3d44ccf43b8a0d6b9978affb88" ON "user" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_065d4d8f3b5adb4a08841eae3c" ON "user" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_c37fcebe44bd01f23438a19803" ON "user" ("character") `);
        await queryRunner.query(`CREATE INDEX "IDX_fb2e442d14add3cefbdf33c456" ON "user" ("role_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_user_email_unique_when_not_deleted" ON "user" ("email") WHERE "deleted_at" IS NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_1ad5617bdf9d1c0d89f3c5ca05" ON "user" ("name", "character", "role_id") `);
        await queryRunner.query(`COMMENT ON TABLE "user" IS 'Tabela para cadastro de usuários'`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`COMMENT ON TABLE "user" IS NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1ad5617bdf9d1c0d89f3c5ca05"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_user_email_unique_when_not_deleted"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb2e442d14add3cefbdf33c456"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c37fcebe44bd01f23438a19803"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_065d4d8f3b5adb4a08841eae3c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d44ccf43b8a0d6b9978affb88"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a95e949168be7b7ece1a2382fe"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "role" IS NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_06ccdafcccf342078162c12753"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_16fc336b9576146aa1f03fdc7c"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TYPE "public"."role_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."role_status_enum"`);
    }

}
